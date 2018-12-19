let Worker = function () {
    this.createTable = `
        CREATE TABLE IF NOT EXISTS workers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(16),
          surname VARCHAR(16),
          patronymic VARCHAR(16),
          the_post VARCHAR(50),
          salary INTEGER(10),
          status VARCHAR(12),
          data_employment TIME,
          date_changes TIME,
          created_date TIME
        )
        
    `;
};

module.exports = new Worker();
