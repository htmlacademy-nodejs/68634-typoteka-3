"use strict";

const express = require(`express`);
const app = express();

const mainRoutes = require(`./routes/main-routes`);
const myRoutes = require(`./routes/my-routes`);
const articlesRoutes = require(`./routes/articles-routes`);

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);

const DEFAULT_PORT = 8080;

app.listen(DEFAULT_PORT, () => {
  console.log(`Слушаем порт ${DEFAULT_PORT}`);
});
