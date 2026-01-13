#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const publicAssetsDir = path.join(__dirname, '../public/assets');

// Find and delete PNG/JPG files (except logo)
function findAndDeleteOldImages(dir) {
  const files = fs.readdirSync(dir);
  let deletedCount = 0;

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      deletedCount += findAndDeleteOldImages(filePath);
    } else if (/\.(png|jpg|jpeg)$/i.test(file) && !filePath.includes('logo - Frites and Co.png')) {
      // Check if WebP version exists
      const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      if (fs.existsSync(webpPath)) {
        fs.unlinkSync(filePath);
        console.log(`🗑️  Deleted: ${path.relative(publicAssetsDir, filePath)}`);
        deletedCount++;
      } else {
        console.log(`⚠️  Skipped (no WebP): ${path.relative(publicAssetsDir, filePath)}`);
      }
    }
  });

  return deletedCount;
}

console.log('🧹 Cleaning up old PNG/JPG files...\n');
const deletedCount = findAndDeleteOldImages(publicAssetsDir);
console.log(`\n✨ Deleted ${deletedCount} old image files.`);
console.log('✅ Logo file preserved at: public/assets/logo/logo - Frites and Co.png');
