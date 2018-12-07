let User = function () {

    this.getAll = `SELECT * FROM users`;

    this.create = function (token) {
        return`
              INSERT INTO comments (name, email, token, assets_token)
              VALUES ('sasha', 'sanya@gmail.com', '#@^ET&#@EG^OED@*#&G#', ${token})
        `
    };

    this.edit = ``;

};

module.exports = new User();
