// Gera dist/webinar-ux-e-ia.html: a apresentação inteira num só ficheiro, com os vídeos de dist/videos embutidos.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";

const html = readFileSync("dist/index.html", "utf8");
const videos = Object.fromEntries(
  readdirSync("dist/videos")
    .filter((file) => file.endsWith(".mp4"))
    .map((file) => [file.replace(/\.mp4$/, ""), readFileSync(`dist/videos/${file}`).toString("base64")]),
);
const script = `<script>window.__WEBINAR_VIDEOS=${JSON.stringify(videos)};</script>`;
writeFileSync("dist/webinar-ux-e-ia.html", html.replace("<head>", `<head>${script}`));
console.log(`dist/webinar-ux-e-ia.html com ${Object.keys(videos).length} vídeos embutidos`);
