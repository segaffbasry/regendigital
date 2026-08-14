export default function IndustryHeroMedia({ media }) {
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
