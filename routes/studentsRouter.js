const express = require('express');
const router = express.Router();
const db = require('../database/knexdb.js');

router.get('/api/students', async (req, res) => {
    try {
      const students = await db('students'); 
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  router.get('/api/students/:id', async (req, res) => {
    try {
      const student = await db('students')
        .where({ id: req.params.id })
        .first();
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  const errors = {
    '19': 'Another record with that value exists',
  };
  
  router.post('/api/students', async (req, res) => {
    try {
      const [id] = await db('students').insert(req.body);
  
      const student = await db('students')
        .where({ id })
        .first();
  
      res.status(201).json(student);
    } catch (error) {
      const message = errors[error.errno] || 'We ran into an error';
      res.status(500).json({ message, error });
    }
  });
  
  router.put('/api/students/:id', async (req, res) => {
    try {
      const count = await db('students')
        .where({ id: req.params.id })
        .update(req.body);
  
      if (count > 0) {
        const student = await db('students')
          .where({ id: req.params.id })
          .first();
  
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: 'Records not found' });
      }
    } catch (error) {}
  });
  
  
  router.delete('/api/students/:id', async (req, res) => {
    try {
      const count = await db('students')
        .where({ id: req.params.id })
        .del();
  
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Records not found' });
      }
    } catch (error) {}
  });
  
  module.exports = router;