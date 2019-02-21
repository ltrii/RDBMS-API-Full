const cohorts = require('./cohortsRouter');
const students = require('./studentsRouter');
const express = require('express');
const router = express.Router();

router.use('/', cohorts);
router.use('/', students);

module.exports = router;