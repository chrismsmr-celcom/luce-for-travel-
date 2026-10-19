const BASE = "https://api.liteapi.travel/v3.0";

export async function lite(path, { method = "GET", query, body } = {}) {
  const key = process.env.LITEAPI_KEY;
  if (!key) throw new Error("NO_KEY");
  const url = new URL(BASE + path);
  Object.entries(query || {}).forEach(([k, v]) => v != null && v !== "" && url.searchParams.set(k, v));
  const r = await fetch(url, {
    method,
    headers: { "X-API-Key": key, accept: "application/json", "content-type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!r.ok) throw new Error(`LiteAPI ${r.status} ${path}: ${(await r.text()).slice(0, 200)}`);
  return r.json();
}

export const nightsBetween = (a, b) => Math.max(1, Math.round((new Date(b) - new Date(a)) / 864e5));
const num = (v) => (v == null ? 0 : Number(v));

/* IATA des villes principales (vols). Complétez selon vos besoins. */
export const IATA = { guangzhou: "CAN", paris: "PAR", dubai: "DXB", kinshasa: "FIH", istanbul: "IST", lisbon: "LIS", cairo: "CAI", rome: "ROM", bangkok: "BKK", london: "LON" };

/* ---------- Hôtels : /data/hotels puis /hotels/rates ---------- */
export async function hotels(q) {
  const list = await lite("/data/hotels", { query: { countryCode: q.cc, cityName: q.city, limit: 15 } });
  const base = list.data || [];
  if (!base.length) return [];
  const nights = nightsBetween(q.checkin, q.checkout);
  const rates = await lite("/hotels/rates", {
    method: "POST",
    body: {
      hotelIds: base.map((h) => h.id),
      occupancies: [{ adults: +q.adults || 1 }],
      currency: q.cur,
      guestNationality: process.env.DEFAULT_NATIONALITY || "CD",
      checkin: q.checkin,
      checkout: q.checkout,
    },
  });
  const byId = Object.fromEntries(base.map((h) => [h.id, h]));
  return (rates.data || [])
    .map((r) => {
      const h = byId[r.hotelId] || {};
      const room = (r.roomTypes || [])[0];
      const total = num(room?.rates?.[0]?.retailRate?.total?.[0]?.amount);
      if (!total) return null;
      return {
        id: r.hotelId, type: "hotels", name: h.name || r.hotelId, offerId: room.offerId,
        rating: num(h.rating) || num(h.stars), img: h.main_photo || h.thumbnail || null,
        sub: [h.address, h.city].filter(Boolean).join(", "), total, nights,
      };
    })
    .filter(Boolean);
}

/* ---------- Vols : /flights/rates (vérifiez le corps exact dans la doc) ---------- */
export async function flights(q) {
  const dest = IATA[q.city.toLowerCase()];
  if (!q.org || !dest) return [];
  const r = await lite("/flights/rates", {
    method: "POST",
    body: { origin: q.org, destination: dest, departureDate: q.checkin, returnDate: q.checkout, adults: +q.adults || 1, currency: q.cur },
  });
  return (r.data || []).slice(0, 8).map((f, i) => ({
    id: f.offerId || f.id || `fl${i}`, type: "flights", offerId: f.offerId || f.id,
    name: `${q.org} → ${dest}`, sub: f.airline || f.airlineName || "Compagnie", rating: 0,
    total: num(f.totalPrice ?? f.price?.total ?? f.total),
  })).filter((x) => x.total);
}

/* ---------- Activités : /experiences/tours (vérifiez les paramètres dans la doc) ---------- */
export async function tours(q) {
  const r = await lite("/experiences/tours", { query: { destination: q.city, currency: q.cur, limit: 8 } });
  return (r.data || r.tours || []).map((t, i) => ({
    id: String(t.id ?? i), type: "tours", name: t.title || t.name, sub: t.duration || "Activité",
    rating: num(t.rating), img: t.image || t.thumbnail || null,
    total: num(t.price?.amount ?? t.price ?? t.fromPrice) * (+q.adults || 1),
  })).filter((x) => x.total);
}

/* ---------- Données de démo (si pas de clé ou erreur API) ---------- */
export function mock(type, q) {
  const n = nightsBetween(q.checkin, q.checkout), p = +q.adults || 1;
  const H = [["Canton Trade Hotel", 4.4, 62, "Yuexiu"], ["Tianhe Business Inn", 4.1, 48, "Tianhe"], ["Pearl River Suites", 4.7, 118, "Haizhu"], ["Baiyun Express", 3.9, 35, "Baiyun"], ["Riverside Grand", 4.5, 96, "Liwan"], ["Metro Stay", 4.0, 41, "Panyu"]];
  if (type === "hotels") return H.map(([name, rating, pn, a], i) => ({ id: "demo-h" + i, type, name, rating, sub: `${a}, ${q.city}`, total: pn * n, nights: n, offerId: "demo" }));
  if (type === "flights") return [["Ethiopian", 880], ["Emirates", 1120], ["Turkish", 960]].map(([a, pr], i) => ({ id: "demo-f" + i, type, name: `${q.org || "FIH"} → ${q.city}`, sub: a + " · 1 escale", rating: 0, total: pr * p }));
  return [["Marchés de gros guidés", 45, 4.6], ["Croisière rivière", 28, 4.5], ["Transfert privé", 30, 4.3]].map(([name, pr, rating], i) => ({ id: "demo-t" + i, type, name, sub: "Activité", rating, total: pr * p }));
}
