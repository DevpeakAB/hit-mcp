#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerQueueTools } from "./tools/queues.js";
import { registerTicketTools } from "./tools/tickets.js";

const server = new McpServer({
  name: "hit-mcp",
  version: "0.1.0",
});

registerQueueTools(server);
registerTicketTools(server);

const transport = new StdioServerTransport();
await server.connect(transport);
