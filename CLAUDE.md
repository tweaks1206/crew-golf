# CLAUDE.md — Golf Side-Game App (working name: "Crew Golf")

## What we're building
A mobile-first web app (PWA) where golfers set up matches with their crew, score the round, and get automatic payouts for every match format and side bet ("junk"). No money moves through the app; it only calculates who owes whom. Everyone has lifetime stats and a running P&L against each friend.

Owner: Charles (product lead, not a full-time engineer). Explain any step that needs action on his end as numbered instructions: which site, which menu, what to paste.

## Differentiators (why this beats the 10+ existing side-bet apps)
1. **Photo scorecard → payouts.** Snap the paper card; AI reads the scores and junk, the user confirms, payouts calculate.
2. **Crew handicap.** A private handicap computed from rounds logged in the app, alongside the official GHIN index.
3. **Crew-level history.** Head-to-head records, who's up/down all-time, each player's favorite formats and stake sizes.
4. **Composable rules.** Any format + any junk + custom rules, saved as reusable "house rules" per crew.

## Stack
- Next.js (App Router, TypeScript) on Vercel; installable PWA
- Supabase: Postgres, Auth (email magic link), Realtime for live scorecards, Storage for scorecard photos
- Tailwind for UI
- Anthropic API (vision) for scorecard photo parsing
- Vitest for unit tests

## Hard rules
- The game engine is **pure TypeScript with no DB or UI imports** (`/lib/engine`). Input: course + players + handicaps + hole scores + junk events + game config. Output: per-hole results, match status, and a payout ledger.
- Every format gets unit tests with hand-calculated fixtures before it ships. Payout math errors kill trust.
- All money is stored in integer cents.
- Scores are the source of truth; results are always recomputed from scores, never stored as edited totals.
- Never claim official USGA handicaps. The crew handicap is labeled unofficial.

## Data model (first pass)
- `profiles` (id, name, ghin_number nullable, manual_index nullable, default_stakes jsonb)
- `crews` (id, name, owner_id), `crew_members` (crew_id, profile_id, role)
- `courses` (id, source, source_id, name, city, state), `tees` (course_id, name, gender, rating, slope, par), `holes` (tee_id, number, par, stroke_index, yards)
- `rounds` (id, crew_id, course_id, tee_id, date, status: live/final)
- `round_players` (round_id, profile_id, handicap_index_used, course_handicap, playing_handicap, team)
- `scores` (round_id, profile_id, hole, strokes, putts nullable)
- `junk_events` (round_id, profile_id, hole, type)
- `games` (round_id, format, config jsonb, stake_cents)
- `presses` (game_id, hole_started, initiated_by)
- `ledger` (round_id, from_profile, to_profile, amount_cents, game_id) — derived, recomputable
- `scorecard_uploads` (round_id, image_path, parsed jsonb, confirmed bool)

## Handicap math (WHS)
- Course handicap = Index × (Slope / 113) + (Course Rating − Par)
- Playing handicap = Course handicap × format allowance (configurable, e.g. 85% for four-ball)
- Strokes allocated by hole stroke index; support "off the low man"
- Score differential = (113 / Slope) × (Adjusted Gross Score − Course Rating), net double bogey cap per hole
- Crew handicap = average of best 8 of the last 20 differentials (fewer rounds: use WHS lookup table)

## Formats (engine order)
Phase 1: Individual match play · Nassau (front/back/overall, manual + auto presses at N down) · Skins (gross/net, carryovers, validation option) · 2v2 best ball match play · Stroke play / net
Phase 2: Wolf (lone wolf, blind wolf, configurable points) · Scramble (team score) · Stableford · Vegas · Nines/Sixes · Bingo Bango Bongo
Junk (any round): birdies, eagles, greenies, sandies, polies, barkies, 3-putts (snake), plus user-defined junk with a name and value

## Course data
1. Primary: OpenGolfAPI (opengolfapi.org) — open, US courses, scorecards and tees. License is ODbL: show attribution, and any data corrections we contribute must stay open. Cache courses in our own tables after first lookup.
2. Fallback: manual course entry (par, stroke index, rating/slope per tee), saved for the whole user base and editable.
3. Later: scan a course's scorecard photo to create the course.
Verify rating/slope against the physical card; flag missing stroke index.

## GHIN
No open API. USGA access is through approved developer programs (Golfer Product Access). v1: user types their Handicap Index manually (with a "last updated" date). Apply to the USGA program once there are active users.

## Scorecard photo flow
1. Upload photo → Supabase Storage
2. Server route sends the image + expected players/holes to the Anthropic API, asks for strict JSON: per-player per-hole strokes and any junk marks
3. Show a confirm grid with low-confidence cells highlighted; user fixes, then saves
4. Engine computes everything from confirmed scores

## Build phases
**Phase 0 — Setup:** repo, Next.js, Supabase project, auth, deploy to Vercel
**Phase 1 — Engine:** `/lib/engine` with Phase 1 formats + junk + ledger + debt simplification; full test suite
**Phase 2 — Core app:** profiles, crews + invite links, course search/import, round setup wizard (course → tee → players → formats → stakes, with saved defaults), live hole-by-hole scoring with Realtime, results + settle-up screen (Venmo/Cash App deep links)
**Phase 3 — History:** head-to-head P&L, crew leaderboard, player stats, crew handicap
**Phase 4 — Photo scoring** and Phase 2 formats
**Phase 5 — Monetization:** free tier, paid crew plan (~$5/mo or $40/yr per organizer); tournaments/member-guest

## First task for Claude Code
Start with Phase 0 and the Phase 1 engine. Build Nassau with auto-presses first, with tests covering: 2-player net match, 2v2 best ball, an auto press triggered at 2 down, and a halved overall. Show me the test fixtures in plain English before writing the engine so I can confirm the rules match how my group plays.
