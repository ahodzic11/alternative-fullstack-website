const { createActivity, getActivities, getActivityFromProject, updateNaslovnuSliku, deleteActivity, updateActivity } = require("./activityController");
const router = require("express").Router();

router.post("/", createActivity);
router.get("/", getActivities);
router.get("/:name", getActivityFromProject);
router.patch("/", updateActivity);
router.patch("/updateImage", updateNaslovnuSliku);
router.delete("/:id", deleteActivity);

module.exports = router;
