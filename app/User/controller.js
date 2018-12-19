const crypto                  = require("crypto");
const { SQLITE, SECRET_KEY, } = require("../config.json");
const sqlite3                 = require("sqlite3").verbose();

let User  = require("./User");

const UsersController = function () {

    let db = new sqlite3.Database(SQLITE.FULL, function (err){
        if(err) throw err;

        db.run(User.createTable);
        console.log("Conected");
    });

    this.registration = function (req, res) {
        let getValueTable = User.getValueTable({
            col: "email",
            where: `email='${req.body.email}'`,
        });

        req.body.password = crypto
            .createHash("sha256", SECRET_KEY)
            .update(req.body.password)
            .digest("hex");

        if(req.body.name === undefined || req.body.name === ""){
            req.body.name = "Имя";
        }

        if(req.body.surname === undefined || req.body.surname === ""){
            req.body.surname = "Фамилия";
        }

        db.all(getValueTable, function (err, row) {
            if(err) throw err;

            if(row.length === 0){
                db.run(User.createRow(req.body));
                res.json({ error: false, });
            }else{
                res.json({ error: true, });
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
                    res.json({
                        error: true,
                        massege: "Пользователь не найден",
                    });
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
            col: "email, name, password",
            where: `email='${req.body.email}'`,
        });

        db.all(getValueTable, function (err, row) {
            try {
                let resInfo = {};

                if(row.length !== 0){
                    let userPasswordHash = crypto
                        .createHash("sha256", SECRET_KEY)
                        .update(req.body.password)
                        .digest("hex");

                    if(row[0].password === userPasswordHash){
                        delete row[0].password;

                        uniqueToken((token) => {
                            db.run(User.setToken(row[0].email, token));

                            resInfo.error    = false;
                            resInfo.massege  = `Вы успешно залогинелись ${row[0].name}`;
                            resInfo.infoUser = row[0];

                            res.cookie("outh_key", token);

                            res.json(resInfo);
                        });
                    }else{
                        resInfo.field    = "password";
                        resInfo.massege  = "Веден не верный пароль";
                        res.json(resInfo);
                    }
                }else{
                    resInfo.field   = "email";
                    resInfo.massege = "Веден не верный логин";
                    res.json(resInfo);
                }
            }catch (err) {
                console.log(err);
                res.json({
                    massege: "Проблемы с сервером",
                });
            }
        });
    };
};

module.exports = new UsersController();
