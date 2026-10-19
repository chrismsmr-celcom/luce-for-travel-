import { NextResponse } from "next/server";
import * as L from "../../../lib/liteapi.js";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const str = (d) => ({ type: "string", description: d });
const TOOLS = [
  { name: "search_hotels", description: "Cherche des hôtels. Renvoie le prix total du séjour.",
    input_schema: { type: "object", required: ["city", "country_code", "checkin", "checkout"],
      properties: { city: str("Ville"), country_code: str("Code pays ISO-2, ex. CN"), checkin: str("YYYY-MM-DD"), checkout: str("YYYY-MM-DD"), adults: { type: "integer" } } } },
  { name: "search_flights", description: "Cherche des vols aller-retour. Renvoie le prix total pour tous les voyageurs.",
    input_schema: { type: "object", required: ["origin_iata", "city", "checkin", "checkout"],
      properties: { origin_iata: str("Code IATA de départ, ex. FIH"), city: str("Ville d’arrivée"), checkin: str("YYYY-MM-DD"), checkout: str("YYYY-MM-DD"), adults: { type: "integer" } } } },
  { name: "search_tours", description: "Cherche des activités et transferts dans une ville.",
    input_schema: { type: "object", required: ["city"], properties: { city: str("Ville"), adults: { type: "integer" } } } },
  { name: "propose_plan", description: "À appeler une seule fois, à la fin. N’utilise que des ids renvoyés par les recherches.",
    input_schema: { type: "object", required: ["summary"],
      properties: { hotel_id: str("id hôtel"), flight_id: str("id vol"), tour_id: str("id activité"),
        budget: { type: "number", description: "Budget total, seulement si le client l’a donné" },
        summary: str("2 phrases maximum, en français, ce que Luce a préparé"),
        reasons: { type: "array", items: { type: "string" }, description: "Une raison courte par choix" },
        risks: { type: "array", items: { type: "string" }, description: "Points à vérifier avant de payer" } } } },
];

const system = (today, org, cur) => `Tu es Luce, agent de voyage. Le client décrit son objectif en une phrase.
Date du jour : ${today}. Aéroport de départ par défaut : ${org}. Devise : ${cur}.
Déduis destination, dates (sans dates : départ dans 3 semaines, durée demandée ou 5 nuits), nombre de voyageurs (1 par défaut) et budget.
N’invente jamais de budget : s’il manque, choisis le meilleur rapport qualité/prix.
Cherche hôtels, vols et activités utiles à l’objectif, compare, puis appelle propose_plan une seule fois.
Règles : n’invente aucune offre, aucun prix, aucune exigence de visa ; pour le visa, demande seulement de vérifier auprès de l’ambassade ou du consulat.
Tu ne réserves et ne paies rien : le client valide, puis paie sur Luviaplace. Réponds en français simple.`;

// Format OpenAI (compatible DeepSeek). Pour changer de fournisseur : AI_BASE_URL, AI_API_KEY, AI_MODEL.
const OAI_TOOLS = TOOLS.map((t) => ({ type: "function", function: { name: t.name, description: t.description, parameters: t.input_schema } }));
const AI_KEY = () => process.env.DEEPSEEK_API_KEY || process.env.AI_API_KEY;

async function llm(messages) {
  const base = process.env.AI_BASE_URL || "https://api.deepseek.com";
  const r = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${AI_KEY()}`, "content-type": "application/json" },
    body: JSON.stringify({ model: process.env.DEEPSEEK_MODEL || process.env.AI_MODEL || "deepseek-v4-flash", messages, tools: OAI_TOOLS, max_tokens: 1500, temperature: 0.3,
      // V4 : réflexion désactivée par défaut (plus rapide, moins cher). DEEPSEEK_THINKING=enabled pour l’activer.
      thinking: { type: process.env.DEEPSEEK_THINKING === "enabled" ? "enabled" : "disabled" } }),
  });
  if (!r.ok) throw new Error(`LLM ${r.status}: ${(await r.text()).slice(0, 160)}`);
  return (await r.json()).choices[0].message;
}

export async function POST(req) {
  const { message = "", org = "FIH", cur = "USD" } = await req.json().catch(() => ({}));
  if (message.trim().length < 5 || message.length > 600) return NextResponse.json({ error: "Message invalide" }, { status: 400 });
  if (!AI_KEY()) return NextResponse.json({ error: "NO_AI_KEY" }, { status: 503 });

  const store = { hotels: [], flights: [], tours: [] };
  let demo = false, params = null, plan = null;
  const trace = [];

  const search = async (type, q) => {
    let items;
    try { items = await L[type](q); } catch { demo = true; items = L.mock(type, q); }
    for (const x of items) if (!store[type].some((o) => String(o.id) === String(x.id))) store[type].push(x);
    return { currency: cur, results: items.slice(0, 8).map((x) => ({ id: x.id, name: x.name, rating: x.rating, total: Math.round(x.total), info: x.sub })) };
  };

  async function runTool(u) {
    const i = u.input || {};
    const base = { adults: String(i.adults || 1), cur };
    if (u.name === "search_hotels") {
      params = { dest: `${i.city}, ${i.country_code}`, d1: i.checkin, d2: i.checkout, pax: i.adults || 1 };
      trace.push(`Hôtels à ${i.city}`);
      return search("hotels", { ...base, city: i.city, cc: i.country_code, checkin: i.checkin, checkout: i.checkout });
    }
    if (u.name === "search_flights") {
      if (i.origin_iata) params = { ...params, org: i.origin_iata.toUpperCase() };
      trace.push(`Vols ${i.origin_iata} vers ${i.city}`);
      return search("flights", { ...base, org: i.origin_iata, city: i.city, checkin: i.checkin, checkout: i.checkout });
    }
    if (u.name === "search_tours") {
      trace.push(`Activités à ${i.city}`);
      return search("tours", { ...base, city: i.city });
    }
    if (u.name === "propose_plan") {
      const find = (t, id) => store[t].find((x) => String(x.id) === String(id));
      const sel = {};
      const h = find("hotels", i.hotel_id), f = find("flights", i.flight_id), t = find("tours", i.tour_id);
      if (h) sel.hotels = h; if (f) sel.flights = f; if (t) sel.tours = t;
      if (i.budget > 0) params = { ...params, budget: i.budget };
      plan = { sel, summary: i.summary, reasons: i.reasons || [], risks: i.risks || [] };
      return "Plan enregistré.";
    }
    return "Outil inconnu.";
  }

  const today = new Date().toISOString().slice(0, 10);
  const messages = [{ role: "system", content: system(today, org, cur) }, { role: "user", content: message }];
  try {
    for (let n = 0; n < 7 && !plan; n++) {
      const msg = await llm(messages);
      messages.push({ role: "assistant", content: msg.content || "", tool_calls: msg.tool_calls, ...(msg.reasoning_content ? { reasoning_content: msg.reasoning_content } : {}) });
      if (!msg.tool_calls?.length) break;
      for (const call of msg.tool_calls) {
        let c;
        try {
          const input = JSON.parse(call.function.arguments || "{}");
          c = await runTool({ name: call.function.name, input });
        } catch (e) { c = "Erreur : " + e.message; }
        messages.push({ role: "tool", tool_call_id: call.id, content: typeof c === "string" ? c : JSON.stringify(c) });
      }
    }
  } catch (e) {
    console.error("[luce/agent]", e.message);
    return NextResponse.json({ error: "AI_ERROR", detail: e.message }, { status: 502 });
  }
  return NextResponse.json({ demo, params, results: store, plan, trace });
}
