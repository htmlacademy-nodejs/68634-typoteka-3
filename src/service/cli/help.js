"use strict";

const chalk = require(`chalk`);

const text = `Гайд:
service.js <command>
Команды:
--version:            выводит номер версии
--help:               печатает этот текст
--generate <count>:   формирует файл mocks.json
--server <port>:      запускает сервер`;

module.exports = {
  name: `--help`,
  run() {
    console.info(chalk.grey(text));
  }
};
