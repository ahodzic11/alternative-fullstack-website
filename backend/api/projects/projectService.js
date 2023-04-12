const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO projects(naziv, mjesto, pocetakImplementacije, krajImplementacije, nazivDonatora, cilj, opisProjekta) 
        values(?,?,?,?,?,?,?)`,
      [data.naziv, data.mjesto, data.pocetakImplementacije, data.krajImplementacije, data.nazivDonatora, data.cilj, data.opisProjekta],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getProjects: (callBack) => {
    pool.query(`SELECT * FROM projects`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  getProjectByName: (name, callBack) => {
    pool.query(`SELECT * FROM projects WHERE naziv = ?`, [name], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results[0]);
    });
  },
};
