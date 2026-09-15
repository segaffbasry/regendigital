import IndustryStatCount from "./IndustryStatCount";
import IndustryGrowthPlot from "./IndustryGrowthPlot";
import AiResearchGraphic from "./AiResearchGraphic";
import BuyingCommitteeGraphic from "./BuyingCommitteeGraphic";

function StatFrame({ children, variant = "", viewBox = "0 0 520 260" }) {
  return (
    <div className={`industry-stat-visual industry-stat-visual--illustration industry-stat-visual--clean ${variant}`} aria-hidden="true">
      <svg viewBox={viewBox} role="presentation">{children}</svg>
    </div>
  );
}

function PercentageDial({ value, label, lifted = true }) {
  // Match the approved SaaS asset's canvas, ring, corner radius and lifted slice.
  const outer = 514.5;
  const inner = 309.594;
  const corner = 42.91;
  const sweep = (value / 100) * Math.PI * 2;
  const start = -Math.PI / 2 - (lifted ? sweep : 0);
  const end = start + sweep;
  const middle = (start + end) / 2;
  // A majority segment stays concentric so it does not overlap the inner opening.
  const lift = lifted ? (outer - inner) / 2 : 0;
  const point = (radius, angle) => `${radius * Math.cos(angle)} ${radius * Math.sin(angle)}`;
  const outerTrim = corner / outer;
  const innerTrim = corner / inner;
  // Round inward at the four corners, keeping the radial edges exactly value% apart.
  const segment = [
    `M ${point(outer - corner, start)}`,
    `Q ${point(outer, start)} ${point(outer, start + outerTrim)}`,
    `A ${outer} ${outer} 0 ${sweep - 2 * outerTrim > Math.PI ? 1 : 0} 1 ${point(outer, end - outerTrim)}`,
    `Q ${point(outer, end)} ${point(outer - corner, end)}`,
    `L ${point(inner + corner, end)}`,
    `Q ${point(inner, end)} ${point(inner, end - innerTrim)}`,
    `A ${inner} ${inner} 0 ${sweep - 2 * innerTrim > Math.PI ? 1 : 0} 0 ${point(inner, start + innerTrim)}`,
    `Q ${point(inner, start)} ${point(inner + corner, start)} Z`,
  ].join(" ");

  return (
    <StatFrame variant="industry-stat-visual--dial" viewBox="0 0 2000 1161">
      <circle className="stat-clean-track" cx="944.5" cy="620.5"
        r={(outer + inner) / 2} strokeWidth={outer - inner} />
      <g className="stat-dial-sweep">
        <path className="stat-clean-progress" d={segment}
          transform={`translate(${944.5 + lift * Math.cos(middle)} ${620.5 + lift * Math.sin(middle)})`} />
      </g>
      <g className="stat-dial-number">
        <text className="stat-clean-number" x="944.5" y={label ? 636.906 : 667.5} textAnchor="middle">{value}%</text>
      </g>
      {label ? <text className="stat-clean-label" x="944.5" y="725.148" textAnchor="middle">{label}</text> : null}
    </StatFrame>
  );
}

function ScrutinyDial() {
  return (
    <StatFrame variant="industry-stat-visual--dial" viewBox="0 0 2000 1161">
      <path fill="#EEF0E5" d="M1465.5 581.251C1465.5 838.477 1256.97 1047 999.749 1047C742.523 1047 534 838.477 534 581.251C534 324.025 742.523 115.502 999.749 115.502C1256.97 115.502 1465.5 324.025 1465.5 581.251ZM719.49 581.251C719.49 736.033 844.966 861.51 999.749 861.51C1154.53 861.51 1280.01 736.033 1280.01 581.251C1280.01 426.468 1154.53 300.992 999.749 300.992C844.966 300.992 719.49 426.468 719.49 581.251Z" />
      <g className="stat-dial-sweep stat-scrutiny-sweep">
        <path fill="#0C27F0" d="M651.369 930.199C636.2 945.369 636.112 970.084 652.347 984.107C701.043 1026.17 757.048 1059.12 817.69 1081.27C890.518 1107.87 968.276 1118.23 1045.53 1111.64C1122.78 1105.05 1197.66 1081.67 1264.93 1043.12C1332.2 1004.57 1390.23 951.794 1434.98 888.477C1479.72 825.16 1510.1 752.833 1523.97 676.553C1537.85 600.273 1534.9 521.883 1515.32 446.864C1495.74 371.846 1460.01 302.01 1410.62 242.241C1369.5 192.472 1319.74 150.683 1263.83 118.824C1245.19 108.202 1221.92 116.536 1212.69 135.9L1171.27 222.755C1162.03 242.119 1170.38 265.128 1188.63 276.403C1221.85 296.924 1251.57 322.784 1276.55 353.018C1309.8 393.258 1333.86 440.276 1347.04 490.784C1360.22 541.291 1362.21 594.069 1352.87 645.426C1343.52 696.782 1323.08 745.478 1292.95 788.107C1262.82 830.736 1223.75 866.269 1178.46 892.222C1133.17 918.175 1082.76 933.92 1030.74 938.357C978.734 942.794 926.382 935.815 877.35 917.908C840.51 904.455 806.213 885.076 775.779 860.616C759.058 847.176 734.581 846.987 719.412 862.157L651.369 930.199Z" />
      </g>
      <g className="stat-dial-number">
        <path fill="#000" d="M946.745 547.341H908.744L905.063 568.248L905.326 568.511C907.868 565.969 910.585 564.172 913.478 563.12C916.371 561.981 919.658 561.411 923.34 561.411C927.898 561.411 931.93 562.244 935.437 563.909C938.943 565.575 941.88 567.81 944.247 570.615C946.701 573.42 948.542 576.751 949.769 580.608C951.084 584.378 951.742 588.41 951.742 592.705C951.742 597.439 950.821 601.866 948.98 605.986C947.139 610.018 944.641 613.525 941.485 616.505C938.417 619.486 934.823 621.809 930.703 623.474C926.583 625.052 922.2 625.797 917.554 625.709C913.084 625.709 908.788 625.14 904.668 624C900.636 622.773 897.042 620.932 893.886 618.477C890.73 616.023 888.188 612.999 886.26 609.405C884.419 605.723 883.454 601.471 883.367 596.65H902.038C902.477 600.858 904.055 604.233 906.772 606.775C909.489 609.229 912.952 610.457 917.16 610.457C919.614 610.457 921.806 609.974 923.734 609.01C925.75 607.958 927.416 606.643 928.731 605.065C930.133 603.4 931.185 601.515 931.887 599.411C932.676 597.22 933.07 594.985 933.07 592.705C933.07 590.339 932.719 588.103 932.018 585.999C931.317 583.896 930.265 582.055 928.862 580.477C927.46 578.899 925.794 577.672 923.866 576.795C921.937 575.919 919.702 575.48 917.16 575.48C913.829 575.48 911.111 576.094 909.007 577.321C906.904 578.461 904.931 580.302 903.09 582.844H886.26L895.332 531.957H946.745V547.341ZM976.68 556.94C976.68 560.885 978.083 563.909 980.888 566.013C983.693 568.029 986.981 569.037 990.75 569.037C994.695 569.037 997.982 568.029 1000.61 566.013C1003.24 563.909 1004.56 560.885 1004.56 556.94C1004.56 555.713 1004.38 554.398 1004.03 552.995C1003.68 551.505 1002.98 550.103 1001.93 548.788C1000.96 547.473 999.56 546.377 997.719 545.501C995.966 544.624 993.643 544.186 990.75 544.186C988.909 544.186 987.112 544.492 985.359 545.106C983.693 545.632 982.203 546.421 980.888 547.473C979.573 548.525 978.521 549.84 977.732 551.418C977.031 552.995 976.68 554.836 976.68 556.94ZM959.718 555.231C959.718 551.111 960.639 547.473 962.48 544.317C964.32 541.161 966.687 538.532 969.58 536.428C972.56 534.324 975.892 532.746 979.573 531.694C983.255 530.642 986.981 530.116 990.75 530.116C996.448 530.116 1001.27 530.993 1005.21 532.746C1009.16 534.499 1012.31 536.647 1014.68 539.189C1017.14 541.643 1018.89 544.317 1019.94 547.21C1020.99 550.015 1021.52 552.557 1021.52 554.836C1021.52 559.395 1020.38 563.383 1018.1 566.802C1015.91 570.221 1012.58 572.675 1008.11 574.165V574.428C1013.63 575.656 1017.88 578.285 1020.86 582.318C1023.84 586.262 1025.33 591.128 1025.33 596.913C1025.33 601.822 1024.32 606.074 1022.31 609.668C1020.38 613.262 1017.79 616.242 1014.55 618.609C1011.31 620.976 1007.62 622.773 1003.5 624C999.384 625.14 995.177 625.709 990.881 625.709C986.411 625.709 982.072 625.14 977.864 624C973.744 622.948 970.018 621.239 966.687 618.872C963.444 616.505 960.814 613.525 958.798 609.931C956.869 606.337 955.905 602.041 955.905 597.045C955.905 591.171 957.395 586.262 960.376 582.318C963.444 578.373 967.739 575.743 973.262 574.428V574.165C968.791 572.938 965.416 570.615 963.137 567.196C960.858 563.778 959.718 559.789 959.718 555.231ZM974.577 596.124C974.577 598.491 975.015 600.639 975.892 602.567C976.768 604.496 977.908 606.161 979.31 607.564C980.8 608.879 982.554 609.931 984.57 610.72C986.586 611.421 988.69 611.771 990.881 611.771C993.161 611.771 995.221 611.421 997.061 610.72C998.99 609.931 1000.66 608.879 1002.06 607.564C1003.55 606.161 1004.69 604.496 1005.48 602.567C1006.27 600.639 1006.66 598.535 1006.66 596.256C1006.66 594.064 1006.22 592.092 1005.35 590.339C1004.56 588.498 1003.42 586.92 1001.93 585.605C1000.52 584.29 998.858 583.282 996.93 582.581C995.089 581.879 993.073 581.529 990.881 581.529C986.323 581.529 982.466 582.8 979.31 585.342C976.155 587.796 974.577 591.391 974.577 596.124ZM1118.25 600.069C1118.25 601.471 1118.29 603.093 1118.38 604.934C1118.47 606.775 1118.78 608.528 1119.3 610.194C1119.83 611.771 1120.66 613.13 1121.8 614.27C1122.94 615.409 1124.56 615.979 1126.67 615.979C1128.68 615.979 1130.26 615.409 1131.4 614.27C1132.63 613.13 1133.5 611.771 1134.03 610.194C1134.64 608.528 1134.99 606.819 1135.08 605.065C1135.26 603.225 1135.34 601.603 1135.34 600.2C1135.34 598.885 1135.26 597.351 1135.08 595.598C1134.99 593.757 1134.69 592.048 1134.16 590.47C1133.64 588.805 1132.8 587.402 1131.66 586.262C1130.61 585.035 1129.12 584.422 1127.19 584.422C1125.09 584.422 1123.42 584.948 1122.2 585.999C1121.06 587.051 1120.18 588.366 1119.57 589.944C1118.95 591.522 1118.56 593.231 1118.38 595.072C1118.29 596.913 1118.25 598.579 1118.25 600.069ZM1104.84 599.937C1104.84 596.343 1105.28 593.012 1106.15 589.944C1107.03 586.876 1108.39 584.202 1110.23 581.923C1112.07 579.644 1114.39 577.847 1117.2 576.532C1120 575.217 1123.34 574.56 1127.19 574.56C1131.31 574.56 1134.73 575.261 1137.45 576.664C1140.17 577.979 1142.36 579.819 1144.02 582.186C1145.78 584.465 1147 587.183 1147.7 590.339C1148.41 593.494 1148.76 596.869 1148.76 600.463C1148.76 604.057 1148.32 607.388 1147.44 610.457C1146.57 613.525 1145.21 616.198 1143.37 618.477C1141.61 620.757 1139.33 622.554 1136.53 623.869C1133.72 625.096 1130.39 625.709 1126.53 625.709C1122.5 625.709 1119.08 625.052 1116.28 623.737C1113.56 622.422 1111.33 620.625 1109.57 618.346C1107.91 615.979 1106.68 613.218 1105.89 610.062C1105.19 606.906 1104.84 603.531 1104.84 599.937ZM1114.96 529.064H1126.14L1071.97 626.761H1060.53L1114.96 529.064ZM1050.4 556.414C1050.4 557.817 1050.45 559.395 1050.53 561.148C1050.62 562.901 1050.93 564.567 1051.45 566.144C1051.98 567.635 1052.81 568.906 1053.95 569.958C1055.09 571.01 1056.71 571.536 1058.82 571.536C1060.83 571.536 1062.41 571.01 1063.55 569.958C1064.78 568.906 1065.65 567.635 1066.18 566.144C1066.79 564.567 1067.15 562.945 1067.23 561.279C1067.41 559.526 1067.5 557.948 1067.5 556.546C1067.5 555.231 1067.41 553.653 1067.23 551.812C1067.15 549.884 1066.84 548.043 1066.31 546.289C1065.79 544.536 1064.95 543.046 1063.81 541.819C1062.76 540.592 1061.27 539.978 1059.34 539.978C1057.24 539.978 1055.57 540.548 1054.35 541.687C1053.21 542.827 1052.33 544.229 1051.72 545.895C1051.1 547.561 1050.71 549.358 1050.53 551.286C1050.45 553.215 1050.4 554.924 1050.4 556.414ZM1036.99 556.151C1036.99 552.557 1037.43 549.182 1038.31 546.026C1039.18 542.871 1040.54 540.109 1042.38 537.743C1044.22 535.376 1046.55 533.535 1049.35 532.22C1052.16 530.817 1055.49 530.116 1059.34 530.116C1063.46 530.116 1066.88 530.817 1069.6 532.22C1072.32 533.623 1074.51 535.551 1076.17 538.006C1077.93 540.372 1079.15 543.178 1079.86 546.421C1080.56 549.664 1080.91 553.083 1080.91 556.677C1080.91 560.271 1080.47 563.602 1079.59 566.67C1078.72 569.651 1077.36 572.237 1075.52 574.428C1073.76 576.62 1071.48 578.329 1068.68 579.556C1065.87 580.784 1062.54 581.397 1058.69 581.397C1054.65 581.397 1051.23 580.784 1048.43 579.556C1045.71 578.242 1043.48 576.488 1041.72 574.297C1040.06 572.018 1038.83 569.344 1038.04 566.276C1037.34 563.12 1036.99 559.745 1036.99 556.151Z" />
      </g>
    </StatFrame>
  );
}

function GrowthComparison() {
  return (
    <StatFrame viewBox="0 0 520 301.86">
      <text className="stat-clean-number" x="260" y="82" textAnchor="middle">4×</text>
      <text className="stat-clean-label" x="260" y="106.04" textAnchor="middle">faster growth</text>
      <text className="stat-clean-small" x="54" y="158">Peers</text>
      <rect className="stat-clean-surface" x="196" y="140" width="65" height="24" rx="12" />
      <text className="stat-clean-small" x="54" y="208">High-growth firms</text>
      <rect className="stat-growth-bar" x="196" y="190" width="260" height="24" rx="12" fill="var(--blue)" />
    </StatFrame>
  );
}

function ExpertiseGraphic() {
  return (
    <StatFrame viewBox="0 0 520 301.86">
      <IndustryStatCount className="stat-clean-number" value={75} x="260" y="122" textAnchor="middle" />
      <text className="stat-clean-label" x="260" y="146.04" textAnchor="middle">of buyers</text>
      <rect className="stat-clean-surface" x="70" y="188" width="380" height="20" rx="10" />
      <rect className="stat-expertise-bar" x="70" y="188" width="285" height="20" rx="10" fill="var(--blue)" />
    </StatFrame>
  );
}

const statVisuals = {
  "saas-cost": (
    <div className="industry-stat-visual industry-stat-visual--asset industry-stat-visual--asset-cost" aria-hidden="true">
      <img src="/asset/Winning%20Customers%20Costs%20More.svg" alt="" />
    </div>
  ),
  "saas-market": (
    <div className="industry-stat-visual industry-stat-visual--asset industry-stat-visual--asset-market" aria-hidden="true">
      <img src="/asset/AI%20Huge%2C%20Crowd%20Market.svg" alt="" />
    </div>
  ),
  "saas-journey": (
    <div className="industry-stat-visual industry-stat-visual--asset industry-stat-visual--asset-journey" aria-hidden="true">
      <img src="/asset/Buyers%20Decide%20Without%20You.svg" alt="" />
    </div>
  ),
  "professional-clarity": <PercentageDial value={15} />,
  "professional-growth": <GrowthComparison />,
  "professional-expertise": <ExpertiseGraphic />,
  "tech-committee": <BuyingCommitteeGraphic />,
  "tech-spend": <IndustryGrowthPlot type="tech" />,
  "tech-budget": <PercentageDial value={7.7} label="of revenue" />,
  "ai-scrutiny": <ScrutinyDial />,
  "ai-market": <IndustryGrowthPlot type="ai" />,
  "ai-research": <AiResearchGraphic />,
};

export function IndustryStats({ stats }) {
  if (!stats?.cards?.length) return null;

  return (
    <section className="industry-stats" aria-labelledby="industry-stats-title">
      <header>
        <p className="editorial-kicker">The market now</p>
        <h2 id="industry-stats-title">{stats.title}</h2>
      </header>
      <div className="industry-stats__grid">
        {stats.cards.map((card) => (
          <article className={`industry-stat-card industry-stat-card--${card.visual}`} key={card.heading}>
            {statVisuals[card.visual]}
            <div className="industry-stat-card__copy">
              <h3>{card.heading}</h3>
              <p>{card.copy}</p>
              <span className="industry-stat-card__source">Source · {card.source}</span>
            </div>
          </article>
        ))}
      </div>
      <a className="editorial-link cta-button industry-stats__cta" href="/audit">
        <span>Get Your Free Marketing Audit</span><span className="cta-arrow" aria-hidden="true" />
      </a>
    </section>
  );
}

function IndustryRealityTitle({ title }) {
  const marker = title.toLocaleLowerCase().lastIndexOf(" of ");

  if (marker === -1) return title;

  const industryStart = marker + 4;
  return (
    <>
      {title.slice(0, industryStart)}
      <em>{title.slice(industryStart)}</em>
    </>
  );
}

export function IndustryRealities({ realities }) {
  if (!realities?.items?.length) return null;

  return (
    <section className="industry-realities" aria-labelledby="industry-realities-title">
      <div className="industry-realities__panel">
        <header>
          <h2 id="industry-realities-title"><IndustryRealityTitle title={realities.title} /></h2>
        </header>
        <div className="industry-realities__grid">
          {realities.items.map((item, index) => (
            <article key={item.heading}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.heading}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
