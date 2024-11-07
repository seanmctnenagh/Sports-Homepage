const express = require('express');
const router = express.Router();
const { Matches } = require('../models');

router.get("/", async (req, res) => {
    const listOfMatches = await Matches.findAll();
    res.json(listOfMatches);
});

router.post("/", async (req, res) => {
    const match = req.body;
    await Matches.create(match);
    res.json(match);
})

module.exports = router;