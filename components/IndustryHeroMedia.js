/* An inline slot in the hero headline. Normally a single cropped photograph;
   where a page supplies `apps`, it renders a small stack of app-style tiles
   instead -- rounded squares, the last one sitting over the one before it. */
export default function IndustryHeroMedia({ media }) {
  if (media.apps?.length) {
    return (
      <span className="editorial-hero__apps" aria-hidden="true">
        {media.apps.map((app, index) => (
          <span
            className={`editorial-hero__app${app.placeholder ? " editorial-hero__app--empty" : ""}`}
            key={app.src || `placeholder-${index}`}
          >
            {app.src ? <img src={app.src} alt="" /> : null}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className="editorial-hero__media" aria-hidden="true">
      <img
        src={media.src}
        alt=""
        style={{ objectPosition: media.position, transform: `scale(${media.scale || 1})` }}
      />
    </span>
  );
}
