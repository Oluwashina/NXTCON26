export const EVENT = {
  brand: 'The New Church',
  name: 'NXTCON26',
  theme: 'Knight and Bishop',
  themeDisplay: 'KNIGHT AND BISHOP',
  dateLabel: 'October 1, 2026',
  dateShort: 'October 1',
  timeLabel: '9:00 AM WAT',
  timeShort: '9AM WAT',
  /** Combined line used across the reveal and share card. */
  whenLine: 'October 1, 2026 · 9AM WAT',
  addressLines: [
    '60, Surulere Industrial Road,',
    'Opposite NNPC Filling Station,',
    'Off Adeniyi Jones, Ikeja',
  ],
  addressOneLine:
    '60, Surulere Industrial Road, Opposite NNPC Filling Station, Off Adeniyi Jones, Ikeja',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('60 Surulere Industrial Road, Off Adeniyi Jones, Ikeja, Lagos'),
  youtube: 'https://www.youtube.com/@thenewchurch',
  /** Local start time, used for the countdown and calendar file. */
  startsAt: '2026-10-01T09:00:00+01:00',
  endsAt: '2026-10-01T13:00:00+01:00',
  invitation: [
    'Come ready to think differently.',
    'Come ready to see differently.',
    'Come ready to make your move.',
  ],
} as const;
