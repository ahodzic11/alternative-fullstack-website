const { createNews, getNews, getNewsByName, updateNews, updateNaslovnuSliku, deleteNews } = require("./newsController");
const router = require("express").Router();

router.post("/", createNews);
router.get("/", getNews);
router.get("/:name", getNewsByName);
router.patch("/", updateNews);
router.patch("/updateImage", updateNaslovnuSliku);
router.delete("/:id", deleteNews);

module.exports = router;
