"use strict";

const fs = require(`fs`).promises;
const path = require(`path`);
const express = require(`express`);
const {Router} = require(`express`);

const DEFAULT_PORT = 3000;
const FILE_NAME = path.join(__dirname, `../../../mocks.json`);

const app = express();
app.use(express.json());

module.exports = {
  name: `--server`,
  run(args) {
    let [port] = args;
    port = Number.parseInt(port, 10) || DEFAULT_PORT;
    port = (port <= 0) ? DEFAULT_PORT : port;

    const routes = new Router();
    routes.get(`/posts`, async (req, res) => {
      try {
        const fileContent = await fs.readFile(FILE_NAME);
        const mocks = JSON.parse(fileContent);
        res.json(mocks);
      } catch (err) {
        res.send([]);
      }
    });

    app.use(`/`, routes);
    app.listen(port);
  }
};
