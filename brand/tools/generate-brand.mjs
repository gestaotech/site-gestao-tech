/*
 * Gerador dos recursos da marca Gestão Tech.
 * Os SVGs em public/images/brand/ são a fonte de verdade; este script existe para reproduzí-los.
 *
 * Dependências (não versionadas no package.json):
 *   npm install --no-save opentype.js sharp @fontsource/archivo @fontsource/space-grotesk
 * Execução, a partir da raiz do projeto:
 *   node brand/tools/generate-brand.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const opentype = require("opentype.js");
const sharp = require("sharp");

const OUT = path.resolve(import.meta.dirname, "../../public/images/brand");
const APP = path.resolve(import.meta.dirname, "../../src/app");
mkdirSync(OUT, { recursive: true });

const C = {
  petroleo: "#115C6B",
  teal: "#3BB7A7",
  orange: "#E87C3B",
  ink: "#13232A",
  muted: "#4A5B63",
  deep: "#0F2F37",
  white: "#FFFFFF",
};

const root = process.cwd();
const fontBold = opentype.parse(
  readFileSync(path.join(root, "node_modules/@fontsource/archivo/files/archivo-latin-800-normal.woff")),
);
const fontRegular = opentype.parse(
  readFileSync(path.join(root, "node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-400-normal.woff")),
);

/* Composição glifo a glifo com kerning: evita a substituição de ligaduras que o opentype.js não suporta. */
function layoutGlyphs(font, text, size) {
  const scale = size / font.unitsPerEm;
  const glyphs = [...text].map((ch) => font.charToGlyph(ch));
  const positions = [];
  let x = 0;
  glyphs.forEach((glyph, i) => {
    positions.push(x);
    x += glyph.advanceWidth * scale;
    if (i < glyphs.length - 1) {
      x += (font.getKerningValue(glyph, glyphs[i + 1]) || 0) * scale;
    }
  });
  return { glyphs, positions, width: x };
}
function textPath(font, text, x, y, size) {
  const { glyphs, positions } = layoutGlyphs(font, text, size);
  const path = new opentype.Path();
  glyphs.forEach((glyph, i) => path.extend(glyph.getPath(x + positions[i], y, size)));
  return path.toPathData(3);
}
function advance(font, text, size) {
  return layoutGlyphs(font, text, size).width;
}
function capHeight(font, size) {
  const cap = font.tables.os2.sCapHeight || font.unitsPerEm * 0.7;
  return (cap / font.unitsPerEm) * size;
}

/* Símbolo: arco de 320° + barra + terminal (nó). Caixa 100x100. */
function symbol({ arc, bar, node }) {
  return `
    <path d="M76.16 23.84 A37 37 0 1 0 87 50" fill="none" stroke="${arc}" stroke-width="14"/>
    <rect x="50" y="43" width="37" height="14" fill="${bar}"/>
    <circle cx="76.16" cy="23.84" r="8" fill="${node}"/>`;
}

const LIGHT = { arc: C.petroleo, bar: C.teal, node: C.orange, text1: C.petroleo, text2: C.orange, tag: C.muted };
const DARK = { arc: C.white, bar: C.teal, node: C.orange, text1: C.white, text2: C.orange, tag: "#c9dde0" };
const MONO = { arc: C.ink, bar: C.ink, node: C.ink, text1: C.ink, text2: C.ink, tag: C.ink };

function horizontal(p) {
  const size = 92;
  const textX = 126;
  const baseline = 50 + capHeight(fontBold, size) / 2;
  const word1 = "Gestão ";
  const word2 = "Tech";
  const w1 = advance(fontBold, word1, size);
  const w2 = advance(fontBold, word2, size);
  const width = Math.ceil(textX + w1 + w2 + 4);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 100" role="img" aria-label="Gestão Tech">
  <title>Gestão Tech</title>${symbol(p)}
  <path d="${textPath(fontBold, word1, textX, baseline, size)}" fill="${p.text1}"/>
  <path d="${textPath(fontBold, word2, textX + w1, baseline, size)}" fill="${p.text2}"/>
</svg>
`;
}

function vertical(p) {
  const size = 72;
  const w1 = advance(fontBold, "Gestão ", size);
  const w2 = advance(fontBold, "Tech", size);
  const nameW = w1 + w2;
  const tagSize = 26;
  const tag = "Tecnologia que gera resultados.";
  const tagW = advance(fontRegular, tag, tagSize);
  const width = Math.ceil(Math.max(460, nameW + 80, tagW + 80));
  const height = 340;
  const cx = width / 2;
  const nameX = cx - nameW / 2;
  const nameBase = 250;
  const tagX = cx - tagW / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Gestão Tech — Tecnologia que gera resultados.">
  <title>Gestão Tech — Tecnologia que gera resultados.</title>
  <g transform="translate(${cx - 60} 30) scale(1.2)">${symbol(p)}</g>
  <path d="${textPath(fontBold, "Gestão ", nameX, nameBase, size)}" fill="${p.text1}"/>
  <path d="${textPath(fontBold, "Tech", nameX + w1, nameBase, size)}" fill="${p.text2}"/>
  <path d="${textPath(fontRegular, tag, tagX, nameBase + 50, tagSize)}" fill="${p.tag}"/>
</svg>
`;
}

function icon(p) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="Gestão Tech">
  <title>Gestão Tech</title>${symbol(p)}
</svg>
`;
}

const files = {
  "logo-gestao-tech.svg": horizontal(LIGHT),
  "logo-gestao-tech-dark.svg": horizontal(DARK),
  "logo-gestao-tech-mono.svg": horizontal(MONO),
  "logo-gestao-tech-vertical.svg": vertical(LIGHT),
  "logo-gestao-tech-vertical-dark.svg": vertical(DARK),
  "logo-gestao-tech-icon.svg": icon(LIGHT),
  "logo-gestao-tech-icon-dark.svg": icon(DARK),
};

for (const [name, svg] of Object.entries(files)) {
  writeFileSync(path.join(OUT, name), svg, "utf8");
  console.log("svg", name);
}

const iconSvg = Buffer.from(files["logo-gestao-tech-icon.svg"]);

await sharp(iconSvg, { density: 600 }).resize(512, 512).png().toFile(path.join(OUT, "logo-gestao-tech-icon.png"));
await sharp(iconSvg, { density: 600 }).resize(48, 48).png().toFile(path.join(OUT, "favicon.png"));
await sharp(iconSvg, { density: 600 }).resize(512, 512).png().toFile(path.join(APP, "icon.png"));
await sharp(iconSvg, { density: 600 })
  .resize(120, 120)
  .extend({ top: 30, bottom: 30, left: 30, right: 30, background: C.white })
  .png()
  .toFile(path.join(APP, "apple-icon.png"));
console.log("rasters ok");
