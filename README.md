# hit-mcp

An MCP server that connects an AI agent (Claude, Cursor, VS Code, etc.) to HIT — Devpeak's ticket management system. Read only: the agent can browse ticket queues, search tickets, read full ticket history, and use ticket templates — but it cannot modify any data.

## Quick start

1. Install the package globally:

   ```bash
   npm install --global @devpeak/hit-mcp
   ```

2. Generate an API token in HIT: click your avatar (top right) → **Account settings** → **Security** → **API tokens** → **Create API token**.

3. Configure your MCP client with `HIT_BASE_URL` (your HIT instance, e.g. `https://support.example.com`) and `HIT_API_TOKEN` (the token from step 2). See examples below.

---

### Configuration per client

#### Claude Code

```bash
claude mcp add hit -e HIT_BASE_URL=https://your-domain-here -e HIT_API_TOKEN=your-token -- npx hit-mcp
```

#### Cursor

Add the following to `.cursor/mcp.json`:

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

#### OpenCode

Add a new key under `"mcp"` in `~/.config/opencode/opencode.jsonc`, something like:

```json
{
  "mcp": {
    "your-server-name": {
      "type": "local",
      "command": ["npx", "hit-mcp"],
      "environment": {
        "HIT_BASE_URL": "https://support.example.com",
        "HIT_API_TOKEN": "..."
      }
    }
  }
}
```

---

## What can the agent do?

| Tool | Description |
|---|---|
| `list_queues` | List all support queues you have access to — get an overview of which areas (IT, maintenance, administration, etc.) exist. |
| `list_tickets` | Browse and search tickets in a queue. Filter by open/closed status, search by subject, paginate. Each ticket links to HIT's web interface. |
| `get_ticket` | Fetch full details of a single ticket — description, priority, due dates, history. |
| `list_templates` | List ticket templates for a queue — useful for seeing what standard workflows are available. |

**Note:** All access is **read-only** — the agent can not create, update, or delete tickets.

## Building and developing locally

```bash
npm install
npm run build
```

Copy `.env.example` to `.env`, fill in `HIT_BASE_URL` and `HIT_API_TOKEN`, then run:

```bash
npm start
```

The server starts on stdio. Point your MCP client at the absolute path:

```json
{
  "mcpServers": {
    "hit": {
      "command": "node",
      "args": ["/path/to/hit-mcp/dist/index.js"],
      "env": {
        "HIT_BASE_URL": "https://support.example.com",
        "HIT_API_TOKEN": "..."
      }
    }
  }
}
```
