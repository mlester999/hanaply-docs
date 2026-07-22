import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta = /<meta(?=[^>]*\bname=["']codex-preview["'])/i;

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Hanaply product vision without starter metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Your career radar/);
  assert.match(html, /Product Vision Experience/);
  assert.match(html, /Demonstration Data/);
  assert.match(html, /<title>Hanaply Vision \| AI Career Radar<\/title>/i);
  assert.doesNotMatch(html, developmentPreviewMeta);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton/i);
});

test("renders dedicated roadmap, architecture, and docs routes", async () => {
  const cases = [
    ["/roadmap", /product journey built/i],
    ["/architecture", /one shared platform/i],
    ["/docs/product", /Not another job board/i],
  ];
  for (const [pathname, marker] of cases) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(await response.text(), marker, pathname);
  }
});
