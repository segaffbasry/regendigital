/* Paid-search motif — one continuous composition. */
const { CompositionStage, useComposition, animate, Easing, clamp } = window;

const BONE = '#EDEAE2';
const GREY = '#D8D6D0';
const GREY2 = '#E4E2DD';
const INK = '#111111';

const MOTION = {
  enter: (from, to, start, end) => animate({ from, to, start, end, ease: Easing.easeOutCubic }),
  drift: (from, to, start, end) => animate({ from, to, start, end, ease: Easing.easeInOutCubic }),
  pop: (from, to, start, end) => animate({ from, to, start, end, ease: Easing.easeOutQuart }),
};

const QUERY = 'b2b paid ads agency';
const CHAR_STARTS = (() => {
  const out = [];
  let t = 0.24;
  for (let i = 0; i < QUERY.length; i++) {
    out.push(t);
    const c = QUERY[i];
    const jitter = ((i * 37) % 11) / 11 * 0.032;
    t += c === ' ' ? 0.12 : 0.044 + jitter;
  }
  return out;
})();

const L = 210, W = 780;
const BAR_TOP = 112, BAR_H = 58;
const SPON_TOP = 194, SPON_H = 148, SHIFT = 164;
const CLICK_X = L + 250, CLICK_Y = SPON_TOP + 61;

const ROWS = [
  { title: 0.42, lines: [0.88, 0.6] },
  { title: 0.34, lines: [0.88, 0.71] },
  { title: 0.48, lines: [0.9, 0.55] },
  { title: 0.38, lines: [0.85, 0.66] },
];

function Bar({ w, h, r, color, style }) {
  return (
    <div style={{ width: w, height: h, borderRadius: r || h / 2, background: color || GREY, ...style }}></div>
  );
}

function Dot({ size }) {
  return <div style={{ width: size, height: size, borderRadius: '50%', background: INK, flex: '0 0 auto' }}></div>;
}

function SearchBar({ typed, caretOn, textOpacity }) {
  return (
    <div style={{
      position: 'absolute', left: L, top: BAR_TOP, width: W, height: BAR_H,
      background: '#FFFFFF', borderRadius: BAR_H / 2, border: '1px solid rgba(17,17,17,0.06)',
      boxShadow: '0 1px 2px rgba(17,17,17,0.04), 0 8px 24px rgba(17,17,17,0.05)',
      display: 'flex', alignItems: 'center', padding: '0 26px', gap: 16, boxSizing: 'border-box',
    }}>
      <div style={{ position: 'relative', width: 17, height: 17, flex: '0 0 auto' }}>
        <div style={{ position: 'absolute', inset: 0, border: '1.8px solid ' + INK, borderRadius: '50%' }}></div>
        <div style={{
          position: 'absolute', left: 13, top: 13, width: 7, height: 1.8, background: INK,
          borderRadius: 1, transform: 'rotate(45deg)', transformOrigin: '0 50%',
        }}></div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 3, opacity: textOpacity }}>
        <span style={{
          fontSize: 21, letterSpacing: '-0.005em', color: INK, fontWeight: 450,
          whiteSpace: 'pre', fontFeatureSettings: '"tnum"',
        }}>{typed}</span>
        <div style={{ width: 2, height: 23, background: '#0028FA', opacity: caretOn ? 1 : 0, borderRadius: 1 }}></div>
      </div>
    </div>
  );
}

function SponsoredResult({ accent, slide, press }) {
  return (
    <div style={{
      position: 'absolute', left: L, top: SPON_TOP, width: W, height: SPON_H,
      background: '#FFFFFF', borderRadius: 16, border: '1px solid rgba(17,17,17,0.05)',
      boxShadow: '0 2px 4px rgba(17,17,17,0.04), 0 18px 44px rgba(17,17,17,0.10)',
      padding: 24, boxSizing: 'border-box', opacity: slide.opacity,
      transform: 'translateY(' + slide.y + 'px) scale(' + press + ')',
      transformOrigin: '50% 50%', overflow: 'hidden',
    }}>
      <div style={{
        fontSize: 12.5, fontWeight: 600, letterSpacing: '0.02em', color: INK, marginBottom: 15,
      }}>Sponsored</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <Dot size={18} />
        <Bar w={W * 0.46} h={14} r={7} color={accent} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginLeft: 30 }}>
        <Bar w={W * 0.72} h={8} r={4} />
        <Bar w={W * 0.5} h={8} r={4} color={GREY2} />
      </div>
    </div>
  );
}

function OrganicList({ top, rows }) {
  return (
    <div style={{
      position: 'absolute', left: L, top: top, width: W,
      background: '#FFFFFF', borderRadius: 16, border: '1px solid rgba(17,17,17,0.05)',
      boxShadow: '0 1px 2px rgba(17,17,17,0.03), 0 12px 32px rgba(17,17,17,0.05)',
      padding: 26, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 24,
      opacity: rows.some(r => r.o > 0) ? 1 : 0,
    }}>
      {ROWS.map((row, i) => (
        <div key={i} style={{ opacity: rows[i].o, transform: 'translateY(' + rows[i].y + 'px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 13 }}>
            <Dot size={16} />
            <Bar w={W * row.title} h={12} r={6} color={GREY} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginLeft: 28 }}>
            {row.lines.map((w, j) => (
              <Bar key={j} w={W * w} h={8} r={4} color={j === 0 ? GREY : GREY2} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Cursor({ x, y, opacity, scale, accent }) {
  return (
    <div style={{
      position: 'absolute', left: 0, top: 0, opacity,
      transform: 'translate(' + x + 'px,' + y + 'px) scale(' + scale + ')',
      transformOrigin: '2px 2px', pointerEvents: 'none',
    }}>
      <svg width="26" height="34" viewBox="0 0 26 34" style={{ display: 'block', filter: 'drop-shadow(0 4px 10px rgba(17,17,17,0.18))' }}>
        <path d="M2 1.5 L2 25.5 L8.6 19.3 L12.6 29.6 L17.2 27.7 L13.2 17.6 L22 17.2 Z"
          fill={accent} stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Ripple({ x, y, r, opacity, accent }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width: r * 2, height: r * 2, marginLeft: -r, marginTop: -r,
      borderRadius: '50%', background: accent, opacity, pointerEvents: 'none',
    }}></div>
  );
}

function Piece(props) {
  const { T, CUES } = useComposition();
  const accent = props.accent || '#0028FA';
  const rowCount = 4;

  let typedCount = 0;
  for (let i = 0; i < CHAR_STARTS.length; i++) if (T >= CHAR_STARTS[i]) typedCount = i + 1;
  const typed = QUERY.slice(0, typedCount);
  const doneTyping = CHAR_STARTS[CHAR_STARTS.length - 1] + 0.1;
  const caretOn = T < doneTyping ? true : Math.floor((T - doneTyping) * 1.8) % 2 === 0;

  const fade = MOTION.enter(1, 0, CUES.Reset + 0.2, CUES.Reset + 0.95)(T);
  const textOpacity = MOTION.enter(1, 0, CUES.Reset + 0.3, CUES.Reset + 0.9)(T);

  const rows = ROWS.slice(0, rowCount).map((_, i) => {
    const s = CUES.Organic + i * 0.11;
    return {
      o: MOTION.enter(0, 1, s, s + 0.5)(T) * fade,
      y: MOTION.enter(14, 0, s, s + 0.62)(T),
    };
  });

  const slideP = MOTION.pop(0, 1, CUES.Sponsored, CUES.Sponsored + 0.8)(T);
  const slide = {
    opacity: MOTION.enter(0, 1, CUES.Sponsored + 0.04, CUES.Sponsored + 0.45)(T) * fade,
    y: (1 - slideP) * -34,
  };

  const pressDown = MOTION.enter(0, 1, CUES.Click + 0.9, CUES.Click + 1.02)(T);
  const pressUp = MOTION.enter(0, 1, CUES.Click + 1.04, CUES.Click + 1.3)(T);
  const press = 1 - 0.014 * (pressDown - pressUp);

  const cx = MOTION.drift(1030, CLICK_X, CUES.Click - 0.3, CUES.Click + 0.85)(T);
  const cy = MOTION.drift(690, CLICK_Y, CUES.Click - 0.3, CUES.Click + 0.85)(T);
  const cursorIn = MOTION.enter(0, 1, CUES.Click - 0.45, CUES.Click - 0.05)(T);
  const cursorOut = MOTION.enter(1, 0, CUES.Reset, CUES.Reset + 0.5)(T);
  const cursorScale = 1 - 0.09 * (pressDown - pressUp);

  const rippleP = MOTION.enter(0, 1, CUES.Click + 0.92, CUES.Click + 1.6)(T);

  return (
    <div style={{ position: 'absolute', inset: 0, background: BONE, fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif' }}>
      <div style={{ opacity: fade }}>
        <OrganicList top={SPON_TOP + slideP * SHIFT} rows={rows} />
      </div>
      <SearchBar typed={typed} caretOn={caretOn && fade > 0.5} textOpacity={textOpacity} />
      <SponsoredResult accent={accent} slide={slide} press={press} />
      {rippleP > 0 && rippleP < 1 && (
        <Ripple x={CLICK_X} y={CLICK_Y} r={18 + rippleP * 122} opacity={(1 - rippleP) * 0.16 * fade} accent={accent} />
      )}
      <Cursor x={cx} y={cy} opacity={cursorIn * cursorOut} scale={cursorScale} accent={accent} />
    </div>
  );
}

function SerpMotif(props) {
  return (
    <CompositionStage
      width={1200}
      height={800}
      bg={BONE}
      scenes={window.OM_SCENES}
      playback={window.OM_PLAYBACK}
    >
      <Piece accent={props.accent} />
    </CompositionStage>
  );
}

window.SerpMotif = SerpMotif;
if (typeof module !== 'undefined') module.exports = { SerpMotif };
