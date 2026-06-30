# hit-mcp

MCP server for the HIT ticket management system. Read-only: lists queues, lists/searches tickets, fetches ticket details, and lists ticket templates.

## Installation

```bash
npm install --global @devpeak/hit-mcp
```

This installs the `hit-mcp` command on your `PATH`.

You'll need:

- `HIT_BASE_URL` — base URL of your HIT instance (e.g. `https://support.example.com`)
- `HIT_API_TOKEN` — bearer token, `base64(username:apitoken)` from HIT's `apitokens` table

Point your MCP client at the `hit-mcp` command, e.g. in a client config:

```json
{
  "mcpServers": {
    "hit": {
      "command": "hit-mcp",
      "env": {
        "HIT_BASE_URL": "https://support.example.com",
        "HIT_API_TOKEN": "..."
      }
    }
  }
}
```

## Running from source

```bash
npm install
npm run build
```

Copy `.env.example` to `.env` and fill in `HIT_BASE_URL` / `HIT_API_TOKEN`, then:

```bash
npm start
```

This starts the server on stdio. Point your MCP client at it with an absolute path instead of the `hit-mcp` command:

```json
{
  "mcpServers": {
    "hit": {
      "command": "node",
      "args": ["/absolute/path/to/hit-mcp/dist/index.js"],
      "env": {
        "HIT_BASE_URL": "https://support.example.com",
        "HIT_API_TOKEN": "..."
      }
    }
  }
}
```

## Tools

- `list_queues` — list all support queues the authenticated user has access to.
- `list_tickets` — list tickets in a queue (open by default, `closed=true` for closed). Supports `search` and pagination via `limit`/`page`. Each ticket includes a `link` to its page in the web UI.
- `get_ticket` — full details of a single ticket, including description, priority, due date, and a link to the web UI.
- `list_templates` — list ticket templates available in a queue.
