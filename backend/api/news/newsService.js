const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO news(naziv, tema, datum, tekstVijesti) 
        values(?,?,?,?)`,
      [data.naziv, data.tema, data.datum, data.tekstVijesti],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getNews: (callBack) => {
    pool.query(`SELECT * FROM news`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  getNewsByName: (name, callBack) => {
    pool.query(`SELECT * FROM news WHERE naziv = ?`, [name], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results[0]);
    });
  },
};
