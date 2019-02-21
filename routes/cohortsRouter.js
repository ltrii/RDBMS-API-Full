const express = require('express');
const router = express.Router();
const db = require('../database/knexdb.js');

router.get('/api/cohorts', async (req, res) => {
    try {
      const cohorts = await db('cohorts'); 
      res.status(200).json(cohorts);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  router.get('/api/cohorts/:id', async (req, res) => {
    try {
      const cohort = await db('cohorts')
        .where({ id: req.params.id })
        .first();
      res.status(200).json(cohort);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  const errors = {
    '19': 'Another record with that value exists',
  };
  
  router.post('/api/cohorts', async (req, res) => {
    if(!req.body.name) {
      res.status(400).json({ errormsg: 'Please enter a name' });
      return;
    }
    try {
      const [id] = await db('cohorts').insert(req.body);
  
      const cohort = await db('cohorts')
        .where({ id })
        .first();
  
      res.status(201).json(cohort);
    } catch (error) {
      const message = errors[error.errno] || 'We ran into an error';
      res.status(500).json({ message, error });
    }
  });
  
  router.put('/api/cohorts/:id', async (req, res) => {
    if(!req.body.name) {
      res.status(400).json({ errormsg: 'Please enter a name' });
      return;
    }
    try {
      const count = await db('cohorts')
        .where({ id: req.params.id })
        .update(req.body);
  
      if (count > 0) {
        const cohort = await db('cohorts')
          .where({ id: req.params.id })
          .first();
  
        res.status(200).json(cohort);
      } else {
        res.status(404).json({ message: 'Records not found' });
      }
    } catch (error) {}
  });
  
  
  router.delete('/api/cohorts/:id', async (req, res) => {
    try {
      const count = await db('cohorts')
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