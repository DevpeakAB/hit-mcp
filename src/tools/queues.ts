import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { hitGet } from "../client.js";
import type { QueuesResponse } from "../types.js";

export function registerQueueTools(server: McpServer): void {
  server.tool(
    "list_queues",
    "List all support queues the authenticated user has access to",
    {},
    async () => {
      const data = await hitGet<QueuesResponse>("/api/queues");
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data.queues, null, 2),
          },
        ],
      };
    }
  );
}
