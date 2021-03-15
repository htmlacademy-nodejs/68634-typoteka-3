"use strict";

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;
const path = require(`path`);
const {HttpCode} = require(`../../constants`);

const DEFAULT_PORT = 3000;
const FILE_NAME = path.join(__dirname, `../../../mocks.json`);

const sendResponce = (res, statusCode, message) => {
  const template = `
  <!Doctype html>
    <html lang="ru">
    <head>
      <title>Listing of post titles</title>
    </head>
    <body>${message}</body>
  </html>`.trim();

  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const onClientConnect = async (req, res) => {
  const notFoundMessageText = `Not found`;

  switch (req.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(FILE_NAME);
        const mocks = JSON.parse(fileContent);
        const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);
        sendResponce(res, HttpCode.OK, `<ul>${message}</ul>`);
      } catch (err) {
        sendResponce(res, HttpCode.NOT_FOUND, notFoundMessageText);
      }
      break;
    default:
      sendResponce(res, HttpCode.NOT_FOUND, notFoundMessageText);
      break;
  }
};

module.exports = {
  name: `--server`,
  run(args) {
    let [port] = args;
    port = Number.parseInt(port, 10) || DEFAULT_PORT;
    port = (port <= 0) ? DEFAULT_PORT : port;

    http.createServer(onClientConnect)
      .listen(port)
      .on(`listening`, (err) => {
        if (err) {
          return console.error(chalk.red(`Ошибка при создании сервера`, err.message));
        }

        return console.log(chalk.green(`Ожидаю соединений на ${port}`));
      });
  }
};
