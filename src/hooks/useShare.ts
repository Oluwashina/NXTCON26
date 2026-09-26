import { useCallback, useEffect, useRef, useState } from 'react';
import { EVENT } from '../data/event';
import { PIECES } from '../data/pieces';
import { renderResultCard } from '../lib/renderCard';
import {
  buildFullShareText,
  buildInviteMessage,
  buildWhatsAppUrl,
  copyText,
  downloadBlob,
  shareNatively,
} from '../lib/share';
import type { PieceId } from '../types';

export type ShareAction = 'share' | 'whatsapp' | 'copy' | 'download' | 'invite';

/**
 * All of the sharing behaviour for a result, with transient status messages.
 * No network calls: the card is rendered locally and handed to the platform.
 */
export function useShare(piece: PieceId) {
  const [busy, setBusy] = useState<ShareAction | null>(null);
  const [status, setStatus] = useState<{ action: ShareAction; message: string } | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    [],
  );

  const flash = useCallback((action: ShareAction, message: string) => {
    setStatus({ action, message });
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus(null), 2600);
  }, []);

  const { text, url } = buildFullShareText(piece);
  const fullMessage = `${text}\n\n${url}`;

  const share = useCallback(async () => {
    setBusy('share');
    const file = await renderResultCard(piece)
      .then((blob) =>
        blob ? new File([blob], `nxtcon26-${piece}.png`, { type: 'image/png' }) : null,
      )
      .catch(() => null);

    const outcome = await shareNatively({
      title: `${EVENT.name} — I am a ${PIECES[piece].name}`,
      text,
      url,
      file,
    });
    setBusy(null);

    if (outcome === 'shared') flash('share', 'Shared');
    else if (outcome === 'copied') flash('share', 'Message copied');
    else if (outcome === 'failed') flash('share', 'Could not share — try WhatsApp');
  }, [flash, piece, text, url]);

  const whatsapp = useCallback(() => {
    window.open(buildWhatsAppUrl(fullMessage), '_blank', 'noopener,noreferrer');
  }, [fullMessage]);

  const copy = useCallback(async () => {
    const ok = await copyText(fullMessage);
    flash('copy', ok ? 'Copied' : 'Copy failed');
  }, [flash, fullMessage]);

  const download = useCallback(async () => {
    setBusy('download');
    try {
      const blob = await renderResultCard(piece);
      if (blob) {
        downloadBlob(blob, `nxtcon26-${piece}-card.png`);
        flash('download', 'Card saved');
      } else {
        flash('download', 'Could not build the card');
      }
    } catch {
      flash('download', 'Could not build the card');
    } finally {
      setBusy(null);
    }
  }, [flash, piece]);

  /** Invite flow: event details rather than a personal result. */
  const invite = useCallback(async () => {
    const message = `${buildInviteMessage()}\n\n${url}`;
    const outcome = await shareNatively({
      title: `${EVENT.name} — ${EVENT.themeDisplay}`,
      text: buildInviteMessage(),
      url,
    });

    if (outcome === 'shared') {
      flash('invite', 'Invitation sent');
      return;
    }
    if (outcome === 'copied') {
      flash('invite', 'Invitation copied');
      return;
    }
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  }, [flash, url]);

  return { busy, status, share, whatsapp, copy, download, invite, message: fullMessage };
}
