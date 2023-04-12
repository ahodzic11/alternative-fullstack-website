const { create, getActivities, getActivityFromProject } = require("./activityService");

module.exports = {
  createActivity: (req, res) => {
    const body = req.body;
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getActivityFromProject: (req, res) => {
    const name = req.params.name;
    getActivityFromProject(name, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Tražena radionica nije pronađena",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getActivities: (req, res) => {
    getActivities((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
};
