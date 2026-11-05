#!/usr/bin/env node
import { execSync } from "child_process";
import { readFileSync } from "fs";

const bump = process.argv[2] ?? "patch";
const semverRe = /^\d+\.\d+\.\d+$/;
if (!["patch", "minor", "major"].includes(bump) && !semverRe.test(bump)) {
  console.error(`❌ Invalid bump: ${bump}. Use patch, minor, major, or an explicit version like 1.2.3.`);
  process.exit(1);
}

// The release commit only contains package.json and CHANGELOG.md, and the showcase is built
// from the working tree, so every other change (including new files) must already be committed.
const dirty = execSync(`git status --porcelain`, { encoding: "utf-8" }).trim();
if (dirty) {
  console.error(`❌ Uncommitted changes. Commit them before releasing:\n${dirty}`);
  process.exit(1);
}

const version = execSync(`npm version ${bump} --no-git-tag-version`, { encoding: "utf-8" }).trim();
console.log(`📦 Bumped to ${version}`);

execSync(`bun run scripts/changelog-release.ts`, { stdio: "inherit" });

execSync(`git add package.json CHANGELOG.md`);
execSync(`git commit -m "release ${version}"`);
execSync(`git tag ${version}`);
execSync(`git push && git push --tags`);
console.log(`🚀 Tagged and pushed ${version}`);

// The tag triggers the npm publish workflow. Deploy the showcase only once the release is on npm,
// so https://ui.atom-forge.eu never shows a version that failed to publish.
const { name } = JSON.parse(readFileSync("./package.json", "utf-8"));
const expected = version.replace(/^v/, "");
const timeoutMs = 15 * 60 * 1000;
const intervalMs = 15 * 1000;
const deadline = Date.now() + timeoutMs;

const isPublished = () => {
  try {
    return execSync(`npm view ${name}@${expected} version`, { encoding: "utf-8", stdio: ["ignore", "pipe", "ignore"] }).trim() === expected;
  } catch {
    return false;
  }
};

console.log(`⏳ Waiting for ${name}@${expected} on npm...`);
while (!isPublished()) {
  if (Date.now() > deadline) {
    console.error(`❌ ${name}@${expected} did not appear on npm within ${timeoutMs / 60000} minutes. Check the publish workflow, then run \`bun run deploy\` manually.`);
    process.exit(1);
  }
  execSync(`sleep ${intervalMs / 1000}`);
}
console.log(`✅ Published: ${name}@${expected}`);

try {
  execSync(`bun run deploy`, { stdio: "inherit" });
} catch {
  console.error(`❌ Showcase deploy failed. The package is released; fix the problem and run \`bun run deploy\` to finish the release.`);
  process.exit(1);
}
console.log(`🌐 Showcase deployed: https://ui.atom-forge.eu`);
