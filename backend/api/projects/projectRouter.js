const { createProject, getProjects, getProjectByName, updateProject, updateNaslovnuSliku, deleteProject } = require("./projectController");
const router = require("express").Router();

router.post("/", createProject);
router.get("/", getProjects);
router.get("/:name", getProjectByName);
router.patch("/", updateProject);
router.patch("/updateImage", updateNaslovnuSliku);
router.delete("/:id", deleteProject);

module.exports = router;
