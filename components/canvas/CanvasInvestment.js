"use client";

import { useState } from "react";

const amounts = [100000, 500000, 1000000];
const format = (value) => new Intl.NumberFormat("en-US").format(value);

export default function CanvasInvestment() {
  const [views, setViews] = useState(100000);
  const performanceFee = views / 1000 * 1.3;

  return (
    <div className="canvas-calculator">
      <p className="canvas-eyebrow">A simple example</p>
      <h3>What does $1.30 CPM mean?</h3>
      <div className="canvas-calculator__choices" role="group" aria-label="Example view count">
        {amounts.map((amount) => <button key={amount} type="button" aria-pressed={views === amount} onClick={() => setViews(amount)}>{amount === 1000000 ? "1M" : `${amount / 1000}k`} views</button>)}
      </div>
      <div className="canvas-calculator__result" aria-live="polite" aria-atomic="true">
        <strong>${format(performanceFee)}</strong>
        <p>in creator performance fees<br />at {format(views)} views.</p>
      </div>
      <p className="canvas-fineprint">Illustrative view-based fee, added to the creator base fees and Regen management. Paid media spend is separate.</p>
    </div>
  );
}
