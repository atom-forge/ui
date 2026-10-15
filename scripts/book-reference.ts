#!/usr/bin/env node
// Regenerates book/07-reference.md and book/reference/** from docs/controls/**.
// Each control page only embeds its source doc; edit the docs, not the generated pages.
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "fs";

const CONTROLS = "docs/controls";
const OUT = "book/reference";

// General to specific. Categories not listed are appended (with a warning).
const ORDER: [string, string][] = [
  ["general", "General"],
  ["layout", "Layout"],
  ["forms", "Forms"],
  ["display", "Display"],
  ["data", "Data & Charts"],
  ["overlays", "Overlays"],
  ["content", "Content"],
  ["editors", "Editors"],
  ["scheduling", "Scheduling"],
];

const onDisk = readdirSync(CONTROLS, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name);
for (const c of onDisk) if (!ORDER.some(([k]) => k === c)) {
  console.warn(`⚠ Category "${c}" is not in ORDER; appended at the end.`);
  ORDER.push([c, c[0].toUpperCase() + c.slice(1)]);
}

rmSync(OUT, { recursive: true, force: true });
const chapterChildren: string[] = [];

for (const [cat, title] of ORDER) {
  if (!existsSync(`${CONTROLS}/${cat}`)) { console.warn(`⚠ Missing folder ${CONTROLS}/${cat}`); continue; }
  const files = readdirSync(`${CONTROLS}/${cat}`).filter(f => f.endsWith(".md")).sort();
  mkdirSync(`${OUT}/${cat}`, { recursive: true });
  const kids: string[] = [];
  for (const f of files) {
    const name = f.slice(0, -3);
    const h1 = readFileSync(`${CONTROLS}/${cat}/${f}`, "utf-8").split("\n")[0].replace(/^#\s*/, "").trim() || name;
    writeFileSync(`${OUT}/${cat}/${f}`,
      `---\ntype: content\ntitle: ${JSON.stringify(h1)}\n---\n\n![[../../../${CONTROLS}/${cat}/${name}]]\n`);
    kids.push(`  - "[[${cat}/${f}]]"`);
  }
  writeFileSync(`${OUT}/${cat}.md`,
    `---\ntype: chapter\ntitle: ${JSON.stringify(title)}\nchildren:\n${kids.join("\n")}\n---\n\n# ${title}\n\nControl reference for the ${title} category. Each page is embedded from \`${CONTROLS}/${cat}/\`.\n`);
  chapterChildren.push(`  - "[[reference/${cat}.md]]"`);
  console.log(`✓ ${cat}: ${files.length} controls`);
}

writeFileSync("book/07-reference.md",
  `---\ntype: chapter\ntitle: Control reference\nchildren:\n${chapterChildren.join("\n")}\n---\n\n# Control reference\n\nThe complete component reference, one page per control, embedded from \`${CONTROLS}/\`, ordered from general building blocks to specialised controls. The source files stay the single copy; this chapter only assembles them.\n\nChoose a control first with the capability map in [[04-choosing-controls]].\n`);
