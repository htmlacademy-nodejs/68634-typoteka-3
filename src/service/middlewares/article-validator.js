"use strict";

const {HttpCode} = require(`../../constants`);
const ARTICLE_KEYS = [`title`, `createdDate`, `announce`, `fullText`, `category`];

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const newArticlekeys = Object.keys(newArticle);
  const keysExist = ARTICLE_KEYS.every((key) => newArticlekeys.includes(key));

  if (!keysExist) {
    res.status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  next();
};
