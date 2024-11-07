import Fotmob from "fotmob";
const engine = new Fotmob();

async function fotmob(){
    

    let matches = await engine.getMatchesByDate("20201020");

    console.log(matches);
}

export default fotmob;
// module.exports = fotmob;