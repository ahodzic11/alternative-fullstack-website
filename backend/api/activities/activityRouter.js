const { createActivity, getActivities, getActivityFromProject } = require("./activityController");
const router = require("express").Router();

router.post("/", createActivity);
router.get("/", getActivities);
router.get("/:name", getActivityFromProject);

module.exports = router;
