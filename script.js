//When the body loads, hide certain elements
function hide () {
    document.getElementById('generateGamePlan').style.display = "none";
    document.getElementById('winrateContent').style.display = "none";
    document.getElementById('csContent').style.display = "none";
    document.getElementById('dmgTContent').style.display = "none";
    document.getElementById('dmgDContent').style.display = "none";
    document.getElementById('goldContent').style.display = "none";
    document.getElementById('killsContent').style.display = "none";
    document.getElementById('deathsContent').style.display = "none";
    document.getElementById('assistsContent').style.display = "none";
    document.getElementById('turretsContent').style.display = "none";
    document.getElementById('stats').style.display = "none";
    document.getElementById('pageTwo').style.display = "none";
    document.getElementById('staticPlan').style.display = "none";
    document.getElementById('keepUp').style.display = "none";
    document.getElementById('helpHider').style.display = "none";
    $("#loader").hide();
}

//Triggered when user presses submit on form
function submitInfo() {
    
//    Validation, gets the first element
    var SUMMONER_NAME_UI = "";
    SUMMONER_NAME_UI = $("#userName").val();
    
    var SERVER = "";
    SERVER = $("#local").val();
    
//    Validation, replaces spaces with no space and makes all lower case
    var SUMMONER_NAME = SUMMONER_NAME_UI.replace(" ", "");
    SUMMONER_NAME = SUMMONER_NAME.toLowerCase().trim();
    
//    if summoner name is not empty, then
    if (SUMMONER_NAME !== "") {
        
//        Hide the loader from user
        $("#loader").fadeIn(500);
        
//        Call to the api, the url is combining proxy, server, summoner name and api key
//        Fetches user general info from 'summoner name'
        $.ajax({
            url: 'https://thingproxy.freeboard.io/fetch/https://' + SERVER + '.api.pvp.net/api/lol/' + SERVER + '/v1.4/summoner/by-name/' + SUMMONER_NAME + '?api_key=RGAPI-e8a16828-f400-4e4c-9b8e-06483315a6ff',
            type: 'GET',
            dataType: 'json', 
            data: {},
                
//                On sucess, do the following with the returned data (json)
                success: function(json) {
                    
//                    Look in JSON data and find attribute 'ID' belonging to partiuclar summoner name
                    summonerID = json[SUMMONER_NAME].id;
                    
//                    Look in JSON data and find attribute 'summonerLevel' belonging to partiuclar summoner name
                    summonerLevel = json[SUMMONER_NAME].summonerLevel;
                    
//                    Modify DOM with new data
                    document.getElementById('sLevel').innerHTML = summonerLevel;
                    
//                      Finds the 'clean' name to be used in UI
                    fName = json[SUMMONER_NAME].name;
                    document.getElementById('username').innerHTML = fName;
                    sumName = fName;
                    
//                    Start next function, passing data to be used
                    rankedLookup(summonerID, SERVER, SUMMONER_NAME_UI);
                    },

//                Show error message to user, also hide loader
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    document.getElementById('errors').innerHTML = "Error - could not find summoner";
                    document.getElementById('loader').style.display = "none";
                }
        });
    } 
    
//    Alert if nothing entered in box
    else {
    alert("Please enter a summoner name");
    
    }  
}    

//Function to find stats of a summoner
function summonerLookUp(SERVER, summonerID, SUMMONER_NAME_UI, played) {
        
//        Hide page one, display page two
        document.getElementById('pageOne').style.display = "none";
        document.getElementById('pageTwo').style.display = "block";
        document.getElementById('stats').style.display = "block";
        document.getElementById('body').style.background = "#ffffff";

    if (summonerID !== "") {
        
        
//        This API call fetches a different set of data - ranked game stats by summonerID with summonerID being fetched from previous API call
        $.ajax({
        url: 'https://thingproxy.freeboard.io/fetch/https://' + SERVER + '.api.pvp.net/api/lol/' + SERVER + '/v1.3/stats/by-summoner/' + summonerID + '/ranked?api_key=RGAPI-e8a16828-f400-4e4c-9b8e-06483315a6ff',
        type: 'GET',
        dataType: 'json',
        data: {
        },
        success: function(resp) {
            
//            Loop for the length of entries in data
            for (var i = 0; i < resp.champions.length; i++) {
                
//                Find the entry with an ID of '0', when found, do the following
                if (resp.champions[i].id == "0"){
                    
//                    New variable equals value of totalMinionKills on entry of id '0'
                    cs = resp.champions[i].stats.totalMinionKills;
//                    Divide by value played to get average 
                    averageCS = cs / played;
//                    Round the average to nearest whole number
                    averageCS = Math.round(averageCS);
//                    Update DOM with the value
                    document.getElementById('cs').innerHTML = averageCS;
                    
                    kills = resp.champions[i].stats.totalChampionKills;
                    averageKills = kills / played;
//                    Round to the nearest 10
                    averageKills = Math.round(averageKills * 10) / 10;
                    document.getElementById('kills').innerHTML = averageKills;
                    
                    assists = resp.champions[i].stats.totalAssists;
                    averageAssists = assists / played;
                    averageAssists = Math.round(averageAssists * 10) / 10;
                    document.getElementById('assists').innerHTML = averageAssists;
                    
                    deaths = resp.champions[i].stats.totalDeathsPerSession;
                    averageDeaths = deaths / played;
                    averageDeaths = Math.round(averageDeaths * 10) / 10;
                    document.getElementById('deaths').innerHTML = averageDeaths;
                    
                    dmgD = resp.champions[i].stats.totalDamageDealt;
                    averageDmgD = dmgD / played;
                    averageDmgD = Math.round(averageDmgD);
                    document.getElementById('dmgD').innerHTML = averageDmgD;
                    
                    dmgT = resp.champions[i].stats.totalDamageTaken;
                    averageDmgT = dmgT / played;
                    averageDmgT = Math.round(averageDmgT);
                    document.getElementById('dmgT').innerHTML = averageDmgT;
                    
                    gold = resp.champions[i].stats.totalGoldEarned;
                    averageGold = gold / played;
                    averageGold = Math.round(averageGold);
                    document.getElementById('aGold').innerHTML = averageGold;
            
                    turrets = resp.champions[i].stats.totalTurretsKilled;
                    averageTurrets = turrets / played;
                    averageTurrets = Math.round(averageTurrets * 10) / 10;
                    document.getElementById('turrets').innerHTML = averageTurrets;
                    
//                    Start next function
                    leagueAverage();
                }
            }
            
            document.getElementById('intro').style.display = "inline";
            },
        
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            document.getElementById('errors').innerHTML = "Error - could not find summoner";
            document.getElementById('loader').style.display = "none";
        }
    });
} 

    else {
    alert("Did not work");
    }
}

function rankedLookup(summonerID, SERVER, SUMMONER_NAME_UI) {
    if (summonerID !== "") {
//        Third API call, this one fetches what rank the user is, using SummonerID
        $.ajax({
        url: 'https://thingproxy.freeboard.io/fetch/https://' + SERVER + '.api.pvp.net/api/lol/' + SERVER + '/v2.5/league/by-summoner/' + summonerID + '/entry?api_key=RGAPI-e8a16828-f400-4e4c-9b8e-06483315a6ff',
        type: 'GET',
        dataType: 'json',
        data: {
        },
        success: function(resp) {
              $("#loader").fadeOut(500);
//            Defines variable to get amount of entries
            entries = resp[summonerID].length;
            
//            Value of data 'queue' for the first entry
            firstEntry = resp[summonerID][0].queue;
            
//            One entry means could be either flex q or solo q
//            If they have one entry and the first one is solo then do the following
            if (entries == 1 && firstEntry == "RANKED_SOLO_5x5"){
                
//                Hide flex rank info
                document.getElementById('flexTier').innerHTML = "Flex rank not found";
                document.getElementById('flexi').style.display = "none";
                document.getElementById('flexRankIcon').style.display = "none";
                
//                Fetches rank and defines it as solo rank, then updates the DOM
                soloTier = resp[summonerID][0].tier;
                document.getElementById('soloTier').innerHTML = soloTier + " ";
                soloDiv = resp[summonerID][0].entries[0].division;
                document.getElementById('soloDiv').innerHTML = soloDiv + " ";
                soloLp = resp[summonerID][0].entries[0].leaguePoints;
                document.getElementById('soloLp').innerHTML = soloLp + "LP";
                
//                Finds total wins
                wins = resp[summonerID][0].entries[0].wins;
                document.getElementById('wins').innerHTML = wins;
                
//                Finds total losses
                losses = resp[summonerID][0].entries[0].losses;
                document.getElementById('losses').innerHTML = losses;
                
//                Calculates the total played altogether
                played = wins + losses;
                document.getElementById('played').innerHTML = played;
                
//                Calculates winrate
                winrate = wins / (wins + losses) * 100;
                winrate = Math.round(winrate);
                document.getElementById('winrate').innerHTML = winrate + "%";
                
                flexTier = 0;
                
//                Start next function
                decideRank(soloTier, flexTier);
                
                } 
            
//              If only one entry found and it is flex, do same as above, but define flex rank not solo rank
              else if (entries == 1 && firstEntry == "RANKED_FLEX_SR") {

                document.getElementById('soloTier').innerHTML = "Solo rank not found";
                document.getElementById('soloi').style.display = "none";
                document.getElementById('soloRankIcon').style.display = "none";
                  
                flexTier = resp[summonerID][0].tier;
                document.getElementById('flexTier').innerHTML = flexTier + " ";
                flexDiv = resp[summonerID][0].entries[0].division;
                document.getElementById('flexDiv').innerHTML = flexDiv + " ";
                flexLp = resp[summonerID][0].entries[0].leaguePoints;
                document.getElementById('flexLp').innerHTML = flexLp + "LP";
                
                wins = resp[summonerID][0].entries[0].wins;
                document.getElementById('wins').innerHTML = wins;
                
                losses = resp[summonerID][0].entries[0].losses;
                document.getElementById('losses').innerHTML = losses;
                
                played = wins + losses;
                document.getElementById('played').innerHTML = played;
                
                winrate = wins / (wins + losses) * 100;
                winrate = Math.round(winrate);
                document.getElementById('winrate').innerHTML = winrate + "%";
                soloTier = 0;
                decideRank(soloTier, flexTier);
            } 
            
//            If two entries found, calculate both flex and solo ranks
            else if (entries == 2) {
                
                soloTier = resp[summonerID][0].tier;
                document.getElementById('soloTier').innerHTML = soloTier + " ";
                soloDiv = resp[summonerID][0].entries[0].division;
                document.getElementById('soloDiv').innerHTML = soloDiv + " ";
                soloLp = resp[summonerID][0].entries[0].leaguePoints;
                document.getElementById('soloLp').innerHTML = soloLp + "LP";
                
                flexTier = resp[summonerID][1].tier;
                document.getElementById('flexTier').innerHTML = flexTier + " ";
                flexDiv = resp[summonerID][1].entries[0].division;
                document.getElementById('flexDiv').innerHTML = flexDiv + " ";
                flexLp = resp[summonerID][1].entries[0].leaguePoints;
                document.getElementById('flexLp').innerHTML = flexLp + "LP";
                
                soloWins = resp[summonerID][0].entries[0].wins;
                flexWins = resp[summonerID][1].entries[0].wins;
                wins = soloWins + flexWins;
                document.getElementById('wins').innerHTML = wins;
                
                soloLosses = resp[summonerID][0].entries[0].losses;
                flexLosses = resp[summonerID][1].entries[0].losses;
                losses = soloLosses + flexLosses;
                document.getElementById('losses').innerHTML = losses;
                
                played = wins + losses;
                document.getElementById('played').innerHTML = played;
                
                winrate = wins / (wins + losses) * 100;
                winrate = Math.round(winrate);
                document.getElementById('winrate').innerHTML = winrate + "%";
                
//                Start next function
                decideRank(soloTier, flexTier);
                
            } else {
                alert("not enough ranked games found");
            }
            
            summonerLookUp(SERVER, summonerID, SUMMONER_NAME_UI, played);
        },
        
        error: function(XMLHttpRequest, textStatus, errorThrown) {
        document.getElementById('errors').innerHTML = "Error - could not find enough ranked games";
        document.getElementById('loader').style.display = "none";
      }
    });
} 

    else {
    alert("Did not work");
    }
}


//Function to quantify which rank is higher
function decideRank (soloTier, flexTier) {
    
//    if value is bronze, variable should equal 1, etc
    if (soloTier == "BRONZE") {
        sTier = 1;
    } else if (soloTier == "SILVER") {
        sTier = 2;
    } else if (soloTier == "GOLD") {
        sTier = 3;
    } else if (soloTier == "PLATINUM") {
        sTier = 4;
    } else if (soloTier == "DIAMOND") {
        sTier = 5;
    } else if (soloTier == "MASTER") {
        sTier = 6;
    } else if (soloTier == "CHALLENGER") {
        sTier = 7;
    } else if (soloTier == "") {
        sTier = 0;
    } else {
        document.getElementById('errors').innerHTML = "Could not find solo rank";
    }
    
    if (flexTier == "BRONZE") {
        fTier = 1;
    } else if (flexTier == "SILVER") {
        fTier = 2;
    } else if (flexTier == "GOLD") {
        fTier = 3;
    } else if (flexTier == "PLATINUM") {
        fTier = 4;
    } else if (flexTier == "DIAMOND") {
        fTier = 5;
    } else if (flexTier == "MASTER") {
        fTier = 6;
    } else if (flexTier == "CHALLENGER") {
        fTier = 7;
    } else if (flexTier == "") {
        fTier = 0;
    }
    else {
        document.getElementById('errors').innerHTML = "Could not find flex rank";
    }
    
//    If highest solo tier is greater than or equal to flex tier, class it as highest tier achieved
    if (sTier >= fTier) {
        highestTier = sTier;
        document.getElementById('playerTier').innerHTML = soloTier;
        document.getElementById('tierTitle').style.display = "inline";
//        Else do the opposite
    } else {
        highestTier = fTier;
        document.getElementById('playerTier').innerHTML = flexTier;
        document.getElementById('tierTitle').style.display = "inline";
    }

//    Modify url of tier icons, matching tier number to tier icon
    document.getElementById('soloRankIcon').src = 'images/rankIcons/' + sTier + '.png';
    document.getElementById('flexRankIcon').src = 'images/rankIcons/' + fTier + '.png';
}


//Function to split user down different paths depending on their highest rank
function leagueAverage(){
    if (highestTier == 1) {
        bronze();
    } else if (highestTier == 2){
        silver();
    } else if (highestTier == 3){
        goldeen();
    } else if (highestTier == 4){
        platinum();
    } else if (highestTier == 5){
        diamond();
    } else if (highestTier == 6){
        master();
    } else if (highestTier == 7){
        challenger();
    } 
}

function bronze () {
    
//    Defines values for each dataset relating to rank
    bronzeCS = 114;
    document.getElementById('leagueCs').innerHTML = bronzeCS;
    
    bronzeGold = 10414;
    document.getElementById('leagueGold').innerHTML = bronzeGold;
    
    bronzeWinrate = 32;
    document.getElementById('leagueWinrate').innerHTML = bronzeWinrate;
    
    bronzeKills = 6.2;
    document.getElementById('leagueKills').innerHTML = bronzeKills;
    
    bronzeTurrets = 0.5;
    document.getElementById('leagueTurrets').innerHTML = bronzeTurrets;
    
    bronzeDeaths = 6.7;
    document.getElementById('leagueDeaths').innerHTML = bronzeDeaths;
    
    bronzeAssists = 7.2;
    document.getElementById('leagueAssists').innerHTML = bronzeAssists;
    
    bronzeDmgD = 97596;
    document.getElementById('leagueDmgD').innerHTML = bronzeDmgD;
    
    bronzeDmgT = 21021;
    document.getElementById('leagueDmgT').innerHTML = bronzeDmgT;
    
    
//    If the player's stats are better then average rank values, style the value green
    if (averageCS > bronzeCS){
        document.getElementById('cs').style.color = "green";
    }
//    Otherwise style the value red
    else {
        document.getElementById('cs').style.color = "red";
    }
    
    if (averageKills > bronzeKills){
        document.getElementById('kills').style.color = "green";
    }
    else {
        document.getElementById('kills').style.color = "red";
    }
    
    if (averageDeaths < bronzeDeaths){
        document.getElementById('deaths').style.color = "green";
    }
    else {
        document.getElementById('deaths').style.color = "red";
    }
    
    if (averageAssists > bronzeAssists){
        document.getElementById('assists').style.color = "green";
    }
    else {
        document.getElementById('assists').style.color = "red";
    }
    
    if (averageTurrets > bronzeTurrets){
        document.getElementById('turrets').style.color = "green";
    }
    else {
        document.getElementById('turrets').style.color = "red";
    }
    
    if (averageGold > bronzeDmgD){
        document.getElementById('dmgD').style.color = "green";
    }
    else {
        document.getElementById('dmgD').style.color = "red";
    }
    
    if (averageDmgT > bronzeDmgT){
        document.getElementById('dmgT').style.color = "green";
    }
    else {
        document.getElementById('dmgT').style.color = "red";
    }
    
    if (averageGold > bronzeGold){
        document.getElementById('aGold').style.color = "green";
    }
    else {
        document.getElementById('aGold').style.color = "red";
    }
    
    if (winrate > bronzeWinrate){
        document.getElementById('winrate').style.color = "green";
    }
    else {
        document.getElementById('winrate').style.color = "red";
    }
    
//    Start next function
    generateGamePlan();
    
}

function silver () {
    silverCS = 116;
    document.getElementById('leagueCs').innerHTML = silverCS;
    
    silverGold = 12174;
    document.getElementById('leagueGold').innerHTML = silverGold;
    
    silverWinrate = 49;
    document.getElementById('leagueWinrate').innerHTML = silverWinrate;
    
    silverKills = 5.6;
    document.getElementById('leagueKills').innerHTML = silverKills;
    
    silverTurrets = 0.9;
    document.getElementById('leagueTurrets').innerHTML = silverTurrets;
    
    silverDeaths = 5.6;
    document.getElementById('leagueDeaths').innerHTML = silverDeaths;
    
    silverAssists = 9.5;
    document.getElementById('leagueAssists').innerHTML = silverAssists;
    
    silverDmgD = 117422;
    document.getElementById('leagueDmgD').innerHTML = silverDmgD;
    
    silverDmgT = 23462;
    document.getElementById('leagueDmgT').innerHTML = silverDmgT;
    
//    alert(averageCS);
    if (averageCS > silverCS){
        document.getElementById('cs').style.color = "green";
    }
    else {
        document.getElementById('cs').style.color = "red";
    }
    
    if (averageKills > silverKills){
        document.getElementById('kills').style.color = "green";
    }
    else {
        document.getElementById('kills').style.color = "red";
    }
    
    if (averageDeaths < silverDeaths){
        document.getElementById('deaths').style.color = "green";
    }
    else {
        document.getElementById('deaths').style.color = "red";
    }
    
    if (averageAssists > silverAssists){
        document.getElementById('assists').style.color = "green";
    }
    else {
        document.getElementById('assists').style.color = "red";
    }
    
    if (averageTurrets > silverTurrets){
        document.getElementById('turrets').style.color = "green";
    }
    else {
        document.getElementById('turrets').style.color = "red";
    }
    
    if (averageDmgD > silverDmgD){
        document.getElementById('dmgD').style.color = "green";
    }
    else {
        document.getElementById('dmgD').style.color = "red";
    }
    
    if (averageDmgT > silverDmgT){
        document.getElementById('dmgT').style.color = "green";
    }
    else {
        document.getElementById('dmgT').style.color = "red";
    }
    
    if (averageGold > silverGold){
        document.getElementById('aGold').style.color = "green";
    }
    else {
        document.getElementById('aGold').style.color = "red";
    }
    
    if (winrate > silverWinrate){
        document.getElementById('winrate').style.color = "green";
    }
    else {
        document.getElementById('winrate').style.color = "red";
    }
    generateGamePlan();    
}

function goldeen() {
    
    goldCS = 50;
    document.getElementById('leagueCs').innerHTML = goldCS;
    
    goldGold = 12889;
    document.getElementById('leagueGold').innerHTML = goldGold;
    
    goldWinrate = 50;
    document.getElementById('leagueWinrate').innerHTML = goldWinrate;
    
    goldKills = 6.4;
    document.getElementById('leagueKills').innerHTML = goldKills;
    
    goldTurrets = 0.9;
    document.getElementById('leagueTurrets').innerHTML = goldTurrets;
    
    goldDeaths = 6.5;
    document.getElementById('leagueDeaths').innerHTML = goldDeaths;
    
    goldAssists = 9.3;
    document.getElementById('leagueAssists').innerHTML = goldAssists;
    
    goldDmgD = 138163;
    document.getElementById('leagueDmgD').innerHTML = goldDmgD;
    
    goldDmgT = 27223;
    document.getElementById('leagueDmgT').innerHTML = goldDmgT;
    
//    alert(averageCS);
    if (averageCS > goldCS){
        document.getElementById('cs').style.color = "green";
    }
    else {
        document.getElementById('cs').style.color = "red";
    }
    
    if (averageKills > goldKills){
        document.getElementById('kills').style.color = "green";
    }
    else {
        document.getElementById('kills').style.color = "red";
    }
    
    if (averageDeaths < goldDeaths){
        document.getElementById('deaths').style.color = "green";
    }
    else {
        document.getElementById('deaths').style.color = "red";
    }
    
    if (averageAssists > goldAssists){
        document.getElementById('assists').style.color = "green";
    }
    else {
        document.getElementById('assists').style.color = "red";
    }
    
    if (averageTurrets > goldTurrets){
        document.getElementById('turrets').style.color = "green";
    }
    else {
        document.getElementById('turrets').style.color = "red";
    }
    
    if (averageGold > goldDmgD){
        document.getElementById('dmgD').style.color = "green";
    }
    else {
        document.getElementById('dmgD').style.color = "red";
    }
    
    if (averageDmgT > goldDmgT){
        document.getElementById('dmgT').style.color = "green";
    }
    else {
        document.getElementById('dmgT').style.color = "red";
    }
    
    if (averageGold > goldGold){
        document.getElementById('aGold').style.color = "green";
    }
    else {
        document.getElementById('aGold').style.color = "red";
    }
    
    if (winrate > goldWinrate){
        document.getElementById('winrate').style.color = "green";
    }
    else {
        document.getElementById('winrate').style.color = "red";
    }
    generateGamePlan(); 
    
}

function platinum () {
    platinumCS = 151;
    document.getElementById('leagueCs').innerHTML = platinumCS;
    
    platinumGold = 12565;
    document.getElementById('leagueGold').innerHTML = platinumGold;
    
    platinumWinrate = 52;
    document.getElementById('leagueWinrate').innerHTML = platinumWinrate;
    
    platinumKills = 6.6;
    document.getElementById('leagueKills').innerHTML = platinumKills;
    
    platinumTurrets = 1.1;
    document.getElementById('leagueTurrets').innerHTML = platinumTurrets;
    
    platinumDeaths = 5.8;
    document.getElementById('leagueDeaths').innerHTML = platinumDeaths;
    
    platinumAssists = 8.5;
    document.getElementById('leagueAssists').innerHTML = platinumAssists;
    
    platinumDmgD = 145151;
    document.getElementById('leagueDmgD').innerHTML = platinumDmgD;
    
    platinumDmgT = 24613;
    document.getElementById('leagueDmgT').innerHTML = platinumDmgT;
    
//    alert(averageCS);
    if (averageCS > platinumCS){
        document.getElementById('cs').style.color = "green";
    }
    else {
        document.getElementById('cs').style.color = "red";
    }
    
    if (averageKills > platinumKills){
        document.getElementById('kills').style.color = "green";
    }
    else {
        document.getElementById('kills').style.color = "red";
    }
    
    if (averageDeaths < platinumDeaths){
        document.getElementById('deaths').style.color = "green";
    }
    else {
        document.getElementById('deaths').style.color = "red";
    }
    
    if (averageAssists > platinumAssists){
        document.getElementById('assists').style.color = "green";
    }
    else {
        document.getElementById('assists').style.color = "red";
    }
    
    if (averageTurrets > platinumTurrets){
        document.getElementById('turrets').style.color = "green";
    }
    else {
        document.getElementById('turrets').style.color = "red";
    }
    
    if (averageDmgD > platinumDmgD){
        document.getElementById('dmgD').style.color = "green";
    }
    else {
        document.getElementById('dmgD').style.color = "red";
    }
    
    if (averageDmgT < platinumDmgT){
        document.getElementById('dmgT').style.color = "green";
    }
    else {
        document.getElementById('dmgT').style.color = "red";
    }
    
    if (averageGold > platinumGold){
        document.getElementById('aGold').style.color = "green";
    }
    else {
        document.getElementById('aGold').style.color = "red";
    }
    
    if (winrate > platinumWinrate){
        document.getElementById('winrate').style.color = "green";
    }
    else {
        document.getElementById('winrate').style.color = "red";
    }
    generateGamePlan(); 
    
}

function diamond () {
    diamondCS = 151;
    document.getElementById('leagueCs').innerHTML = diamondCS;
    
    diamondGold = 12565;
    document.getElementById('leagueGold').innerHTML = diamondGold;
    
    diamondWinrate = 52;
    document.getElementById('leagueWinrate').innerHTML = diamondWinrate;
    
    diamondKills = 6.2;
    document.getElementById('leagueKills').innerHTML = diamondKills;
    
    diamondTurrets = 1;
    document.getElementById('leagueTurrets').innerHTML = diamondTurrets;
    
    diamondDeaths = 5.4;
    document.getElementById('leagueDeaths').innerHTML = diamondDeaths;
    
    diamondAssists = 7.9;
    document.getElementById('leagueAssists').innerHTML = diamondAssists;
    
    diamondDmgD = 130044;
    document.getElementById('leagueDmgD').innerHTML = diamondDmgD;
    
    diamondDmgT = 22723;
    document.getElementById('leagueDmgT').innerHTML = diamondDmgT;
    
//    alert(averageCS);
    if (averageCS > diamondCS){
        document.getElementById('cs').style.color = "green";
    }
    else {
        document.getElementById('cs').style.color = "red";
    }
    
    if (averageKills > diamondKills){
        document.getElementById('kills').style.color = "green";
    }
    else {
        document.getElementById('kills').style.color = "red";
    }
    
    if (averageDeaths < diamondDeaths){
        document.getElementById('deaths').style.color = "green";
    }
    else {
        document.getElementById('deaths').style.color = "red";
    }
    
    if (averageAssists > diamondAssists){
        document.getElementById('assists').style.color = "green";
    }
    else {
        document.getElementById('assists').style.color = "red";
    }
    
    if (averageTurrets > diamondTurrets){
        document.getElementById('turrets').style.color = "green";
    }
    else {
        document.getElementById('turrets').style.color = "red";
    }
    
    if (averageDmgD > diamondDmgD){
        document.getElementById('dmgD').style.color = "green";
    }
    else {
        document.getElementById('dmgD').style.color = "red";
    }
    
    if (averageDmgT < diamondDmgT){
        document.getElementById('dmgT').style.color = "green";
    }
    else {
        document.getElementById('dmgT').style.color = "red";
    }
    
    if (averageGold > diamondGold){
        document.getElementById('aGold').style.color = "green";
    }
    else {
        document.getElementById('aGold').style.color = "red";
    }
    
    if (winrate > diamondWinrate){
        document.getElementById('winrate').style.color = "green";
    }
    else {
        document.getElementById('winrate').style.color = "red";
    }
    generateGamePlan(); 
}

function master () {
    masterCS = 148;
    document.getElementById('leagueCs').innerHTML = masterCS;
    
    masterGold = 11158;
    document.getElementById('leagueGold').innerHTML = masterGold;
    
    masterWinrate = 54;
    document.getElementById('leagueWinrate').innerHTML = masterWinrate;
    
    masterKills = 6.2;
    document.getElementById('leagueKills').innerHTML = masterKills;
    
    masterTurrets = 1;
    document.getElementById('leagueTurrets').innerHTML = masterTurrets;
    
    masterDeaths = 5.1;
    document.getElementById('leagueDeaths').innerHTML = masterDeaths;
    
    masterAssists = 8.1;
    document.getElementById('leagueAssists').innerHTML = masterAssists;
    
    masterDmgD = 122672;
    document.getElementById('leagueDmgD').innerHTML = masterDmgD;
    
    masterDmgT = 22642;
    document.getElementById('leagueDmgT').innerHTML = masterDmgT;
    
//    alert(averageCS);
    if (averageCS > masterCS){
        document.getElementById('cs').style.color = "green";
    }
    else {
        document.getElementById('cs').style.color = "red";
    }
    
    if (averageKills > masterKills){
        document.getElementById('kills').style.color = "green";
    }
    else {
        document.getElementById('kills').style.color = "red";
    }
    
    if (averageDeaths < masterDeaths){
        document.getElementById('deaths').style.color = "green";
    }
    else {
        document.getElementById('deaths').style.color = "red";
    }
    
    if (averageAssists > masterAssists){
        document.getElementById('assists').style.color = "green";
    }
    else {
        document.getElementById('assists').style.color = "red";
    }
    
    if (averageTurrets > masterTurrets){
        document.getElementById('turrets').style.color = "green";
    }
    else {
        document.getElementById('turrets').style.color = "red";
    }
    
    if (averageDmgD > masterDmgD){
        document.getElementById('dmgD').style.color = "green";
    }
    else {
        document.getElementById('dmgD').style.color = "red";
    }
    
    if (averageDmgT < masterDmgT){
        document.getElementById('dmgT').style.color = "green";
    }
    else {
        document.getElementById('dmgT').style.color = "red";
    }
    
    if (averageGold > masterGold){
        document.getElementById('aGold').style.color = "green";
    }
    else {
        document.getElementById('aGold').style.color = "red";
    }
    
    if (winrate > masterWinrate){
        document.getElementById('winrate').style.color = "green";
    }
    else {
        document.getElementById('winrate').style.color = "red";
    }
    generateGamePlan(); 
}

function challenger () {
    challengerCS = 136;
    document.getElementById('leagueCs').innerHTML = challengerCS;
    
    challengerGold = 11226;
    document.getElementById('leagueGold').innerHTML = challengerGold;
    
    challengerWinrate = 54;
    document.getElementById('leagueWinrate').innerHTML = challengerWinrate;
    
    challengerKills = 5.1;
    document.getElementById('leagueKills').innerHTML = challengerKills;
    
    challengerTurrets = 1;
    document.getElementById('leagueTurrets').innerHTML = challengerTurrets;
    
    challengerDeaths = 5;
    document.getElementById('leagueDeaths').innerHTML = challengerDeaths;
    
    challengerAssists = 8.2;
    document.getElementById('leagueAssists').innerHTML = challengerAssists;
    
    challengerDmgD = 116102;
    document.getElementById('leagueDmgD').innerHTML = challengerDmgD;
    
    challengerDmgT = 21599;
    document.getElementById('leagueDmgT').innerHTML = challengerDmgT;
    
//    alert(averageCS);
    if (averageCS > challengerCS){
        document.getElementById('cs').style.color = "green";
    }
    else {
        document.getElementById('cs').style.color = "red";
    }
    
    if (averageKills > challengerKills){
        document.getElementById('kills').style.color = "green";
    }
    else {
        document.getElementById('kills').style.color = "red";
    }
    
    if (averageDeaths < challengerDeaths){
        document.getElementById('deaths').style.color = "green";
    }
    else {
        document.getElementById('deaths').style.color = "red";
    }
    
    if (averageAssists > challengerAssists){
        document.getElementById('assists').style.color = "green";
    }
    else {
        document.getElementById('assists').style.color = "red";
    }
    
    if (averageTurrets > challengerTurrets){
        document.getElementById('turrets').style.color = "green";
    }
    else {
        document.getElementById('turrets').style.color = "red";
    }
    
    if (averageDmgD > challengerDmgD){
        document.getElementById('dmgD').style.color = "green";
    }
    else {
        document.getElementById('dmgD').style.color = "red";
    }
    
    if (averageDmgT < challengerDmgT){
        document.getElementById('dmgT').style.color = "green";
    }
    else {
        document.getElementById('dmgT').style.color = "red";
    }
    
    if (averageGold > challengerGold){
        document.getElementById('aGold').style.color = "green";
    }
    else {
        document.getElementById('aGold').style.color = "red";
    }
    
    if (winrate > challengerWinrate){
        document.getElementById('winrate').style.color = "green";
    }
    else {
        document.getElementById('winrate').style.color = "red";
    }
    generateGamePlan(); 
}


//Function to display 'generate game plan' button
function generateGamePlan () {
    document.getElementById('generateGamePlan').style.display = "block";
}

//Function for dynamically updating game plan 
function gamePlan () {

//    Sets the amount of 'hints' to 0
    hintCount = 0;
    
//    Display the pop-up with value summoner name at top
    document.getElementById('staticPlan').style.display = "block";
    document.getElementById('planPage').style.display = "block";
    document.getElementById('keepUp').style.display = "block";
    document.getElementById('usernamePlan').innerHTML = sumName;
    document.getElementById('helpHider').style.display = "block";
    
    green = "";

//    If the 'kills' value is red and the hint count is still less than 4, increment hintcount and display kills hint module
    if (document.getElementById('kills').style.color == "red" && hintCount < 4) {
        document.getElementById('killsContent').style.display = "inline-block";
        hintCount = hintCount + 1;
    } else {
//        Else if it is green, add value 'kills' to variable called green to display for user
        green = green + "Kills |  ";
    }
    
    if (document.getElementById('cs').style.color == "red" && hintCount < 4) {
        document.getElementById('csContent').style.display = "inline-block";
        hintCount = hintCount + 1;
    } else {
        green = green + "CS/Game |  ";
    }
    
    if (document.getElementById('aGold').style.color == "red" && hintCount < 4) {
        document.getElementById('goldContent').style.display = "inline-block";
        hintCount = hintCount + 1;
    } else {
        green = green + "Gold/Game |  ";
    }
    
    
    if (document.getElementById('dmgD').style.color == "red" && hintCount < 4) {
        document.getElementById('dmgDContent').style.display = "inline-block";
        hintCount = hintCount + 1;
    } else {
        green = green + "Damage Dealt/Game |  ";
    }
    
    if (document.getElementById('dmgT').style.color == "red" && hintCount < 4) {
        document.getElementById('dmgTContent').style.display = "inline-block";
        hintCount = hintCount + 1;
    } else {
        green = green + "Damage Taken/Game |  ";
    }
    
    
    if (document.getElementById('winrate').style.color == "red" && hintCount < 4) {
        document.getElementById('winrateContent').style.display = "inline-block";
        hintCount = hintCount + 1;
    } else {
        green = green + "Overall Winrate |  ";
    }
    
    
    if (document.getElementById('deaths').style.color == "red" && hintCount < 4) {
        document.getElementById('deathsContent').style.display = "inline-block";
        hintCount = hintCount + 1;
    } else {
        green = green + "Deaths |  ";
        
    }
    
    if (document.getElementById('assists').style.color == "red" && hintCount < 4) {
        document.getElementById('assistsContent').style.display = "inline-block";
        hintCount = hintCount + 1;
    } else {
        green = green + "Assists |  ";
       
    }
    
    if (document.getElementById('turrets').style.color == "red" && hintCount < 4) {
        document.getElementById('turretsContent').style.display = "inline-block";
        hintCount = hintCount + 1;
    } else {
        green = green + "Turrets Taken/Game |  ";
    }
    
//    Display variable which now holds a string for every 'green' data item
    document.getElementById('killsGreen').innerHTML = green;
    
    
//    If there is an odd number of modules, display them full width
    if (hintCount == 1 || hintCount == 3) {
                document.getElementsByClassName("helpContent")[1].style.width = "99%";
                document.getElementsByClassName("helpContent")[3].style.width = "99%";
    }    
}

//Function to close plan page when x is pressed
function closePlan(){
    document.getElementById('planPage').style.display = "none";
}

//Function to clear error when another action is taken
function clearerror() {
     document.getElementById('errors').innerHTML = "";
}
