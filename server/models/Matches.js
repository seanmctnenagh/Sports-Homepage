const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    const Matches = sequelize.define("Matches", {
        sport:{
            type: DataTypes.STRING,
            allowNull: false
        },
        competition:{
            type: DataTypes.STRING,
            allowNull: false
        },
        matchId:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        date:{
            type: DataTypes.STRING,
            allowNull: false
        },
        dateUnix:{
            type: DataTypes.STRING,
            allowNull: false
        },
        homeTeam:{
            type: DataTypes.STRING,
            allowNull: false
        },
        awayTeam:{
            type: DataTypes.STRING,
            allowNull: false
        },
        completed:{
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        score:{
            type: DataTypes.STRING,
            allowNull: true
        },
        minute:{
            type: DataTypes.STRING,
            allowNull: true
        },
        highlights:{
            type: DataTypes.STRING,
            allowNull: true
        },
        flashscore:{
            type: DataTypes.STRING,
            allowNull: true
        },
        endDate:{
            type: DataTypes.STRING,
            allowNull: true
        }
    })

    return Matches
}