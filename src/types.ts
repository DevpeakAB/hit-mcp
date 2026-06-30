// The HIT API wraps every payload in an envelope of the form
// {"status": "OK", "<key>": <data>}; the *Response types below model that.

export interface Queue {
  id: number;
  name: string;
}

export interface QueuesResponse {
  status: string;
  queues: Queue[];
}

export interface TicketSummary {
  id: number;
  submitter_name: string;
  submitter_email: string;
  subject: string;
  date: string;
  closed_date: string | null;
}

export interface TicketsResponse {
  status: string;
  tickets: TicketSummary[];
  tickets_count: number;
  page: number;
  limit: number | string;
}

export interface Ticket {
  id: number;
  submitter_name: string;
  submitter_email: string;
  subject: string;
  date: string;
  closed_date: string | null;
  description: string;
  priority: string;
  duedate: string | null;
  last_activity: string | null;
  link: string;
}

export interface TicketResponse {
  status: string;
  ticket: Ticket;
}

export interface Subticket {
  id: number;
  subject: string;
  tickettemplate: number;
}

export interface TicketTemplate {
  id: number;
  name: string;
  description: string;
  template_text: string;
  subtickets: Subticket[];
}

export interface TicketTemplatesResponse {
  status: string;
  tickettemplates: TicketTemplate[];
}
