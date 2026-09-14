export default function InvestorPartnershipHow({ partnership }) {
  if (!partnership?.items?.length) return null;

  return (
    <section
      className="investor-partnership-how"
      aria-labelledby="investor-partnership-how-title"
    >
      <header className="investor-partnership-how__header">
        {partnership.kicker ? (
          <p className="editorial-kicker">{partnership.kicker}</p>
        ) : null}
        <h2 id="investor-partnership-how-title">{partnership.title}</h2>
      </header>

      <div className="investor-partnership-how__grid">
        {partnership.items.map((item) => (
          <article key={item.number}>
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
