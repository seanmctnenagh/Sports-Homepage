const express = require('express');
const router = express.Router();
const { Matches } = require('../models');
const { Op } = require("sequelize");

router.get("/", async (req, res) => { // params: { comp: settings["comp"], timeframe: settings["timeframe"], numDays: settings["numDays"], includeBlanks: settings["includeBlanks"]}
    let comp = req.query.comp ?? '';
    let timeframe = req.query.timeframe ?? '';
    let numDays = req.query.numDays ?? '';
    let includeBlanks = req.query.includeBlanks ?? '';

    let now = new Date() / 1000;
    let daysAgo = now - 86400 * numDays;
    let daysAhead = now + 86400 * numDays;
    let order = 'DESC';

    if ( includeBlanks && comp ) { comp = {[Op.or] : [comp, "BLANK"]}}

    var conditions = {
        competition : comp,
        // dateUnix     : { // For Past
        //     [Op.between]: [daysAgo,now],
        // },
        endDate    : { // For Future
            [Op.between]: [now, daysAhead],
        }
    };
    if ( !comp ) { delete conditions.competition }
    if ( timeframe === "Past" ) { conditions.endDate = {[Op.between] : [daysAgo, now]} }//delete conditions.endDate }
    if ( timeframe === "Future" ) { order = 'ASC' }//delete conditions.dateUnix}

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