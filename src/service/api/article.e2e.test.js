"use strict";

const express = require(`express`);
const request = require(`supertest`);

const article = require(`./article`);
const ArticleService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);


const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    "id": `dmTm_F`,
    "title": `Как перестать беспокоиться и начать жить`,
    "createdDate": `2021-09-28 18:20:50`,
    "announce": `Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Первая большая ёлка была установлена только в 1938 году.`,
    "fullText": `А что, если каждая теория заговора - объективная реальность в одной из параллельных Вселенных? Высокий спрос на изделия из дерева объясняется их прочностью, долговечностью и роскошным видом. Программировать не настолько сложно, как об этом говорят. Первая большая ёлка была установлена только в 1938 году. Простые ежедневные упражнения помогут достичь успеха. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    "category": [
      `Религия`,
      `Разное`
    ],
    "comments": [
      {
        "id": `Xk3Xa9`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `36ejrj`,
        "text": `Мне кажется или я уже читал это где-то?`
      }
    ]
  },
  {
    "id": `y8_Urn`,
    "title": `Как собрать камни бесконечности`,
    "createdDate": `2021-04-14 02:26:28`,
    "announce": `Автор синтезировал из самых эффективных методик и наиболее эффективных принципов ясное прагматичное руководство. Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    "fullText": `А что, если каждая теория заговора - объективная реальность в одной из параллельных Вселенных? Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Простые ежедневные упражнения помогут достичь успеха. От силы воли зависит всё: физическое здоровье, финансовое положение, отношения с окружающими и профессиональный успех. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Это один из лучших рок-музыкантов. Трансакционный анализ -  психологическая модель, служащая для описания и анализа поведения человека индивидуально и в составе групп.`,
    "category": [
      `Научная фантастика`,
      `За жизнь`,
      `IT`
    ],
    "comments": [
      {
        "id": `WG84w-`,
        "text": `Планируете записать видосик на эту тему? Совсем немного...`
      },
      {
        "id": `DU7r3q`,
        "text": ` Плюсую, но слишком много буквы!`
      },
      {
        "id": `zy0-YC`,
        "text": `Хочу такую же футболку :-) Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Плюсую, но слишком много буквы!`
      }
    ]
  },
  {
    "id": `4iiCOZ`,
    "title": `Рок — это протест`,
    "createdDate": `2021-06-25 19:59:04`,
    "announce": `Высокий спрос на изделия из дерева объясняется их прочностью, долговечностью и роскошным видом. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Программировать не настолько сложно, как об этом говорят.`,
    "fullText": `Если вы не хотите изобретать велосипед, используйте готовые шаблоны (паттерны) проектирования. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. От силы воли зависит всё: физическое здоровье, финансовое положение, отношения с окружающими и профессиональный успех. Из под его пера вышло 8 платиновых альбомов. Простые ежедневные упражнения помогут достичь успеха. Шримад Бхагаватам - одна из основных Пуран, часть священных писаний индуизма. Трансакционный анализ -  психологическая модель, служащая для описания и анализа поведения человека индивидуально и в составе групп. Как начать действовать? Для начала просто соберитесь. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Достичь успеха помогут ежедневные повторения.`,
    "category": [
      `Кино`,
      `Научная фантастика`
    ],
    "comments": [
      {
        "id": `Q_tDwr`,
        "text": `Это где ж такие красоты? Планируете записать видосик на эту тему?`
      },
      {
        "id": `KKfgjY`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Плюсую, но слишком много буквы!`
      },
      {
        "id": `dNeFLm`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Это где ж такие красоты?`
      }
    ]
  },
  {
    "id": `71k76X`,
    "title": `Лучшие рок-музыканты 20-века`,
    "createdDate": `2020-12-17 02:50:01`,
    "announce": `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Ёлки — это не просто красивое дерево. Это прочная древесина. А что, если каждая теория заговора - объективная реальность в одной из параллельных Вселенных? Получайте опыт и изучайте язык на множестве примеров, выполняя упражнения и учебные проекты. Если вы не хотите изобретать велосипед, используйте готовые шаблоны (паттерны) проектирования.`,
    "fullText": `Первая большая ёлка была установлена только в 1938 году. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Достичь успеха помогут ежедневные повторения. От силы воли зависит всё: физическое здоровье, финансовое положение, отношения с окружающими и профессиональный успех. Получайте опыт и изучайте язык на множестве примеров, выполняя упражнения и учебные проекты.`,
    "category": [
      `Деревья`,
      `Кино`,
      `Разное`
    ],
    "comments": [
      {
        "id": `7Plk3L`,
        "text": `Мне кажется или я уже читал это где-то? Согласен с автором! Совсем немного...`
      },
      {
        "id": `vJyW4-`,
        "text": `Совсем немного... Это где ж такие красоты? Хочу такую же футболку :-)`
      },
      {
        "id": `z6zUBf`,
        "text": `Мне кажется или я уже читал это где-то?`
      }
    ]
  },
  {
    "id": `xlqBOS`,
    "title": `Как достигнуть успеха не вставая с кресла`,
    "createdDate": `2021-06-22 05:47:16`,
    "announce": `Шримад Бхагаватам - одна из основных Пуран, часть священных писаний индуизма. Высокий спрос на изделия из дерева объясняется их прочностью, долговечностью и роскошным видом.`,
    "fullText": `"Марсианские хроники" - научно-фантастический роман Рэя Брэдбери, принёсший автору широкую известность. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Если вы не хотите изобретать велосипед, используйте готовые шаблоны (паттерны) проектирования. Высокий спрос на изделия из дерева объясняется их прочностью, долговечностью и роскошным видом. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Он написал больше 30 хитов. Ёлки — это не просто красивое дерево. Это прочная древесина. Как начать действовать? Для начала просто соберитесь.`,
    "category": [
      `Программирование`,
      `IT`,
      `Кино`
    ],
    "comments": [
      {
        "id": `lJ8jaD`,
        "text": `Плюсую, но слишком много буквы! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. `
      }
    ]
  }
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  article(app, new ArticleService(cloneData), new CommentService());
  return app;
};


describe(`API returns a list of all articles`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 5 articles`, () => expect(response.body.length).toBe(5));

  test(`First offer's id equals "dmTm_F"`, () => expect(response.body[0].id).toBe(`dmTm_F`));
});

describe(`API returns an article with given id`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/y8_Urn`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Article's title is "Как собрать камни бесконечности"`, () => expect(response.body.title).toBe(`Как собрать камни бесконечности`));
});

describe(`API creates an article if data is valid`, () => {
  const newArticle = {
    category: [`IT`],
    title: `На что способен Webflow`,
    announce: `Поговорим о Webflow`,
    fullText: `Webflow на сегодняшний день, пожалуй, лучший nocode инструмент для создания лендингов`,
    createdDate: `2021-10-131`
  };

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles`)
      .send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns created article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Articles count is changed`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(6))
  );
});

describe(`API refuses to create an article if data is invalid`, () => {
  const newArticle = {
    category: [`IT`],
    title: `На что способен Webflow`,
    announce: `Поговорим о Webflow`,
    fullText: `Webflow на сегодняшний день, пожалуй, лучший nocode инструмент для создания лендингов`,
    createdDate: `2021-10-31`
  };

  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = {...newArticle};
      delete badArticle[key];
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

  test(`Article count is 5 now`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(5))
  );
});

describe(`API changes existent article`, () => {
  const newArticle = {
    category: [`IT`],
    title: `На что способен Webflow`,
    announce: `Поговорим о Webflow`,
    fullText: `Webflow на сегодняшний день, пожалуй, лучший nocode инструмент для создания лендингов`,
    createdDate: `2021-10-31`
  };

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/articles/4iiCOZ`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Article is really changed`, () => request(app)
    .get(`/articles/4iiCOZ`)
    .expect((res) => expect(res.body.title).toBe(`На что способен Webflow`))
    .expect((res) => expect(res.body.announce).toBe(`Поговорим о Webflow`))
  );
});

test(`API returns status code 404 when trying to change non-existent article`, () => {
  const app = createAPI();

  const validArticle = {
    category: [`IT`],
    title: `На что способен Webflow`,
    announce: `Поговорим о Webflow`,
    fullText: `Webflow на сегодняшний день, пожалуй, лучший nocode инструмент для создания лендингов`,
    createdDate: `2021-10-31`
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(validArticle)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, () => {
  const app = createAPI();

  const invalidArticle = {
    category: [`IT`],
    title: `На что способен Webflow`,
    announce: `Поговорим о Webflow`,
    fullText: `Нет поля createdDate`,
  };

  return request(app)
    .put(`/articles/xlqBOS`)
    .send(invalidArticle)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/71k76X`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted article`, () => expect(response.body.id).toBe(`71k76X`));

  test(`Article count is 4 now`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(4))
  );
});

test(`API refuses to delete non-existent article`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/articles/NOEXST`)
    .expect(HttpCode.NOT_FOUND);
});

describe(`API returns a list of comments to given article`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/4iiCOZ/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 3 comments`, () => expect(response.body.length).toBe(3));

  test(`First comment's id is "Q_tDwr"`, () => expect(response.body[0].id).toBe(`Q_tDwr`));
  test(`Second comment's id is "KKfgjY"`, () => expect(response.body[1].id).toBe(`KKfgjY`));
  test(`Third comment's id is "dNeFLm"`, () => expect(response.body[2].id).toBe(`dNeFLm`));
});

describe(`API creates a comment if data is valid`, () => {
  const newComment = {
    text: `Валидному комментарию достаточно этого поля`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles/xlqBOS/comments`)
      .send(newComment);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));

  test(`Comments count is changed. It is equals 2 now`, () => request(app)
    .get(`/articles/xlqBOS/comments`)
    .expect((res) => expect(res.body.length).toBe(2))
  );
});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, () => {
  const app = createAPI();

  return request(app)
    .post(`/articles/xlqBOS/comments`)
    .send({})
    .expect(HttpCode.BAD_REQUEST);
});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {
  const app = createAPI();

  return request(app)
    .post(`/articles/NOEXST/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);
});

describe(`API correctly deletes a comment`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/71k76X/comments/vJyW4-`);
  });

  test(`Status code 204`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns comment deleted`, () => expect(response.body.id).toBe(`vJyW4-`));

  test(`Comments count is 1 now`, () => request(app)
    .get(`/articles/71k76X/comments`)
    .expect((res) => expect(res.body.length).toBe(2))
  );
});

test(`API refuses to delete non-existent comment`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/articles/71k76X/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to delete a comment to non-existent article`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/NOEXST/comments/vJyW4-`)
    .expect(HttpCode.NOT_FOUND);
});
