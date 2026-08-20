// Founder-led marketing motif — one continuous composition.
const { useComposition, CompositionStage, animate, Easing, clamp } = window;

const BONE = '#EEF0E5';
const INK = '#111111';
const GREEK = '#DEDBD3';
const GREEK_DARK = '#CFCBC2';
const FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';

// exactly three motion helpers
const MOTION = {
  enter: (from, to, start, dur = 0.8) =>
    animate({ from, to, start, end: start + dur, ease: Easing.easeOutQuart }),
  pop: (from, to, start, dur = 0.55) =>
    animate({ from, to, start, end: start + dur, ease: Easing.easeOutBack }),
  draw: (from, to, start, end) =>
    animate({ from, to, start, end, ease: Easing.easeInOutCubic }),
};

const CARD = { x: 140, y: 214, w: 520, h: 372 };
const CENTER = { x: CARD.x + CARD.w / 2, y: CARD.y + CARD.h / 2 };
const CHIP = { x: 730, w: 262, h: 60, gap: 16 };

function Bar({ w, h = 10, color = GREEK, style }) {
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: h / 2,
        background: color,
        ...style,
      }}
    />
  );
}

function Num({ children, size = 13, color = INK, weight = 600, style }) {
  return (
    <span
      style={{
        fontFamily: FONT,
        fontSize: size,
        fontWeight: weight,
        color,
        letterSpacing: '0.01em',
        fontVariantNumeric: 'tabular-nums',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function Rings({ T, cues, accent, fade }) {
  const starts = [cues.Publish + 0.18, cues.Publish + 0.5, cues.Publish + 0.82];
  return (
    <div style={{ position: 'absolute', left: CENTER.x, top: CENTER.y }}>
      {starts.map((s, i) => {
        const p = clamp((T - s) / 1.5, 0, 1);
        const live = T >= s && p < 1;
        const size = 300 + p * 720;
        const op = live ? (1 - p) * (1 - p) * 0.5 * fade : 0;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: -size / 2,
              top: -size / 2,
              width: size,
              height: size,
              borderRadius: '50%',
              border: `1.5px solid ${accent}`,
              opacity: op,
            }}
          />
        );
      })}
    </div>
  );
}

function PostCard({ T, cues, total, accent, fade, seamOp, reset, followersFrom, followersTo }) {
  const lift =
    MOTION.enter(6, 0, cues.Publish, 0.6)(T) + MOTION.draw(0, 6, total - 0.45, total - 0.02)(T);
  const shadow =
    MOTION.enter(0.16, 0.07, cues.Publish, 0.8)(T) +
    MOTION.draw(0, 0.09, total - 0.45, total - 0.02)(T);

  // followers tick
  const fp = MOTION.draw(0, 1, cues.Grow + 0.05, cues.Grow + 1.0)(T);
  const followers = reset
    ? followersFrom
    : Math.round(followersFrom + (followersTo - followersFrom) * fp);
  const caretOp = clamp(Math.sin(clamp((T - cues.Grow) / 1.1, 0, 1) * Math.PI), 0, 1) * fade;
  const followerScale = 1 + 0.06 * Math.sin(clamp((T - cues.Grow) / 0.95, 0, 1) * Math.PI);

  // reactions
  const likeS = MOTION.pop(0, 1, cues.Engage + 0.08, 0.42)(T);
  const dotStarts = [cues.Engage + 0.4, cues.Engage + 0.55, cues.Engage + 0.7];
  const cp = MOTION.draw(0, 1, cues.Engage + 0.2, cues.Engage + 1.35)(T);
  const likeCount = reset ? 8 : Math.round(8 + 216 * cp);
  const commentCount = reset ? 1 : Math.round(1 + 16 * cp);

  return (
    <div
      style={{
        position: 'absolute',
        left: CARD.x,
        top: CARD.y,
        width: CARD.w,
        height: CARD.h,
        background: '#FFFFFF',
        border: '1px solid rgba(17,17,17,0.07)',
        borderRadius: 16,
        boxShadow: `0 18px 48px rgba(17,17,17,${shadow}), 0 2px 6px rgba(17,17,17,0.04)`,
        transform: `translateY(${lift}px)`,
        padding: '26px 28px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: GREEK_DARK,
            flex: '0 0 auto',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          <Bar w={132} h={9} color="#1B1B1B" />
          <Bar w={86} h={7} color={GREEK} />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transform: `scale(${followerScale})`,
          }}
        >
          <svg width="9" height="9" viewBox="0 0 10 10" style={{ opacity: caretOp }}>
            <path d="M5 1 L9 8 L1 8 Z" fill={accent} />
          </svg>
          <Num size={13} style={{ opacity: seamOp }}>{followers.toLocaleString('en-US')}</Num>
          <Bar w={46} h={7} color={GREEK} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        <Bar w="100%" />
        <Bar w="92%" />
        <Bar w="64%" />
      </div>

      <div
        style={{
          height: 128,
          borderRadius: 12,
          background: '#F1EFE8',
          border: '1px solid rgba(17,17,17,0.05)',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginTop: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${likeS})`,
              opacity: likeS * fade,
              boxShadow: `0 4px 12px ${accent}33`,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff">
              <path d="M9 21h8.2a2 2 0 0 0 1.94-1.5l1.7-6.6A1.6 1.6 0 0 0 19.3 11H14l.9-4.3A1.9 1.9 0 0 0 13 4.4L9 11.4V21ZM3 21h3.2V11H3v10Z" />
            </svg>
          </div>
          <Num size={13} style={{ opacity: seamOp }}>{likeCount}</Num>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {dotStarts.map((s, i) => {
              const sc = MOTION.pop(0, 1, s, 0.38)(T);
              return (
                <div
                  key={i}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#1B1B1B',
                    transform: `scale(${sc})`,
                    opacity: sc * fade,
                  }}
                />
              );
            })}
          </div>
          <Num size={13} style={{ opacity: seamOp }}>{commentCount}</Num>
        </div>

        <Bar w={72} h={7} color={GREEK} style={{ marginLeft: 'auto' }} />
      </div>
    </div>
  );
}

function InboundChips({ T, cues, accent, fade, count }) {
  const total = count * CHIP.h + (count - 1) * CHIP.gap;
  const top0 = CENTER.y - total / 2;
  return (
    <div style={{ position: 'absolute', left: 0, top: 0 }}>
      {Array.from({ length: count }).map((_, i) => {
        const s = cues.Grow + 0.1 + i * 0.52;
        const x = MOTION.enter(58, 0, s, 0.62)(T);
        const op = MOTION.enter(0, 1, s, 0.5)(T) * fade;
        const sc = MOTION.enter(0.985, 1, s, 0.62)(T);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: CHIP.x,
              top: top0 + i * (CHIP.h + CHIP.gap),
              width: CHIP.w,
              height: CHIP.h,
              boxSizing: 'border-box',
              background: '#FFFFFF',
              border: '1px solid rgba(17,17,17,0.07)',
              borderRadius: 16,
              boxShadow: '0 10px 28px rgba(17,17,17,0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '0 18px',
              transform: `translateX(${x}px) scale(${sc})`,
              opacity: op,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 9,
                background: accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: '0 0 auto',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
                <path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1Z" />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <Num size={13.5} weight={600}>New inbound lead</Num>
              <Bar w={118} h={6} color={GREEK} />
            </div>
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: accent,
                marginLeft: 'auto',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

function Piece(props) {
  const { T, CUES, authoredTotal } = useComposition();
  const accent = props.accent || '#0028FA';
  const chipCount = props.chipCount || 3;
  const fade = MOTION.draw(1, 0, authoredTotal - 0.55, authoredTotal - 0.15)(T);
  // seam: counts fade out, snap back to their opening values while invisible, fade in
  const reset = T > authoredTotal - 0.26;
  const seamOp = reset
    ? MOTION.draw(0, 1, authoredTotal - 0.2, authoredTotal - 0.02)(T)
    : MOTION.draw(1, 0, authoredTotal - 0.55, authoredTotal - 0.3)(T);
  const drift = 1 + 0.012 * Math.sin((T / Math.max(authoredTotal, 1)) * Math.PI);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: BONE,
        overflow: 'hidden',
        fontFamily: FONT,
      }}
    >
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${drift})` }}>
        <Rings T={T} cues={CUES} accent={accent} fade={fade} />
        <PostCard
          T={T}
          cues={CUES}
          total={authoredTotal}
          accent={accent}
          fade={fade}
          seamOp={seamOp}
          reset={reset}
          followersFrom={props.followersFrom || 12480}
          followersTo={props.followersTo || 12631}
        />
        <InboundChips T={T} cues={CUES} accent={accent} fade={fade} count={chipCount} />
      </div>
    </div>
  );
}

function FounderVoice(props) {
  return (
    <CompositionStage
      width={1200}
      height={800}
      scenes={window.OM_SCENES}
      playback={window.OM_PLAYBACK}
      bg={BONE}
    >
      <Piece {...props} />
    </CompositionStage>
  );
}

window.FounderVoice = FounderVoice;
