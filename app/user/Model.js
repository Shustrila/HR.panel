module.exports = {
    getColumns: (col) => `SELECT ${col} FROM user`,
    getValueTable: (obj) => `SELECT ${obj.col} FROM user WHERE ${obj.where}`,
    createTable: `
        CREATE TABLE IF NOT EXISTS user (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          online BOOLEAN,
          name VARCHAR(16),
          surname VARCHAR(16),
          email VARCHAR(45) UNIQUE,
          password VARCHAR(60),
          token VARCHAR(150) UNIQUE,
          refresh_token VARCHAR(50) UNIQUE
        )
    `,
    setRefreshToken: (email, token) => `
        UPDATE user 
        SET refresh_token='${token}'
        WHERE email='${email}'
    `,
    createRow: (obj) => `
        INSERT INTO user (
            online,
            name, 
            surname, 
            email, 
            password,
            token
        ) VALUES (
            false,
            '${obj.name}', 
            '${obj.surname}', 
            '${obj.email}', 
            '${obj.password}',
            '${obj.token}'
        )
    `,
    updateOnline: (where, val) => `
        UPDATE user  
        SET online="${ val }"
        WHERE token="${ where }"
    `
};
