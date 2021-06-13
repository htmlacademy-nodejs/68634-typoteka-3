"use strict";

const fs = require(`fs`).promises;
const path = require(`path`);
const chalk = require(`chalk`);
const dayjs = require(`dayjs`);
const {
  getRandomInt,
  shuffleArray,
  getArrayRandomElement,
} = require(`../../utils`);
const {nanoid} = require(`nanoid`);

const {ExitCode, MAX_ID_LENGTH} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const MAX_COMMENTS = 3;
const FILE_NAME = `mocks.json`;

const FILE_TITLES_PATH = path.join(__dirname, `../../../data/titles.txt`);
const FILE_SENTENCES_PATH = path.join(__dirname, `../../../data/sentences.txt`);
const FILE_CATEGORIES_PATH = path.join(__dirname, `../../../data/categories.txt`);
const FILE_COMMENTS_PATH = path.join(__dirname, `../../../data/comments.txt`);

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf-8`);
    return content.split(`\n`);
  } catch (err) {
    throw new Error(`Отсутствует файл или папка по пути: '${err.path}'`);
  }
};

const generateDate = () => {
  const earliestDate = dayjs().month(-2).date(1).hour(0).minute(0).second(0);
  const result = dayjs(
      getRandomInt(earliestDate.valueOf(), dayjs().valueOf())
  );
  return result.format(`YYYY-MM-DD HH:mm:ss`);
};

const generateAnnounce = (count, sentences) =>
  shuffleArray(sentences).slice(0, count).join(` `);

const generateFullText = (sentences) =>
  shuffleArray(sentences).slice(0, getRandomInt(5, 12)).join(` `);

const generateCategory = (count, allCategories) => {
  const categories = [];
  const copy = allCategories.slice();
  for (let i = 0; i < count; i++) {
    const randomIndex = getRandomInt(0, copy.length - 1);
    categories.push(copy.splice(randomIndex, 1)[0]);
  }
  return categories;
};

const generateComments = (count, allComments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffleArray(allComments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const generateArticle = ({titles, sentences, categories, comments}) => ({
  id: nanoid(MAX_ID_LENGTH),
  title: getArrayRandomElement(titles),
  createdDate: generateDate(),
  announce: generateAnnounce(getRandomInt(2, 5), sentences),
  fullText: generateFullText(sentences),
  сategory: generateCategory(getRandomInt(1, 3), categories),
  comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
});

const generateArticles = (count, mocks) => (
  Array(count).fill({}).map(() => generateArticle(mocks))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    let mocks = null;
    try {
      mocks = {
        titles: await readContent(FILE_TITLES_PATH),
        categories: await readContent(FILE_CATEGORIES_PATH),
        sentences: await readContent(FILE_SENTENCES_PATH),
        comments: await readContent(FILE_COMMENTS_PATH),
      };
    } catch (err) {
      console.error(chalk.red(err.message));
      process.exit(ExitCode.fail);
    }


    let [count] = args;
    count = Number.parseInt(count, 10) || DEFAULT_COUNT;
    count = count <= 0 ? DEFAULT_COUNT : count;
    if (count > MAX_COUNT) {
      console.error(chalk.red(`Не больше ${MAX_COUNT} публикаций.`));
      process.exit(ExitCode.fail);
    }
    const data = JSON.stringify(generateArticles(count, mocks));

    try {
      await fs.writeFile(FILE_NAME, data);
      console.info(chalk.green(`Операция выполнена. Файл создан.`));
      process.exit(ExitCode.success);
    } catch (err) {
      console.error(chalk.red(`Не удалось записать данные в файл...`));
      console.log(chalk.red(err));
      process.exit(ExitCode.fail);
    }
  },
};
