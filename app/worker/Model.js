let Model = function () {

    this.selectCols = (col) => `SELECT ${col} FROM worker`;

    this.createTable = `
        CREATE TABLE IF NOT EXISTS worker (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(16),
          surname VARCHAR(16),
          patronymic VARCHAR(16),
          the_post VARCHAR(50),
          salary INTEGER(10),
          status VARCHAR(12),
          date_employment DATE,
          date_changes DATE,
          date_created DATE
        )
    `;

    this.createRow = (obj) => `
        INSERT INTO worker (
            name, 
            surname, 
            patronymic,
            the_post, 
            salary, 
            status, 
            date_employment,                 
            date_changes, 
            date_created
        ) VALUES (
            '${obj.name}',
            '${obj.surname}',
            '${obj.patronymic}',
            '${obj.the_post}',
            '${obj.salary}',
            '${obj.status}',
            '${obj.dateEmployment}',
            '${obj.dateChanges}',
            '${obj.dateCreated}'
        )
    `;

    this.deleteRow = (id) => `
        DELETE FROM worker 
        WHERE id=${id}
    `;

    this.update = (obj) =>`
        UPDATE worker 
        SET
            name='${obj.name}',
            surname='${obj.surname}',
            patronymic='${obj.patronymic}',
            the_post='${obj.the_post}',
            salary='${obj.salary}',
            status='${obj.status}',
            date_employment='${obj.dateEmployment}',
            date_changes='${obj.dateCreated}'
        WHERE id=?
    `;
};

module.exports = new Model();
