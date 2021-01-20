"use strict";

const fs = require(`fs`);
const dayjs = require(`dayjs`);
const {
  getRandomInt,
  shuffleArray,
  getArrayRandomElement,
} = require(`../../utils`);

const {ExitCode} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];

const SENTENCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];

const generateDate = () => {
  const earliestDate = dayjs().month(-2).date(1).hour(0).minute(0).second(0);
  const result = dayjs(
      getRandomInt(earliestDate.valueOf(), dayjs().valueOf())
  );
  return result.format(`YYYY-MM-DD HH:mm:ss`);
};

const generateAnnounce = (count) =>
  shuffleArray(SENTENCES).slice(0, count).join(` `);

const generateFullText = () =>
  shuffleArray(SENTENCES).slice(0, getRandomInt(5, SENTENCES.length)).join(` `);

const generateCategory = (count) => {
  const categories = [];
  const copy = CATEGORIES.slice();
  for (let i = 0; i < count; i++) {
    const randomIndex = getRandomInt(0, copy.length - 1);
    categories.push(copy.splice(randomIndex, 1)[0]);
  }
  return categories;
};

const generateArticle = () => ({
  title: getArrayRandomElement(TITLES),
  createdDate: generateDate(),
  announce: generateAnnounce(getRandomInt(2, 5)),
  fullText: generateFullText(),
  сategory: generateCategory(getRandomInt(1, 3)),
});

const generateArticles = (count) => Array(count).fill({}).map(generateArticle);

module.exports = {
  name: `--generate`,
  run(args) {
    let [count] = args;
    count = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (count > MAX_COUNT) {
      console.error(`Не больше ${MAX_COUNT} публикаций.`);
      process.exit(ExitCode.fail);
    }
    const data = JSON.stringify(generateArticles(count));

    fs.writeFile(FILE_NAME, data, (err) => {
      if (err) {
        console.error(`Не удалось записать данные в файл...`);
        process.exit(ExitCode.fail);
      }
      console.info(`Операция выполнена. Файл создан.`);
      process.exit(ExitCode.success);
    });
  },
};
