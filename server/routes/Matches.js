const express = require('express');
const router = express.Router();
const { Matches } = require('../models');
const { Op } = require("sequelize");

router.get("/", async (req, res) => { // params: { comp: settings["comp"], timeframe: settings["timeframe"], numDays: settings["numDays"], includeBlanks: settings["includeBlanks"]}
    let comp = req.query.comp ?? '';
    let timeframe = req.query.timeframe ?? '';
    let numDays = req.query.numDays ?? '';
    let includeBlanks = req.query.includeBlanks ?? '';
    let id = req.query.id ?? '';

    let now = new Date() / 1000;
    let daysAgo = now - 86400 * numDays;
    let daysAhead = now + 86400 * numDays;
    let order = 'DESC';

    var conditions = {
        competition : comp,
        endDate     : { // For Past
            [Op.between]: [daysAgo,now],
        },
        dateUnix    : { // For Future
            [Op.between]: [now, daysAhead],
        }
    };
    if ( !comp ) { delete conditions.competition }
    if ( timeframe === "Past" ) { delete conditions.dateUnix }
    if ( timeframe === "Future" ) { delete conditions.endDate; order = 'ASC' }

    let listOfMatches;
    
    listOfMatches = await Matches.findAll({
        where: conditions, 
        order: [
            ['dateUnix', order],
        ],
    });
    res.json(listOfMatches);
});

router.post("/", async (req, res) => {
    const match = req.body;
    await Matches.create(match);
    res.json(match);
})

module.exports = router;