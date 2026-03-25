# Week 4 MCP Deliverable Plan

## Goal
Deliver a single production URL for an MCP-enabled Person app with full CRUD and clear evaluator setup instructions.

## Scope
- Keep Week 3 Person CRUD features functional.
- Add Person CRUD MCP server for Claude Desktop via stdio.
- Add `/mcp-setup` instructions page.
- Add `/mcp-demo` live test interface.
- Update `/about` with MCP architecture details.
- Update `/github` to point to MCP server code location.

## Implementation
- MCP server file: `mcp-server/person-crud-server.mjs`
- MCP tools: `person_list`, `person_create`, `person_update`, `person_delete`
- Demo actions: `app/actions/mcp-demo-actions.ts`
- Demo UI: `app/mcp-demo/page.tsx` + `app/mcp-demo/mcp-demo-client.tsx`
- Setup docs: `app/mcp-setup/page.tsx`

## Validation Checklist
- `pnpm exec tsc --noEmit` passes
- `pnpm build` passes
- MCP server starts with `pnpm mcp:person`
- CRUD works from app UI and MCP demo page
