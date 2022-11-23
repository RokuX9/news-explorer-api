module.exports.customErrors = {
  badRequest: (message) => {
    const error = new Error(message);
    error.code = 400;
    return error;
  },
  notAuthorized: () => {
    const error = new Error("Not Authorized");
    error.code = 401;
    return error;
  },
  forbidden: () => {
    const error = new Error("Forbidden");
    error.code = 403;
    return error;
  },
  notFound: () => {
    const error = new Error("Not Found");
    error.code = 404;
    return error;
  },
  alreadyExist: () => {
    const error = new Error("Already Exist");
    error.code = 409;
    return error;
  },
  serverError: () => {
    const error = new Error("Server Error");
    error.code = 500;
  },
};
