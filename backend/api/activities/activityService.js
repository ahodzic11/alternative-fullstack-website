const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO activities(mjesto, datum, nazivDonatora, nazivProjekta, opisAktivnosti) 
        values(?,?,?,?,?)`,
      [data.mjesto, data.datum, data.nazivDonatora, data.nazivProjekta, data.opisAktivnosti],
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

  getActivityFromProject: (name, callBack) => {
    pool.query(`SELECT * FROM activities WHERE nazivProjekta = ?`, [name], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results[0]);
    });
  },
};
