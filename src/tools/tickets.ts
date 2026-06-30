import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { hitGet, ticketUrl } from "../client.js";
import type { TicketResponse, TicketsResponse, TicketTemplatesResponse } from "../types.js";

export function registerTicketTools(server: McpServer): void {
  server.tool(
    "list_tickets",
    "List tickets in a queue. Returns open tickets by default; set closed=true for closed tickets. Supports search and pagination. Each ticket includes a link to its page in the web UI.",
    {
      queue: z.number().int().describe("Queue ID"),
      closed: z.boolean().optional().describe("List closed tickets instead of open ones (default: false)"),
      search: z.string().optional().describe("Search term matched against subject and submitter email"),
      limit: z.number().int().min(1).max(500).optional().describe("Max results per page (default: 50)"),
      page: z.number().int().min(1).optional().describe("Page number (default: 1)"),
    },
    async ({ queue, closed, search, limit, page }) => {
      const params: Record<string, string> = {};
      if (closed) params.closed = "true";
      if (search) params.search = search;
      if (limit) params.limit = String(limit);
      if (page) params.page = String(page);

      const data = await hitGet<TicketsResponse>(`/api/queues/${queue}/tickets`, params);
      const tickets = data.tickets.map((t) => ({ ...t, link: ticketUrl(t.id) }));
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              { tickets, tickets_count: data.tickets_count, page: data.page, limit: data.limit },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  server.tool(
    "get_ticket",
    "Get full details of a single ticket including description, priority, due date, and a link to the web UI",
    {
      ticket: z.number().int().describe("Ticket ID"),
    },
    async ({ ticket }) => {
      const data = await hitGet<TicketResponse>(`/api/tickets/${ticket}`);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data.ticket, null, 2),
          },
        ],
      };
    }
  );

  server.tool(
    "list_templates",
    "List ticket templates available in a queue",
    {
      queue: z.number().int().describe("Queue ID"),
    },
    async ({ queue }) => {
      const data = await hitGet<TicketTemplatesResponse>(`/api/queues/${queue}/tickettemplates`);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data.tickettemplates, null, 2),
          },
        ],
      };
    }
  );
}
