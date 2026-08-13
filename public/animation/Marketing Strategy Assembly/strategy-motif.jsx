// Marketing Strategy motif — 5 pieces interlocking into one complete shape.
const { CompositionStage, useComposition, animate, Easing } = window;

const BONE = '#EDEAE2';
const BLUE = '#0028FA';
const INK = '#0B0B0C';
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

const S = 420;                 // assembled square
const OX = 600 - S / 2;        // square origin in stage coords
const OY = 400 - S / 2;

// One quadrant, rotated 4x about the square's centre. Knob out on one
// internal edge, socket in on the other, so rotations interlock.
const QUAD = 'M 0,18 A 18,18 0 0 1 18,0 H 210 V 96 A 22,22 0 1 1 210,136 V 146 '
  + 'A 64,64 0 0 0 146,210 H 136 A 22,22 0 1 0 96,210 H 0 Z';

// Three motion helpers — nothing else eases.
const MOTION = {
  lock: (from, to, start, end) => animate({ from, to, start, end, ease: Easing.easeOutExpo }),
  drift: (from, to, start, end) => animate({ from, to, start, end, ease: Easing.easeInOutCubic }),
  pop: (from, to, start, end) => animate({ from, to, start, end, ease: Easing.easeOutCubic }),
};

function pieces(labels) {
  return [
    { rot: 0, lx: 100, ly: 66, sx: -300, sy: -150, label: labels[0] },
    { rot: 90, lx: 320, ly: 66, sx: 305, sy: -158, label: labels[1] },
    { rot: 180, lx: 320, ly: 356, sx: 298, sy: 156, label: labels[2] },
    { rot: 270, lx: 100, ly: 356, sx: -296, sy: 162, label: labels[3] },
  ];
}

function Motif(props) {
  const { T, CUES, authoredTotal } = useComposition();
  const accent = props.accent || BLUE;
  const labels = [
    props.label1 || 'Positioning',
    props.label2 || 'ICP',
    props.label3 || 'Competitor research',
    props.label4 || 'Audit',
    props.label5 || 'Messaging',
  ];

  const A = CUES.Assemble, L = CUES.Lock, RS = CUES.Reset;
  const RE = authoredTotal;
  const STEP = 0.95, RUN = 1.05;

  const item = (i, sx, sy, start, hidden) => {
    const end = start + RUN;
    const f = MOTION.lock(1, 0, start, end)(T) + MOTION.drift(0, 1, RS + i * 0.05, RE - 0.05)(T);
    const fc = Math.max(0, Math.min(1, f));
    const settle = MOTION.pop(1.014, 1, end, end + 0.26)(T) * (T > end - 0.001 ? 1 : 0);
    return {
      dx: sx * fc, dy: sy * fc,
      op: hidden ? Math.max(0, 1 - fc * 1.6) : 0.16 + 0.84 * (1 - fc),
      scale: T >= end && T <= end + 0.3 ? settle : 1,
      flash: MOTION.pop(0.5, 0, end, end + 0.4)(T) * (T >= end ? 1 : 0),
    };
  };

  const quads = pieces(labels).map((p, i) => ({ ...p, ...item(i, p.sx, p.sy, A + i * STEP) }));
  const centre = item(4, 0, 470, L, true);

  const glowIn = MOTION.pop(0, 0.75, L + 0.6, L + 1.0)(T);
  const glowOut = MOTION.drift(0, 1, L + 1.0, L + 1.9)(T);
  const breathe = 0.22 + 0.06 * Math.sin((T - L) * 1.9);
  const glowFade = MOTION.drift(1, 0, RS, RS + 0.6)(T);
  const glow = Math.max(0, (glowIn - glowOut * (glowIn - breathe)) * glowFade);

  const tickIn = MOTION.pop(0, 1, L + 0.7, L + 1.05)(T);
  const tickOut = MOTION.drift(1, 0, RS, RS + 0.45)(T);
  const tick = tickIn * tickOut;

  const pieceStyle = { fill: '#FFFFFF', stroke: 'rgba(11,11,12,0.10)', strokeWidth: 1.25 };

  const tf = (p) => `translate(${p.dx.toFixed(2)} ${p.dy.toFixed(2)}) `
    + `translate(${S / 2} ${S / 2}) scale(${p.scale.toFixed(4)}) translate(${-S / 2} ${-S / 2})`;

  return (
    <svg width={1200} height={800} viewBox="0 0 1200 800" style={{ display: 'block', background: BONE }}>
      <defs>
        <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="26" floodColor="#1B1A16" floodOpacity="0.10" />
        </filter>
        <filter id="pieceShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="9" floodColor="#1B1A16" floodOpacity="0.12" />
        </filter>
        <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>


      <g transform={`translate(${OX} ${OY})`}>
        {/* completion glow */}
        <g opacity={glow.toFixed(3)}>
          <rect x="-6" y="-6" width={S + 12} height={S + 12} rx="26" fill="none"
            stroke={accent} strokeWidth="10" filter="url(#soft)" />
          <rect x="0" y="0" width={S} height={S} rx="18" fill="none"
            stroke={accent} strokeWidth="1.5" opacity="0.5" />
        </g>

        {quads.map((p, i) => (
          <g key={i} transform={tf(p)} opacity={p.op.toFixed(3)}>
            <g filter="url(#pieceShadow)">
              <path d={QUAD} transform={`rotate(${p.rot} 210 210)`} {...pieceStyle} />
            </g>
            <path d={QUAD} transform={`rotate(${p.rot} 210 210)`} fill="none"
              stroke={accent} strokeWidth="2" opacity={p.flash.toFixed(3)} />
            <text x={p.lx} y={p.ly} textAnchor="middle" fill={INK}
              style={{ font: `600 17px ${FONT}`, letterSpacing: '-0.01em' }}>{p.label}</text>
          </g>
        ))}

        {/* centre piece — the last to land */}
        <g transform={tf(centre)} opacity={centre.op.toFixed(3)}>
          <g filter="url(#pieceShadow)">
            <circle cx="210" cy="210" r="58" fill={accent} />
          </g>
          <circle cx="210" cy="210" r="58" fill="none" stroke="#FFFFFF"
            strokeWidth="2.5" opacity={centre.flash.toFixed(3)} />
          <text x="210" y="215" textAnchor="middle" fill="#FFFFFF"
            style={{ font: `600 17px ${FONT}`, letterSpacing: '-0.01em' }}>{labels[4]}</text>
        </g>

        {/* tick */}
        <g transform={`translate(${S - 4} ${S - 4}) scale(${(0.7 + 0.3 * tick).toFixed(3)})`} opacity={tick.toFixed(3)}>
          <circle cx="0" cy="0" r="21" fill={accent} />
          <path d="M -8,0.5 L -2.5,6 L 8,-5" fill="none" stroke="#FFFFFF" strokeWidth="3"
            strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="26" strokeDashoffset={(26 * (1 - tick)).toFixed(2)} />
        </g>
      </g>
    </svg>
  );
}

window.MotifRoot = function MotifRoot(props) {
  return (
    <CompositionStage width={1200} height={800} bg={BONE}
      scenes={window.OM_SCENES} playback={window.OM_PLAYBACK}>
      <Motif {...props} />
    </CompositionStage>
  );
};
