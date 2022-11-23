const Article = require("../models/article.js");
const { customErrors } = require("../utils/utils.js");

module.exports.getArticles = (req, res, next) => {
  const { _id } = req.user;
  Article.find({ owner: _id })
    .orFail(customErrors.notFound())
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(customErrors.badRequest(err.message));
      }
      next(err);
    });
};

module.exports.postArticle = (req, res, next) => {
  const { _id } = req.user;
  const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: _id,
  }).then((article) => {
    res.status(200).send({
      keyword: article.keyword,
      title: article.title,
      text: article.text,
      date: article.date,
      source: article.source,
      link: article.link,
      image: article.image,
    });
  });
};

module.exports.deleteArticle = (req, res, next) => {
  const { _id } = req.user;
  const { articleId } = req.params;
  Article.deleteArticleByOwnerAndId(articleId, _id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(customErrors.badRequest(err.message));
      }
      next(err);
    });
};
