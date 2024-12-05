import { compClick } from "../Utils/Competition";
import france from '../Icons/france.png';
import spain from '../Icons/spain.png';
import europe from '../Icons/europe.png';
import pl from '../Icons/pl.png';
import germany from '../Icons/germany.png'
import italy from '../Icons/italy.png';
import scotland from '../Icons/scotland.png';
import nhl from '../Icons/nhl.png';
import nba from '../Icons/nba.png';
import nfl from '../Icons/nfl.png';
import f1 from '../Icons/f1.png';
import ncaaf from '../Icons/ncaaf.png';
import championsCup from '../Icons/championsCup.png';
import wsl from '../Icons/wsl.png';
import ucl from '../Icons/ucl.png';
import urc from '../Icons/urc.png';
import rugby from '../Icons/rugby.png';
import uel from '../Icons/uel.png';
import uecl from '../Icons/uecl.png';
import uwcl from '../Icons/uwcl.png';
import nationsLeague from '../Icons/nationsLeague.png';
import mlb from '../Icons/mlb.png';
import loi from '../Icons/loi.png';
import leagueCup from '../Icons/leagueCup.png';

function getLogo(match){
    const comps = {
        "La Liga" : spain,
        "Copa del Rey" : spain,

        "DFB Pokal": germany,
        "BuLi" : germany,

        "Serie A" : italy,
        "Coppa Italia" : italy,

        "Euro Q W" : europe,
        "Nations League": nationsLeague,
        "CL" : ucl,
        "UEL" : uel,
        "UECL" : uecl,
        "UWCL" : uwcl,

        "PL" : pl,
        "Premier League" : pl,
        "WSL" : wsl,
        "League Cup" : leagueCup,

        "SPL" : scotland,
        "LOI" : loi,

        "Ligue 1" : france,

        "NHL" : nhl,
        "NBA" : nba,
        "MLB" : mlb,

        "NFL" : nfl,
        "NCAA" : ncaaf,
        
        "F1" : f1,

        "Champions Cup" : championsCup,
        "URC" : urc,

        "Friendly" : rugby
    }

    return comps[match.competition]
}

function Competition({ match }) {
    return (
        <td className={match.sport.replaceAll(" ", "")} onClick={() => compClick(match)}>
            {(match.competition === "BLANK") ?
                (<>

                </>) : (
                    <>
                        {/* <i className="bi bi-card-list" style={{ fontSize: "1rem" }}> </i>   */}
                        <span>
                        {(getLogo(match)) ? <img src={getLogo(match)} alt="" style={{ width: "2rem", height: "2rem", verticalAlign: "middle", marginLeft: 5, marginRight: 5, opacity: '1 !important'}} /> : null }
                        <span>{match.competition}</span>
                        </span>
                        
                    </>
                )}
        </td>);

}

export default Competition;