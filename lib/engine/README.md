# Game engine

Pure TypeScript. No imports from React, Next.js, Supabase, or anything that
touches the network or database. Everything here must run under `npm test`.

Input: course + players + handicaps + hole scores + junk events + game config.
Output: per-hole results, match status, and a payout ledger in integer cents.

Formats are added one at a time, each with hand-calculated fixtures first.
The Nassau fixtures awaiting sign-off live in `docs/nassau-fixtures.md`.
