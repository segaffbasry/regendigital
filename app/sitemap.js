import { phaseOnePages } from "../lib/site-structure";
import { contentForPath } from "../lib/page-content";
import { siteUrl } from "../lib/site-url";

export default function sitemap() {
  const paths = ["/", ...phaseOnePages.map((page) => page.href),
    "/work/agency-ai", "/work/intushq", "/work/film-pudding", "/work/finden"];
  return [...new Set(paths)]
    .filter((path) => contentForPath(path)?.robots?.index !== false)
    .map((path) => ({ url: new URL(path, siteUrl).href }));
}
