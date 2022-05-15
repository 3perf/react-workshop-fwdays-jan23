import { renderToString } from "react-dom/server";
import AppWrapper, { emotionCache } from "../src/app-wrapper";
import express from "express";
import { resolve } from "path";
import { readFileSync } from "fs";
import createEmotionServer from "@emotion/server/create-instance";

const app = express();

if (process.env.ENABLE_SSR === "true") {
  const indexFile = readFileSync(resolve("build/index.html"), "utf-8");

  app.get("/*", (req, res, next) => {
    if (req.url !== "/") {
      return next();
    }

    // Generate Material UI styles, per https://material-ui.com/guides/server-rendering/
    const { extractCriticalToChunks, constructStyleTagsFromChunks } =
      createEmotionServer(emotionCache);

    const reactApp = renderToString(<AppWrapper />);

    const emotionChunks = extractCriticalToChunks(reactApp);
    const emotionCss = constructStyleTagsFromChunks(emotionChunks);

    return res.send(
      indexFile
        .replace("</head>", `${emotionCss}</head>`)
        .replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
    );
  });
}

app.use(express.static(resolve(__dirname, "../build")));

app.listen(8080, () =>
  console.log("Express server is running on http://localhost:8080")
);
