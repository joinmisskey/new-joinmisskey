// node scripts/addimg path/to/image.jpg

import sharp from 'sharp';
import loadyaml from '../loadyaml.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream, statSync } from 'fs';
import { mkdirp } from 'mkdirp';
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

if (!process.argv[2] || typeof process.argv[2] !== 'string') {
    console.error('Please provide a path to an image file.');
    process.exit(1);
}
console.log(`size: ${Math.round(statSync(process.argv[2]).size / 1024 * 10) / 10}KB`);

const sourceExt = process.argv[2].split('.').pop();
const sourceName = process.argv[2].split('/').pop().replace(/\.[^.]+$/, '');

const site = loadyaml('./imgsetting.yml')

const sharpCtx = sharp(process.argv[2], { animated: true });
const metadata = await sharpCtx.metadata();
console.log(`width: ${metadata.width}`);

const date = new Date();
const extdir = path.resolve(_dirname, '../public/img', `${date.getFullYear()}/${(`0${date.getMonth() + 1}`).slice(-2)}`)
await mkdirp(extdir);

for (const round of site.processes) {
    if (round.width && round.width > metadata.width) continue;

    let ctx = sharpCtx.clone();
    if (round.width) {
        ctx = ctx.resize({
            width: round.width,
            withoutEnlargement: round.withoutEnlargement,
        });
    }
    const format = round.format || metadata.format;
    ctx = ctx.toFormat(format, {
        ...(site.defaultFormatOptions[format] || {}),
        ...(round.formatOptions || {}),
    });

    const outPath = path.resolve(extdir, `${sourceName}${round.width ? `.${round.width}` : ''}.${format}`);
    console.log(`Writing ${outPath}`);
    await new Promise((res, rej) => {
        ctx.pipe(createWriteStream(outPath))
            .on('finish', res)
            .on('error', rej);
    });
    console.log(`size: ${Math.round(statSync(outPath).size / 1024 * 10) / 10}KB`);
}
