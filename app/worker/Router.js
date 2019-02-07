const express = require("express");
const router  = express.Router();
let WorkerController = require("./сontroller.js");

router.get("/worker", WorkerController.getAll);
router.post("/worker", WorkerController.new);
router.put("/worker/:id", WorkerController.update);
router.delete("/worker/:id", WorkerController.delete);

module.exports = router;
