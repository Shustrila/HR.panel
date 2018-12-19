const { SQLITE, } = require("../config.json");
const sqlite3    = require("sqlite3").verbose();

let Worker = require("./model.js");

let Ontroller = function () {

    new sqlite3.Database(SQLITE.FULL, function (err){
        if(err) throw err;

        this.serialize(function () {
            this.run(Worker.createTable, [] , function (err) {
                if(err) throw err;
            });
        });

        this.close();
    });

    this.new = function (req, res) {
        let db = new sqlite3.Database(SQLITE.FULL);

        db.serialize(function () {
            db.run(Worker.createRow(req.body));
            res.json({
                status: 200,
                massege: "Роботки добавлен",
            });
        });

        db.close();
    };

    this.getAll = function (req, res) {
        let db = new sqlite3.Database(SQLITE.FULL);

        db.serialize(function () {

            db.all(Worker.selectCols("*"), [], function (err, rows) {
                if(!err){
                    res.json(rows);
                } else {
                    res.json({
                        status: 500,
                        massege: "Проблемы с сервером",
                    });

                    console.log(err);
                }
            });
        });

        db.close();
    };

    this.update = function (req, res) {
        let db = new sqlite3.Database(SQLITE.FULL);

        db.serialize(function () {
            db.run(Worker.update(req.body), req.params.id, function (err, row) {
                if(err) throw err;

                res.json(row);
            });
        });

        db.close();
    };

    this.delete = function (req, res) {
        let db = new sqlite3.Database(SQLITE.FULL);

        db.serialize(function () {
            db.run(Worker.deleteRow("?"), req.params.id, function (err) {
                if (!err) {
                    res.json({
                        status: 200,
                        massege: "Удалено",
                    });
                } else {
                    res.json({
                        status: 500,
                        massege: "Что то пошло нет так",
                    });

                    console.log(err);
                }
            });
        });

        db.close();
    };
};

module.exports = new Ontroller();
