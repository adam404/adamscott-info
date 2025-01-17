const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");

const QUALITY = 80; // Adjust quality as needed (80 is a good balance)
const PUBLIC_DIR = path.join(process.cwd(), "public");

// Directories to process
const DIRS_TO_PROCESS = ["projects", "blog"];

// Skip files smaller than 10KB
const MIN_SIZE_TO_PROCESS = 10 * 1024;

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const stats = await fs.stat(filePath);

  // Skip small files
  if (stats.size < MIN_SIZE_TO_PROCESS) {
    console.log(`Skipping ${filePath} (too small)`);
    return;
  }

  const image = sharp(filePath);
  const metadata = await image.metadata();

  // Create temp file path
  const tempPath = filePath + ".temp";

  try {
    // Optimize based on file type
    if (ext === ".jpg" || ext === ".jpeg") {
      await image.jpeg({ quality: QUALITY, mozjpeg: true }).toFile(tempPath);
    } else if (ext === ".png") {
      await image
        .png({ quality: QUALITY, compressionLevel: 9 })
        .toFile(tempPath);
    }

    // Replace original with optimized version
    await fs.unlink(filePath);
    await fs.rename(tempPath, filePath);

    const newStats = await fs.stat(filePath);
    const savedSize = (
      ((stats.size - newStats.size) / stats.size) *
      100
    ).toFixed(1);
    console.log(`Optimized ${filePath} (saved ${savedSize}%)`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    // Clean up temp file if it exists
    try {
      await fs.access(tempPath);
      await fs.unlink(tempPath);
    } catch (e) {
      // Temp file doesn't exist, ignore
    }
  }
}

async function processDirectory(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await processDirectory(fullPath);
      } else {
        const ext = path.extname(entry.name).toLowerCase();
        if ([".jpg", ".jpeg", ".png"].includes(ext)) {
          await optimizeImage(fullPath);
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error);
  }
}

async function main() {
  console.log("Starting image optimization...");

  for (const dir of DIRS_TO_PROCESS) {
    const dirPath = path.join(PUBLIC_DIR, dir);
    try {
      await fs.access(dirPath);
      await processDirectory(dirPath);
    } catch (error) {
      console.log(`Directory ${dirPath} does not exist, skipping...`);
    }
  }

  console.log("Image optimization complete!");
}

main().catch(console.error);
