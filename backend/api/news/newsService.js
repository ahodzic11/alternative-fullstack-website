const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO news(naziv, tema, datum, tekstVijesti, naslovnaSlika) 
        values(?,?,?,?,?)`,
      [data.naziv, data.tema, data.datum, data.tekstVijesti, data.naslovnaSlika],
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

  updateNews: (data, callBack) => {
    pool.query(`UPDATE news SET naziv=?, tema=?, datum=?, tekstVijesti=? WHERE id=?`, [data.naziv, data.tema, data.datum, data.tekstVijesti, data.id], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },

  updateNaslovnuSliku: (data, callBack) => {
    pool.query(`UPDATE news SET naslovnaSlika=? WHERE id=?`, [data.naslovnaSlika, data.id], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },

  deleteNews: (id, callBack) => {
    pool.query(`DELETE FROM news WHERE id=?`, [id], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },
};
