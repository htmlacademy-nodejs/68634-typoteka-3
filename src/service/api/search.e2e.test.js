"use strict";

const express = require(`express`);
const request = require(`supertest`);

const search = require(`./search`);
const SearchService = require(`../data-service/search`);

const {HttpCode} = require(`../../constants`);
const mockData = [
  {
    "id": `z8z-4V`,
    "title": `Обзор новейшего смартфона`,
    "createdDate": `2021-05-23 00:53:06`,
    "announce": `Высокий спрос на изделия из дерева объясняется их прочностью, долговечностью и роскошным видом. Это один из лучших рок-музыкантов. Из под его пера вышло 8 платиновых альбомов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Собрать камни бесконечности легко, если вы прирожденный герой.`,
    "fullText": `Как начать действовать? Для начала просто соберитесь. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Он написал больше 30 хитов. Ёлки — это не просто красивое дерево. Это прочная древесина. Трансакционный анализ -  психологическая модель, служащая для описания и анализа поведения человека индивидуально и в составе групп. Золотое сечение — соотношение двух величин, гармоническая пропорция. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Из под его пера вышло 8 платиновых альбомов. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
    "category": [
      `Программирование`
    ],
    "comments": [
      {
        "id": `fvpF-i`,
        "text": `Согласен с автором! Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      },
      {
        "id": `BWmmXJ`,
        "text": `Мне кажется или я уже читал это где-то? Планируете записать видосик на эту тему?`
      }
    ]
  },
  {
    "id": `v_hBBh`,
    "title": `Как перестать беспокоиться и начать жить`,
    "createdDate": `2021-10-22 15:53:49`,
    "announce": `Получайте опыт и изучайте язык на множестве примеров, выполняя упражнения и учебные проекты. Шримад Бхагаватам - одна из основных Пуран, часть священных писаний индуизма. Простые ежедневные упражнения помогут достичь успеха.`,
    "fullText": `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. "Марсианские хроники" - научно-фантастический роман Рэя Брэдбери, принёсший автору широкую известность. Высокий спрос на изделия из дерева объясняется их прочностью, долговечностью и роскошным видом. Получайте опыт и изучайте язык на множестве примеров, выполняя упражнения и учебные проекты. Если вы не хотите изобретать велосипед, используйте готовые шаблоны (паттерны) проектирования. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Достичь успеха помогут ежедневные повторения. Первая большая ёлка была установлена только в 1938 году. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    "category": [
      `Железо`
    ],
    "comments": [
      {
        "id": `8dB9f_`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Согласен с автором! Плюсую, но слишком много буквы!`
      },
      {
        "id": `Fszi56`,
        "text": `Хочу такую же футболку :-) Мне кажется или я уже читал это где-то? Это где ж такие красоты?`
      },
      {
        "id": `MfEiry`,
        "text": `Плюсую, но слишком много буквы!`
      }
    ]
  },
  {
    "id": `daW6on`,
    "title": `Всяко-разно о паттернах проектирования`,
    "createdDate": `2021-05-27 10:48:19`,
    "announce": `Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Как начать действовать? Для начала просто соберитесь. Шримад Бхагаватам - одна из основных Пуран, часть священных писаний индуизма. Программировать не настолько сложно, как об этом говорят.`,
    "fullText": `Если вы не хотите изобретать велосипед, используйте готовые шаблоны (паттерны) проектирования. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. "Марсианские хроники" - научно-фантастический роман Рэя Брэдбери, принёсший автору широкую известность. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Автор синтезировал из самых эффективных методик и наиболее эффективных принципов ясное прагматичное руководство. Ёлки — это не просто красивое дерево. Это прочная древесина. Из под его пера вышло 8 платиновых альбомов. Простые ежедневные упражнения помогут достичь успеха. Первая большая ёлка была установлена только в 1938 году. Высокий спрос на изделия из дерева объясняется их прочностью, долговечностью и роскошным видом. От силы воли зависит всё: физическое здоровье, финансовое положение, отношения с окружающими и профессиональный успех.`,
    "category": [
      `За жизнь`,
      `Паранормальное`
    ],
    "comments": [
      {
        "id": `sD6f9w`,
        "text": ` Это где ж такие красоты?`
      },
      {
        "id": `BUSq5n`,
        "text": `Плюсую, но слишком много буквы!`
      },
      {
        "id": `VjIpDd`,
        "text": `Совсем немного... Мне кажется или я уже читал это где-то?`
      }
    ]
  },
  {
    "id": `rTtP_y`,
    "title": `Обзор новейшего смартфона`,
    "createdDate": `2020-11-19 19:35:08`,
    "announce": `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Это один из лучших рок-музыкантов. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Если вы не хотите изобретать велосипед, используйте готовые шаблоны (паттерны) проектирования. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    "fullText": `Достичь успеха помогут ежедневные повторения. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Автор синтезировал из самых эффективных методик и наиболее эффективных принципов ясное прагматичное руководство. Он написал больше 30 хитов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Шримад Бхагаватам - одна из основных Пуран, часть священных писаний индуизма. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    "category": [
      `IT`,
      `Психология`
    ],
    "comments": [
      {
        "id": `qXaxNO`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `cjp1rn`,
        "text": `Хочу такую же футболку :-) `
      }
    ]
  },
  {
    "id": `H9uKPN`,
    "title": `Совершенный код`,
    "createdDate": `2021-08-19 02:45:44`,
    "announce": `Золотое сечение — соотношение двух величин, гармоническая пропорция. Он написал больше 30 хитов.`,
    "fullText": `Достичь успеха помогут ежедневные повторения. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? А что, если каждая теория заговора - объективная реальность в одной из параллельных Вселенных? Высокий спрос на изделия из дерева объясняется их прочностью, долговечностью и роскошным видом. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Из под его пера вышло 8 платиновых альбомов. "Марсианские хроники" - научно-фантастический роман Рэя Брэдбери, принёсший автору широкую известность. Он написал больше 30 хитов. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    "category": [
      `IT`,
      `Научная фантастика`
    ],
    "comments": [
      {
        "id": `Fv4I9t`,
        "text": `Совсем немного... Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Согласен с автором!`
      },
      {
        "id": `4v9h0k`,
        "text": `Плюсую, но слишком много буквы! Мне кажется или я уже читал это где-то? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      }
    ]
  }
];

const app = express();
app.use(express.json());
search(app, new SearchService(mockData));

describe(`API returns articles based on search query`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `Всяко-разно о паттернах проектирования`
      });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`One article found`, () => expect(response.body.length).toBe(1));
  test(`Article has correct id`, () => expect(response.body[0].id).toBe(`daW6on`));
});

test(`API returns code 404 if nothing is found`,
    () => request(app)
    .get(`/search`)
    .query({
      query: `Алхимические рецепты: философский камень`
    })
    .expect(HttpCode.NOT_FOUND)
);

test(`API returns 400 when query string is absent`,
    () => request(app)
    .get(`/search`)
    .expect(HttpCode.BAD_REQUEST)
);
