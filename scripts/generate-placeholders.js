const fs = require("fs").promises;
const path = require("path");
const matter = require("gray-matter");
const { createCanvas } = require("canvas");

async function generatePlaceholder(imagePath, text) {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext("2d");

  // Fill background
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add text
  ctx.font = "bold 48px -apple-system, system-ui, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Wrap text if needed
  const words = text.split(" ");
  let lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(`${currentLine} ${word}`).width;
    if (width < canvas.width - 100) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);

  // Draw text lines
  const lineHeight = 60;
  const startY = canvas.height / 2 - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, i) => {
    ctx.fillText(line, canvas.width / 2, startY + i * lineHeight);
  });

  // Save the image
  const buffer = canvas.toBuffer("image/png");
  await fs.writeFile(path.join(process.cwd(), "public", imagePath), buffer);
}

async function main() {
  // Read all project files
  const projectsDir = path.join(process.cwd(), "src/content/projects");
  const files = await fs.readdir(projectsDir);

  for (const file of files) {
    if (!file.endsWith(".mdx")) continue;

    const content = await fs.readFile(path.join(projectsDir, file), "utf8");
    const { data } = matter(content);

    if (!data.image) continue;

    // Remove leading slash if present
    const imagePath = data.image.startsWith("/")
      ? data.image.slice(1)
      : data.image;

    try {
      // Check if image already exists
      await fs.access(path.join(process.cwd(), "public", imagePath));
      console.log(`✓ Image exists: ${imagePath}`);
    } catch (error) {
      // Image doesn't exist, generate placeholder
      console.log(`Generating placeholder for: ${imagePath}`);
      await generatePlaceholder(imagePath, data.title);
      console.log(`✓ Generated: ${imagePath}`);
    }
  }
}

main().catch(console.error);
