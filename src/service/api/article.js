"use strict";

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const articleValidator = require(`../middlewares/article-validator`);
const commentValidator = require(`../middlewares/comment-validator`);
const articleExist = require(`../middlewares/article-exist`);

const route = new Router();

module.exports = (
    app,
    articleService,
    commentService
) => {
  app.use(`/articles`, route);

  route.get(`/`, (req, res) => {
    const articles = articleService.findAll();

    if (!articles) {
      return res.status(HttpCode.NOT_FOUND)
      .send(`Not found with relevant data`);
    }

    return res.status(HttpCode.OK)
        .json(articles);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const article = articleService.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(article);
  });

  route.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK)
        .json(article);
  });

  route.put(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    let article = articleService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    article = articleService.update(articleId, req.body);

    return res.status(HttpCode.OK)
      .json(article);
  });

  route.delete(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const deletedArticle = articleService.drop(articleId);

    if (!deletedArticle) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Offer with id="${articleId}" wasn't found`);
    }

    return res.sendStatus(HttpCode.NO_CONTENT);
  });

  route.get(`/:articleId/comments`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;

    return res.status(HttpCode.OK)
      .json(article.comments);
  });

  route.post(`/:articleId/comments`, [articleExist(articleService), commentValidator], (req, res) => {
    const {article} = res.locals;
    const comment = req.body;

    commentService.create(article, comment);

    return res.sendStatus(HttpCode.CREATED);
  });

  route.delete(`/:articleId/comments/:commentId`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;
    const {commentId} = req.params;

    if (!commentService.drop(article, commentId)) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`There is no such comment in base`);
    }

    return res.sendStatus(HttpCode.NO_CONTENT);
  });
};
