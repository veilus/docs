// Post-build check: every catalog entry is rendered as an `h3[data-endpoint]`
// on the REST and MCP reference pages, in every language. Exits 1 naming the
// entries that are missing. It does NOT check what each section shows (schemas,
// samples), only that each entry has its heading.
import { readFileSync } from 'node:fs';

const catalog = JSON.parse(readFileSync('src/data/api-catalog.json', 'utf8'));
const expected = {
	'rest-api': catalog.restRoutes.map((r) => `${r.method} ${r.path}`),
	mcp: catalog.mcpTools.map((t) => t.name),
};

let failed = false;
for (const lang of ['', 'vi/']) {
	for (const [page, keys] of Object.entries(expected)) {
		if (keys.length === 0) {
			console.error(`check-api-ref: catalog list for ${page} is empty`);
			failed = true;
			continue;
		}
		const file = `dist/${lang}reference/${page}/index.html`;
		let html;
		try {
			html = readFileSync(file, 'utf8');
		} catch {
			console.error(`check-api-ref: ${file} not found`);
			failed = true;
			continue;
		}
		const rendered = new Set(
			[...html.matchAll(/<h3\b[^>]*\bdata-endpoint="([^"]*)"/g)].map((m) => m[1]),
		);
		const missing = keys.filter((k) => !rendered.has(k));
		console.log(`${lang}${page}: ${keys.length - missing.length}/${keys.length}`);
		if (missing.length) {
			console.error(`  missing: ${missing.join(', ')}`);
			failed = true;
		}
	}
}
process.exit(failed ? 1 : 0);
