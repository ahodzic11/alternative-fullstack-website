const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO activities(naziv, mjesto, datum, nazivDonatora, nazivProjekta, opisAktivnosti, naslovnaSlika) 
        values(?,?,?,?,?,?,?)`,
      [data.naziv, data.mjesto, data.datum, data.nazivDonatora, data.nazivProjekta, data.opisAktivnosti, data.naslovnaSlika],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getActivities: (callBack) => {
    pool.query(`SELECT * FROM activities`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  getActivityByName: (name, callBack) => {
    pool.query(`SELECT * FROM activities WHERE naziv = ?`, [name], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results[0]);
    });
  },

  updateActivity: (data, callBack) => {
    pool.query(`UPDATE activities SET naziv=?, mjesto=?, datum=?, nazivDonatora=?, nazivProjekta=?, opisAktivnosti=? WHERE id=?`, [data.naziv, data.mjesto, data.datum, data.nazivDonatora, data.nazivProjekta, data.opisAktivnosti, data.id], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },

  updateNaslovnuSliku: (data, callBack) => {
    pool.query(`UPDATE activities SET naslovnaSlika=? WHERE id=?`, [data.naslovnaSlika, data.id], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },

  deleteActivity: (id, callBack) => {
    pool.query(`DELETE FROM activities WHERE id=?`, [id], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },
};
