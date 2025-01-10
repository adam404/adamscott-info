const fs = require("fs").promises;
const path = require("path");
const matter = require("gray-matter");
const { createCanvas } = require("canvas");

async function generatePlaceholder(imagePath, text, type = "project") {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext("2d");

  // Fill background with different colors for projects vs blog
  ctx.fillStyle = type === "project" ? "#1e293b" : "#312e81";
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

  // Add type label
  ctx.font = "bold 24px -apple-system, system-ui, sans-serif";
  ctx.fillText(type.toUpperCase(), canvas.width / 2, canvas.height - 40);

  // Ensure the directory exists
  const dir = path.dirname(path.join(process.cwd(), "public", imagePath));
  await fs.mkdir(dir, { recursive: true });

  // Save the image
  const buffer = canvas.toBuffer("image/png");
  await fs.writeFile(path.join(process.cwd(), "public", imagePath), buffer);
}

async function processContent(contentDir, type) {
  const files = await fs.readdir(contentDir);

  for (const file of files) {
    if (!file.endsWith(".mdx")) continue;

    const content = await fs.readFile(path.join(contentDir, file), "utf8");
    const { data } = matter(content);

    // For blog posts, check both featuredImage and image fields
    const imagePath =
      type === "blog" ? data.featuredImage || data.image : data.image;

    if (!imagePath) continue;

    // Remove leading slash if present
    const cleanImagePath = imagePath.startsWith("/")
      ? imagePath.slice(1)
      : imagePath;

    try {
      // Check if image already exists
      await fs.access(path.join(process.cwd(), "public", cleanImagePath));
      console.log(`✓ Image exists: ${cleanImagePath}`);
    } catch (error) {
      // Image doesn't exist, generate placeholder
      console.log(`Generating placeholder for: ${cleanImagePath}`);
      await generatePlaceholder(cleanImagePath, data.title, type);
      console.log(`✓ Generated: ${cleanImagePath}`);
    }
  }
}

async function main() {
  // Process projects
  const projectsDir = path.join(process.cwd(), "src/content/projects");
  console.log("\nProcessing projects...");
  await processContent(projectsDir, "project");

  // Process blog articles
  const blogDir = path.join(process.cwd(), "src/content/blog");
  console.log("\nProcessing blog articles...");
  await processContent(blogDir, "blog");
}

main().catch(console.error);
