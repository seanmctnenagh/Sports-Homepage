import Competition from './TableElements/Competition';
import Title from './TableElements/Title';
import DayDate from './TableElements/DayDate';
import Time from './TableElements/Time';
import Score from './TableElements/Score';
import Highlights from './TableElements/Highlights';
import RecapStream from './TableElements/RecapStream';


const TableRow = ({ match, index, settings, isBreakoutTitle, isBreakoutPage, listOfShowScores, setListOfShowScores, includeBlanks }) => {
    console.log("TableRow")
    let isBlank = (match.competition === "BLANK");
    if ( isBlank && (!includeBlanks)) { return (null) }
    return (
        <tr>
            {/*        Competition        */}
            <Competition match={match} />

                                
            {/*        Team vs Team        */}
            <Title match={match} settings={settings} isBreakoutTitle={isBreakoutTitle} isBlank={isBlank} />


            {/*        Date & Day        */}
            <DayDate match={match} isBreakoutPage={isBreakoutPage} />


            {/*        Time        */}
            <Time match={match} isBreakoutPage={isBreakoutPage} />


            {/*        Score        */}
            <Score match={match} index={index} listOfShowScores={listOfShowScores} setListOfShowScores={setListOfShowScores} />


            {/*        Highlights        */}
            <Highlights match={match} />


            {/*        ESPN Recap / Stream        */}
            <RecapStream match={match} />
        </tr>
    )
};

export default TableRow;
