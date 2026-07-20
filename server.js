const http = require("http");
const fs = require("fs");
const path = require("path");
const DIR = __dirname;
const PORT = 8137;

// Mirror only what the Artifact runtime provides: charset + a minimal reset.
// The page's own <style> must supply all tokens/fonts/etc. — so local testing
// faithfully catches missing CSS instead of masking it.
const HEAD = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<style>*{box-sizing:border-box;} body{margin:0;} .ti{display:inline-block;width:1em;height:1em;}</style></head><body>`;
const FOOT = `</body></html>`;

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/old_mill_gm_companion.html";
  const file = path.join(DIR, p);
  if (!file.startsWith(DIR)) { res.writeHead(403); res.end("forbidden"); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end("not found"); return; }
    const ext = path.extname(file);
    if (ext === ".html") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
      res.end(HEAD + data.toString("utf8") + FOOT);
    } else {
      const type = ext === ".js" ? "text/javascript" : "text/plain";
      res.writeHead(200, { "Content-Type": type + "; charset=utf-8", "Cache-Control": "no-store" });
      res.end(data);
    }
  });
}).listen(PORT, () => console.log("serving on http://localhost:" + PORT));
