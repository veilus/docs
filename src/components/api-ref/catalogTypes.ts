// Shared verbatim with the docs site (src/components/api-ref/); keep this file self-contained.

/** The subset of JSON Schema the catalog uses (Rust `schemars` output). */
export interface JsonSchema {
    type?: string | string[];
    description?: string;
    properties?: Record<string, JsonSchema>;
    required?: string[];
    items?: JsonSchema;
    enum?: unknown[];
    const?: unknown;
    default?: unknown;
    format?: string;
    minimum?: number;
    minItems?: number;
    anyOf?: JsonSchema[];
    oneOf?: JsonSchema[];
    [key: string]: unknown;
}

export type Access = "read" | "write";

/** One declared response of a route; an empty body is schema `{type: "null"}`. */
export interface ResponseDoc {
    status: number;
    description: string;
    schema: JsonSchema;
    example: unknown;
}

/** One MCP tool, and the REST route it calls (`:id` form). */
export interface McpToolDoc {
    name: string;
    description: string;
    inputSchema: JsonSchema;
    access: Access;
    method: "GET" | "POST";
    path: string;
}

/** One REST route — `path` keeps `:id`. */
export interface RestRouteDoc {
    method: "GET" | "POST";
    path: string;
    summary: string;
    description: string;
    access: Access;
    params: { name: string; description: string }[];
    body?: JsonSchema;
    bodyRequired: boolean;
    responses: ResponseDoc[];
}

/** The single MCP + REST catalog, as exported by the app. */
export interface ApiCatalog {
    mcpTools: McpToolDoc[];
    restRoutes: RestRouteDoc[];
    /** 401/403/500 — every route can answer them. */
    commonResponses: ResponseDoc[];
    tokenEnv: string;
    /** The app version the catalog was exported from. */
    appVersion: string;
}
