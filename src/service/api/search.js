"use strict";

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);


module.exports = (app, searchService) => {
  const route = new Router();

  app.use(`/search`, route);

  route.get(`/`, (req, res) => {
    if (!req.query.query) {
      return res.status(HttpCode.BAD_REQUEST)
        .send(`Search query is absent`);
    }

    const suitableArticles = searchService.findAll(req.query.query);

    if (!suitableArticles.length) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Articles not found`);
    }

    return res.status(HttpCode.OK)
      .json(suitableArticles);
  });

};
