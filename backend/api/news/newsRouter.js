const { createNews, getNews, getNewsByName } = require("./newsController");
const router = require("express").Router();

router.post("/", createNews);
router.get("/", getNews);
router.get("/:name", getNewsByName);

module.exports = router;
