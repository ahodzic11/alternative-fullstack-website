const { create, getProjects, getProjectByName } = require("./projectService");

module.exports = {
  createProject: (req, res) => {
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

  getProjectByName: (req, res) => {
    const name = req.params.name;
    getProjectByName(name, (err, results) => {
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

  getProjects: (req, res) => {
    getProjects((err, results) => {
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
