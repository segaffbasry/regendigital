"use client";

export default function CanvasExamples() {
  function playOne(event) {
    const current = event.currentTarget;
    current.closest(".canvas-examples").querySelectorAll("video").forEach((video) => {
      if (video !== current) video.pause();
    });
  }

  return (
    <div className="canvas-examples">
      {[1, 2, 3, 4].map((number) => (
        <figure key={number}>
          <video controls playsInline preload="none" poster={`/videos/canvas/canvas-ugc-${number}.jpg`} onPlay={playOne} aria-label={`Juno campaign example ${number}`}>
            <source src={`/videos/canvas/canvas-ugc-${number}.mp4`} type="video/mp4" />
            Your browser does not support embedded video. <a href={`/videos/canvas/canvas-ugc-${number}.mp4`}>Watch example {number}</a>.
          </video>
          <figcaption><span>Juno / Creator {String(number).padStart(2, "0")}</span><span>Campaign example</span></figcaption>
        </figure>
      ))}
    </div>
  );
}
