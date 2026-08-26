/* GEO motif — AI mentions across assistants. Continuous composition, keyed to authored time. */
const { useComposition, animate, interpolate, Easing, clamp } = window;

const W = 1200, H = 800;
const FONT = '"Arimo", Arial, sans-serif';

const MOTION = {
  // card rise + settle
  enter: (T, start) => ({
    opacity: animate({ from: 0, to: 1, start, end: start + 0.34, ease: Easing.easeOutCubic })(T),
    y: animate({ from: 34, to: 0, start, end: start + 0.62, ease: Easing.easeOutExpo })(T),
    scale: animate({ from: 0.965, to: 1, start, end: start + 0.62, ease: Easing.easeOutExpo })(T),
  }),
  // subtle spring for status marks
  pop: (T, start) => animate({ from: 0, to: 1, start, end: start + 0.42, ease: Easing.easeOutBack })(T),
  // stroke draw / progress 0..1
  draw: (T, start, dur, ease) => animate({ from: 0, to: 1, start, end: start + dur, ease: ease || Easing.easeInOutCubic })(T),
};

const LOGOS = {
  chatgpt: 'uploads/ChatGPT-Logo.png',
  gemini: 'uploads/Google_Gemini_icon_2025.svg.webp',
  claude: 'uploads/Claude_AI_symbol.svg.webp',
  perplexity: 'uploads/perplexity-e6a4e1t06hd6dhczot580o.webp',
  grok: 'uploads/grok-ai-icon.webp',
};

const CHIPS = [
  { id: 'chatgpt', label: 'ChatGPT', row: 0, col: 0, ok: false },
  { id: 'gemini', label: 'Gemini', row: 0, col: 1, ok: true },
  { id: 'claude', label: 'Claude', row: 0, col: 2, ok: false },
  { id: 'perplexity', label: 'Perplexity', row: 1, col: 0, ok: true },
  { id: 'grok', label: 'Grok', row: 1, col: 1, ok: false },
];

const CARD_W = 292, CARD_H = 188, GAP = 46;
const ROW_Y = [286, 500];

function chipPos(c) {
  const n = c.row === 0 ? 3 : 2;
  const rowW = n * CARD_W + (n - 1) * GAP;
  const x = (W - rowW) / 2 + c.col * (CARD_W + GAP);
  return { x, y: ROW_Y[c.row] };
}

function Tick({ p, accent }) {
  const len = 26;
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" style={{ display: 'block' }}>
      <circle cx="20" cy="20" r="20" fill={accent} />
      <path d="M12 20.5 L17.8 26 L28.5 14.5" fill="none" stroke="#fff" strokeWidth="3.2"
        strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray={len} strokeDashoffset={len * (1 - clamp(p * 1.35, 0, 1))} />
    </svg>
  );
}

function Cross({ p }) {
  const len = 13;
  const a = clamp(p * 1.6, 0, 1), b = clamp((p - 0.25) * 1.7, 0, 1);
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" style={{ display: 'block' }}>
      <circle cx="20" cy="20" r="20" fill="#D9D6CE" />
      <g fill="none" stroke="#8C8A83" strokeWidth="3.2" strokeLinecap="round">
        <path d="M14 14 L26 26" strokeDasharray={len * 1.35} strokeDashoffset={len * 1.35 * (1 - a)} />
        <path d="M26 14 L14 26" strokeDasharray={len * 1.35} strokeDashoffset={len * 1.35 * (1 - b)} />
      </g>
    </svg>
  );
}

function Chip({ chip, T, cues, accent, exitP }) {
  const pos = chipPos(chip);
  const i = CHIPS.indexOf(chip);
  const start = (chip.row === 0 ? cues.RowOne : cues.RowTwo) + chip.col * 0.10;
  const e = MOTION.enter(T, start);
  const markStart = cues.Marks + i * 0.09;
  const mp = MOTION.pop(T, markStart);
  const float = Math.sin((T * 0.95) + i * 1.15) * 4.6 * e.opacity;
  const exitY = exitP * -18, exitO = 1 - exitP;

  return (
    <div style={{
      position: 'absolute', left: pos.x, top: pos.y, width: CARD_W, height: CARD_H,
      opacity: e.opacity * exitO,
      transform: `translate3d(0, ${e.y + float + exitY}px, 0) scale(${e.scale * (1 - exitP * 0.02)})`,
      willChange: 'transform, opacity',
    }}>
      <div style={{
        position: 'absolute', inset: 0, background: '#FFFFFF', borderRadius: 16,
        border: '1px solid rgba(20,20,20,0.06)',
        boxShadow: '0 1px 2px rgba(30,28,22,0.05), 0 14px 34px -14px rgba(30,28,22,0.22)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22,
      }}>
        <img src={LOGOS[chip.id]} alt="" draggable="false"
          style={{ width: chip.id === 'chatgpt' ? 100 : 54, height: 54, objectFit: 'contain', display: 'block' }} />
        <div style={{
          fontFamily: FONT, fontSize: 21, fontWeight: 600, letterSpacing: '-0.01em', color: '#0B0B0B',
        }}>{chip.label}</div>
      </div>
      <div style={{
        position: 'absolute', right: -12, top: -12,
        transform: `scale(${clamp(mp, 0, 1.06)})`, opacity: clamp(mp * 2, 0, 1),
        filter: chip.ok ? 'drop-shadow(0 6px 14px rgba(0,40,250,0.28))' : 'drop-shadow(0 5px 12px rgba(30,28,22,0.14))',
      }}>
        {chip.ok ? <Tick p={mp} accent={accent} /> : <Cross p={mp} />}
      </div>
    </div>
  );
}

function Pill({ T, cues, accent, total, exitP }) {
  const e = MOTION.enter(T, cues.Pill + 0.05);
  const width = animate({ from: 104, to: 272, start: cues.Pill + 0.05, end: cues.Pill + 0.65, ease: Easing.easeOutExpo })(T);
  // gentle attention pulse through the hold
  const pulse = Math.sin(clamp((T - cues.Marks) * 2.1, 0, 99)) * 0.5 + 0.5;
  const glow = cues.Marks < T ? pulse : 0;
  const textP = MOTION.draw(T, cues.Pill + 0.3, 0.45, Easing.easeOutCubic);

  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, top: 156, display: 'flex', justifyContent: 'center',
      opacity: e.opacity * (1 - exitP),
      transform: `translate3d(0, ${e.y * 0.6 - exitP * 14}px, 0)`,
    }}>
      <div style={{
        height: 62, width, borderRadius: 999, background: '#FFFFFF', border: `1.5px solid ${accent}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '0 26px', boxSizing: 'border-box',
        boxShadow: `0 2px 4px rgba(30,28,22,0.06), 0 16px 34px -12px rgba(30,28,22,0.28), 0 18px 44px -16px rgba(0,40,250,${0.34 + glow * 0.24}), 0 0 0 ${5 + glow * 9}px rgba(0,40,250,${0.05 * (1 - glow * 0.5)})`,
        transform: `scale(${1 + glow * 0.012})`,
      }}>
        <span style={{
          fontFamily: FONT, fontSize: 23, fontWeight: 600, letterSpacing: '-0.005em', color: '#0B0B0B',
          whiteSpace: 'nowrap', opacity: textP,
          transform: `translate3d(0, ${(1 - textP) * 8}px, 0)`,
        }}>AI Mentions</span>
      </div>
    </div>
  );
}

function Piece() {
  const { T, CUES, authoredTotal } = useComposition();
  const t = (window.useTweaks ? window.useTweaks(window.TWEAK_DEFAULTS || {}) : [{}])[0] || {};
  const accent = t.accent || '#0028FA';
  const bg = t.background === 'transparent' ? 'transparent' : '#EEF0E5';
  const exitP = animate({ from: 0, to: 1, start: CUES.Reset + 0.08, end: authoredTotal - 0.08, ease: Easing.easeInOutCubic })(T);

  return (
    <div style={{ position: 'absolute', inset: 0, background: bg, overflow: 'hidden' }}>
      <Pill T={T} cues={CUES} accent={accent} total={authoredTotal} exitP={exitP} />
      {CHIPS.map((c) => (
        <Chip key={c.id} chip={c} T={T} cues={CUES} accent={accent} exitP={exitP} />
      ))}
    </div>
  );
}

function GeoMotif() {
  const { CompositionStage, TweaksPanel, TweakToggle, TweakColor, TweakRadio, useTweaks } = window;
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS || {});
  return (
    <React.Fragment>
      <CompositionStage width={W} height={H} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={t.background === 'transparent' ? 'transparent' : '#EEF0E5'}>
        <Piece />
      </CompositionStage>
      <TweaksPanel>
        <TweakColor label="Accent" value={t.accent} options={['#0028FA', '#0B0B0B', '#1F5AE0']} onChange={(v) => setTweak('accent', v)} />
        <TweakRadio label="Background" value={t.background} options={['bone', 'transparent']} onChange={(v) => setTweak('background', v)} />
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

window.GeoMotif = GeoMotif;
