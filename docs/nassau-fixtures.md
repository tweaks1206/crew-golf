# Nassau test fixtures (for sign-off)

These are the four scenarios the Nassau engine will be tested against. Every
number below was worked out by hand. Once you confirm the rules match how your
group plays (see **Questions** at the bottom), each scenario becomes a unit
test, and the engine must reproduce these exact payouts.

## The basics these fixtures assume

- A Nassau is **three separate bets**: front 9, back 9, and overall 18. Each is
  scored as match play: win a hole, go 1 up.
- Every bet in these fixtures is **$5** ("5-5-5").
- A bet that ends tied (halved) pays nothing. Nothing carries over.
- Strokes are given **off the low man at 100%**: the lowest course handicap
  plays at scratch and everyone else gets the difference, one stroke per hole
  starting at stroke index 1.
- A nine can be decided early (for example "2 & 1"), but the remaining holes
  still count toward the overall.
- Course handicaps are given directly to keep the math readable. (The engine
  will also compute them from Index, Slope and Rating; that gets its own tests.)

## The test course

| Hole | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Par | 4 | 4 | 3 | 5 | 4 | 4 | 3 | 4 | 5 | 4 | 3 | 5 | 4 | 4 | 4 | 3 | 5 | 4 |
| Stroke index | 7 | 3 | 17 | 1 | 11 | 5 | 15 | 9 | 13 | 8 | 18 | 2 | 10 | 4 | 12 | 16 | 6 | 14 |

Par 36 out, 36 in. The holes by difficulty: SI 1 is hole 4, SI 2 is hole 12,
SI 3 is hole 2, SI 4 is hole 14, SI 5 is hole 6, SI 6 is hole 17, and so on.

---

## Fixture 1: Two-player net match

**Alex** (course handicap 8) vs **Ben** (course handicap 14). Ben gets
6 strokes, on SI 1–6: holes **2, 4, 6, 12, 14, 17** (marked \*). No presses.

| Hole | 1 | 2\* | 3 | 4\* | 5 | 6\* | 7 | 8 | 9 | 10 | 11 | 12\* | 13 | 14\* | 15 | 16 | 17\* | 18 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Alex | 4 | 4 | 3 | 5 | 5 | 4 | 3 | 4 | 5 | 4 | 4 | 5 | 4 | 5 | 4 | 3 | 5 | 4 |
| Ben gross | 5 | 5 | 3 | 5 | 4 | 5 | 4 | 5 | 5 | 4 | 3 | 6 | 5 | 5 | 4 | 4 | 6 | 4 |
| Ben net | 5 | 4 | 3 | 4 | 4 | 4 | 4 | 5 | 5 | 4 | 3 | 5 | 5 | 4 | 4 | 4 | 5 | 4 |
| Hole won by | Alex | – | – | Ben | Ben | – | Alex | Alex | – | – | Ben | – | Alex | Ben | – | Alex | – | – |
| Match (Alex) | 1 up | 1 up | 1 up | AS | 1 dn | 1 dn | AS | 1 up | 1 up | AS | 1 dn | 1 dn | AS | 1 dn | 1 dn | AS | AS | AS |

The last row is the running score of each nine from Alex's side (it resets at
hole 10). "AS" means all square.

- **Front:** Alex won holes 1, 7, 8; Ben won 4, 5. **Alex wins 1 up. +$5 Alex.**
- **Back:** Alex won 13, 16; Ben won 11, 14. **Halved. $0.**
- **Overall:** Alex 5 holes, Ben 4. **Alex wins 1 up. +$5 Alex.**

**Payout: Ben pays Alex $10.**

---

## Fixture 2: 2v2 best ball

**Team A:** Alex (8) and Chris (12). **Team B:** Ben (14) and Dan (20).
Off the low man (Alex): Chris gets 4, Ben 6, Dan 12.

- Chris strokes (SI 1–4): holes 2, 4, 12, 14
- Ben strokes (SI 1–6): holes 2, 4, 6, 12, 14, 17
- Dan strokes (SI 1–12): holes 1, 2, 4, 5, 6, 8, 10, 12, 13, 14, 15, 17

Each team's score on a hole is its better net score. Gross scores, with net in
brackets where a stroke applies. The Match column is Team A's standing on
the current nine (it resets at hole 10):

| Hole | Par | Alex | Chris | Ben | Dan | A best | B best | Won by | Match (A) |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 4 | 4 | 5 | 5 | 5 (4) | 4 | 4 | – | AS |
| 2 | 4 | 5 | 5 (4) | 5 (4) | 6 (5) | 4 | 4 | – | AS |
| 3 | 3 | 3 | 4 | 4 | 4 | 3 | 4 | A | 1 up |
| 4 | 5 | 5 | 6 (5) | 5 (4) | 7 (6) | 5 | 4 | B | AS |
| 5 | 4 | 4 | 4 | 5 | 5 (4) | 4 | 4 | – | AS |
| 6 | 4 | 5 | 4 | 5 (4) | 6 (5) | 4 | 4 | – | AS |
| 7 | 3 | 3 | 3 | 4 | 4 | 3 | 4 | A | 1 up |
| 8 | 4 | 4 | 5 | 4 | 5 (4) | 4 | 4 | – | 1 up |
| 9 | 5 | 5 | 4 | 5 | 6 | 4 | 5 | A | 2 up |
| 10 | 4 | 4 | 5 | 4 | 4 (3) | 4 | 3 | B | 1 dn |
| 11 | 3 | 3 | 3 | 3 | 4 | 3 | 3 | – | 1 dn |
| 12 | 5 | 5 | 6 (5) | 5 (4) | 6 (5) | 5 | 4 | B | 2 dn |
| 13 | 4 | 4 | 4 | 5 | 5 (4) | 4 | 4 | – | 2 dn |
| 14 | 4 | 4 | 5 (4) | 5 (4) | 6 (5) | 4 | 4 | – | 2 dn |
| 15 | 4 | 5 | 4 | 4 | 5 (4) | 4 | 4 | – | 2 dn |
| 16 | 3 | 3 | 4 | 3 | 3 | 3 | 3 | – | 2 dn |
| 17 | 5 | 4 | 5 | 5 (4) | 6 (5) | 4 | 4 | – | 2 dn (back closed out) |
| 18 | 4 | 4 | 5 | 3 | 5 | 4 | 3 | B | 3 dn |

- **Front:** Team A won 3, 7, 9; Team B won 4. **Team A wins 2 up.**
- **Back:** Team B won 10, 12, 18. Team B was 2 up with 2 to play after 16 and
  halved 17, so **Team B wins the back 2 & 1.** Hole 18 still counts for the
  overall.
- **Overall:** Team A 3 holes, Team B 4. **Team B wins 1 up.**

Team B wins two bets, Team A wins one, so Team B is up one bet net.

**Payout: each Team A player owes $5 net and each Team B player collects $5
net.** Settled up, that's as simple as Alex pays Ben $5 and Chris pays Dan $5.
(See question 3 on how the money is split.)

No presses in this fixture: no side was ever 2 down on the front, and on the
back Team A only reached 2 down at hole 12, which would trigger a press if
presses were on. Presses get their own fixture next.

---

## Fixture 3: Auto press at 2 down

**Alex** vs **Ben**, both course handicap 10, so no strokes. Auto press at
2 down. Every hole is a par by both players except these:

| Hole | Par | Alex | Ben | Won by |
|---|---|---|---|---|
| 1 | 4 | 3 | 4 | Alex |
| 3 | 3 | 2 | 3 | Alex |
| 4 | 5 | 6 | 5 | Ben |
| 10 | 4 | 5 | 4 | Ben |
| 18 | 4 | 3 | 4 | Alex |

Running score of the front, from Alex's side:

| Hole | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|
| Front (original) | 1 up | 1 up | **2 up** | 1 up | 1 up | 1 up | 1 up | 1 up | 1 up |
| Front press (starts hole 4) | | | | 1 dn | 1 dn | 1 dn | 1 dn | 1 dn | 1 dn |

- After hole 3 Ben is **2 down**, so a **press starts automatically on hole 4**
  and runs through hole 9. It's a new $5 bet on holes 4–9 only.
- **Front original:** Alex wins 1 up. **+$5 Alex.**
- **Front press:** Ben won hole 4, everything else halved. **Ben wins 1 up.
  +$5 Ben.** The front washes.
- **Back:** Ben won 10, Alex won 18. Nobody got 2 down, so no press. **Halved.
  $0.**
- **Overall:** Alex won 1, 3, 18; Ben won 4, 10. **Alex wins 1 up. +$5 Alex.**

**Payout: Ben pays Alex $5.**

If your group also presses the overall, Ben's 2 down after hole 3 would also
start an **overall press on hole 4 through 18**. From hole 4 on, Ben won 4 and
10 and Alex won 18, so Ben wins that press 1 up (+$5 Ben) and the **match comes
out square, $0**. (See question 5.)

---

## Fixture 4: Halved overall

Same players and scores as Fixture 1, with one change on **hole 18**: Alex
makes 5 and Ben makes 4 (no stroke on 18), so **Ben wins 18**.

- **Front:** unchanged. **Alex wins 1 up. +$5 Alex.**
- **Back:** Alex won 13, 16; Ben won 11, 14, 18. **Ben wins 1 up. +$5 Ben.**
- **Overall:** Alex 5 holes, Ben 5 holes. **Halved. $0.**

**Payout: nobody owes anything.**

---

## Questions

The engine will take each of these as a setting, but I need to know your
group's default. My guess is in brackets.

1. **Stakes:** is each of the three bets the same amount, or do you ever play
   something like $5 front, $5 back, $10 overall? [Same, but configurable.]
2. **Strokes in 2v2:** full difference off the low man (100%), or a reduced
   allowance like 85% or 90%? [100% off the low man.]
3. **2v2 money:** when a team loses a $5 bet, does each loser pay $5 (so $10
   moves between teams)? And who pays whom: fixed partners (Alex to Ben, Chris
   to Dan) or split evenly ($2.50 to each winner)? [Each loser pays $5, split
   evenly. The net result is the same; it only changes the settle-up lines.]
4. **Press on a press:** if the press itself gets to 2 down, does that start
   another press? [Yes: whenever the most recent bet on a nine reaches 2 down,
   a new press starts on the next hole.]
5. **Overall presses:** do auto presses apply to the overall 18 too, or only
   the front and back? [Front and back only.]
6. **Late presses:** if someone goes 2 down after hole 8, does a one-hole press
   on 9 still happen? [Yes.]
7. **Manual presses:** can the player who's down press any time, and does the
   other side have to accept? [Any time, automatically accepted.]
8. **Ties:** a halved bet pays nothing and doesn't carry over. [Correct?]
