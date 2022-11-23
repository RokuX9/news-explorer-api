const router = require("express").Router();
const { getMe } = require("../controllers/user.js");

router.get("/me", getMe);

module.exports = router;
