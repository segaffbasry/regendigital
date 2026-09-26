import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function GET(request) {
  const canvas = new URL(request.url).searchParams.get("canvas") === "1";
  const logo = await readFile(path.join(process.cwd(), "public/regen-white.svg"), "base64");
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: "#0028fa", color: "#eef0e5", padding: "58px 68px", fontFamily: "sans-serif", justifyContent: "space-between" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <img src={`data:image/svg+xml;base64,${logo}`} width="178" height="52" alt="Regen" />
        <div style={{ display: "flex", fontSize: 19, letterSpacing: 3 }}>{canvas ? "CANVAS UGC" : "B2B DIGITAL MARKETING"}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: canvas ? 90 : 84, lineHeight: 1.03, letterSpacing: -5 }}>
        <span>{canvas ? "Flood the algorithm." : "Good strategy."}</span>
        <span>{canvas ? "Find the winners." : "Real growth."}</span>
      </div>
      <div style={{ display: "flex", borderTop: "1px solid #ffffff66", paddingTop: 25, fontSize: 23, justifyContent: "space-between" }}>
        <span>{canvas ? "A creator network for your tech brand." : "SaaS / AI / Tech / Professional services"}</span>
        <span>{canvas ? "By Regen" : "Strategy first. Always."}</span>
      </div>
    </div>,
    { width: 1200, height: 630, headers: { "Cache-Control": "public, max-age=86400" } },
  );
}
