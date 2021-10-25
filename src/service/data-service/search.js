"use strict";
class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll(query) {
    const suitableArticles = this._articles.filter((article) => article.title.includes(query));

    return suitableArticles;
  }
}

module.exports = SearchService;
