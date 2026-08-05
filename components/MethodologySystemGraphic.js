const inputs = ["ICP signal", "Category", "Product truth", "Pipeline data"];
const tests = ["Message", "Organic", "Search", "Paid"];
const outputs = ["Demand", "Qualified pipeline", "Revenue signal"];

export default function MethodologySystemGraphic() {
  return (
    <section className="method-system" aria-labelledby="method-system-title">
      <div className="method-system__bar">
        <span>REGEN METHOD / CONTROL LAYER</span>
        <span className="method-system__status"><i /> SYSTEM ONLINE</span>
      </div>

      <div className="method-system__heading">
        <div>
          <p className="editorial-kicker">B2B growth architecture</p>
          <h2 id="method-system-title">A closed-loop system for commercial learning.</h2>
        </div>
        <p>Every campaign produces a signal. Every signal improves the strategy. Nothing scales until the data proves it should.</p>
      </div>

      <div className="method-system__diagram">
        <div className="method-system__column method-system__column--inputs">
          <span className="method-system__label">01 / INPUTS</span>
          {inputs.map((item, index) => <span className="method-system__chip" key={item}><i>{String(index + 1).padStart(2, "0")}</i>{item}</span>)}
        </div>

        <div className="method-system__connector" aria-hidden="true"><span /><i /></div>

        <div className="method-system__engine method-system__engine--audit">
          <span className="method-system__label">02 / AUDIT</span>
          <div className="method-system__engine-core">
            <span>POSITION</span>
            <strong>STRATEGY</strong>
            <span>CHANNEL FIT</span>
          </div>
          <div className="method-system__scan" aria-hidden="true" />
        </div>

        <div className="method-system__connector" aria-hidden="true"><span /><i /></div>

        <div className="method-system__column method-system__column--tests">
          <span className="method-system__label">03 / TEST</span>
          <div className="method-system__test-grid">
            {tests.map((item) => <span key={item}>{item}<i /></span>)}
          </div>
        </div>

        <div className="method-system__connector" aria-hidden="true"><span /><i /></div>

        <div className="method-system__column method-system__column--outputs">
          <span className="method-system__label">04 / AMPLIFY</span>
          {outputs.map((item, index) => (
            <span className="method-system__output" key={item}>
              <i style={{ "--output-level": `${58 + index * 18}%` }} />
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="method-system__feedback">
        <span>COMMERCIAL FEEDBACK LOOP</span>
        <i />
        <span>LEARN</span>
        <span>REFINE</span>
        <span>REDEPLOY</span>
      </div>
    </section>
  );
}
