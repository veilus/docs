// Adds one table-of-contents entry per endpoint on the API reference pages.
// Starlight builds the TOC from the Markdown headings only, so the h3s that
// EndpointList.astro renders would otherwise be missing from it.
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import catalog from './data/api-catalog.json';
import { GROUPS, toEndpoints } from './components/api-ref/apiReference';
import type { ApiCatalog } from './components/api-ref/catalogTypes';

// Page id (without the locale prefix) → the h2 slugs the endpoint list sits under, per language.
const PAGES: Record<string, { section: 'rest' | 'mcp'; parents: string[] }> = {
	'reference/rest-api': { section: 'rest', parents: ['routes', 'danh-sách-route'] },
	'reference/mcp': { section: 'mcp', parents: ['tools', 'danh-sách-tool'] },
};

export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;
	const page = PAGES[route.id.replace(/^vi\//, '')];
	const toc = route.toc;
	if (!page || !toc) return;
	const parent = toc.items.find((i) => page.parents.includes(i.slug));
	if (!parent) throw new Error(`routeData: no TOC heading ${page.parents.join(' / ')} on ${route.id}`);
	const endpoints = toEndpoints(catalog as ApiCatalog, page.section);
	// Same order as the page: by group, then catalog order (see EndpointList.astro).
	parent.children = GROUPS.flatMap((g) => endpoints.filter((e) => e.group === g)).map((e) => ({
		depth: 3,
		slug: e.id,
		text: e.title,
		children: [],
	}));
});
