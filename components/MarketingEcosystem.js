const channels = [
  { key: "social", label: "Social", x: 405, y: 126, icon: "social" },
  { key: "paid", label: "Paid media", x: 527, y: 183, icon: "paid" },
  { key: "partnerships", label: "Partnerships", x: 357, y: 211, icon: "partnerships" },
  { key: "abm", label: "ABM", x: 580, y: 153, icon: "abm" },
  { key: "content", label: "Content", x: 659, y: 383, icon: "content" },
  { key: "email", label: "Email", x: 500, y: 434, icon: "email" },
  { key: "seo", label: "SEO", x: 405, y: 410, icon: "seo" },
];

function ChannelIcon({ type }) {
  if (type === "paid") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M3 11 7 7l2.5 2.5L13 6" />
        <path d="M9.5 6H13v3.5" />
      </svg>
    );
  }

  if (type === "partnerships") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M6.5 10.5 5 12a2.1 2.1 0 0 1-3-3l2-2a2.1 2.1 0 0 1 3 0" />
        <path d="m9.5 5.5 1.5-1.5a2.1 2.1 0 0 1 3 3l-2 2a2.1 2.1 0 0 1-3 0" />
        <path d="m6 10 4-4" />
      </svg>
    );
  }

  if (type === "content") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <rect x="3" y="2.5" width="10" height="11" rx="1.5" />
        <path d="M5.5 6h5M5.5 8.5h5M5.5 11h3" />
      </svg>
    );
  }

  if (type === "seo") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="7" cy="7" r="3.5" />
        <path d="m9.8 9.8 3 3" />
      </svg>
    );
  }

  if (type === "email") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
        <path d="m3 5 5 4 5-4" />
      </svg>
    );
  }

  if (type === "social") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="2" />
        <path d="M4.5 5.2a4.5 4.5 0 0 0 0 5.6M11.5 5.2a4.5 4.5 0 0 1 0 5.6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="3" />
      <circle cx="8" cy="8" r="6" />
    </svg>
  );
}

export default function MarketingEcosystem() {
  return (
    <div
      className="marketing-ecosystem"
      role="img"
      aria-label="Regen connecting social, paid media, partnerships, account-based marketing, content, email, and SEO into one marketing ecosystem"
    >
      <svg
        className="marketing-ecosystem__network"
        viewBox="0 0 1000 560"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <g className="marketing-ecosystem__globe">
          <ellipse cx="500" cy="280" rx="220" ry="205" />
          <ellipse cx="500" cy="280" rx="158" ry="205" />
          <ellipse cx="500" cy="280" rx="82" ry="205" />
          <ellipse cx="500" cy="280" rx="220" ry="145" />
          <ellipse cx="500" cy="280" rx="220" ry="75" />
          <ellipse cx="500" cy="280" rx="220" ry="22" />
        </g>
        <g className="marketing-ecosystem__connections">
          {channels.map((channel, index) => (
            <line
              key={channel.key}
              x1="500"
              y1="280"
              x2={channel.x}
              y2={channel.y}
              pathLength="1"
              style={{ "--connection-delay": `${index * 0.2}s` }}
            />
          ))}
        </g>
      </svg>

      {channels.map((channel, index) => (
        <span
          className={`marketing-ecosystem__node marketing-ecosystem__node--${channel.key}`}
          key={channel.key}
          style={{ "--node-delay": `${index * 0.2}s` }}
          aria-hidden="true"
        >
          <span className="marketing-ecosystem__node-icon">
            <ChannelIcon type={channel.icon} />
          </span>
          <span>{channel.label}</span>
        </span>
      ))}

      <span className="marketing-ecosystem__hub" aria-hidden="true">
        <span className="marketing-ecosystem__hub-ring" />
        <img src="/logo-regen.svg" alt="" />
      </span>
    </div>
  );
}
