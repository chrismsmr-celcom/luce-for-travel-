import { NextResponse } from "next/server";
import crypto from "node:crypto";

export async function POST(req) {
  const { sel = {}, checkin, checkout, adults, cur, total } = await req.json().catch(() => ({}));
  const p = new URLSearchParams({
    src: "luce",
    hotel: sel.hotels?.id || "", hotel_offer: sel.hotels?.offerId || "",
    flight: sel.flights?.offerId || sel.flights?.id || "",
    tour: sel.tours?.id || "",
    checkin: checkin || "", checkout: checkout || "", adults: adults || 1,
    total: Math.round(total || 0), cur: cur || "USD", ts: Date.now(),
  });
  const secret = process.env.LUVIA_SECRET;
  if (secret) p.set("sig", crypto.createHmac("sha256", secret).update(p.toString()).digest("hex"));
  const base = process.env.LUVIA_BASE_URL || "https://luviaplace.com/checkout";
  return NextResponse.json({ url: `${base}?${p}` });
}
