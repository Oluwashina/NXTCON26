import { EVENT } from '../data/event';
import { PIECES } from '../data/pieces';
import { PIECE_PATHS, PIECE_VIEWBOX } from '../data/pieceArt';
import type { PieceId } from '../types';

const W = 1080;
const H = 1350;

const DISPLAY = '"Bodoni Moda", Didot, "Times New Roman", serif';
const EDITORIAL = '"Cormorant Garamond", Garamond, serif';
const SANS = 'Inter, system-ui, sans-serif';

const IVORY = '#f2efe7';
const MUTED = '#8a857a';

/** Draws text with manual tracking, which is far better supported than ctx.letterSpacing. */
function trackedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  y: number,
  tracking: number,
) {
  const chars = [...text];
  const widths = chars.map((char) => ctx.measureText(char).width);
  const total = widths.reduce((sum, w) => sum + w, 0) + tracking * (chars.length - 1);

  let x = cx - total / 2;
  chars.forEach((char, index) => {
    ctx.fillText(char, x, y);
    x += widths[index] + tracking;
  });
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';

  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  });

  if (line) lines.push(line);
  return lines;
}

function hairline(ctx: CanvasRenderingContext2D, y: number, width: number, color: string) {
  const gradient = ctx.createLinearGradient(W / 2 - width / 2, y, W / 2 + width / 2, y);
  gradient.addColorStop(0, 'rgba(0,0,0,0)');
  gradient.addColorStop(0.5, color);
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(W / 2 - width / 2, y, width, 1.5);
}

function paintBackground(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#05050699';
  ctx.fillRect(0, 0, W, H);

  const base = ctx.createLinearGradient(0, 0, W * 0.6, H);
  base.addColorStop(0, '#14161a');
  base.addColorStop(0.55, '#08090b');
  base.addColorStop(1, '#000000');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, W, H);

  // Overhead key light
  const key = ctx.createRadialGradient(W / 2, -160, 60, W / 2, H * 0.42, W * 0.95);
  key.addColorStop(0, 'rgba(255,246,224,0.20)');
  key.addColorStop(0.45, 'rgba(198,161,91,0.05)');
  key.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = key;
  ctx.fillRect(0, 0, W, H);

  // Marble veins
  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = 'rgba(255,255,255,0.07)';
  [
    [-80, 240, 420, 60, 900, 430],
    [260, -60, 700, 300, 1180, 520],
    [-60, 900, 320, 1040, 880, 1180],
  ].forEach(([x1, y1, cx, cy, x2, y2]) => {
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(cx, cy, x2, y2);
    ctx.stroke();
  });
  ctx.restore();

  // Chessboard floor strip
  const cell = 84;
  const bandTop = H - cell * 3;
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, bandTop, W, H - bandTop);
  ctx.clip();
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < Math.ceil(W / cell); col += 1) {
      const light = (row + col) % 2 === 0;
      ctx.fillStyle = light ? '#cdc7b7' : '#0a0b0d';
      ctx.globalAlpha = light ? 0.16 + row * 0.07 : 0.9;
      ctx.fillRect(col * cell, bandTop + row * cell, cell, cell);
    }
  }
  ctx.restore();

  const fade = ctx.createLinearGradient(0, bandTop - 40, 0, H);
  fade.addColorStop(0, '#000000');
  fade.addColorStop(0.35, 'rgba(0,0,0,0.45)');
  fade.addColorStop(1, 'rgba(0,0,0,0.75)');
  ctx.fillStyle = fade;
  ctx.fillRect(0, bandTop - 40, W, H - bandTop + 40);

  // Vignette
  const vignette = ctx.createRadialGradient(W / 2, H * 0.4, W * 0.28, W / 2, H * 0.5, W * 0.95);
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.85)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, W, H);

  // Inner frame
  ctx.strokeStyle = 'rgba(242,239,231,0.16)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(46, 46, W - 92, H - 92);
}

function paintPiece(ctx: CanvasRenderingContext2D, piece: PieceId, top: number, height: number) {
  const scale = height / PIECE_VIEWBOX.height;
  const width = PIECE_VIEWBOX.width * scale;

  const gold = ctx.createLinearGradient(0, top, width * 0.5, top + height);
  gold.addColorStop(0, '#fff3d0');
  gold.addColorStop(0.32, '#e4c78c');
  gold.addColorStop(0.68, '#c6a15b');
  gold.addColorStop(1, '#7f5f2a');

  // Cast shadow on the floor
  ctx.save();
  ctx.translate(W / 2, top + height);
  ctx.scale(1, 0.16);
  const shadow = ctx.createRadialGradient(0, 0, 0, 0, 0, width * 0.55);
  shadow.addColorStop(0, 'rgba(0,0,0,0.8)');
  shadow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = shadow;
  ctx.beginPath();
  ctx.arc(0, 0, width * 0.55, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.translate(W / 2 - width / 2, top);
  ctx.scale(scale, scale);
  ctx.fillStyle = gold;
  ctx.shadowColor = 'rgba(228,199,140,0.35)';
  ctx.shadowBlur = 60 / scale;
  PIECE_PATHS[piece].forEach(({ d, rule }) => {
    ctx.fill(new Path2D(d), rule === 'evenodd' ? 'evenodd' : 'nonzero');
  });
  ctx.restore();
}

async function ensureFonts(): Promise<void> {
  if (typeof document === 'undefined' || !document.fonts) return;
  try {
    await Promise.all([
      document.fonts.load(`500 120px ${DISPLAY}`),
      document.fonts.load(`400 40px ${DISPLAY}`),
      document.fonts.load(`italic 300 48px ${EDITORIAL}`),
      document.fonts.load(`500 28px ${SANS}`),
      document.fonts.ready,
    ]);
  } catch {
    // Fall back to whatever is available; the layout still holds.
  }
}

/** Renders the shareable result card to a PNG blob. Entirely client-side. */
export async function renderResultCard(pieceId: PieceId): Promise<Blob | null> {
  await ensureFonts();

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const piece = PIECES[pieceId];

  paintBackground(ctx);

  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  // Header
  ctx.fillStyle = MUTED;
  ctx.font = `500 21px ${SANS}`;
  trackedText(ctx, EVENT.brand.toUpperCase(), W / 2, 132, 9);

  ctx.fillStyle = IVORY;
  ctx.font = `600 46px ${SANS}`;
  trackedText(ctx, 'NXTCON', W / 2 - 34, 196, 7);
  ctx.fillStyle = '#c6a15b';
  ctx.font = `600 46px ${DISPLAY}`;
  ctx.fillText('26', W / 2 + 92, 196);

  hairline(ctx, 236, 150, 'rgba(198,161,91,0.75)');

  // Piece
  paintPiece(ctx, pieceId, 292, 362);

  // Result
  ctx.fillStyle = MUTED;
  ctx.font = `500 22px ${SANS}`;
  trackedText(ctx, 'I AM A', W / 2, 752, 12);

  ctx.fillStyle = IVORY;
  ctx.font = `500 152px ${DISPLAY}`;
  trackedText(ctx, piece.name.toUpperCase(), W / 2, 884, 2);

  ctx.fillStyle = '#c6a15b';
  ctx.font = `500 26px ${SANS}`;
  trackedText(ctx, piece.title.toUpperCase(), W / 2, 938, 14);

  hairline(ctx, 990, 260, 'rgba(242,239,231,0.28)');

  // Quote
  ctx.fillStyle = IVORY;
  ctx.font = `italic 400 48px ${EDITORIAL}`;
  const quote = wrap(ctx, `“${piece.shareLine}”`, W - 300);
  quote.forEach((line, index) => {
    const width = ctx.measureText(line).width;
    ctx.fillText(line, W / 2 - width / 2, 1062 + index * 58);
  });

  // Event footer
  ctx.fillStyle = IVORY;
  ctx.font = `500 34px ${DISPLAY}`;
  trackedText(ctx, EVENT.themeDisplay, W / 2, 1196, 9);

  ctx.fillStyle = MUTED;
  ctx.font = `500 21px ${SANS}`;
  trackedText(
    ctx,
    `${EVENT.dateShort.toUpperCase()} · ${EVENT.timeShort}`,
    W / 2,
    1240,
    10,
  );

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png', 0.98));
}
