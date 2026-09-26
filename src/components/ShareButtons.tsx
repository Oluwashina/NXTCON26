import { useShare } from '../hooks/useShare';
import { cn } from '../lib/cn';
import type { PieceId } from '../types';
import { Button } from './ui/Button';
import { CopyIcon, DownloadIcon, ShareIcon, WhatsAppIcon } from './ui/icons';

interface ShareButtonsProps {
  piece: PieceId;
  className?: string;
}

export function ShareButtons({ piece, className }: ShareButtonsProps) {
  const { busy, status, share, whatsapp, copy, download } = useShare(piece);

  return (
    <div className={cn('w-full', className)}>
      <div className="grid grid-cols-2 gap-2.5">
        <Button
          variant="gold"
          size="md"
          fullWidth
          onClick={share}
          disabled={busy === 'share'}
          icon={<ShareIcon />}
          className="col-span-2"
        >
          {busy === 'share' ? 'Preparing…' : 'Share my result'}
        </Button>

        <Button variant="outline" size="md" fullWidth onClick={whatsapp} icon={<WhatsAppIcon />}>
          WhatsApp
        </Button>

        <Button variant="outline" size="md" fullWidth onClick={copy} icon={<CopyIcon />}>
          {status?.action === 'copy' ? status.message : 'Copy message'}
        </Button>

        <Button
          variant="outline"
          size="md"
          fullWidth
          onClick={download}
          disabled={busy === 'download'}
          icon={<DownloadIcon />}
          className="col-span-2"
        >
          {busy === 'download' ? 'Rendering card…' : 'Save result card'}
        </Button>
      </div>

      <p
        aria-live="polite"
        className={cn(
          'eyebrow mt-4 text-center text-gold/80 transition-opacity duration-500',
          status && status.action !== 'copy' ? 'opacity-100' : 'opacity-0',
        )}
      >
        {status && status.action !== 'copy' ? status.message : '\u00a0'}
      </p>
    </div>
  );
}
