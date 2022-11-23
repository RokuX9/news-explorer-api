const mongoose = require('mongoose');
const validator = require('validator');
const { customErrors } = require('../utils/utils');

const articleSchema = mongoose.Schema({
  keyword: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: String, required: true },
  source: { type: String, required: true },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
    },
  },
  owner: { type: mongoose.Types.ObjectId, required: true, select: false },
});
articleSchema.statics.deleteArticleByOwnerAndId = function deleteArticleByOwnerAndId(id, owner) {
  return this.findById({ _id: id })
    .select('+owner')
    .orFail(customErrors.notFound())
    .then((article) => (article.owner.toString() === owner
      ? this.findByIdAndDelete(id)
      : Promise.reject(customErrors.forbidden())));
};
module.exports = mongoose.model('article', articleSchema);
