/* creator-link.jsx — the composition: Brand + Creator meet, link, co-create. */
const { useComposition, animate, Easing, clamp } = window;

const BONE = '#EDEAE2';
const WHITE = '#FFFFFF';
const INK = '#111111';
const BLUE = '#0028FA';
const G1 = '#E6E4DC'; // greeked fill (light)
const G2 = '#D3D1C8'; // greeked fill (mid)
const BORDER = 'rgba(17,17,17,0.07)';
const SHADOW = '0 1px 2px rgba(17,17,17,0.04), 0 12px 32px rgba(17,17,17,0.06)';
const SANS = '"Helvetica Neue", Helvetica, Arial, sans-serif';

const MOTION = {
  enter: (from, to, start, end) => animate({ from, to, start, end, ease: Easing.easeOutQuart }),
  draw: (from, to, start, end) => animate({ from, to, start, end, ease: Easing.easeInOutCubic }),
  pop: (from, to, start, end) => animate({ from, to, start, end, ease: Easing.easeOutBack }),
};

function Bar({ w, h = 10, fill = G1, style }) {
  return React.createElement('div', {
    style: { width: w, height: h, borderRadius: h / 2, background: fill, ...style },
  });
}

function Avatar({ size = 48 }) {
  const s = size;
  return React.createElement(
    'div',
    {
      style: {
        width: s, height: s, borderRadius: s / 2, background: G1,
        position: 'relative', overflow: 'hidden', flex: '0 0 auto',
      },
    },
    React.createElement('div', {
      style: {
        position: 'absolute', left: s * 0.5 - s * 0.15, top: s * 0.2,
        width: s * 0.3, height: s * 0.3, borderRadius: '50%', background: INK,
      },
    }),
    React.createElement('div', {
      style: {
        position: 'absolute', left: s * 0.5 - s * 0.27, top: s * 0.58,
        width: s * 0.54, height: s * 0.44, borderRadius: `${s * 0.27}px ${s * 0.27}px 0 0`,
        background: INK,
      },
    })
  );
}

function ProfileCard({ label, x, y, w, h, lift, accent }) {
  return React.createElement(
    'div',
    {
      style: {
        position: 'absolute', left: 0, top: 0, width: w, height: h,
        transform: `translate3d(${x}px, ${y}px, 0)`,
        background: WHITE, borderRadius: 16, border: `1px solid ${BORDER}`,
        boxShadow: lift
          ? `0 2px 4px rgba(17,17,17,0.04), 0 18px 44px rgba(17,17,17,${0.06 + 0.05 * lift})`
          : SHADOW,
        display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px',
        boxSizing: 'border-box',
      },
    },
    React.createElement(Avatar, { size: 48 }),
    React.createElement(
      'div',
      { style: { display: 'flex', flexDirection: 'column', gap: 9 } },
      React.createElement(Bar, { w: 104, h: 11, fill: G2 }),
      React.createElement(Bar, { w: 64, h: 9, fill: G1 })
    ),
    React.createElement(
      'div',
      {
        style: {
          position: 'absolute', top: 14, right: 16,
          font: `600 11px/1 ${SANS}`, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: INK,
          background: BONE, border: `1px solid ${BORDER}`,
          borderRadius: 999, padding: '5px 10px 4px',
        },
      },
      label
    ),
    React.createElement('div', {
      style: {
        position: 'absolute', left: 0, bottom: 0, height: 2, width: '100%',
        borderRadius: '0 0 16px 16px', overflow: 'hidden',
      },
    }, React.createElement('div', {
      style: { height: '100%', width: `${accent * 100}%`, background: BLUE, opacity: 0.9 },
    }))
  );
}

function LinkGlyph({ cx, cy, scale, blue, spin }) {
  const s = 58;
  const ring = (dx, on) => React.createElement('div', {
    style: {
      position: 'absolute', left: s / 2 + dx - 11, top: s / 2 - 11,
      width: 22, height: 22, borderRadius: 11,
      border: `3px solid ${on ? BLUE : INK}`,
      opacity: on ? 1 : 0.85,
      transition: 'none',
    },
  });
  return React.createElement(
    'div',
    {
      style: {
        position: 'absolute', left: cx - s / 2, top: cy - s / 2, width: s, height: s,
        transform: `scale(${scale}) rotate(${spin}deg)`, opacity: clamp(scale * 1.6, 0, 1),
        background: WHITE, borderRadius: 19, border: `1px solid ${BORDER}`,
        boxShadow: `0 2px 6px rgba(17,17,17,0.05), 0 14px 34px rgba(0,40,250,${0.05 + 0.13 * blue})`,
      },
    },
    ring(-6, blue > 0.5),
    ring(6, blue > 0.15),
    React.createElement('div', {
      style: {
        position: 'absolute', inset: -10, borderRadius: 26,
        border: `1px solid ${BLUE}`, opacity: 0.22 * blue * (1 - blue) * 4,
        transform: `scale(${1 + 0.22 * blue})`,
      },
    })
  );
}

function Icon({ kind, on }) {
  const c = on ? BLUE : INK;
  const common = { fill: 'none', stroke: c, strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    like: 'M9 15.4S2.6 11.7 2.6 7.4A3.5 3.5 0 0 1 9 5.5a3.5 3.5 0 0 1 6.4 1.9c0 4.3-6.4 8-6.4 8Z',
    comment: 'M15.6 9.2c0 3.1-2.9 5.6-6.6 5.6-.9 0-1.7-.1-2.5-.4l-3.5 1.2 1.1-2.7A5.3 5.3 0 0 1 2.4 9.2C2.4 6.1 5.4 3.6 9 3.6s6.6 2.5 6.6 5.6Z',
    share: 'M3 9.6 15 4l-4.6 11.6-2-4.9-5.4-1.1Z',
  };
  return React.createElement(
    'svg',
    { width: 19, height: 19, viewBox: '0 0 18 18', style: { display: 'block' } },
    React.createElement('path', {
      d: paths[kind], ...common,
      fill: kind === 'like' && on ? BLUE : 'none',
      opacity: on ? 1 : 0.8,
    })
  );
}

function PostCard({ x, y, w, h, p, lines, engage, likeOn, count }) {
  return React.createElement(
    'div',
    {
      style: {
        position: 'absolute', left: 0, top: 0, width: w, height: h,
        transform: `translate3d(${x}px, ${y + (1 - p) * 26}px, 0) scale(${0.97 + 0.03 * p})`,
        transformOrigin: '50% 0%', opacity: p,
        background: WHITE, borderRadius: 16, border: `1px solid ${BORDER}`,
        boxShadow: SHADOW, padding: 18, boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', gap: 14,
      },
    },
    // header: overlapping brand + creator avatars, greeked name, partner tag
    React.createElement(
      'div',
      { style: { display: 'flex', alignItems: 'center', gap: 12 } },
      React.createElement(
        'div',
        { style: { display: 'flex', alignItems: 'center', flex: '0 0 auto' } },
        React.createElement('div', {
          style: { boxShadow: `0 0 0 3px ${WHITE}`, borderRadius: 17, zIndex: 2 },
        }, React.createElement(Avatar, { size: 34 })),
        React.createElement('div', {
          style: { marginLeft: -11, boxShadow: `0 0 0 3px ${WHITE}`, borderRadius: 17 },
        }, React.createElement(Avatar, { size: 34 }))
      ),
      React.createElement(
        'div',
        { style: { display: 'flex', flexDirection: 'column', gap: 7 } },
        React.createElement(Bar, { w: 132, h: 10, fill: G2 }),
        React.createElement(Bar, { w: 76, h: 8, fill: G1 })
      ),
      React.createElement(
        'div',
        {
          style: {
            marginLeft: 'auto', font: `600 10px/1 ${SANS}`, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: BLUE,
            background: 'rgba(0,40,250,0.06)', border: '1px solid rgba(0,40,250,0.16)',
            borderRadius: 999, padding: '5px 10px 4px',
          },
        },
        'Partner post'
      )
    ),
    React.createElement(
      'div',
      {
        style: {
          height: 118, borderRadius: 10, background: G1, position: 'relative',
          overflow: 'hidden', flex: '0 0 auto',
        },
      },
      React.createElement('div', {
        style: {
          position: 'absolute', left: 26, bottom: 0, width: 120, height: 74,
          borderRadius: '60px 60px 0 0', background: G2,
        },
      }),
      React.createElement('div', {
        style: {
          position: 'absolute', left: 132, bottom: 0, width: 200, height: 96,
          borderRadius: '100px 100px 0 0', background: '#C7C5BC',
        },
      }),
      React.createElement('div', {
        style: {
          position: 'absolute', right: 34, top: 20, width: 34, height: 34,
          borderRadius: 17, background: G2,
        },
      })
    ),
    React.createElement(
      'div',
      { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
      [520, 380].map((w0, i) =>
        React.createElement(Bar, {
          key: i, w: w0 * lines[i], h: i === 0 ? 11 : 9,
          fill: i === 0 ? G2 : G1,
          style: { opacity: clamp(lines[i] * 2, 0, 1) },
        })
      )
    ),
    // engagement row
    React.createElement(
      'div',
      {
        style: {
          marginTop: 'auto', paddingTop: 14, borderTop: `1px solid ${BORDER}`,
          display: 'flex', alignItems: 'center', gap: 22,
          opacity: clamp(engage, 0, 1),
          transform: `translate3d(0, ${(1 - clamp(engage, 0, 1)) * 8}px, 0)`,
        },
      },
      React.createElement(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: 9 } },
        React.createElement('div', {
          style: { transform: `scale(${1 + 0.22 * likeOn * (1 - likeOn) * 4})` },
        }, React.createElement(Icon, { kind: 'like', on: likeOn > 0.35 })),
        React.createElement('div', {
          style: {
            font: `600 12px/1 ${SANS}`, letterSpacing: '0.02em',
            color: likeOn > 0.35 ? BLUE : 'rgba(17,17,17,0.45)',
            fontVariantNumeric: 'tabular-nums', minWidth: 30,
          },
        }, String(count))
      ),
      React.createElement(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: 9 } },
        React.createElement(Icon, { kind: 'comment' }),
        React.createElement(Bar, { w: 22, h: 8, fill: G1 })
      ),
      React.createElement(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: 9 } },
        React.createElement(Icon, { kind: 'share' }),
        React.createElement(Bar, { w: 22, h: 8, fill: G1 })
      ),
      React.createElement('div', {
        style: {
          marginLeft: 'auto', width: 8, height: 8, borderRadius: 4, background: BLUE,
          opacity: 0.55 + 0.45 * likeOn,
        },
      })
    )
  );
}

function CreatorLink() {
  const { T, CUES, authoredTotal } = useComposition();
  const total = authoredTotal || 8.6;

  const CW = 280, CH = 112, CY = 214;
  const restL = 116, restR = 1200 - 116 - CW;
  const meetL = 600 - 56 - CW, meetR = 600 + 56;

  const inL = MOTION.enter(restL, meetL, CUES.Approach, CUES.Approach + 1.55)(T);
  const inR = MOTION.enter(restR, meetR, CUES.Approach + 0.1, CUES.Approach + 1.65)(T);
  const outL = MOTION.draw(meetL, restL, CUES.Reset + 0.22, total)(T);
  const outR = MOTION.draw(meetR, restR, CUES.Reset + 0.28, total)(T);
  const resetting = T >= CUES.Reset + 0.22;
  const xL = resetting ? outL : inL;
  const xR = resetting ? outR : inR;

  const breathe = Math.sin((T / total) * Math.PI * 2);
  const drift = breathe * 2.5;

  const linkIn = MOTION.pop(0, 1, CUES.Link + 0.02, CUES.Link + 0.68)(T);
  const linkOut = MOTION.draw(1, 0, CUES.Reset, CUES.Reset + 0.36)(T);
  const linkS = T >= CUES.Reset ? linkOut : linkIn;
  const blueIn = MOTION.draw(0, 1, CUES.Link + 0.28, CUES.Link + 0.82)(T);
  const blue = T >= CUES.Reset ? Math.min(blueIn, linkOut) : blueIn;
  const spin = MOTION.pop(-14, 0, CUES.Link + 0.02, CUES.Link + 0.78)(T);

  const railL = MOTION.draw(0, 1, CUES.Link - 0.12, CUES.Link + 0.36)(T);
  const railOut = MOTION.draw(1, 0, CUES.Reset, CUES.Reset + 0.3)(T);
  const rail = T >= CUES.Reset ? railOut : railL;

  const postIn = MOTION.enter(0, 1, CUES.Post + 0.08, CUES.Post + 0.78)(T);
  const postOut = MOTION.draw(1, 0, CUES.Reset + 0.04, CUES.Reset + 0.5)(T);
  const postP = T >= CUES.Reset ? postOut : postIn;
  const lines = [0, 1].map((i) => {
    const v = MOTION.enter(0, 1, CUES.Post + 0.34 + i * 0.12, CUES.Post + 0.94 + i * 0.12)(T);
    return T >= CUES.Reset ? v * postOut : v;
  });
  const engageIn = MOTION.enter(0, 1, CUES.Post + 0.82, CUES.Post + 1.34)(T);
  const engage = T >= CUES.Reset ? engageIn * postOut : engageIn;
  const likeOn = T >= CUES.Reset ? 0 : MOTION.pop(0, 1, CUES.Post + 1.4, CUES.Post + 1.82)(T);
  const count = Math.round(MOTION.draw(0, 248, CUES.Post + 1.4, CUES.Hold + 0.95)(T));

  // camera: gentle push toward the link, unwinding by the loop seam
  const zoomIn = MOTION.draw(1, 1.075, CUES.Link - 0.35, CUES.Link + 0.78)(T);
  const zoomOut = MOTION.draw(1.075, 1, CUES.Post - 0.25, CUES.Post + 1.0)(T);
  const camZ = (T >= CUES.Post - 0.25 ? zoomOut : zoomIn) + 0.012 * (1 - Math.cos((T / total) * Math.PI * 2)) / 2;
  const camY = (400 - 270) * (camZ - 1);

  // the pair sits centred until the post needs the room below it
  const liftIn = MOTION.draw(96, 0, CUES.Link + 0.5, CUES.Post - 0.05)(T);
  const liftOut = MOTION.draw(0, 96, CUES.Reset + 0.55, total)(T);
  const groupY = T >= CUES.Reset + 0.55 ? liftOut : liftIn;

  const rails = React.createElement(
    'div',
    { style: { position: 'absolute', left: 0, top: 0 } },
    [-1, 1].map((dir) =>
      React.createElement('div', {
        key: dir,
        style: {
          position: 'absolute', height: 3, borderRadius: 2,
          top: CY + CH / 2 + drift - 1.5,
          left: dir < 0 ? 544 : 656 - 27 * rail,
          width: 27 * rail,
          background: `linear-gradient(${dir < 0 ? 90 : 270}deg, ${G2}, ${BLUE})`,
          opacity: 0.25 + 0.75 * blue,
        },
      })
    )
  );

  return React.createElement(
    'div',
    {
      style: {
        position: 'absolute', inset: 0, background: BONE, overflow: 'hidden',
        fontFamily: SANS,
      },
    },
    React.createElement(
      'div',
      {
        style: {
          position: 'absolute', inset: 0,
          transform: `translate3d(0, ${camY}px, 0) scale(${camZ})`,
          transformOrigin: '600px 400px',
        },
      },
      React.createElement('div', {
        style: {
          position: 'absolute', inset: 0,
          transform: `translate3d(0, ${groupY}px, 0)`,
        },
      },
      rails,
      React.createElement(ProfileCard, {
        label: 'Brand', x: xL, y: CY + drift, w: CW, h: CH,
        lift: clamp(linkS, 0, 1), accent: clamp(blue, 0, 1),
      }),
      React.createElement(ProfileCard, {
        label: 'Creator', x: xR, y: CY - drift, w: CW, h: CH,
        lift: clamp(linkS, 0, 1), accent: clamp(blue, 0, 1),
      }),
      React.createElement(LinkGlyph, {
        cx: 600, cy: CY + CH / 2, scale: clamp(linkS, 0, 1.08), blue: clamp(blue, 0, 1), spin,
      }),
      React.createElement(PostCard, {
        x: meetL, y: 380, w: 672, h: 352, p: clamp(postP, 0, 1), lines,
        engage, likeOn: clamp(likeOn, 0, 1), count,
      })
      )
    )
  );
}

window.CreatorLink = CreatorLink;
