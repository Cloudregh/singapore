import delegates from "@/data/delegates.json";
import { cards } from "@/lib/cards";
import itinerary from "@/data/itinerary.json";

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

// Every word the visitor typed must match a whole word of the delegate's name,
// so first name, last name or both all work. Only matches leave the server.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const query = norm(typeof body?.name === "string" ? body.name : "");
  if (query.length === 0 || query.some((t) => t.length < 2)) {
    return Response.json({ matches: [], itinerary: [], cards: [] });
  }
  const matches = delegates.filter((d) => {
    const words = norm(d.name);
    return query.every((t) => words.includes(t));
  });
  return Response.json({
    matches: matches.slice(0, 5).map((d) => d.name),
    itinerary: matches.length ? itinerary : [],
    cards: matches.length ? cards : [],
  });
}
