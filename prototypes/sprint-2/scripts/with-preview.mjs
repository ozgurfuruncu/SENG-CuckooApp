import { preview } from "vite";
export async function withPreview(run) {
  const server = await preview({
    preview: { host: "127.0.0.1", port: 4174, strictPort: true },
  });
  try {
    await run("http://127.0.0.1:4174");
  } finally {
    await new Promise((resolve, reject) =>
      server.httpServer.close((e) => (e ? reject(e) : resolve())),
    );
  }
}
