/* Regen marketing ecosystem — 5s looping globe graphic */
const { CompositionStage, useComposition, Easing, animate, interpolate, clamp } = window;

const CX = 960, CY = 545, RS = 372, SQUASH = 0.92;
const BLUE = '#0028FA', BG = '#EEF0E5', INK = '#0A0C14', GREY = '#5B6276';

const MOTION = {
  pop: (start, delay = 0) => animate({ from: 0, to: 1, start: start + delay, end: start + delay + 0.6, ease: Easing.easeOutBack }),
  enter: (start, end) => animate({ from: 0, to: 1, start, end, ease: Easing.easeOutCubic }),
  draw: (start, end) => animate({ from: 0, to: 1, start, end, ease: Easing.easeInOutCubic }),
};

const LABELS = [
  { label: 'EMAIL', glyph: 'mail' },
  { label: 'SEO', glyph: 'search' },
  { label: 'CONTENT', glyph: 'content' },
  { label: 'PARTNERSHIPS', glyph: 'partners' },
  { label: 'PAID MEDIA', glyph: 'paid' },
  { label: 'ABM', glyph: 'abm' },
  { label: 'SOCIAL', glyph: 'social' },
];
const N = LABELS.length;
const NODES = LABELS.map((n, i) => {
  const u = 2 * (i + 0.5) / N - 1;
  const s = u < 0 ? -1 : 1;
  return { ...n, i, lat: Math.asin(s * (0.40 + 0.55 * Math.abs(u))), lon0: i * 137.5 * Math.PI / 180 };
});

function Glyph({ kind, color }) {
  const p = { fill: 'none', stroke: color, strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  return (
    <svg width="24" height="24" viewBox="0 0 26 26">
      {kind === 'mail' && <g {...p}><rect x="3" y="6" width="20" height="14" rx="2.5" /><path d="M3.8 7.5 13 14.2 22.2 7.5" /></g>}
      {kind === 'search' && <g {...p}><circle cx="11.5" cy="11.5" r="6.5" /><path d="M16.4 16.4 22 22" /></g>}
      {kind === 'content' && <g {...p}><rect x="4" y="4" width="18" height="18" rx="2.5" /><path d="M8 10h10M8 14h10M8 18h6" /></g>}
      {kind === 'partners' && <g {...p}><circle cx="10" cy="13" r="6" /><circle cx="16" cy="13" r="6" /></g>}
      {kind === 'paid' && <g {...p}><path d="M4 18 10 12l4 4 8-9" /><path d="M17 7h5v5" /></g>}
      {kind === 'abm' && <g {...p}><circle cx="13" cy="13" r="9" /><circle cx="13" cy="13" r="4.6" /><circle cx="13" cy="13" r="1" fill={color} stroke="none" /></g>}
      {kind === 'social' && <g {...p}><circle cx="13" cy="13" r="2.6" /><path d="M6.6 6.6a9 9 0 0 0 0 12.8M19.4 6.6a9 9 0 0 1 0 12.8" /></g>}
    </svg>
  );
}

function Mark({ size, color }) {
  const w = size, h = size * 0.7;
  return (
    <svg width={w} height={h} viewBox="0 0 66 46">
      <circle cx="24" cy="23" r="17" fill="none" stroke={color} strokeWidth="4.4" />
      <circle cx="42" cy="23" r="17" fill="none" stroke={color} strokeWidth="4.4" />
    </svg>
  );
}

function NodeCard({ n, T, CUES, A }) {
  const p = MOTION.pop(0.15, n.i * 0.1)(T);
  const front = clamp((n.z + 1) / 2, 0, 1);
  const scale = (0.62 + 0.42 * front) * (0.7 + 0.3 * p);
  const opacity = clamp(p * 1.4, 0, 1) * (0.32 + 0.68 * front);
  return (
    <div style={{
      position: 'absolute', left: n.px, top: n.py,
      transform: `translate(-50%, -50%) scale(${scale})`,
      opacity,
      filter: front < 0.45 ? `blur(${(0.45 - front) * 5}px)` : 'none',
      display: 'flex', alignItems: 'center', gap: '13px',
      padding: '14px 24px 14px 16px', borderRadius: '15px',
      background: '#FFFFFF', border: '1px solid #E9EBF1',
      boxShadow: `0 2px 4px rgba(10,12,20,0.05), 0 ${8 + 14 * front}px ${18 + 20 * front}px rgba(10,12,20,${0.06 + 0.10 * front})`,
      whiteSpace: 'nowrap',
    }}>
      <div style={{
        width: '42px', height: '42px', borderRadius: '11px', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F3F4F8',
      }}>
        <Glyph kind={n.glyph} color={A} />
      </div>
      <div style={{ fontSize: '23px', fontWeight: 600, letterSpacing: '0.06em', color: INK }}>{n.label}</div>
    </div>
  );
}

function Piece({ accent }) {
  const { T, CUES, authoredTotal } = useComposition();
  const A = accent || BLUE;
  const total = authoredTotal || 5;

  const fade = Math.min(MOTION.enter(0, 0.3)(T), 1 - MOTION.enter(total - 0.3, total)(T));
  const spin = (T / total) * Math.PI * 2;

  const placed = NODES.map((n) => {
    const lon = n.lon0 + spin;
    const cl = Math.cos(n.lat);
    return {
      ...n,
      px: CX + RS * cl * Math.sin(lon),
      py: CY - RS * Math.sin(n.lat) * SQUASH,
      z: cl * Math.cos(lon),
    };
  });
  const back = placed.filter((n) => n.z < 0);
  const front = placed.filter((n) => n.z >= 0);

  const globeIn = MOTION.draw(CUES.Connect - 0.35, CUES.Connect + 0.95)(T);
  const coreIn = MOTION.pop(0.55)(T);
  const corePulse = 1 + 0.03 * Math.sin((T - 0.55) * 3.2);

  const lats = [-52, -26, 0, 26, 52];
  const merid = [0, 1, 2, 3].map((k) => (k * Math.PI / 4) + spin);

  return (
    <div style={{ position: 'absolute', inset: 0, background: BG, overflow: 'hidden', fontFamily: '"Poppins", system-ui, sans-serif' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: fade }}>
        {back.map((n) => <NodeCard key={n.label} n={n} T={T} CUES={CUES} A={A} />)}

        <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0 }}>
          <g opacity={globeIn}>
          <circle cx={CX} cy={CY} r={RS * SQUASH} fill="none" stroke="#D8D2C6" strokeWidth="2" />
          {lats.map((d) => {
            const r = d * Math.PI / 180;
            return <ellipse key={d} cx={CX} cy={CY - RS * Math.sin(r) * SQUASH}
              rx={RS * Math.cos(r)} ry={RS * Math.cos(r) * 0.19}
              fill="none" stroke="#DCD6CA" strokeWidth="1.6" />;
          })}
          {merid.map((m, k) => (
            <ellipse key={k} cx={CX} cy={CY} rx={Math.max(1, Math.abs(RS * Math.sin(m)))} ry={RS * SQUASH}
              fill="none" stroke="#DCD6CA" strokeWidth="1.6" />
          ))}
          </g>
          {placed.map((n) => {
            const d = MOTION.draw(1.0 + n.i * 0.05, 1.7 + n.i * 0.05)(T);
            const len = Math.hypot(n.px - CX, n.py - CY) || 1;
            return <line key={n.label} x1={CX} y1={CY} x2={n.px} y2={n.py}
              stroke={A} strokeWidth="1.6" opacity={(0.10 + 0.30 * clamp((n.z + 1) / 2, 0, 1)) * d}
              strokeDasharray={`${len} ${len}`} strokeDashoffset={len * (1 - d)} />;
          })}
        </svg>

        <div style={{
          position: 'absolute', left: CX, top: CY,
          transform: `translate(-50%, -50%) scale(${(0.55 + 0.45 * coreIn) * corePulse})`,
          opacity: clamp(coreIn * 1.6, 0, 1),
          width: '150px', height: '150px', borderRadius: '50%', background: A,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 6px 14px rgba(10,12,20,0.10), 0 26px 52px rgba(0,40,250,0.22)',
        }}>
          <img src="./regen-mark-white.png" alt="Regen" width="37" style={{ display: 'block' }} />
        </div>

        {front.map((n) => <NodeCard key={n.label} n={n} T={T} CUES={CUES} A={A} />)}

      </div>
    </div>
  );
}

window.EcosystemPiece = Piece;

window.EcosystemVideo = function EcosystemVideo() {
  const { useTweaks, TweaksPanel, TweakSection, TweakToggle, TweakColor } = window;
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS || {});
  return (
    <React.Fragment>
      <CompositionStage width={1920} height={1080} bg={BG}
        scenes={window.OM_SCENES} playback={window.OM_PLAYBACK}>
        <Piece accent={t.accent} />
      </CompositionStage>
      <TweaksPanel>
        <TweakSection label="Graphic" />
        <TweakColor label="Accent" value={t.accent} options={['#0028FA', '#000000', '#466F90']}
          onChange={(v) => setTweak('accent', v)} />
        <TweakToggle label="Motion editor" value={t.motionEditor}
          onChange={(v) => setTweak('motionEditor', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
};
