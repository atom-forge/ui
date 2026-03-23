import fs from 'node:fs';

const pkgPath = './package.json';
const bakPath = './package.json.bak';

function getPackage() {
	return JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
}

function savePackage(pkg) {
	fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, '\t') + '\n');
}

const command = process.argv[2];

if (command === 'prepare') {
	// 1. Backup current package.json
	fs.copyFileSync(pkgPath, bakPath);

	console.log('Preparing package for release...');
	const pkg = getPackage();

	// 2. Bump version (patch)
	const versionParts = pkg.version.split('.');
	if (versionParts.length === 3) {
		versionParts[2] = (parseInt(versionParts[2]) + 1).toString();
		pkg.version = versionParts.join('.');
		console.log(`Bumping version to ${pkg.version}...`);
	}

	// 3. Remove development exports
	if (pkg.exports && pkg.exports['.']) {
		delete pkg.exports['.'].development;
		if (typeof pkg.exports['.'].svelte === 'object') {
			pkg.exports['.'].svelte = pkg.exports['.'].svelte.default;
		}
	}

	savePackage(pkg);
	console.log('Cleaned package.json for publishing.');
} else if (command === 'restore') {
	if (fs.existsSync(bakPath)) {
		const bumpedPkg = getPackage();
		const originalPkg = JSON.parse(fs.readFileSync(bakPath, 'utf8'));

		// Keep the new version but restore everything else
		originalPkg.version = bumpedPkg.version;

		savePackage(originalPkg);
		fs.unlinkSync(bakPath);
		console.log('Restored development exports and kept new version.');
	}
}
