# What's Your Move? · NXTCON26

An interactive personality experience for **NXTCON26** — *Knight and Bishop* — by The New Church.

This is not a typical event landing page. It is a short cinematic quiz that asks: **what's your move?** Visitors discover the chess piece that reflects how they move, think and lead, then get invited to the conference.

**Event:** 1 October 2026 · 9:00 AM WAT  
**Venue:** 60, Surulere Industrial Road, Opposite NNPC Filling Station, Off Adeniyi Jones, Ikeja

## The idea

Every person has a different role, perspective and way of moving. The experience uses six chess pieces as a language for that:

| Piece | Archetype | Strength | The move |
| --- | --- | --- | --- |
| Pawn | The Builder | Consistency | Start |
| Knight | The Unconventional | Perspective | Think differently |
| Bishop | The Visionary | Vision | See beyond |
| Rook | The Foundation | Stability | Stand firm |
| Queen | The Influencer | Range | Create impact |
| King | The Leader | Purpose | Lead with purpose |

## How it plays

1. **Intro** — A dark, hall-like opening. Event details stay hidden on purpose.
2. **The board** — An interactive chessboard. Each piece moves differently.
3. **Seven moves** — One scenario at a time. Same questions, same order, every time.
4. **Reveal** — A short “calculating your move” beat, then the piece.
5. **Reflection** — “What move have you been postponing?” Typed locally. Never saved.
6. **Invitation** — NXTCON26 details, countdown, and ways to invite or share.

Results can be shared on WhatsApp or Instagram, copied as text, or saved as a card. A link like `?piece=knight` opens that result directly — nothing is stored on a server.

## How scoring works

All questions and answers live in `src/data/questions.ts`. Each answer awards one point to one piece. The highest score wins. Ties are broken deterministically (last move, then earliest commitment, then a fixed piece order) so the same answers always produce the same piece.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build    # production build
npm run preview  # serve the built files
```

Fully client-side. React, TypeScript, Tailwind CSS. No backend, no database, no accounts.
