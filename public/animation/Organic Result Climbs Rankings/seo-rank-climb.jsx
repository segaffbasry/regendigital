const { CompositionStage, useComposition, Easing, clamp } = window;

const STAGE_W = 1200, STAGE_H = 800;
const STEP = 116, ROW_H = 104;
const BONE = '#EDEAE2', BLUE = '#0028FA', INK = '#111111';

// slot assignments per phase: index = row id, value = vertical slot
const P0 = [0, 1, 2, 3, 4];
const P1 = [0, 2, 1, 3, 4];
const P2 = [1, 2, 0, 3, 4];
const BLUE_ROW = 2;

const ROWS = [
  { title: '44%', l1: '86%', l2: '61%' },
  { title: '37%', l1: '79%', l2: '52%' },
  { title: '49%', l1: '83%', l2: '57%' },
  { title: '41%', l1: '88%', l2: '46%' },
  { title: '34%', l1: '74%', l2: '55%' }
];

const prog = (T, t0, t1) => clamp((T - t0) / (t1 - t0), 0, 1);
const mix = (a, b, p) => a + (b - a) * p;

const MOTION = {
  climb: (T, t0) => Easing.easeOutQuart(prog(T, t0, t0 + 1.05)),
  pop: (T, t0) => Easing.easeOutBack(prog(T, t0, t0 + 0.55)),
  fade: (T, t0, d) => Easing.easeInOutSine(prog(T, t0, t0 + (d || 0.4)))
};

function Bar({ w, h, color, r }) {
  return <div style={{ width: w, height: h, borderRadius: r || h / 2, background: color }} />;
}

function ResultRow({ row, y, highlighted, badge }) {
  const pad = highlighted ? '14px 18px' : '8px 10px';
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, top: 0, height: ROW_H,
      transform: `translateY(${y}px)`,
      display: 'flex', gap: 18, alignItems: 'flex-start',
      padding: pad, boxSizing: 'border-box', borderRadius: 12,
      background: highlighted ? '#FFFFFF' : 'transparent',
      border: highlighted ? '1px solid rgba(0,40,250,0.10)' : '1px solid transparent',
      boxShadow: highlighted
        ? '0 2px 4px rgba(17,17,17,0.04), 0 18px 40px -22px rgba(0,40,250,0.45)'
        : 'none',
      zIndex: highlighted ? 3 : 1
    }}>
      <div style={{ width: 26, height: 26, borderRadius: '50%', background: INK, flex: 'none', marginTop: highlighted ? 1 : 2 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 13 }}>
        <Bar w={row.title} h={13} r={7} color={highlighted ? BLUE : '#C9C5BC'} />
        <Bar w={row.l1} h={9} r={5} color="#E6E3DC" />
        <Bar w={row.l2} h={9} r={5} color="#E6E3DC" />
      </div>
      {badge}
    </div>
  );
}

function RankBadge({ show }) {
  return (
    <div style={{
      alignSelf: 'center', display: 'flex', alignItems: 'center', gap: 9,
      background: BLUE, borderRadius: 999, padding: '8px 15px', flex: 'none',
      opacity: clamp(show * 1.6, 0, 1),
      transform: `translateY(${mix(6, 0, show)}px) scale(${mix(0.86, 1, show)})`
    }}>
      <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderBottom: '7px solid #FFFFFF' }} />
      <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.01em', color: '#FFFFFF' }}>Rank 1</div>
      <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.35)' }} />
      <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>+2</div>
    </div>
  );
}

function SearchBar({ query, caretOn }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16, background: '#FFFFFF',
      border: '1px solid rgba(17,17,17,0.06)', borderRadius: 16,
      boxShadow: '0 1px 2px rgba(17,17,17,0.04), 0 12px 32px -18px rgba(17,17,17,0.28)',
      padding: '20px 26px'
    }}>
      <div style={{ width: 18, height: 18, border: `2px solid ${INK}`, borderRadius: '50%', flex: 'none', position: 'relative' }}>
        <div style={{ position: 'absolute', width: 2, height: 8, background: INK, borderRadius: 2, right: -4, bottom: -6, transform: 'rotate(-45deg)' }} />
      </div>
      <div style={{ fontSize: 19, letterSpacing: '-0.01em', color: INK, fontWeight: 500 }}>{query}</div>
      <div style={{ width: 1.5, height: 21, background: BLUE, borderRadius: 2, opacity: caretOn ? 1 : 0 }} />
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', gap: 8 }}>
        <Bar w={52} h={8} r={4} color="#E4E1DA" />
        <Bar w={30} h={8} r={4} color="#EDEAE2" />
      </div>
    </div>
  );
}

function Piece() {
  const { T, CUES } = useComposition();

  const a = MOTION.climb(T, CUES.ClimbToTwo);
  const b = MOTION.climb(T, CUES.ClimbToOne);
  const back = MOTION.climb(T, CUES.Reset);

  const slot = (i) => {
    let s = P0[i];
    s = mix(s, P1[i], a);
    s = mix(s, P2[i], b);
    s = mix(s, P0[i], back);
    return s * STEP;
  };

  const badge = clamp(MOTION.pop(T, CUES.RankOne - 0.7) - MOTION.fade(T, CUES.Reset - 0.35, 0.35), 0, 1);
  const cursorIn = MOTION.fade(T, CUES.RankOne + 0.1, 1.3) - MOTION.fade(T, CUES.Reset - 0.6, 0.5);
  const cursorP = clamp(MOTION.fade(T, CUES.RankOne + 0.1, 1.5), 0, 1);
  const caretOn = Math.floor(T / 0.58) % 2 === 0;

  return (
    <div style={{
      width: STAGE_W, height: STAGE_H, background: BONE, boxSizing: 'border-box',
      padding: '56px 56px', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "Montserrat, Poppins, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
    }}>
      <div style={{ width: '100%', maxWidth: 1088, display: 'flex', flexDirection: 'column', gap: 22 }}>
        <SearchBar query="b2b marketing agency" caretOn={caretOn} />
        <div style={{
          background: '#FFFFFF', border: '1px solid rgba(17,17,17,0.06)', borderRadius: 16,
          boxShadow: '0 1px 2px rgba(17,17,17,0.04), 0 24px 60px -34px rgba(17,17,17,0.35)',
          padding: 28
        }}>
          <div style={{ display: 'flex', gap: 10, padding: '0 4px 22px 4px' }}>
            <Bar w={64} h={7} r={4} color="#E4E1DA" />
            <Bar w={26} h={7} r={4} color="#F0EEE9" />
          </div>
          <div style={{ position: 'relative', height: 568 }}>
            {ROWS.map((row, i) => (
              <ResultRow
                key={i}
                row={row}
                y={slot(i)}
                highlighted={i === BLUE_ROW}
                badge={i === BLUE_ROW ? <RankBadge show={badge} /> : null}
              />
            ))}
            <div style={{
              position: 'absolute', left: 0, top: 0, width: 20, height: 20, zIndex: 5,
              opacity: clamp(cursorIn, 0, 1),
              transform: `translate(${mix(768, 706, cursorP)}px, ${mix(48, 30, cursorP)}px)`
            }}>
              <div style={{
                width: 0, height: 0, borderLeft: `9px solid ${INK}`, borderBottom: '9px solid transparent',
                transform: 'rotate(-25deg)', filter: 'drop-shadow(0 2px 3px rgba(17,17,17,0.3))'
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SeoRankClimb() {
  return (
    <CompositionStage width={STAGE_W} height={STAGE_H} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={BONE}>
      <Piece />
    </CompositionStage>
  );
}

window.SeoRankClimb = SeoRankClimb;
module.exports = { SeoRankClimb };
