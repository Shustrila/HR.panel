const { SQLITE, } = require("../config.json");
const sqlite3    = require("sqlite3").verbose();

let Worker = require("./Worker.js");

let WorkerController = function () {

    let db = new sqlite3.Database(SQLITE.FULL, function (err){
        if(err) throw err;

        db.run(Worker.createTable);
    });

    this.new = function (req, res) {
        res.json({ massege: "новый работник"});
    };

    this.getAll = function (req, res) {
        res.json({ massege: "Все работники"});
    };

    this.update = function (req, res) {
        res.json({ massege: "Обновление работника"});
    };

    this.delete = function (req, res) {
        res.json({ massege: "Удаление работники"});
    };
};

module.exports = new WorkerController();
