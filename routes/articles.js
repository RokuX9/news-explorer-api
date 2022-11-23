const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getArticles,
  postArticle,
  deleteArticle,
} = require("../controllers/article.js");

router.get("/", getArticles);
router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string()
        .required()
        .pattern(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\u002b~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\u002b.~#?&//=]*)/
        ),
      image: Joi.string()
        .required()
        .pattern(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\u002b~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\u002b.~#?&//=]*)/
        ),
    }),
  }),
  postArticle
);
router.delete(
  "/:articleId",
  celebrate({
    params: Joi.object().keys({
      articleId: Joi.string().min(24).max(24).hex().required(),
    }),
  }),
  deleteArticle
);

module.exports = router;
