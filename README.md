# Luce (Next.js)

Interface mobile d’abord, sans icônes. Le voyage se décrit en une phrase ; Luce cherche (LiteAPI), propose un plan, puis renvoie vers Luviaplace par deep link signé.

- `app/page.js` : interface · `app/globals.css` : design
- `app/api/search/route.js` : hôtels, vols, activités (repli démo si pas de clé)
- `app/api/deeplink/route.js` : lien Luviaplace signé (HMAC)
- `lib/liteapi.js` : appels LiteAPI (vérifiez les corps de `flights` et `tours` dans la doc)

## Lancer
npm install && cp .env.example .env.local && npm run dev

## Déployer
Poussez sur GitHub, importez dans Vercel (Next.js détecté), ajoutez LITEAPI_KEY, LUVIA_BASE_URL, LUVIA_SECRET, DEFAULT_NATIONALITY.

