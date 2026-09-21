import CanvasUgcVideo from "./CanvasUgcVideo";
import "../app/canvas-ugc.css";

// Shared title row so both services on the page carry the same weight.
export function ServiceMasthead({ as: Title = "p", index, title, tagline }) {
  return (
    <header className="service-masthead">
      <Title className="service-masthead__title">
        <span className="service-masthead__index">{index}</span>
        {title}
      </Title>
      {tagline ? <p className="service-masthead__tag">{tagline}</p> : null}
    </header>
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
        <ServiceMasthead as="h2" index={canvas.index} title={canvas.title} tagline={canvas.tagline} />

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
