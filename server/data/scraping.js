const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = "https://www.sofascore.com/darts/2024-11-22";

const movieData = {};

async function getHtml() {
    const { data: html } = await axios.get(url);
    return html;
}


getHtml().then((res) => {
    // const $ = cheerio.load(res);
    // $('lister-list>tr').each((i,movie) => {
    //     const title = $(movie).find('titleColumn a').text();
    //     const rating = $(movie).find('ratingColumn strong').text();
    //     movieData[title] = rating;
    // });

    // fs.writeFile(movieData.json, Json.stringify(movieData))
    fs.writeFileSync("movieData.html", res)
})