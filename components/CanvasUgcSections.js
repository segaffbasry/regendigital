import CanvasUgcVideo from "./CanvasUgcVideo";
import "../app/canvas-ugc.css";

export function ServiceSplit({ items }) {
  return (
    <nav className="service-split" aria-label="Two ways to work with creators">
      {items.map((item, index) => (
        <a className="service-split__item" href={`#${item.id}`} key={item.id}>
          <span className="service-split__index">{String(index + 1).padStart(2, "0")}</span>
          <strong>{item.label}</strong>
          <span className="service-split__summary">{item.summary}</span>
          <span className="service-split__detail">{item.detail}</span>
          <span className="service-split__arrow" aria-hidden="true">↓</span>
        </a>
      ))}
    </nav>
  );
}

function CanvasVideo({ video, index }) {
  if (video.src) {
    return <CanvasUgcVideo src={video.src} poster={video.poster} label={video.label || `Canvas UGC example ${index + 1}`} />;
  }

  return (
    <div className="canvas-ugc__video-placeholder" role="img" aria-label={`Canvas UGC example ${index + 1}, video coming soon`}>
      <span className="canvas-ugc__play" aria-hidden="true" />
      <span>Video {index + 1}</span>
    </div>
  );
}

export default function CanvasUgcSections({ canvas }) {
  return (
    <>
      <section className="canvas-ugc" id={canvas.id}>
        <header className="canvas-ugc__masthead">
          <span className="canvas-ugc__index">{canvas.index}</span>
          <h2 className="canvas-ugc__title">{canvas.title}</h2>
          <p className="canvas-ugc__tag">{canvas.tagline}</p>
        </header>

        <div className="canvas-ugc__intro">
          <h3 className="canvas-ugc__headline">{canvas.headline}<br /><em>{canvas.headlineEmphasis}</em></h3>
          <div className="canvas-ugc__copy">
            {canvas.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>

        <dl className="canvas-ugc__stats">
          {canvas.stats.map((stat) => (
            <div className="canvas-ugc__stat" key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>
                <strong>{stat.value}</strong>
                {stat.detail ? <span>{stat.detail}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="canvas-ugc-videos" aria-labelledby="canvas-ugc-videos-title">
        <header>
          <h2 id="canvas-ugc-videos-title">{canvas.videosTitle}<br /><em>{canvas.videosTitleEmphasis}</em></h2>
          <p>{canvas.videosIntro}</p>
        </header>
        <div className="canvas-ugc__videos">
          {canvas.videos.map((video, index) => (
            <figure className="canvas-ugc__video" key={video.src || index}>
              <CanvasVideo video={video} index={index} />
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
