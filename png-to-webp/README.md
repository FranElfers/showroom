# PNG to WebP Converter

Converts PNG images in `input/` to WebP in `output/` using [Bun.image](https://bun.com/docs/runtime/image) — no npm dependencies or native binaries required.

## Prerequisites

- [Bun](https://bun.com/) installed

## Usage

1. Place `.png` files in the `input` folder.
2. Run from the project directory:

```bash
bun index.js [quality] [--concurrency N]
```

Quality is optional (0–100, default `90`).
Concurrency is optional (1–10, default `1`).

### Example

```bash
bun index.js 100
```

Run up to 4 conversions at once:

```bash
bun index.js 90 --concurrency 4
```

Or:

```bash
bun run start
```

**What it does:**

1. Scans `input/` for `.png` files.
2. Converts each image to WebP with the given quality.
3. Writes `output/<name>.webp`.
