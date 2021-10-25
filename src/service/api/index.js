"use strict";

const {Router} = require(`express`);
const {getMockData} = require(`../lib/get-mock-data`);
const article = require(`./article`);
const category = require(`./category`);
const search = require(`./search`);
const {
  ArticleService,
  CommentService,
  CategoryService,
  SearchService,
} = require(`../data-service`);

const app = new Router();

(async () => {
  let mockData = [];
  try {
    mockData = await getMockData();
  } catch (err) {
    console.log(`Error:`, err.message);
  }

  article(app, new ArticleService(mockData), new CommentService());
  category(app, new CategoryService(mockData));
  search(app, new SearchService(mockData));
})();

module.exports = app;
