console.log("I'm Running.");
/*
let test_me = () => alert("I kicked off! Arrow!");

let my_first_obj = new Object();

my_first_obj['name'] = 'Object Name';
my_first_obj['attrib'] = 'Something';

alert(my_first_obj.name)
*/
/*
function my_first_function() {
    alert("Go Heels!")
}
*/

const brkt_rslts_2021 = `{"64": {"seed": 1, "team": "Gonzaga", "score": 98, "winner": true}
                            , "66": {"seed": 16, "team": "Norfolk State", "score": 55, "winner": false}
                            , "65": {"seed": 1, "team": "Baylor", "score": 79, "winner": true}
                            , "1": {"seed": 1, "team": "Baylor", "score": 86, "winner": true}
                            , "3": {"seed": 1, "team": "Baylor", "score": 86, "winner": true}
                            , "2": {"seed": 1, "team": "Gonzaga", "score": 70, "winner": false}
                            , "4": {"seed": 1, "team": "Gonzaga", "score": 93, "winner": true}
                            , "5": {"seed": 1, "team": "Baylor", "score": 78, "winner": true}
                            , "6": {"seed": 11, "team": "UCLA", "score": 90, "winner": false}
                            , "7": {"seed": 2, "team": "Houston", "score": 59, "winner": false}
                        }`;

function load_json() {

    let seed = null;
    let team = null;
    let score = null;
    let winner = null;
    let game_html = null;
    let winner_class = null;
    let brkt_teams_dict = {};
    let brkt = JSON.parse(brkt_rslts_2021);

    //creating HTML for each of the teams involved, with seed / team / score & if they won
    for (key in brkt) {
        [seed, team, score, winner] = [brkt[key]['seed'], brkt[key]['team'], brkt[key]['score'], brkt[key]['winner']];
        winner_class = (winner === true) ? ' winner' : ''
        game_html = `<p class = "seed${winner_class}">${seed}</p>`
        game_html += `\n<p class = "team${winner_class}">${team}</p>`
        game_html += `\n<p class = "score${winner_class}">${score}</p>`
        brkt_teams_dict[key] = game_html
    }

    let matchup_html = null
    let matchup_nbr = null
    let matchup_dict = {}
    let mod_4 = null
    let mod_2 = null
    for (team_game in brkt_teams_dict) {
        mod_4 = team_game % 4;
        mod_2 = team_game % 2;

        //purposefully leaving out ID 1, will add "Champion" image / call out later
        if(+team_game == 1) {
            continue;
        }
        
        //determining which team_game it would be feeding into & calling that a matchup number
        if (team_game < 4) {
            matchup_nbr = 1;
        } else if (mod_2 == 0)  {
            matchup_nbr = (mod_4 == 2) ? (team_game - 2) / 2 : team_game / 2;
        } else {
            matchup_nbr = (mod_4 == 3) ? (team_game - 1) / 2 : (+team_game + 1) / 2;
        }

        //putting together the matchup HTML, in a dict with the team_game it feeds into as the key
        if (team_game < 4) {
            matchup_nbr = 1;
        } else if (mod_4 <= 1)  {
            matchup_html = "<div class = matchup>\n";
            matchup_html += brkt_teams_dict[team_game];
            matchup_dict[matchup_nbr] = matchup_html;
        } else {
            matchup_html = `\n`;
            matchup_html += brkt_teams_dict[team_game];
            matchup_html += `\n</div>`;
            matchup_dict[matchup_nbr] = matchup_dict[matchup_nbr] + matchup_html; 
        }

    }
    document.getElementById("bracket_js").innerHTML += matchup_dict[2];
}

function display_cur_ts() {
    var current_time = new Date();
    var current_year = current_time.getFullYear();
    var current_month = ("0" + (current_time.getMonth() + 1)).slice(-2);
    var current_date = ("0" + (current_time.getDate() + 1)).slice(-2);;
    document.getElementById('cur_ts').innerHTML = "Current Date: " + current_year + "-" + current_month + "-" + current_date;
}

function select_winner(dest_id) {
    console.log("Hello!");
    //get ID of the input clicked
    //check if the destination already has text
    dest_id_content = document.getElementById(dest_id).innerHTML;
    console.log(dest_id_content)
    console.log(dest_id_content.length)

    if (dest_id_content.length == 0) {
        console.log("I'm Zero.")
    }
    //update the css classes of the input clicked (seed / name / score)
    //get ID of the next round where the winner would go
    //Add Seed Number
    //Add Team Name
    //Add Score
    var para = document.createElement("P");                       // Create a <p> node
    var t = document.createTextNode("This is a paragraph.");      // Create a text node
    para.appendChild(t);                                          // Append the text to <p>
    document.getElementById(dest_id).appendChild(para);
    //document.getElementById(dest_id).appendChild(p);
}

//$(document).ready() //learned this is specifically for jQuery - more to come later.