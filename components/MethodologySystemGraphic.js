function AuditGraphic() {
  return (
    <svg viewBox="0 0 320 220" fill="none" aria-hidden="true">
      <circle className="method-illustration__ring" cx="160" cy="110" r="86" strokeWidth="24" />
      <circle className="method-illustration__ring" cx="160" cy="110" r="48" strokeWidth="22" />
      <path className="method-illustration__sweep method-illustration__orbit" d="M160 24A86 86 0 0 1 246 110" strokeWidth="24" strokeLinecap="round" />
      <circle cx="160" cy="110" r="18" fill="currentColor" />
    </svg>
  );
}

function TestGraphic() {
  return (
    <svg viewBox="0 0 320 220" fill="none" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5].map((tile) => (
        <rect
          key={tile}
          className={`method-illustration__tile${tile === 4 ? " method-illustration__tile--proven" : ""}`}
          x={20 + (tile % 3) * 98}
          y={19 + Math.floor(tile / 3) * 98}
          width="84"
          height="84"
          rx="16"
          style={{ "--drift-delay": `${(tile % 3) * .5}s` }}
        />
      ))}
    </svg>
  );
}

function AmplifyGraphic() {
  return (
    <svg viewBox="0 0 320 220" fill="none" aria-hidden="true">
      {[46, 74, 104, 134, 164].map((height, index) => (
        <rect
          key={height}
          className={`method-illustration__column${index > 1 ? " method-illustration__column--live" : ""}`}
          x={22 + index * 58}
          y={186 - height}
          width="44"
          height={height}
          rx="12"
          style={{ "--rise-delay": `${index * .12}s` }}
        />
      ))}
    </svg>
  );
}

export { AuditGraphic, TestGraphic, AmplifyGraphic };

/* Scattered signals converge into one measurable input. */
function LoopInputs() {
  return (
    <svg viewBox="0 0 400 120" fill="none" aria-hidden="true">
      <path className="method-loop__ink" d="M25 16C74 16 96 34 133 56" strokeWidth="2.5" />
      <path className="method-loop__ink" d="M25 45C74 45 100 52 133 58" strokeWidth="2.5" />
      <path className="method-loop__ink" d="M25 75C74 75 100 68 133 62" strokeWidth="2.5" />
      <path className="method-loop__ink" d="M25 104C74 104 96 86 133 64" strokeWidth="2.5" />
      {[16, 45, 75, 104].map((cy) => (
        <circle className="method-loop__fill" key={cy} cx="18" cy={cy} r="7" />
      ))}
      <circle className="method-loop__ink" cx="148" cy="60" r="14" strokeWidth="6" />
      {[205, 252, 299].map((cx) => (
        <g key={cx}>
          <circle className="method-loop__fill" cx={cx} cy="38" r="3.5" />
          <circle className="method-loop__fill" cx={cx} cy="82" r="3.5" />
        </g>
      ))}
    </svg>
  );
}

/* Readouts feed a graduated dial that settles on one position. */
function LoopAudit() {
  const cx = 290;
  const cy = 60;
  const point = (angle, radius) => [
    (cx + radius * Math.cos((angle * Math.PI) / 180)).toFixed(1),
    (cy + radius * Math.sin((angle * Math.PI) / 180)).toFixed(1),
  ];

  return (
    <svg viewBox="0 0 400 120" fill="none" aria-hidden="true">
      <rect className="method-loop__fill" x="14" y="22" width="84" height="11" rx="5.5" />
      <rect x="14" y="44" width="110" height="11" rx="5.5" fill="currentColor" />
      <rect className="method-loop__fill" x="14" y="66" width="68" height="11" rx="5.5" />
      <rect className="method-loop__fill" x="14" y="88" width="96" height="11" rx="5.5" />
      <path className="method-loop__ink" d="M138 60H214" strokeWidth="2.5" strokeDasharray="2 9" strokeLinecap="round" />
      {[...Array(12)].map((_, index) => {
        const angle = index * 30 - 90;
        const [x1, y1] = point(angle, 52);
        const [x2, y2] = point(angle, 59);
        return <path className="method-loop__ink" key={angle} d={`M${x1} ${y1}L${x2} ${y2}`} strokeWidth="2" strokeLinecap="round" />;
      })}
      <circle className="method-loop__ink" cx={cx} cy={cy} r="42" strokeWidth="12" />
      <path d={`M${cx} 18A42 42 0 0 1 ${point(30, 42).join(" ")}`} stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="14" fill="currentColor" />
    </svg>
  );
}

/* Many variants run; one earns the right to scale. */
function LoopTest() {
  return (
    <svg viewBox="0 0 400 120" fill="none" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5].map((tile) => {
        const candidate = tile === 4;
        return (
          <rect
            key={tile}
            className={candidate ? undefined : "method-loop__fill"}
            x={14 + (tile % 3) * 54}
            y={12 + Math.floor(tile / 3) * 52}
            width="44"
            height="44"
            rx="12"
            fill={candidate ? "currentColor" : undefined}
            fillOpacity={candidate ? ".35" : undefined}
          />
        );
      })}
      <path className="method-loop__ink" d="M186 60H268" strokeWidth="2.5" strokeDasharray="2 9" strokeLinecap="round" />
      <rect x="292" y="25" width="70" height="70" rx="19" fill="currentColor" />
      <path d="M311 60L322 71L343 47" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Proven signal compounds into a rising trend. */
function LoopAmplify() {
  const bars = [20, 27, 35, 44, 54, 63, 72];
  const opacity = [null, null, null, .5, .68, .84, 1];

  return (
    <svg viewBox="0 0 400 120" fill="none" aria-hidden="true">
      <path className="method-loop__ink" d="M14 106H386" strokeWidth="2" />
      {bars.map((height, index) => (
        <rect
          key={height}
          className={index < 3 ? "method-loop__fill" : undefined}
          x={14 + index * 46}
          y={100 - height}
          width="32"
          height={height}
          rx="9"
          fill={index < 3 ? undefined : "currentColor"}
          fillOpacity={opacity[index] ?? undefined}
        />
      ))}
      <path d="M22 66C120 56 250 30 356 8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M356 8L343 20M356 8L339 2" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const loopStages = [
  { number: "01", name: "Market signals", Graphic: LoopInputs },
  { number: "02", name: "Audit", Graphic: LoopAudit },
  { number: "03", name: "Test", Graphic: LoopTest },
  { number: "04", name: "Amplify", Graphic: LoopAmplify },
];

export default function MethodologySystemGraphic() {
  return (
    <section className="method-system" aria-labelledby="method-system-title">
      <div className="method-system__layout">
        <div className="method-system__copy">
          <p className="editorial-kicker">B2B growth architecture</p>
          <h2 id="method-system-title">A closed-loop <span className="method-system__heading-phrase">system for</span><br /><em>commercial learning.</em></h2>
          <div className="method-system__intro">
            <p>At Regen, we audit before we amplify.</p>
            <p>Most B2B marketing doesn&apos;t fail on tactics, it fails on foundations. Messaging that doesn&apos;t land, a target customer that&apos;s too broad, an offer nobody has pressure-tested. We audit what&apos;s already there, test it in market, then amplify only what the data proves. It&apos;s the method behind every result we&apos;ve produced.</p>
          </div>
        </div>

        <div className="method-loop">
          <ol className="method-loop__rail">
            <span className="method-loop__glow" aria-hidden="true" />
            {loopStages.map((stage) => (
              <li className={`method-loop__stage${stage.name === "Audit" ? " method-loop__stage--active" : ""}`} key={stage.name}>
                <div className="method-loop__stage-head">
                  <span className="method-loop__stage-index">{stage.number}</span>
                  <span className="method-loop__stage-name">{stage.name}</span>
                </div>
                <div className="method-loop__stage-visual"><stage.Graphic /></div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
