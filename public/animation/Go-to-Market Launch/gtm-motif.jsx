/* GTM & Launch motif — continuous composition, keyed to authored time only. */
const { useComposition, animate, Easing, interpolate, clamp } = window;

const W = 1200, H = 800;
const FONT = "'Montserrat', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif";
const BONE = '#EDEAE2';
const INK = '#0B0B0C';
const GREY = '#D9D6CE';
const GREY_SOFT = '#EFEDE7';

const ANCHORS = [
  { x: 172, y: 608, label: 'Position' },
  { x: 446, y: 522, label: 'Prime' },
  { x: 706, y: 414, label: 'Launch' },
  { x: 940, y: 268, label: 'Sustain' },
];

function cubic(p0, c1, c2, p1, t) {
  const u = 1 - t, a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t;
  return { x: a * p0.x + b * c1.x + c * c2.x + d * p1.x, y: a * p0.y + b * c1.y + c * c2.y + d * p1.y };
}

function buildGeo(pts) {
  const P = [pts[0], ...pts, pts[pts.length - 1]];
  const segs = [];
  for (let i = 1; i < P.length - 2; i++) {
    const p0 = P[i - 1], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2];
    segs.push({
      p1, p2,
      c1: { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 },
      c2: { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 },
    });
  }
  let d = `M ${pts[0].x} ${pts[0].y}`;
  segs.forEach(s => { d += ` C ${s.c1.x.toFixed(2)} ${s.c1.y.toFixed(2)} ${s.c2.x.toFixed(2)} ${s.c2.y.toFixed(2)} ${s.p2.x} ${s.p2.y}`; });

  const samples = [{ len: 0, x: pts[0].x, y: pts[0].y }];
  let len = 0, prev = pts[0];
  const segEnds = [];
  segs.forEach(s => {
    for (let k = 1; k <= 90; k++) {
      const pt = cubic(s.p1, s.c1, s.c2, s.p2, k / 90);
      len += Math.hypot(pt.x - prev.x, pt.y - prev.y);
      prev = pt;
      samples.push({ len, x: pt.x, y: pt.y });
    }
    segEnds.push(len);
  });
  const fracs = [0, ...segEnds.map(l => l / len)];
  return { d, samples, total: len, fracs };
}

const GEO = buildGeo(ANCHORS);

function pointAt(frac) {
  const target = clamp(frac, 0, 1) * GEO.total;
  const s = GEO.samples;
  let lo = 0, hi = s.length - 1;
  while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (s[mid].len <= target) lo = mid; else hi = mid; }
  const a = s[lo], b = s[hi];
  const t = b.len === a.len ? 0 : (target - a.len) / (b.len - a.len);
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

// tail direction, for the "and beyond" dashed continuation
const TAIL = (() => {
  const a = GEO.samples[GEO.samples.length - 14], b = GEO.samples[GEO.samples.length - 1];
  const dx = b.x - a.x, dy = b.y - a.y, m = Math.hypot(dx, dy);
  return { x: b.x + (dx / m) * 128, y: b.y + (dy / m) * 128 };
})();

const MOTION = {
  travel: (from, to, start, end) => animate({ from, to, start, end, ease: Easing.easeInOutSine }),
  enter: (from, to, start, end) => animate({ from, to, start, end, ease: Easing.easeOutCubic }),
  pop: (from, to, start, end) => animate({ from, to, start, end, ease: Easing.easeOutQuart }),
};

function hexToRgb(h) {
  const m = h.replace('#', '');
  return [parseInt(m.slice(0, 2), 16), parseInt(m.slice(2, 4), 16), parseInt(m.slice(4, 6), 16)];
}
function mix(a, b, t) {
  return `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)}, ${Math.round(a[1] + (b[1] - a[1]) * t)}, ${Math.round(a[2] + (b[2] - a[2]) * t)})`;
}
const RGB_GREY = hexToRgb(GREY);

function Chip({ pt, label, act, accentRgb }) {
  const a = clamp(act, 0, 1);
  return (
    <div style={{ position: 'absolute', left: pt.x, top: pt.y - 46, transform: `translate(-50%, -100%) translateY(${-a * 4}px)`, pointerEvents: 'none' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '9px 16px 9px 13px', borderRadius: 999,
        background: '#FFFFFF',
        border: `1px solid rgba(${Math.round(11 + (0 - 11) * a)}, ${Math.round(11 + (40 - 11) * a)}, ${Math.round(12 + (250 - 12) * a)}, ${0.09 + 0.13 * a})`,
        boxShadow: `0 10px 24px -12px rgba(0,40,250,${0.35 * a}), 0 5px 14px -9px rgba(11,11,12,${0.22 - 0.08 * a})`,
      }}>
        <span style={{
          width: 9, height: 9, borderRadius: 999,
          background: mix(RGB_GREY, accentRgb, a),
          boxShadow: `0 0 0 ${3 + a * 2}px rgba(0,40,250,${0.1 * a})`,
        }} />
        <span style={{
          font: `600 21px/1 ${FONT}`, letterSpacing: '0.055em', textTransform: 'uppercase',
          color: `rgba(11,11,12,${0.5 + 0.5 * a})`,
        }}>{label}</span>
      </div>
    </div>
  );
}

function Greek({ w, h = 8, o = 1, r = 4, c = GREY }) {
  return <div style={{ width: w, height: h, borderRadius: r, background: c, opacity: o }} />;
}

function Piece(props) {
  const accent = props.accent || '#0028FA';
  const thickness = props.pathThickness || 4;
  const showBeyond = props.showBeyond !== false;
  const { T, CUES, authoredTotal } = useComposition();
  const total = authoredTotal;
  const f = GEO.fracs;
  const launchArrive = CUES.Climb - 0.85;

  let p;
  if (T < CUES.Travel) p = 0;
  else if (T < CUES.Prime) p = MOTION.travel(0, f[1], CUES.Travel, CUES.Prime)(T);
  else if (T < CUES.Launch) p = f[1];
  else if (T < launchArrive) p = MOTION.travel(f[1], f[2], CUES.Launch, launchArrive)(T);
  else if (T < CUES.Climb) p = f[2];
  else p = MOTION.travel(f[2], 1, CUES.Climb, CUES.Sustain)(T);
  p = clamp(p, 0, 1);

  const dot = pointAt(p);
  const fadeIn = MOTION.enter(0, 1, 0.35, 1.25)(T);
  const fadeOut = MOTION.travel(1, 0, total - 1.0, total - 0.2)(T);
  const alpha = Math.min(fadeIn, fadeOut);

  // launch burst
  const bt = T - launchArrive;
  const rings = [0, 0.26, 0.52].map((delay, i) => {
    const u = clamp((bt - delay) / 1.7, 0, 1);
    const e = Easing.easeOutCubic(u);
    return { key: i, r: 12 + e * (152 - i * 30), o: bt <= 0 ? 0 : (1 - u) * (0.42 - i * 0.08) };
  });
  const flash = bt > 0 ? (1 - clamp(bt / 0.9, 0, 1)) * 0.5 : 0;

  // idle breath at Position, before travel
  const bu = clamp(T / (CUES.Travel || 1), 0, 1);
  const breathe = T < CUES.Travel ? { r: 12 + Easing.easeOutCubic(bu) * 34, o: (1 - bu) * 0.28 } : { r: 0, o: 0 };

  // calm drift (loop-seamless: identical at T=0 and T=total)
  const phase = (1 - Math.cos((2 * Math.PI * T) / total)) / 2;
  const camScale = 1 + 0.01 * phase;
  const camY = -6 * phase;

  const beyondReveal = clamp((p - f[2]) / (1 - f[2]), 0, 1);
  const accentRgb = hexToRgb(accent);
  const acts = f.map(fi => clamp((p - (fi - 0.05)) / 0.05, 0, 1) * fadeOut * fadeIn);

  return (
    <div style={{ position: 'absolute', inset: 0, background: BONE, fontFamily: FONT }}>
      <div style={{
        position: 'absolute', left: 56, top: 56, width: W - 112, height: H - 112,
        background: '#FFFFFF', borderRadius: 16,
        border: '1px solid rgba(11,11,12,0.06)',
        boxShadow: '0 1px 2px rgba(11,11,12,0.04), 0 18px 40px -24px rgba(11,11,12,0.18), 0 60px 120px -60px rgba(11,11,12,0.16)',
        transform: `translateY(${camY}px) scale(${camScale})`,
        transformOrigin: '50% 58%',
        overflow: 'hidden',
      }}>
        {/* greeked card chrome */}
        <div style={{ position: 'absolute', left: 40, top: 36, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 22, height: 22, borderRadius: 7, background: accent, opacity: 0.9 }} />
          <Greek w={96} h={9} c="rgba(11,11,12,0.16)" />
          <Greek w={54} h={9} o={0.7} />
        </div>
        <div style={{ position: 'absolute', right: 40, top: 32, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 68, height: 26, borderRadius: 999, border: `1px solid ${GREY}` }} />
          <div style={{ width: 26, height: 26, borderRadius: 999, background: GREY_SOFT }} />
        </div>
        <div style={{ position: 'absolute', left: 40, right: 40, top: 88, height: 1, background: 'rgba(11,11,12,0.05)' }} />
        <div style={{ position: 'absolute', left: 40, bottom: 34, display: 'flex', gap: 10 }}>
          <Greek w={72} h={7} o={0.75} />
          <Greek w={40} h={7} o={0.5} />
          <Greek w={56} h={7} o={0.35} />
        </div>

        {/* plot */}
        <svg width={W - 112} height={H - 112} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', left: -56, top: -56, overflow: 'visible' }}>
          <defs>
            <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="10" />
            </filter>
            <radialGradient id="flash">
              <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
              <stop offset="70%" stopColor={accent} stopOpacity="0" />
            </radialGradient>
          </defs>

          {[300, 434, 568].map(y => (
            <line key={y} x1="130" x2="1120" y1={y} y2={y} stroke="rgba(11,11,12,0.045)" strokeWidth="1" />
          ))}

          {/* track */}
          <path d={GEO.d} fill="none" stroke="#E6E3DB" strokeWidth={thickness} strokeLinecap="round" />
          {showBeyond && (
            <path d={`M ${ANCHORS[3].x} ${ANCHORS[3].y} L ${TAIL.x} ${TAIL.y}`} fill="none"
              stroke={accent} strokeWidth={thickness} strokeLinecap="round" strokeDasharray="2 16"
              opacity={0.18 + beyondReveal * 0.3 * alpha} />
          )}

          {/* trail */}
          <g opacity={alpha}>
            <path d={GEO.d} pathLength="1000" fill="none" stroke={accent} strokeWidth={thickness + 6}
              strokeLinecap="round" strokeDasharray="1000" strokeDashoffset={1000 * (1 - p)}
              opacity="0.16" filter="url(#glow)" />
            <path d={GEO.d} pathLength="1000" fill="none" stroke={accent} strokeWidth={thickness}
              strokeLinecap="round" strokeDasharray="1000" strokeDashoffset={1000 * (1 - p)} />
          </g>

          {/* anchors */}
          {ANCHORS.map((a, i) => {
            const act = acts[i];
            const s2 = 1 + Math.sin(clamp((p - (f[i] - 0.045)) / 0.045, 0, 1) * Math.PI) * 0.45 * (act > 0 ? 1 : 0);
            return (
              <g key={a.label}>
                <line x1={a.x} y1={a.y - 12} x2={a.x} y2={a.y - 46} stroke="rgba(11,11,12,0.10)" strokeWidth="1" />
                <line x1={a.x} y1={a.y - 12} x2={a.x} y2={a.y - 46} stroke={accent} strokeWidth="1" opacity={0.3 * act} />
                <circle cx={a.x} cy={a.y} r="9" fill="#FFFFFF" stroke="#DCD9D1" strokeWidth="3" />
                <circle cx={a.x} cy={a.y} r={9 * s2} fill="#FFFFFF" stroke={accent} strokeWidth="4" opacity={act} />
              </g>
            );
          })}

          {/* launch burst */}
          <g opacity={alpha}>
            {flash > 0 && <circle cx={ANCHORS[2].x} cy={ANCHORS[2].y} r={110} fill="url(#flash)" opacity={flash} />}
            {rings.map(r => (
              <circle key={r.key} cx={ANCHORS[2].x} cy={ANCHORS[2].y} r={r.r} fill="none"
                stroke={accent} strokeWidth="2.5" opacity={r.o} />
            ))}
          </g>

          {/* travelling dot */}
          <g opacity={alpha}>
            {breathe.o > 0 && <circle cx={dot.x} cy={dot.y} r={breathe.r} fill="none" stroke={accent} strokeWidth="2" opacity={breathe.o} />}
            <circle cx={dot.x} cy={dot.y} r="22" fill={accent} opacity="0.12" filter="url(#glow)" />
            <circle cx={dot.x} cy={dot.y} r="11.5" fill="#FFFFFF" />
            <circle cx={dot.x} cy={dot.y} r="8" fill={accent} />
          </g>
        </svg>

        {/* chips */}
        <div style={{ position: 'absolute', left: -56, top: -56, width: W, height: H }}>
          {ANCHORS.map((a, i) => (
            <Chip key={a.label} pt={a} label={a.label} act={acts[i]} accentRgb={accentRgb} />
          ))}
        </div>
      </div>
    </div>
  );
}

window.Piece = Piece;

function GTMStage(props) {
  return (
    <window.CompositionStage width={W} height={H} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={BONE}>
      <Piece accent={props.accent} pathThickness={props.pathThickness} showBeyond={props.showBeyond} />
    </window.CompositionStage>
  );
}
window.GTMStage = GTMStage;
