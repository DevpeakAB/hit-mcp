const BASE = process.env.HIT_BASE_URL;
const TOKEN = process.env.HIT_API_TOKEN;
const TIMEOUT_MS = 15_000;

function assertConfig(): void {
  if (!BASE) throw new Error("HIT_BASE_URL environment variable is not set");
  if (!TOKEN) throw new Error("HIT_API_TOKEN environment variable is not set");
}

export async function hitGet<T>(path: string, params?: Record<string, string>): Promise<T> {
  assertConfig();
  const url = new URL(path, BASE!);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, v);
    }
  }
  let res: Response;
  try {
    res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${TOKEN}` },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (err) {
    if (err instanceof Error && err.name === "TimeoutError") {
      throw new Error(`HIT API request timed out after ${TIMEOUT_MS}ms: ${url}`);
    }
    throw err;
  }
  if (!res.ok) {
    const body = await res.text();
    const snippet = body.length > 500 ? `${body.slice(0, 500)}... [truncated]` : body;
    throw new Error(`HIT API ${res.status}: ${snippet}`);
  }
  return res.json() as Promise<T>;
}

export function ticketUrl(id: number): string {
  assertConfig();
  return new URL(`/view?id=${id}`, BASE!).toString();
}
