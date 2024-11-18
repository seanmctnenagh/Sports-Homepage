import Competition from './TableElements/Competition';
import Title from './TableElements/Title';
import DayDate from './TableElements/DayDate';
import Time from './TableElements/Time';
import Score from './TableElements/Score';
import Highlights from './TableElements/Highlights';
import RecapStream from './TableElements/RecapStream';


const TableRow = ({ match, index, timeframe, isBreakoutTitle, isBreakoutPage, listOfShowScores, setListOfShowScores, includeBlanks }) => {
    let isBlank = (match.competition === "BLANK");
    if ( isBlank && (!includeBlanks)) { return (null) }
    return (
        <tr>
            {/*        Competition        */}
            <Competition match={match} />

                                
            {/*        Team vs Team        */}
            <Title match={match} timeframe={timeframe} isBreakoutTitle={isBreakoutTitle} isBlank={isBlank} />


            {/*        Date & Day        */}
            <DayDate match={match} timeframe={timeframe} isBreakoutTitle={isBreakoutTitle} isBlank={isBlank} />


            {/*        Time        */}
            <Time match={match} timeframe={timeframe} isBreakoutTitle={isBreakoutTitle} isBlank={isBlank} />


            {/*        Score        */}
            <Score match={match} index={index} listOfShowScores={listOfShowScores} setListOfShowScores={setListOfShowScores} />


            {/*        Highlights        */}
            <Highlights match={match} />


            {/*        ESPN Recap / Stream        */}
            <RecapStream match={match} isBreakoutTitle={isBreakoutTitle} />
        </tr>
    )
};

export default TableRow;
