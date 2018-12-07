const sqlite3   = require('sqlite3').verbose();
let db          = new sqlite3.Database('./app/database.sqlite');
const Users     = require('../models/users');
const crypto    = require('crypto');

const UsersController = function () {

    this.newUser = function (req) {
        let token = crypto.randomBytes(48).toString('hex');

        db.serialize(function () {
            db.run(Users.create(req.params.token));
        })
    };

    this.getUser = function(req, res) {

        db.serialize(function () {
            db.all(Users.getAll, [], (err, rows) => {
                if (err) throw err;

                for(let row of rows){
                    if(row["access_token"] === req.params.token){
                        return res.json(row)
                    }
                }

                return res.json({massege: `Пользователь не найден`})
            });
        });

    };



};

module.exports = new UsersController();
