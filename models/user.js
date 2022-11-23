const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { customErrors } = require("../utils/utils");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .orFail(customErrors.notAuthorized())
    .then((user) =>
      bcrypt
        .compare(password, user.password)
        .then((matched) =>
          matched ? user : Promise.reject(customErrors.notFound())
        )
    );
};

module.exports = mongoose.model("user", userSchema);
