/* GTM & Launch motif v2 — build, fire, accelerate, payoff. Rendered from authored time only. */
const { useComposition, animate, Easing, interpolate, clamp } = window;

const W = 1200, H = 800;
const FONT = "'Montserrat', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif";
const BONE = '#EEF0E5';
const INK = '#0B0B0C';
const TRACK = '#DAD7CE';
const GREY = '#D3D0C7';

/* full shape: labelled nodes + unlabelled shaping points that make the post-launch climb steepen */
const PTS = [
  { x: 150, y: 636, label: 'Position' },
  { x: 428, y: 590, label: 'Prime' },
  { x: 700, y: 502, label: 'Launch' },
  { x: 840, y: 442 },
  { x: 954, y: 344 },
  { x: 1052, y: 158, label: 'Sustain' },
];
const NODE_IX = [0, 1, 2, 5];

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
  const ends = [];
  segs.forEach(s => {
    for (let k = 1; k <= 90; k++) {
      const pt = cubic(s.p1, s.c1, s.c2, s.p2, k / 90);
      len += Math.hypot(pt.x - prev.x, pt.y - prev.y);
      prev = pt;
      samples.push({ len, x: pt.x, y: pt.y });
    }
    ends.push(len);
  });
  return { d, samples, total: len, fracs: [0, ...ends.map(l => l / len)] };
}

const GEO = buildGeo(PTS);
const NODES = NODE_IX.map(i => ({ ...PTS[i], frac: GEO.fracs[i] }));

function pointAt(frac) {
  const target = clamp(frac, 0, 1) * GEO.total;
  const s = GEO.samples;
  let lo = 0, hi = s.length - 1;
  while (hi - lo > 1) { const m = (lo + hi) >> 1; if (s[m].len <= target) lo = m; else hi = m; }
  const a = s[lo], b = s[hi];
  const t = b.len === a.len ? 0 : (target - a.len) / (b.len - a.len);
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

const MOTION = {
  glide: (from, to, start, end) => animate({ from, to, start, end, ease: Easing.easeInOutSine }),
  accel: (from, to, start, end) => animate({ from, to, start, end, ease: Easing.easeInCubic }),
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

/* chart frame */
const PLOT = { x0: 116, x1: 1090, y0: 116, y1: 682, step: 50 };
const GRID_X = [];
for (let x = PLOT.x0; x <= PLOT.x1 + 0.5; x += PLOT.step) GRID_X.push(x);
const GRID_Y = [];
for (let y = PLOT.y1; y >= PLOT.y0 - 0.5; y -= PLOT.step) GRID_Y.push(y);

/* particle field for the launch burst — deterministic, no randomness at render time */
const PARTICLES = Array.from({ length: 16 }, (_, i) => {
  const a = -Math.PI * 0.92 + (i / 15) * Math.PI * 1.34;
  const jitter = ((i * 37) % 11) / 11;
  return {
    a: a + (jitter - 0.5) * 0.18,
    dist: 62 + jitter * 92,
    r: 2 + ((i * 13) % 7) / 7 * 2.4,
    delay: ((i * 7) % 5) / 5 * 0.12,
    life: 0.95 + jitter * 0.5,
  };
});

/* payoff markers along the accelerating climb */
const MARKERS = [0.3, 0.56, 0.8].map((u, i) => {
  const fl = GEO.fracs[2];
  return { frac: fl + (1 - fl) * u, w: [34, 26, 40][i], dx: [106, 114, 104][i], dy: [46, 36, 28][i] };
});

function Chip({ node, act, accentRgb }) {
  const a = clamp(act, 0, 1);
  return (
    <div style={{
      position: 'absolute', left: node.x, top: node.y - 44,
      transform: `translate(-50%, -100%) translateY(${-a * 5}px)`, pointerEvents: 'none',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 17px 10px 14px', borderRadius: 999, background: '#FFFFFF',
        border: `1px solid rgba(${Math.round(11 - 11 * a)}, ${Math.round(11 + 29 * a)}, ${Math.round(12 + 238 * a)}, ${0.08 + 0.14 * a})`,
        boxShadow: `0 14px 28px -14px rgba(0,40,250,${0.4 * a}), 0 6px 16px -10px rgba(11,11,12,${0.24 - 0.06 * a})`,
      }}>
        <span style={{
          width: 9, height: 9, borderRadius: 999, background: mix(RGB_GREY, accentRgb, a),
          boxShadow: `0 0 0 ${3 + a * 3}px rgba(0,40,250,${0.1 * a})`,
        }} />
        <span style={{
          font: `600 21px/1 ${FONT}`, letterSpacing: '0.055em', textTransform: 'uppercase',
          color: `rgba(11,11,12,${0.46 + 0.54 * a})`,
        }}>{node.label}</span>
      </div>
    </div>
  );
}

function Piece(props) {
  const accent = props.accent || '#0028FA';
  const thickness = props.pathThickness || 4;
  const showMarkers = props.showMarkers !== false;
  const accentRgb = hexToRgb(accent);
  const { T, CUES, authoredTotal } = useComposition();
  const total = authoredTotal;
  const f = GEO.fracs;
  const fPrime = f[1], fLaunch = f[2];

  /* ---- progress along the path ---- */
  let p;
  if (T < CUES.Build) p = 0;
  else if (T < CUES.Prime) p = MOTION.glide(0, fPrime, CUES.Build, CUES.Prime)(T);
  else if (T < CUES.Approach) p = fPrime;
  else if (T < CUES.Countdown) p = MOTION.glide(fPrime, fLaunch, CUES.Approach, CUES.Countdown)(T);
  else if (T < CUES.Fire) p = fLaunch;
  else if (T < CUES.Climb) p = MOTION.pop(fLaunch, fLaunch + 0.05, CUES.Fire, CUES.Fire + 0.55)(T);
  else if (T < CUES.Sustain) p = MOTION.accel(fLaunch + 0.05, 0.93, CUES.Climb, CUES.Sustain)(T);
  else p = MOTION.pop(0.93, 1, CUES.Sustain, CUES.Sustain + 0.9)(T);
  p = clamp(p, 0, 1);

  const dot = pointAt(p);
  const fadeIn = MOTION.pop(0, 1, 0.3, 1.2)(T);
  const fadeOut = MOTION.glide(1, 0, total - 1.1, total - 0.25)(T);
  const alpha = Math.min(fadeIn, fadeOut);
  const acts = NODES.map(n => clamp((p - (n.frac - 0.05)) / 0.05, 0, 1) * fadeOut * fadeIn);

  /* ---- countdown on the Launch node ---- */
  const cdT = T - CUES.Countdown;
  const cdSpan = CUES.Fire - CUES.Countdown;
  const cdLive = cdT > -0.001 && T < CUES.Fire + 0.4;
  const step = clamp(Math.floor(cdT / (cdSpan / 3)), 0, 2);
  const local = cdT - step * (cdSpan / 3);
  const tick = cdSpan / 3;
  const cdOpacity = cdLive
    ? Math.min(MOTION.pop(0, 1, CUES.Countdown, CUES.Countdown + 0.3)(T), MOTION.pop(1, 0, CUES.Fire, CUES.Fire + 0.3)(T))
    : 0;
  const cdScale = 1 + MOTION.pop(0, 0.5, CUES.Fire, CUES.Fire + 0.35)(T);
  const numScale = 1.16 - 0.16 * Easing.easeOutQuart(clamp(local / (tick * 0.5), 0, 1));
  const numOpacity = Math.min(1, clamp(local / (tick * 0.06) + 0.15, 0, 1)) * (1 - Easing.easeInQuad(clamp((local - tick * 0.7) / (tick * 0.3), 0, 1)));
  const CIRC = 2 * Math.PI * 33;

  /* ---- burst ---- */
  const bt = T - CUES.Fire;
  const rings = [0, 0.22, 0.44].map((d, i) => {
    const u = clamp((bt - d) / 1.5, 0, 1);
    return { key: i, r: 22 + Easing.easeOutCubic(u) * (150 - i * 34), o: bt <= 0 ? 0 : (1 - u) * (0.4 - i * 0.09) };
  });
  const flash = bt > 0 ? (1 - clamp(bt / 0.75, 0, 1)) * 0.6 : 0;
  const parts = PARTICLES.map((pt, i) => {
    const u = clamp((bt - pt.delay) / pt.life, 0, 1);
    const e = Easing.easeOutQuart(u);
    return {
      key: i,
      x: PTS[2].x + Math.cos(pt.a) * pt.dist * e,
      y: PTS[2].y + Math.sin(pt.a) * pt.dist * e - e * e * 10,
      r: pt.r * (1 - 0.45 * u),
      o: bt <= 0 ? 0 : (1 - Easing.easeInQuad(u)) * 0.85,
    };
  });

  /* ---- idle breath before departure ---- */
  const bu = clamp(T / (CUES.Build || 1), 0, 1);
  const breathe = T < CUES.Build ? { r: 14 + Easing.easeOutCubic(bu) * 40, o: (1 - bu) * 0.3 } : { r: 0, o: 0 };

  /* ---- glowing trail behind the dot ---- */
  const trailLen = 78 + 52 * clamp((p - fLaunch) / (1 - fLaunch), 0, 1);
  const headPx = p * GEO.total;
  const trailStart = Math.max(0, headPx - trailLen);
  const trailDash = `${headPx - trailStart} ${GEO.total}`;

  /* ---- camera: seamless drift + a zoom that leans into the launch ---- */
  const phase = (1 - Math.cos((2 * Math.PI * T) / total)) / 2;
  const leanU = clamp((T - CUES.Approach) / Math.max(0.001, CUES.Fire - CUES.Approach), 0, 1);
  const leanOut = clamp((T - CUES.Fire) / Math.max(0.001, CUES.Climb + 0.8 - CUES.Fire), 0, 1);
  const lean = Easing.easeInOutSine(leanU) * (1 - Easing.easeInOutSine(leanOut));

  return (
    <div style={{ position: 'absolute', inset: 0, background: BONE, fontFamily: FONT, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        transform: `translateY(${-7 * phase}px) scale(${1 + 0.012 * phase})`,
        transformOrigin: '52% 62%',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          transform: `scale(${1 + 0.05 * lean})`,
          transformOrigin: `${(PTS[2].x / W) * 100}% ${(PTS[2].y / H) * 100}%`,
        }}>
          <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
            <defs>
              <filter id="soft" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="11" />
              </filter>
              <filter id="soft2" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
              <filter id="chipShadow" x="-60%" y="-60%" width="220%" height="220%">
                <feDropShadow dx="0" dy="8" stdDeviation="9" floodColor="#0B0B0C" floodOpacity="0.14" />
              </filter>
              <radialGradient id="flash">
                <stop offset="0%" stopColor={accent} stopOpacity="0.6" />
                <stop offset="72%" stopColor={accent} stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* graph-paper grid */}
            <g stroke={INK} strokeWidth="1" opacity="0.055">
              {GRID_X.map(x => <line key={`gx${x}`} x1={x} y1={PLOT.y0} x2={x} y2={PLOT.y1} />)}
              {GRID_Y.map(y => <line key={`gy${y}`} x1={PLOT.x0} y1={y} x2={PLOT.x1} y2={y} />)}
            </g>

            {/* axes */}
            <g stroke="rgba(11,11,12,0.26)" strokeWidth="1.25" fill="none" strokeLinecap="round">
              <line x1={PLOT.x0} y1={PLOT.y1} x2={PLOT.x0} y2={PLOT.y0 - 16} />
              <path d={`M ${PLOT.x0 - 6} ${PLOT.y0 - 8} L ${PLOT.x0} ${PLOT.y0 - 18} L ${PLOT.x0 + 6} ${PLOT.y0 - 8}`} />
              <line x1={PLOT.x0} y1={PLOT.y1} x2={PLOT.x1 + 16} y2={PLOT.y1} />
              <path d={`M ${PLOT.x1 + 8} ${PLOT.y1 - 6} L ${PLOT.x1 + 18} ${PLOT.y1} L ${PLOT.x1 + 8} ${PLOT.y1 + 6}`} />
            </g>
            <text x={PLOT.x1 + 14} y={PLOT.y1 + 34} textAnchor="end"
              style={{ font: `600 16px ${FONT}`, fill: 'rgba(11,11,12,0.36)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>Time</text>
            <text x={PLOT.x0 - 26} y={(PLOT.y0 + PLOT.y1) / 2} textAnchor="middle"
              transform={`rotate(-90 ${PLOT.x0 - 26} ${(PLOT.y0 + PLOT.y1) / 2})`}
              style={{ font: `600 16px ${FONT}`, fill: 'rgba(11,11,12,0.36)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>Growth</text>

            {/* inactive track */}
            <path d={GEO.d} fill="none" stroke={TRACK} strokeWidth={thickness} strokeLinecap="round" />

            {/* drawn line + glow */}
            <g opacity={alpha}>
              <path d={GEO.d} pathLength="1000" fill="none" stroke={accent} strokeWidth={thickness + 8}
                strokeLinecap="round" strokeDasharray="1000" strokeDashoffset={1000 * (1 - p)}
                opacity="0.14" filter="url(#soft)" />
              <path d={GEO.d} fill="none" stroke={accent} strokeWidth={thickness}
                strokeLinecap="round" strokeDasharray={`${p * GEO.total} ${GEO.total}`} />
              {/* bright comet trail */}
              <path d={GEO.d} fill="none" stroke={accent} strokeWidth={thickness + 5}
                strokeLinecap="round" strokeDasharray={trailDash} strokeDashoffset={-trailStart}
                opacity="0.5" filter="url(#soft2)" />
            </g>

            {/* payoff marker leaders */}
            {showMarkers && MARKERS.map((m, i) => {
              const at = pointAt(m.frac);
              const u = clamp((p - m.frac) / 0.05, 0, 1) * fadeOut;
              if (u <= 0.01) return null;
              return (
                <line key={`ld${i}`} x1={at.x} y1={at.y} x2={at.x + m.dx - 44} y2={at.y + m.dy}
                  stroke={accent} strokeWidth="1" opacity={0.28 * u} />
              );
            })}

            {/* nodes */}
            {NODES.map((n, i) => {
              const act = acts[i];
              const s2 = 1 + Math.sin(clamp((p - (n.frac - 0.045)) / 0.045, 0, 1) * Math.PI) * 0.4;
              return (
                <g key={n.label}>
                  <line x1={n.x} y1={n.y - 12} x2={n.x} y2={n.y - 44} stroke="rgba(11,11,12,0.10)" strokeWidth="1" />
                  <line x1={n.x} y1={n.y - 12} x2={n.x} y2={n.y - 44} stroke={accent} strokeWidth="1" opacity={0.32 * act} />
                  <circle cx={n.x} cy={n.y} r="9" fill="#FFFFFF" stroke="#CFCCC3" strokeWidth="3" />
                  <circle cx={n.x} cy={n.y} r={9 * s2} fill="#FFFFFF" stroke={accent} strokeWidth="4" opacity={act} />
                </g>
              );
            })}

            {/* launch burst */}
            <g opacity={alpha}>
              {flash > 0 && <circle cx={PTS[2].x} cy={PTS[2].y} r="150" fill="url(#flash)" opacity={flash} />}
              {rings.map(r => (
                <circle key={r.key} cx={PTS[2].x} cy={PTS[2].y} r={r.r} fill="none" stroke={accent} strokeWidth="2.5" opacity={r.o} />
              ))}
              {parts.map(q => q.o > 0.01 && <circle key={q.key} cx={q.x} cy={q.y} r={q.r} fill={accent} opacity={q.o} />)}
            </g>

            {/* countdown chip on the Launch node */}
            {cdOpacity > 0.01 && (
              <g opacity={cdOpacity * alpha} transform={`translate(${PTS[2].x} ${PTS[2].y}) scale(${cdScale})`}>
                <circle r="33" fill="#FFFFFF" filter="url(#chipShadow)" />
                <circle r="33" fill="none" stroke="rgba(11,11,12,0.07)" strokeWidth="1" />
                <circle r="33" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round"
                  transform="rotate(-90)" strokeDasharray={CIRC}
                  strokeDashoffset={CIRC * clamp(local / tick, 0, 1)} opacity="0.9" />
                <text textAnchor="middle" y="10" opacity={numOpacity}
                  style={{ font: `700 ${26 * numScale}px ${FONT}`, fill: INK, letterSpacing: '0.02em' }}>
                  {3 - step}
                </text>
              </g>
            )}

            {/* travelling dot */}
            <g opacity={alpha * (1 - cdOpacity * 0.92)}>
              {breathe.o > 0 && <circle cx={dot.x} cy={dot.y} r={breathe.r} fill="none" stroke={accent} strokeWidth="2" opacity={breathe.o} />}
              <circle cx={dot.x} cy={dot.y} r="26" fill={accent} opacity="0.14" filter="url(#soft)" />
              <circle cx={dot.x} cy={dot.y} r="12" fill="#FFFFFF" />
              <circle cx={dot.x} cy={dot.y} r="8.5" fill={accent} />
            </g>
          </svg>

          {/* payoff markers */}
          {showMarkers && (
            <div style={{ position: 'absolute', inset: 0 }}>
              {MARKERS.map((m, i) => {
                const at = pointAt(m.frac);
                const u = clamp((p - m.frac) / 0.05, 0, 1) * fadeOut;
                const e = Easing.easeOutQuart(u);
                return (
                  <div key={i} style={{
                    position: 'absolute', left: at.x + m.dx, top: at.y + m.dy,
                    transform: `translate(-50%, -50%) translateY(${(1 - e) * 12}px) scale(${0.82 + e * 0.18})`,
                    opacity: u,
                  }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 9,
                      padding: '9px 15px', borderRadius: 999, background: '#FFFFFF',
                      border: '1px solid rgba(0,40,250,0.2)',
                      boxShadow: '0 14px 26px -12px rgba(0,40,250,0.4), 0 5px 12px -8px rgba(11,11,12,0.26)',
                    }}>
                      <span style={{ font: `700 17px/1 ${FONT}`, color: accent }}>+</span>
                      <span style={{ width: m.w, height: 8, borderRadius: 4, background: '#BCB9B1' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* node chips */}
          <div style={{ position: 'absolute', inset: 0 }}>
            {NODES.map((n, i) => <Chip key={n.label} node={n} act={acts[i]} accentRgb={accentRgb} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function GTMStage(props) {
  return (
    <window.CompositionStage width={W} height={H} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={BONE}>
      <Piece accent={props.accent} pathThickness={props.pathThickness} showMarkers={props.showMarkers} />
    </window.CompositionStage>
  );
}
window.GTMStage = GTMStage;
window.Piece = Piece;
