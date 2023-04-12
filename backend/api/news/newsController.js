const { create, getNews, getNewsByName } = require("./newsService");

module.exports = {
  createNews: (req, res) => {
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

  getNewsByName: (req, res) => {
    const name = req.params.name;
    getNewsByName(name, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Tražena vijest nije pronađena",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getNews: (req, res) => {
    getNews((err, results) => {
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
