const express = require('express');
let router = express.Router();

router.get('/users/', (req, res) => res.send('hello world'));

module.exports = router;
