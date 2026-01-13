#!/usr/bin/env node
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicAssetsDir = path.join(__dirname, '../public/assets');
const publicDir = path.join(__dirname, '../public');

// Convert images to WebP
async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath);
    console.log(`✅ Converted: ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error.message);
  }
}

// Generate favicons from logo
async function generateFavicons() {
  const logoPath = path.join(publicAssetsDir, 'logo/logo - Frites and Co.png');

  const sizes = [
    { size: 16, name: 'icon-16x16.png' },
    { size: 32, name: 'icon-32x32.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'icon-192x192.png' },
    { size: 512, name: 'icon-512x512.png' },
  ];

  for (const { size, name } of sizes) {
    try {
      await sharp(logoPath)
        .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .png()
        .toFile(path.join(publicDir, name));
      console.log(`✅ Generated favicon: ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`❌ Error generating ${name}:`, error.message);
    }
  }

  // Generate favicon.ico (32x32)
  try {
    await sharp(logoPath)
      .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .toFile(path.join(publicDir, 'favicon.ico'));
    console.log(`✅ Generated favicon.ico`);
  } catch (error) {
    console.error(`❌ Error generating favicon.ico:`, error.message);
  }

  // Generate OG image (1200x630 for social media)
  try {
    await sharp(logoPath)
      .resize(1200, 630, { fit: 'contain', background: { r: 245, g: 237, b: 220, alpha: 1 } })
      .jpeg({ quality: 90 })
      .toFile(path.join(publicDir, 'og-image.jpg'));
    console.log(`✅ Generated og-image.jpg (1200x630)`);
  } catch (error) {
    console.error(`❌ Error generating og-image.jpg:`, error.message);
  }
}

// Recursively find all PNG/JPG files
function findImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findImageFiles(filePath, fileList);
    } else if (/\.(png|jpg|jpeg)$/i.test(file)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

async function main() {
  console.log('🚀 Starting image conversion and favicon generation...\n');

  // Generate favicons first
  console.log('📱 Generating favicons from logo...');
  await generateFavicons();
  console.log('');

  // Convert all images to WebP
  console.log('🖼️  Converting images to WebP (quality 85)...');
  const imageFiles = findImageFiles(publicAssetsDir);

  for (const imagePath of imageFiles) {
    // Skip logo file (already used for favicons)
    if (imagePath.includes('logo - Frites and Co.png')) {
      continue;
    }

    const relativePath = path.relative(publicAssetsDir, imagePath);
    const outputPath = path.join(
      publicAssetsDir,
      relativePath.replace(/\.(png|jpg|jpeg)$/i, '.webp')
    );

    await convertToWebP(imagePath, outputPath);
  }

  console.log('\n✨ Conversion complete!');
  console.log('\n💡 You can now delete the original PNG/JPG files if desired.');
  console.log('💡 Remember to update image references in your code to use .webp extensions.');
}

main().catch(console.error);
