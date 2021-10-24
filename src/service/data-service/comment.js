"use strict";

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class CommentService {
  constructor(articles) {
    this._articles = articles;
  }

  create(article, comment) {
    const newComment = {id: nanoid(MAX_ID_LENGTH), comment};

    article.comments.push(newComment);
    return newComment;
  }

  drop(article, commentId) {
    const comment = article.comments.find((c) => c.id === commentId);

    if (!comment) {
      return null;
    }

    article.comments = article.comments.filter((c) => c.id !== commentId);
    return comment;
  }

  findByArticleId(articleId) {
    const {comments} = this._articles.find((article) => article.id === articleId);

    return comments;
  }

  findAll() {
    const comments = this._articles.reduce((acc, article) => {
      article.comments.forEach((comment) => acc.add(comment));
      return acc;
    }, []);

    return comments;
  }
}

module.exports = CommentService;
