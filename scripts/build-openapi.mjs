// Writes public/openapi.json from src/data/api-catalog.json, built the same way
// the app builds the document it serves at GET /v1/openapi.json. Differences:
// `info.version` is "docs" (the catalog carries no app version).
import { readFileSync, writeFileSync } from 'node:fs';

const catalog = JSON.parse(readFileSync('src/data/api-catalog.json', 'utf8'));

const paths = {};
for (const r of catalog.restRoutes) {
	const path = r.params.reduce((acc, p) => acc.replace(`:${p.name}`, `{${p.name}}`), r.path);
	const op = { summary: r.summary, description: r.description, 'x-veilus-access': r.access };
	if (r.params.length) {
		op.parameters = r.params.map((p) => ({
			name: p.name,
			in: 'path',
			required: true,
			description: p.description,
			schema: { type: 'string' },
		}));
	}
	if (r.body) {
		op.requestBody = { required: r.bodyRequired, content: { 'application/json': { schema: r.body } } };
	}
	op.responses = {};
	for (const x of [...r.responses, ...catalog.commonResponses]) {
		const doc = { description: x.description };
		// An empty body (204, a bare 401) has no content.
		if (x.example !== null && x.example !== undefined) {
			doc.content = { 'application/json': { schema: x.schema, example: x.example } };
		}
		op.responses[String(x.status)] = doc;
	}
	paths[path] = { ...paths[path], [r.method.toLowerCase()]: op };
}

const doc = {
	openapi: '3.1.0',
	info: { title: 'Veilus local API', version: 'docs' },
	servers: [{ url: 'http://127.0.0.1:{port}' }],
	components: { securitySchemes: { bearer: { type: 'http', scheme: 'bearer' } } },
	security: [{ bearer: [] }],
	paths,
};
writeFileSync('public/openapi.json', `${JSON.stringify(doc, null, 2)}\n`);
console.log(`build-openapi: ${catalog.restRoutes.length} operations, ${Object.keys(paths).length} paths`);
