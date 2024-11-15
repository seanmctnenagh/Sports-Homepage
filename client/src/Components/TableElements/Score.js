import { showScore } from '../Utils/Score';
import Button from 'react-bootstrap/Button';

function Score ({ match, index, listOfShowScores, setListOfShowScores}) {
    return (
        <td className={match.competition}>
            {
                (match.score != null) && listOfShowScores[index]
                    ?
                    (<><p>{match.score} {match.minute}</p></>)
                    :
                    (match.competition === "BLANK" ? null : (match.score == null ? null : <><Button onClick={() => { setListOfShowScores(showScore(index, listOfShowScores)); }}>Score</Button></>))
            }
        </td>
    )
}

export default Score;