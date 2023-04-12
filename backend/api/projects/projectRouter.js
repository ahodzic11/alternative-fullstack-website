const { createProject, getProjects, getProjectByName } = require("./projectController");
const router = require("express").Router();

router.post("/", createProject);
router.get("/", getProjects);
router.get("/:name", getProjectByName);

module.exports = router;
