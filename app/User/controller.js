const crypto                  = require("crypto");
const { SQLITE, SECRET_KEY, } = require("../config.json");
const sqlite3                 = require("sqlite3").verbose();

let User  = require("./model");

const Controller = function () {

    let db = new sqlite3.Database(SQLITE.FULL, function (err){
        if(err) throw err;

        db.run(User.createTable);
    });

    this.registration = function (req, res) {
        let body = req.body;
        let getValueTable = User.getValueTable({
            col: "email",
            where: `email='${body.email}'`,
        });

        body.password = crypto
            .createHash("sha256", SECRET_KEY)
            .update(req.body.password)
            .digest("hex");

        db.all(getValueTable, function (err, row) {
            if(err) throw err;
            if(row.length === 0){
                db.run(User.createRow(body), [], (err) => {
                    if(err) {
                        res.json({
                            error: true,
                            status: 500,
                            massege: "Что то пошло не так"
                        });
                    }else{
                        res.json({
                            error: false,
                            status: 200,
                            massege: "Вы зарегистрировались"
                        });
                    }
                });
            }else{
                res.json({
                    error: true,
                    status: 400,
                    massege: "Такой пользователь уже существует"
                });
            }
        });
    };

    function uniqueToken (callback) {
        let token = crypto.randomBytes(148).toString('hex');
        let getValueTable =  User.getValueTable({
            col: "token",
            where: `token='${token}'`,
        });

        db.all(getValueTable , (err, rows) => {
            if(err) throw err;
            if(rows.length === 0){
                return callback(token);
            }else{
                uniqueToken();
            }
        });
    }

    this.login = function (req, res) {
        let getValueTable =  User.getValueTable({
            col: "email, name, surname, password",
            where: `email='${req.body.email}'`,
        });

        db.all(getValueTable, function (err, row) {
            if (err) {
                console.log(err);
                res.json({
                    error: true,
                    status: 500,
                    massege: "Проблемы с сервером"
                });
            } else {
                if (row.length !== 0) {
                    let userPasswordHash = crypto
                        .createHash("sha256", SECRET_KEY)
                        .update(req.body.password)
                        .digest("hex");

                    if (row[0].password === userPasswordHash) {
                        delete row[0].password;

                        uniqueToken((token) => {
                            db.run(User.setToken(row[0].email, token), {}, () => {
                                res.json({
                                    error: false,
                                    status: 200,
                                    token: token,
                                    massege: "Вы успешно вошли"
                                });
                            });
                        });
                    } else {
                        res.json({
                            error: true,
                            status: 400,
                            nameField: "email",
                            massege: "Веден не верный пароль"
                        });
                    }
                } else {
                    res.json({
                        error: true,
                        status: 400,
                        nameField: "email",
                        massege: "Веден не верный email"
                    });
                }
            }
        });
    };

    this.authentication = function(req, res) {
        let getColumns = User.getValueTable({
            col: "name, surname, email, token",
            where: `token='${req.params.token}'`,
        });

        db.serialize(function () {
            db.all(getColumns, [], (err, rows) => {
                if (err) throw err;

                if (rows.length !== 0) {
                    delete rows[0].token;
                    res.json(rows[0]);
                }else{
                    res.json(400)
                }
            });
        });
    };

    this.getAllOnline = function (req, res) {
        let getColumns = User.getColumns("name, email, online, surname");

        db.serialize(function () {
            db.all(getColumns, [], (err, rows) => {
                if(err) throw err;

                res.json(rows.filter(row => row["online"] === 1));
            });
        });
    };

};

module.exports = new Controller();
