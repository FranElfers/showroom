const path = require('path');
const fs = require('fs');

const startedAt = Date.now();

const quality = process.argv[2] ? parseInt(process.argv[2], 10) : 90;
const concurrencyArgIdx = process.argv.findIndex(a => a === '--concurrency' || a === '-c');
const concurrencyArg =
  concurrencyArgIdx !== -1 ? parseInt(process.argv[concurrencyArgIdx + 1] ?? '', 10) : undefined;
const concurrency = Math.max(1, Math.min(10, concurrencyArg || 1));
const inputDir = path.join(process.cwd(), 'input');
const outputDir = path.join(process.cwd(), 'output');

console.log(`Scanning directory: ${inputDir} for PNG files...`);

if (!fs.existsSync(inputDir)) {
  console.error(`Input directory not found: ${inputDir}`);
  process.exit(1);
}

fs.mkdirSync(outputDir, { recursive: true });

const pngFiles = fs
  .readdirSync(inputDir)
  .filter(file => path.extname(file).toLowerCase() === '.png');

if (pngFiles.length === 0) {
  console.log('No .png files found to convert.');
  process.exit(0);
}

console.log(
  `Found ${pngFiles.length} PNG file(s). Converting with quality ${quality} (concurrency ${concurrency})...\n`,
);

let completed = 0;
let errors = 0;

let nextIndex = 0;

async function worker() {
  while (true) {
    const i = nextIndex++;
    if (i >= pngFiles.length) return;

    const file = pngFiles[i];
    const inputFile = path.join(inputDir, file);
    const outputFile = path.join(outputDir, path.parse(file).name + '.webp');

    try {
      await Bun.file(inputFile).image().webp({ quality }).write(outputFile);
      console.log(`✅ Converted ${file} -> ${path.basename(outputFile)}`);
      completed++;
    } catch (err) {
      console.error(`❌ Error converting ${file}:`, err);
      errors++;
    }
  }
}

await Promise.all(Array.from({ length: Math.min(concurrency, pngFiles.length) }, () => worker()));

console.log(`\n🎉 Done! ${completed} successful conversion(s). Errors: ${errors}`);
const elapsedMs = Date.now() - startedAt;
console.log(`⏱️ Elapsed time: ${elapsedMs}ms (${(elapsedMs / 1000).toFixed(2)}s)`);
if (errors > 0) process.exit(1);
