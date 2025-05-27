import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, parse } from 'path';
import { existsSync } from 'fs';

const PUBLIC_DIR = './public';
const IMAGES_DIR = join(PUBLIC_DIR, 'images');

async function generatePlaceholders() {
  try {
    // Ensure images directory exists
    if (!existsSync(IMAGES_DIR)) {
      console.error('Images directory not found:', IMAGES_DIR);
      return;
    }

    // Read all files in the images directory
    const files = await readdir(IMAGES_DIR);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png)$/i.test(file) && !file.includes('-blur')
    );

    console.log(`Found ${imageFiles.length} images to process`);

    for (const file of imageFiles) {
      const inputPath = join(IMAGES_DIR, file);
      const { name, ext } = parse(file);
      
      // Generate blur placeholder (20px width, maintaining aspect ratio)
      const blurPath = join(IMAGES_DIR, `${name}-blur.jpg`);
      if (!existsSync(blurPath)) {
        await sharp(inputPath)
          .resize(20, null, { 
            withoutEnlargement: false,
            kernel: sharp.kernel.cubic
          })
          .blur(5)
          .jpeg({ quality: 50 })
          .toFile(blurPath);
        console.log(`✓ Generated blur placeholder: ${name}-blur.jpg`);
      }

      // Generate WebP version
      const webpPath = join(IMAGES_DIR, `${name}.webp`);
      if (!existsSync(webpPath)) {
        await sharp(inputPath)
          .webp({ quality: 85 })
          .toFile(webpPath);
        console.log(`✓ Generated WebP: ${name}.webp`);
      }
    }

    console.log('\n✨ Image processing complete!');
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

generatePlaceholders(); 