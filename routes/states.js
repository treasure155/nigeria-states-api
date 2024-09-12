const express = require('express');
const router = express.Router();
const statesData = require('../data/nigeria-states.json');

// Get information for a specific state
router.get('/:stateName', (req, res) => {
  const stateName = req.params.stateName.toLowerCase();
  const stateInfo = statesData.find(state => state.state.toLowerCase() === stateName);

  if (stateInfo) {
    res.json(stateInfo);
  } else {
    res.status(404).json({ message: 'State not found' });
  }
});

// Get all capitals
router.get('/capitals', (req, res) => {
  const capitals = statesData.map(state => ({ state: state.state, capital: state.capital }));
  res.json(capitals);
});

// Get all governors
router.get('/governors', (req, res) => {
  const governors = statesData.map(state => ({ state: state.state, governor: state.governor }));
  res.json(governors);
});

// Get all states information
router.get('/', (req, res) => {
  res.json(statesData);
});

module.exports = router;
