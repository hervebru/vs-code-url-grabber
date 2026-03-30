import * as path from 'path';
import * as Mocha from 'mocha';
import * as fs from 'fs';

function findTestFiles(dir: string): string[] {
	const results: string[] = [];
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			results.push(...findTestFiles(fullPath));
		} else if (entry.name.endsWith('.test.js')) {
			results.push(fullPath);
		}
	}
	return results;
}

export function run(): Promise<void> {
	// Create the mocha test
	const mocha = new Mocha({
		ui: 'tdd',
		color: true
	});

	const testsRoot = path.resolve(__dirname, '..');

	// Add files to the test suite
	for (const f of findTestFiles(testsRoot)) {
		mocha.addFile(f);
	}

	return new Promise((c, e) => {
		try {
			// Run the mocha test
			mocha.run(failures => {
				if (failures > 0) {
					e(new Error(`${failures} tests failed.`));
				} else {
					c();
				}
			});
		} catch (err) {
			console.error(err);
			e(err);
		}
	});
}
