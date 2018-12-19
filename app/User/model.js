module.exports = {
    getColumns: (col) => `SELECT ${col} FROM user`,
    getValueTable: (obj) => `SELECT ${obj.col} FROM user WHERE ${obj.where}`,
    createTable: `
        CREATE TABLE IF NOT EXISTS user (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          online BOOLEAN,
          name VARCHAR(30),
          surname VARCHAR(30),
          email VARCHAR(30) UNIQUE,
          password VARCHAR(30),
          token VARCHAR(150) UNIQUE
        )
    `,
    setToken: function (email, token) {
        return `
            UPDATE user 
            SET token='${token}'
            WHERE email='${email}'
        `;
    },
    createRow: function (obj) {
        return `
          INSERT INTO user (
                     online,
                     name, 
                     surname, 
                     email, 
                     password)
          VALUES (
               false,
              '${obj.name}', 
              '${obj.surname}', 
              '${obj.email}', 
              '${obj.password}')
        `;
    },
};
