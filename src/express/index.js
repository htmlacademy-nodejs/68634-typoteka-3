"use strict";

const path = require(`path`);
const express = require(`express`);

const mainRoutes = require(`./routes/main-routes`);
const myRoutes = require(`./routes/my-routes`);
const articlesRoutes = require(`./routes/articles-routes`);

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;
const app = express();

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);

app.use((req, res) => res.status(400).render(`errors/400`));
app.use((req, res) => res.status(500).render(`errors/500`));

app.listen(DEFAULT_PORT, () => {
  console.log(`Слушаем порт ${DEFAULT_PORT}`);
});
