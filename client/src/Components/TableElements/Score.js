import { showScore } from '../Utils/Score';
import Button from 'react-bootstrap/Button';

function Score ({ match, index, listOfShowScores, setListOfShowScores, timeframe, isBreakoutTitle}) {
    let scores = [];
    if ( timeframe === "Future" || isBreakoutTitle || match.score === null) { return (<td className={match.sport.replaceAll(" ", "")}></td>)}
    if ( match.minute === "FT" ) { match.minute = null}
    if ( match.sport === "F1" ) { scores = [ match.score.split("-")[0], match.score.split("-")[1], match.score.split("-")[2] ]}
    else { scores = [ match.score.split("-")[0], match.score.split("-")[1], "" ] }

    return (
        <td className={match.sport.replaceAll(" ", "")} >
            {
                (match.score != null) && listOfShowScores[index]
                    ?
                    (<>{scores[0]}<br/>{scores[1]}<br/>{scores[2]} {match.minute}</>)
                    :
                    (match.competition === "BLANK" ? null : (match.score == null ? null : <><Button variant='warning' onClick={() => { setListOfShowScores(showScore(index, listOfShowScores)); }}>Result</Button></>))
            }
        </td>
    )
}

export default Score;