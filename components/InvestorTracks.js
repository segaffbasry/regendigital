export default function InvestorTracks({ tracks }) {
  if (!tracks?.items?.length) return null;

  return (
    <section className="investor-tracks" aria-labelledby="investor-tracks-title">
      <header>
        <p className="editorial-kicker">{tracks.kicker}</p>
        <h2 id="investor-tracks-title">
          {tracks.titleLead}
          {tracks.titleEmphasis ? <em>{tracks.titleEmphasis}</em> : null}
          {tracks.titleTail}
        </h2>
        {tracks.lede ? <p className="investor-tracks__lede">{tracks.lede}</p> : null}
      </header>
      <div className="investor-tracks__grid">
        {tracks.items.map((item) => (
          <article key={item.heading}>
            <p className="editorial-kicker">{item.kicker}</p>
            <h3>{item.heading}</h3>
            <p>{item.copy}</p>
            <ul>
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
