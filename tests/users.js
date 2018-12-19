const request = require("supertest");
const express = require("express");
const assert  = require("assert");

let app = express();

app.get("/api/user/sanya@gmail.com", function (req, res){
    res.status(200).send([{name: "tobi"}]);
});

describe("GET /user", function () {
  return request(app)
      .get("/api/user/sanya@gmail.com").set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
          const user = response.body;
          assert(user);
      });
})
