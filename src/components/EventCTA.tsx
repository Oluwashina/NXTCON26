import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { EVENT } from '../data/event';
import { useShare } from '../hooks/useShare';
import { buildCalendarFile, downloadBlob } from '../lib/share';
import { cn } from '../lib/cn';
import type { PieceId } from '../types';
import { Button } from './ui/Button';
import { CalendarIcon, PinIcon, ShareIcon, UsersIcon } from './ui/icons';

interface EventCTAProps {
  piece: PieceId;
  className?: string;
}

/** The three closing actions, with event details expanding in place. */
export function EventCTA({ piece, className }: EventCTAProps) {
  const [open, setOpen] = useState(false);
  const { busy, status, share, invite } = useShare(piece);

  return (
    <div className={cn('w-full', className)}>
      <div className="grid gap-2.5 sm:grid-cols-2">
        <Button
          variant="gold"
          size="lg"
          fullWidth
          onClick={() => setOpen((value) => !value)}
          className="sm:col-span-2"
        >
          {open ? 'Hide event details' : 'Get event details'}
        </Button>

        <Button variant="outline" size="md" fullWidth onClick={invite} icon={<UsersIcon />}>
          {status?.action === 'invite' ? status.message : 'Invite someone'}
        </Button>

        <Button
          variant="outline"
          size="md"
          fullWidth
          onClick={share}
          disabled={busy === 'share'}
          icon={<ShareIcon />}
        >
          {busy === 'share' ? 'Preparing…' : 'Share my result'}
        </Button>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="glass-panel mt-3 p-6 sm:p-8">
              <dl className="space-y-6">
                <Detail label="Gathering">
                  {EVENT.name} &mdash; {EVENT.themeDisplay}
                </Detail>
                <Detail label="When">
                  {EVENT.dateLabel}
                  <br />
                  {EVENT.timeLabel}
                </Detail>
                <Detail label="Where">
                  {EVENT.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </Detail>
                <Detail label="Hosted by">{EVENT.brand}</Detail>
              </dl>

              <div className="mt-8 grid gap-2.5 sm:grid-cols-2">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  icon={<CalendarIcon />}
                  onClick={() => downloadBlob(buildCalendarFile(), 'nxtcon26.ics')}
                >
                  Add to calendar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  icon={<PinIcon />}
                  onClick={() => window.open(EVENT.mapsUrl, '_blank', 'noopener,noreferrer')}
                >
                  Open in maps
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5 sm:grid-cols-[7rem_1fr] sm:gap-4">
      <dt className="eyebrow pt-[0.2rem] text-ivory/30">{label}</dt>
      <dd className="font-sans text-[0.82rem] font-light leading-relaxed text-ivory-200">
        {children}
      </dd>
    </div>
  );
}
