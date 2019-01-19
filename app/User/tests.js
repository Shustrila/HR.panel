const request = require("supertest");
const app = require("../routes.js").app;

describe("User tests", function () {

    it("users online", function (done) {
        request(app)
            .get("/v1/users")
            .expect(function (req) {
                console.log("Array:", typeof JSON.parse(req.text) === "object");
            })
            .expect(function (req) {
                console.log("Length: ", JSON.parse(req.text).length > 0);
            })
            .end(done);
    });

});
