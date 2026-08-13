// ABM radial motif — one continuous composition.
const { useComposition, CompositionStage, Easing, animate, clamp, interpolate } = window;

const BONE = '#EDEAE2';
const GREY = '#D9D6CE';
const LINE = '#D8D5CC';
const INK = '#0B0B0C';

const MOTION = {
  enter: Easing.easeOutQuart,
  draw: Easing.easeInOutQuad,
  pop: Easing.easeOutBack,
};

const W = 1200, H = 800;
const CX = W / 2, CY = H / 2 - 6;

const CARD = { w: 272, h: 158 };

const PEOPLE = [
  { key: 'Champion', label: 'Champion', angle: -90, w: 154 },
  { key: 'Technical', label: 'Technical', angle: -18, w: 152 },
  { key: 'Economic', label: 'Economic buyer', angle: 54, w: 196 },
  { key: 'User', label: 'User', angle: 126, w: 116 },
  { key: 'Legal', label: 'Legal', angle: 198, w: 122 },
];
const CHIP_H = 62;

// ray/rect intersection distance from a rect centre along a unit direction
function inset(dx, dy, hw, hh) {
  const tx = Math.abs(dx) < 1e-6 ? Infinity : hw / Math.abs(dx);
  const ty = Math.abs(dy) < 1e-6 ? Infinity : hh / Math.abs(dy);
  return Math.min(tx, ty);
}

function geometry(radius) {
  return PEOPLE.map((p) => {
    const a = (p.angle * Math.PI) / 180;
    const dx = Math.cos(a), dy = Math.sin(a);
    const cx = CX + dx * radius, cy = CY + dy * radius;
    const hw = p.w / 2, hh = CHIP_H / 2;
    const start = inset(dx, dy, CARD.w / 2, CARD.h / 2) + 16;
    const end = inset(dx, dy, hw, hh) + 14;
    return {
      ...p, cx, cy, dx, dy,
      x1: CX + dx * start, y1: CY + dy * start,
      x2: cx - dx * end, y2: cy - dy * end,
    };
  });
}

function Bar({ w, h = 9, c = GREY, o = 1, r = 5 }) {
  return <div style={{ width: w, height: h, borderRadius: r, background: c, opacity: o }} />;
}

function Tick({ p, accent }) {
  const s = clamp(p, 0, 1);
  return (
    <div style={{
      position: 'absolute', top: -11, right: -11, width: 26, height: 26, borderRadius: 13,
      background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
      transform: `scale(${MOTION.pop(s)})`, opacity: clamp(s * 2.2, 0, 1),
      boxShadow: '0 4px 12px rgba(0,40,250,0.28)',
    }}>
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M2.6 6.9 L5.1 9.3 L10.3 3.7" stroke="#fff" strokeWidth="1.9"
              strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="12" strokeDashoffset={12 * (1 - clamp((s - 0.25) / 0.6, 0, 1))} />
      </svg>
    </div>
  );
}

function Piece({ t }) {
  const { T, CUES, authoredTotal } = useComposition();
  const accent = t.accent;
  const radius = t.ringRadius;
  const geo = geometry(radius);

  // card breathes in at the top of the loop and out at the very end (seam-matched)
  const cardIn = animate({ from: 0, to: 1, start: 0.05, end: 1.0, ease: MOTION.enter })(T);
  const cardOut = animate({ from: 1, to: 0, start: CUES.Reset + 0.95, end: CUES.Reset + 1.55, ease: Easing.easeInOutQuad })(T);
  const cardO = Math.min(cardIn, cardOut);
  const cardScale = 0.955 + 0.045 * cardIn - 0.02 * (1 - cardOut);

  const finale = clamp((T - CUES.Engaged) / 1.15, 0, 1);
  const resetP = animate({ from: 0, to: 1, start: CUES.Reset + 0.1, end: CUES.Reset + 1.0, ease: Easing.easeInOutQuad })(T);

  const states = geo.map((g, i) => {
    const cue = CUES[g.key];
    const draw = animate({ from: 0, to: 1, start: cue + 0.02, end: cue + 0.66, ease: MOTION.draw })(T);
    const lit = animate({ from: 0, to: 1, start: cue + 0.5, end: cue + 1.0, ease: Easing.easeOutBack })(T);
    const tick = animate({ from: 0, to: 1, start: cue + 0.58, end: cue + 1.0, ease: Easing.linear })(T);
    const appear = animate({ from: 0, to: 1, start: 0.35 + i * 0.09, end: 1.25 + i * 0.09, ease: MOTION.enter })(T);
    const pulse = t.finale
      ? Math.sin(clamp((finale - i * 0.055) * Math.PI * 1.0, 0, Math.PI)) * 1
      : 0;
    const fade = 1 - resetP;
    const app = appear * Math.min(1, cardOut + 0.0001);
    return { g, draw: draw * (1 - resetP), lit: lit * fade, tick: tick * fade, appear: app, base: app * fade, pulse };
  });

  const label = `${Math.floor(T)}s`;

  return (
    <div data-screen-label={label} style={{ position: 'absolute', inset: 0, background: BONE, overflow: 'hidden' }}>
      {/* connectors */}
      <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0 }}>
        {states.map(({ g, draw, lit, base }) => {
          const len = Math.hypot(g.x2 - g.x1, g.y2 - g.y1);
          return (
            <g key={g.key}>
              <line x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2} stroke={LINE} strokeWidth="1.5"
                    strokeLinecap="round" opacity={0.9 * base} />
              <line x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2} stroke={accent} strokeWidth="1.9"
                    strokeLinecap="round" strokeDasharray={len}
                    strokeDashoffset={len * (1 - clamp(draw, 0, 1))}
                    opacity={0.35 + 0.5 * clamp(lit, 0, 1)} />
            </g>
          );
        })}
        {t.finale && finale > 0 && finale < 1 && (
          <circle cx={CX} cy={CY} r={CARD.w / 2 + (radius - CARD.w / 2) * Easing.easeOutQuart(finale)}
                  fill="none" stroke={accent} strokeWidth="1.2"
                  opacity={0.3 * Math.sin(finale * Math.PI)} />
        )}
      </svg>

      {/* account card */}
      <div style={{
        position: 'absolute', left: CX, top: CY, width: CARD.w, height: CARD.h,
        transform: `translate(-50%,-50%) scale(${cardScale})`, opacity: cardO,
        background: '#fff', borderRadius: 16, border: '1px solid rgba(11,11,12,0.06)',
        boxShadow: '0 18px 40px -18px rgba(11,11,12,0.18), 0 2px 6px rgba(11,11,12,0.04)',
        padding: 22, boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: INK, flex: 'none' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Bar w={116} h={11} c="#C9C6BE" />
            <Bar w={74} h={8} c="#E1DED7" />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <Bar w={196} h={7} c="#E6E3DC" />
          <Bar w={150} h={7} c="#E6E3DC" />
        </div>
        <div style={{
          alignSelf: 'flex-start', marginTop: 'auto', fontSize: 12, letterSpacing: '0.09em',
          textTransform: 'uppercase', fontWeight: 600, color: accent,
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          background: 'rgba(0,40,250,0.07)', padding: '5px 10px', borderRadius: 7,
        }}>Target account</div>
      </div>

      {/* person chips */}
      {states.map(({ g, lit, tick, appear, pulse }) => {
        const L = clamp(lit, 0, 1);
        return (
          <div key={g.key} style={{
            position: 'absolute', left: g.cx, top: g.cy, width: g.w, height: CHIP_H,
            transform: `translate(-50%,-50%) scale(${(0.94 + 0.06 * appear) * (1 + 0.03 * pulse)})`,
            opacity: appear,
            background: `rgba(255,255,255,${1 - 0.0 * L})`,
            borderRadius: 16,
            border: `1px solid ${L > 0.02 ? `rgba(0,40,250,${0.10 + 0.22 * L})` : 'rgba(11,11,12,0.06)'}`,
            boxShadow: `0 12px 28px -16px rgba(11,11,12,0.16), 0 0 0 ${6 * L}px rgba(0,40,250,${0.05 * L})`,
            display: 'flex', alignItems: 'center', gap: 12, padding: '0 18px', boxSizing: 'border-box',
          }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 16, background: accent, opacity: 0.055 * L }} />
            <div style={{
              width: 22, height: 22, borderRadius: 11, flex: 'none',
              background: L > 0.5 ? accent : INK,
              transform: `scale(${1 + 0.12 * Math.sin(clamp(L, 0, 1) * Math.PI)})`,
            }} />
            <div style={{
              fontSize: 15, fontWeight: 500, color: INK, whiteSpace: 'nowrap',
              letterSpacing: '-0.005em',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            }}>{g.label}</div>
            <Tick p={tick} accent={accent} />
          </div>
        );
      })}
    </div>
  );
}

function ABMScene() {
  const [t, setTweak] = window.useTweaks(window.TWEAK_DEFAULTS);
  const { TweaksPanel, TweakSection, TweakToggle, TweakColor, TweakSlider } = window;
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <CompositionStage width={W} height={H} bg={BONE}
        scenes={window.OM_SCENES} playback={window.OM_PLAYBACK}>
        <Piece t={t} />
      </CompositionStage>
      <TweaksPanel>
        <TweakSection label="Motion" />
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
        <TweakToggle label="Committee pulse finale" value={t.finale} onChange={(v) => setTweak('finale', v)} />
        <TweakSection label="Layout" />
        <TweakSlider label="Ring radius" value={t.ringRadius} min={230} max={320} unit="px"
                     onChange={(v) => setTweak('ringRadius', v)} />
        <TweakSection label="Accent" />
        <TweakColor label="Accent" value={t.accent} options={['#0028FA', '#0B0B0C', '#1F3FD6']}
                    onChange={(v) => setTweak('accent', v)} />
      </TweaksPanel>
    </div>
  );
}

window.ABMScene = ABMScene;
