// Shared verbatim with the docs site (src/components/api-ref/); keep this file self-contained.
/**
 * View model for the API reference pages (`/api/rest`, `/api/mcp`):
 * one `Endpoint` shape for both REST routes and MCP tools, plus the pure
 * helpers the components need (search, code samples, example bodies, schema
 * trees, and turning the panel's inputs into one concrete request).
 */
import type { Access, ApiCatalog, JsonSchema, ResponseDoc } from "./catalogTypes";

export type { Access, JsonSchema, ResponseDoc };

export interface Endpoint {
    /** Anchor: "get-v1-profiles" | "mcp-list_profiles". */
    id: string;
    kind: "rest" | "mcp";
    /** REST: the summary's first sentence; MCP: the tool name. */
    title: string;
    method: "GET" | "POST";
    /** REST path (`:id` form) — for MCP the route the tool calls. */
    path: string;
    access: Access;
    /** REST: the whole summary (protocol details); MCP: empty. */
    summary: string;
    description: string;
    /** REST path parameters; empty for MCP (the id is an argument). */
    params: { name: string; description: string }[];
    /** REST body schema, or the MCP tool's inputSchema. */
    body?: JsonSchema;
    /** False when the panel may send no body at all. */
    bodyRequired: boolean;
    /** Route-specific + common, sorted by status. */
    responses: ResponseDoc[];
    group: string;
}

export const GROUPS = [
    "Profiles",
    "Scripts",
    "Runs",
    "Proxies",
    "Schedules",
    "Datasets",
    "Page",
    "System",
] as const;

const SEGMENT_GROUP: Record<string, string> = {
    profiles: "Profiles",
    scripts: "Scripts",
    dsl: "Scripts",
    runs: "Runs",
    "proxy-pools": "Proxies",
    schedules: "Schedules",
    datasets: "Datasets",
};

/** Profile routes that drive the open page rather than the profile itself. */
const PAGE_ACTIONS = new Set([
    "navigate",
    "snapshot",
    "click",
    "type",
    "press-key",
    "scroll",
    "evaluate",
    "wait-for-element",
    "set-file",
]);

/** By the first segment after /v1/; page routes → "Page"; anything else → "System". */
export function groupOf(path: string): string {
    const parts = path.split("?")[0].split("/").filter(Boolean);
    if (parts[1] === "profiles" && PAGE_ACTIONS.has(parts[3] ?? "")) return "Page";
    return SEGMENT_GROUP[parts[1] ?? ""] ?? "System";
}

function firstSentence(text: string): string {
    const m = /^(.*?)[.;:](\s|$)/s.exec(text);
    return (m ? m[1] : text).trim();
}

function slug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

function sortedResponses(own: ResponseDoc[], common: ResponseDoc[]): ResponseDoc[] {
    return [...own, ...common.filter((c) => !own.some((o) => o.status === c.status))].sort(
        (a, b) => a.status - b.status,
    );
}

export function toEndpoints(catalog: ApiCatalog, section: "rest" | "mcp"): Endpoint[] {
    const common = catalog.commonResponses ?? [];
    if (section === "rest") {
        return catalog.restRoutes.map((r) => ({
            id: slug(`${r.method}-${r.path}`),
            kind: "rest",
            title: firstSentence(r.summary),
            method: r.method,
            path: r.path,
            access: r.access,
            summary: r.summary,
            description: r.description,
            params: r.params,
            body: r.body,
            bodyRequired: r.bodyRequired,
            responses: sortedResponses(r.responses, common),
            group: groupOf(r.path),
        }));
    }
    return catalog.mcpTools.map((tool) => {
        const route = catalog.restRoutes.find(
            (r) => r.method === tool.method && r.path === tool.path,
        );
        return {
            id: `mcp-${tool.name}`,
            kind: "mcp",
            title: tool.name,
            method: tool.method,
            path: tool.path,
            access: tool.access,
            summary: "",
            description: tool.description,
            params: [],
            body: tool.inputSchema,
            bodyRequired: true,
            responses: sortedResponses(route?.responses ?? [], common),
            group: groupOf(tool.path),
        };
    });
}

/** Case-insensitive match over title, path, method and tool name. */
export function filterEndpoints(list: Endpoint[], query: string): Endpoint[] {
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((e) =>
        [e.title, e.path, e.method, e.id].some((f) => f.toLowerCase().includes(q)),
    );
}

const FORMAT_EXAMPLES: Record<string, string> = {
    uuid: "00000000-0000-0000-0000-000000000000",
    "date-time": "2026-01-01T09:00:00+00:00",
};

/** Required fields only, from `default` / `enum[0]` / `const` / the type. */
export function exampleBody(schema?: JsonSchema): unknown {
    if (!schema) return undefined;
    if (schema.default !== undefined) return schema.default;
    if (schema.enum?.length) return schema.enum[0];
    if (schema.const !== undefined) return schema.const;
    const variant = schema.anyOf ?? schema.oneOf;
    if (variant?.length) return exampleBody(variant.find((v) => v.type !== "null") ?? variant[0]);
    const type = Array.isArray(schema.type) ? schema.type.find((x) => x !== "null") : schema.type;
    switch (type) {
        case "object": {
            const props = schema.properties ?? {};
            return Object.fromEntries(
                (schema.required ?? []).map((k) => [k, exampleBody(props[k])]),
            );
        }
        case "array":
            return (schema.minItems ?? 0) > 0 ? [exampleBody(schema.items)] : [];
        case "integer":
        case "number":
            return schema.minimum ?? 0;
        case "boolean":
            return false;
        case "string":
            return FORMAT_EXAMPLES[schema.format ?? ""] ?? "";
        default:
            return null;
    }
}

const BASE = "http://127.0.0.1:";
const TOKEN_ENV = "VEILUS_API_TOKEN";

function pyLiteral(v: unknown): string {
    if (v === null || v === undefined) return "None";
    if (v === true) return "True";
    if (v === false) return "False";
    if (Array.isArray(v)) return `[${v.map(pyLiteral).join(", ")}]`;
    if (typeof v === "object") {
        const pairs = Object.entries(v).map(([k, x]) => `${JSON.stringify(k)}: ${pyLiteral(x)}`);
        return `{${pairs.join(", ")}}`;
    }
    return JSON.stringify(v);
}

export type SampleLang = "curl" | "fetch" | "python" | "mcp";

export function codeSample(
    e: Endpoint,
    lang: SampleLang,
    port: number | null,
    body: unknown,
): string {
    const url = `${BASE}${port ?? "<port>"}${e.path}`;
    const hasBody = e.method === "POST" && body !== undefined;
    const json = JSON.stringify(body, null, 2);
    switch (lang) {
        case "mcp":
            return JSON.stringify({ name: e.title, arguments: body ?? {} }, null, 2);
        case "curl":
            return [
                `curl --request ${e.method} '${url}'`,
                `  --header "Authorization: Bearer $${TOKEN_ENV}"`,
                ...(hasBody
                    ? [
                          `  --header 'Content-Type: application/json'`,
                          `  --data '${JSON.stringify(body).replace(/'/g, "'\\''")}'`,
                      ]
                    : []),
            ].join(" \\\n");
        case "fetch":
            return [
                `const res = await fetch("${url}", {`,
                `  method: "${e.method}",`,
                `  headers: {`,
                `    Authorization: \`Bearer \${process.env.${TOKEN_ENV}}\`,`,
                ...(hasBody ? [`    "Content-Type": "application/json",`] : []),
                `  },`,
                ...(hasBody ? [`  body: JSON.stringify(${json.replace(/\n/g, "\n  ")}),`] : []),
                `});`,
                `console.log(res.status, await res.text());`,
            ].join("\n");
        case "python":
            return [
                `import os, requests`,
                ``,
                `res = requests.request(`,
                `    "${e.method}",`,
                `    "${url}",`,
                `    headers={"Authorization": f"Bearer {os.environ['${TOKEN_ENV}']}"},`,
                ...(hasBody ? [`    json=${pyLiteral(body)},`] : []),
                `)`,
                `print(res.status_code, res.text)`,
            ].join("\n");
    }
}

/** Catalog prose → text and `code` parts; an unmatched backtick stays literal. */
export function inlineCode(text: string): Array<{ code: boolean; text: string }> {
    return text
        .split(/`([^`]+)`/)
        .map((part, i) => ({ code: i % 2 === 1, text: part }))
        .filter((p) => p.text !== "");
}

export interface SchemaNode {
    name: string;
    type: string;
    required: boolean;
    description?: string;
    children: SchemaNode[];
}

/** "string", "integer | null", "array<string>", `"a" | "b"`, "object". */
export function typeLabel(s: JsonSchema): string {
    if (s.enum?.length) return s.enum.map((v) => JSON.stringify(v)).join(" | ");
    if (s.const !== undefined) return JSON.stringify(s.const);
    const variant = s.anyOf ?? s.oneOf;
    if (variant) return variant.map(typeLabel).join(" | ");
    const t = Array.isArray(s.type) ? s.type.join(" | ") : (s.type ?? "any");
    return t === "array" && s.items ? `array<${typeLabel(s.items)}>` : t;
}

/** The object whose fields a schema shows: itself, its items, or its first object variant. */
function objectOf(s: JsonSchema | undefined): JsonSchema | undefined {
    if (!s) return undefined;
    if (s.properties) return s;
    if (s.items) return objectOf(s.items);
    return (s.anyOf ?? s.oneOf ?? []).map(objectOf).find(Boolean);
}

export function schemaTree(schema: JsonSchema): SchemaNode[] {
    const obj = objectOf(schema);
    if (!obj?.properties) return [];
    const required = new Set(obj.required ?? []);
    return Object.entries(obj.properties).map(([name, prop]) => ({
        name,
        type: typeLabel(prop),
        required: required.has(name),
        description: prop.description,
        children: schemaTree(prop),
    }));
}

export type BuiltRequest =
    | { ok: true; method: "GET" | "POST"; path: string; body: unknown }
    | { ok: false; missing: string };

function isEmptyObject(v: unknown): boolean {
    return typeof v === "object" && v !== null && Object.keys(v).length === 0;
}

/**
 * One concrete request for `api_try_request`. REST: `:name` filled from
 * `pathValues`. MCP, the same way the MCP server does it: the required `*_id`
 * argument fills `:id`, the other arguments become the query (GET) or the
 * body (POST); a tool without `:id` sends all arguments as the body.
 */
export function buildRequest(
    e: Endpoint,
    pathValues: Record<string, string>,
    body: unknown,
): BuiltRequest {
    if (e.kind === "rest") {
        let path = e.path;
        for (const p of e.params) {
            const v = pathValues[p.name]?.trim();
            if (!v) return { ok: false, missing: p.name };
            path = path.replace(`:${p.name}`, encodeURIComponent(v));
        }
        return { ok: true, method: e.method, path, body: e.method === "POST" ? body : undefined };
    }
    const args = (typeof body === "object" && body !== null ? body : {}) as Record<string, unknown>;
    const hasId = e.path.includes(":id");
    const idArg = hasId ? ((e.body?.required ?? []).find((k) => k.endsWith("_id")) ?? "id") : null;
    let path = e.path;
    if (idArg) {
        const id = args[idArg];
        if (typeof id !== "string" || !id.trim()) return { ok: false, missing: idArg };
        path = path.replace(":id", encodeURIComponent(id.trim()));
    }
    if (e.method === "GET") {
        // Like the MCP server's `with_query`: only declared arguments, absent ones skipped.
        const query = new URLSearchParams(
            Object.keys(e.body?.properties ?? {})
                .filter((k) => k !== idArg && args[k] !== null && args[k] !== undefined)
                .map((k) => [k, String(args[k])]),
        ).toString();
        return {
            ok: true,
            method: "GET",
            path: query ? `${path}?${query}` : path,
            body: undefined,
        };
    }
    const rest = Object.fromEntries(Object.entries(args).filter(([k]) => k !== idArg));
    if (!hasId) return { ok: true, method: "POST", path, body: args };
    return { ok: true, method: "POST", path, body: isEmptyObject(rest) ? undefined : rest };
}
