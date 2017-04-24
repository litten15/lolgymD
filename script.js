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
}

function submitInfo() {
    
    var SUMMONER_NAME_UI = "";
    SUMMONER_NAME_UI = $("#userName").val();
    
    var SERVER = "";
    SERVER = $("#local").val();
    
    var SUMMONER_NAME = SUMMONER_NAME_UI.replace(" ", "");
    SUMMONER_NAME = SUMMONER_NAME.toLowerCase().trim();
    
//    summonerLookUp(SERVER, SUMMONER_NAME);
    
    if (SUMMONER_NAME !== "") {
        
        $.ajax({
        url: 'https://' + SERVER + '.api.pvp.net/api/lol/' + SERVER + '/v1.4/summoner/by-name/' + SUMMONER_NAME + '?api_key=771f5509-7e01-4f41-9ec2-69e7b2158c66',
        type: 'GET',
        dataType: 'json',
        data: {
        },
        success: function(json) {
            summonerID = json[SUMMONER_NAME].id;
            summonerLevel = json[SUMMONER_NAME].summonerLevel;
            document.getElementById('sLevel').innerHTML = summonerLevel;
            fName = json[SUMMONER_NAME].name;
            document.getElementById('username').innerHTML = fName;
            sumName = fName;
//            testing (SERVER);
//            alert("it worked");
            
            rankedLookup(summonerID, SERVER, SUMMONER_NAME_UI);
            
            },
        
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        document.getElementById('errors').innerHTML = "Error - could not find summoner";
      }
    });
} 

    else {
    alert("Please enter a summoner name");
    
}
      
}    

function summonerLookUp(SERVER, summonerID, SUMMONER_NAME_UI, played) {
        document.getElementById('pageOne').style.display = "none";
        document.getElementById('pageTwo').style.display = "block";
        document.getElementById('logoImg').style.marginLeft = "inherit";
        document.getElementById('stats').style.display = "block";
//    alert(SERVER);
//    alert(SUMMONER_NAME);
//    alert(summonerID);
    
    if (summonerID !== "") {
        
        $.ajax({
        url: 'https://' + SERVER + '.api.pvp.net/api/lol/' + SERVER + '/v1.3/stats/by-summoner/' + summonerID + '/ranked?api_key=771f5509-7e01-4f41-9ec2-69e7b2158c66',
        type: 'GET',
        dataType: 'json',
        data: {
        },
        success: function(resp) {
//            alert(played);
//            to fetch last file
//            champs = resp.champions.length - 1;
//            champid = resp.champions[]
            
            for (var i = 0; i < resp.champions.length; i++) {
                if (resp.champions[i].id == "0"){
//                    alert("found");
                    
                    cs = resp.champions[i].stats.totalMinionKills;
                    averageCS = cs / played;
                    averageCS = Math.round(averageCS);
                    document.getElementById('cs').innerHTML = averageCS;
                    
                    kills = resp.champions[i].stats.totalChampionKills;
                    averageKills = kills / played;
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
//                    alert(dmgD);
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
                    
                    leagueAverage();
                }
            }
            
            document.getElementById('intro').style.display = "inline";
            },
        
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        document.getElementById('errors').innerHTML = "Error - could not find summoner";
      }
    });
} 

    else {
    alert("Did not work");
    }
}

function rankedLookup(summonerID, SERVER, SUMMONER_NAME_UI) {
    if (summonerID !== "") {
        
        $.ajax({
        url: 'https://' + SERVER + '.api.pvp.net/api/lol/' + SERVER + '/v2.5/league/by-summoner/' + summonerID + '/entry?api_key=771f5509-7e01-4f41-9ec2-69e7b2158c66',
        type: 'GET',
        dataType: 'json',
        data: {
        },
        success: function(resp) {
              
            entries = resp[summonerID].length;
            firstEntry = resp[summonerID][0].queue;
//            alert(firstEntry);

            
             // do calcs for only solo
            if (entries == 1 && firstEntry == "RANKED_SOLO_5x5"){
//                alert("only solo found");
                document.getElementById('flexTier').innerHTML = "Flex rank not found";
                document.getElementById('flexRankIcon').style.display = "none";
                
                // get rank
                soloTier = resp[summonerID][0].tier;
                document.getElementById('soloTier').innerHTML = soloTier + " ";
                soloDiv = resp[summonerID][0].entries[0].division;
                document.getElementById('soloDiv').innerHTML = soloDiv + " ";
                soloLp = resp[summonerID][0].entries[0].leaguePoints;
                document.getElementById('soloLp').innerHTML = soloLp + "LP";
                
                // win ratio
                wins = resp[summonerID][0].entries[0].wins;
//                alert(wins);
                document.getElementById('wins').innerHTML = wins;
                
                losses = resp[summonerID][0].entries[0].losses;
//                alert(losses);
                document.getElementById('losses').innerHTML = losses;
                
                played = wins + losses;
                document.getElementById('played').innerHTML = played;
                
                winrate = wins / (wins + losses) * 100;
                winrate = Math.round(winrate);
                document.getElementById('winrate').innerHTML = winrate + "%";
                
                flexTier = 0;
                decideRank(soloTier, flexTier);
                
                } 
            
//                  alert("only flex found");
              else if (entries == 1 && firstEntry == "RANKED_FLEX_SR") {

                document.getElementById('soloTier').innerHTML = "Solo rank not found";
                  
                // get rank
                flexTier = resp[summonerID][0].tier;
                document.getElementById('flexTier').innerHTML = flexTier + " ";
                flexDiv = resp[summonerID][0].entries[0].division;
                document.getElementById('flexDiv').innerHTML = flexDiv + " ";
                flexLp = resp[summonerID][0].entries[0].leaguePoints;
                document.getElementById('flexLp').innerHTML = flexLp + "LP";
                
                // win ratio
                wins = resp[summonerID][0].entries[0].wins;
//                alert(wins);
                document.getElementById('wins').innerHTML = wins;
                
                losses = resp[summonerID][0].entries[0].losses;
//                alert(losses);
                document.getElementById('losses').innerHTML = losses;
                
                played = wins + losses;
                document.getElementById('played').innerHTML = played;
                
                winrate = wins / (wins + losses) * 100;
                winrate = Math.round(winrate);
                document.getElementById('winrate').innerHTML = winrate + "%";
                soloTier = 0;
                decideRank(soloTier, flexTier);
            } 
            
//                do calcs for both
            else if (entries == 2) {
                
                // get rank
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
                
                // win ratio
                soloWins = resp[summonerID][0].entries[0].wins;
                flexWins = resp[summonerID][1].entries[0].wins;
                wins = soloWins + flexWins;
//                alert(wins);
                document.getElementById('wins').innerHTML = wins;
                
                soloLosses = resp[summonerID][0].entries[0].losses;
                flexLosses = resp[summonerID][1].entries[0].losses;
                losses = soloLosses + flexLosses;
//                alert(losses);
                document.getElementById('losses').innerHTML = losses;
                
                played = wins + losses;
                document.getElementById('played').innerHTML = played;
                
                winrate = wins / (wins + losses) * 100;
                winrate = Math.round(winrate);
                document.getElementById('winrate').innerHTML = winrate + "%";
                
                decideRank(soloTier, flexTier);
                
              
//                alert("solo and flex found");
            } else {
                alert("not enough ranked games found");
            }
            
            summonerLookUp(SERVER, summonerID, SUMMONER_NAME_UI, played);
            
            
//            if (resp.length = 1) {
                
                
//                document.getElementById('flexTier').innerHTML = "Flex rank not found"
//                
//                soloTier = resp[summonerID][0].tier;
//                document.getElementById('soloTier').innerHTML = soloTier + " ";
//                soloDiv = resp[summonerID][0].entries[0].division;
//                document.getElementById('soloDiv').innerHTML = soloDiv + " ";
//                soloLp = resp[summonerID][0].entries[0].leaguePoints;
//                document.getElementById('soloLp').innerHTML = soloLp + "LP";
//            } 
//            
//            else if (resp.length = 1; && resp[summonerID][0].queue = "RANKED_FLEX_SR" )
//                
//                flexTier = resp[summonerID][0].tier;
//                document.getElementById('soloTier').innerHTML = "Solo rank not found";
//                
//                document.getElementById('flexTier').innerHTML = flexTier + " ";
//                flexDiv = resp[summonerID][0].entries[0].division;
//                decideRank(soloTier, flexTier);
//                document.getElementById('flexDiv').innerHTML = flexDiv + " ";
//                flexLp = resp[summonerID][0].entries[0].leaguePoints;
//                document.getElementById('flexLp').innerHTML = flexLp + "LP";
//                
//            }
            
           
            
//            if (resp.length = 2) {
//            flexTier = resp[summonerID][1].tier;
////            if (flexTier !== "") {
////                flexTier == "not enough games";
////            }
//            document.getElementById('flexTier').innerHTML = flexTier + " ";
//            flexDiv = resp[summonerID][1].entries[0].division;
//            decideRank(soloTier, flexTier);
//            document.getElementById('flexDiv').innerHTML = flexDiv + " ";
//            flexLp = resp[summonerID][1].entries[0].leaguePoints;
//            document.getElementById('flexLp').innerHTML = flexLp + "LP";
//            } 
//            else {
//                alert ("gone wrong");
//                
//            }
        },
        
        error: function(XMLHttpRequest, textStatus, errorThrown) {
        document.getElementById('errors').innerHTML = "Error - could not find enough ranked games";
      }
    });
} 

    else {
    alert("Did not work");
    }
}

function decideRank (soloTier, flexTier) {
//    alert(soloTier);
//    alert(flexTier);
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
    
    if (sTier >= fTier) {
        highestTier = sTier;
        document.getElementById('playerTier').innerHTML = soloTier;
        document.getElementById('tierTitle').style.display = "inline";
    } else {
        highestTier = fTier;
        document.getElementById('playerTier').innerHTML = flexTier;
        document.getElementById('tierTitle').style.display = "inline";
    }
//    alert(sTier);
//    alert(fTier);
    document.getElementById('soloRankIcon').src = 'images/rankIcons/' + sTier + '.png';
    document.getElementById('flexRankIcon').src = 'images/rankIcons/' + fTier + '.png';
//    alert(fTier);
    
    
//    alert(sTier);
}
//function testing (SERVER) {
//    alert(SERVER);
//}
//

function leagueAverage(){
//    alert(highestTier);
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
    bronzeCS = 100;
    document.getElementById('leagueCs').innerHTML = bronzeCS;
    
    bronzeGold = 9000;
    document.getElementById('leagueGold').innerHTML = bronzeGold;
    
    bronzeWinrate = 45;
    document.getElementById('leagueWinrate').innerHTML = bronzeWinrate;
    
    bronzeKills = 6;
    document.getElementById('leagueKills').innerHTML = bronzeKills;
    
    bronzeTurrets = 0.5;
    document.getElementById('leagueTurrets').innerHTML = bronzeTurrets;
    
    bronzeDeaths = 6;
    document.getElementById('leagueDeaths').innerHTML = bronzeDeaths;
    
    bronzeAssists = 6;
    document.getElementById('leagueAssists').innerHTML = bronzeAssists;
    
    bronzeDmgD = 30000;
    document.getElementById('leagueDmgD').innerHTML = bronzeDmgD;
    
    bronzeDmgT = 25000;
    document.getElementById('leagueDmgT').innerHTML = bronzeDmgT;
    
//    alert(averageCS);
    if (averageCS > bronzeCS){
        document.getElementById('cs').style.color = "green";
    }
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
    gameplan();
    
}

function silver () {
    silverCS = 100;
    document.getElementById('leagueCs').innerHTML = silverCS;
    
    silverGold = 9000;
    document.getElementById('leagueGold').innerHTML = silverGold;
    
    silverWinrate = 45;
    document.getElementById('leagueWinrate').innerHTML = silverWinrate;
    
    silverKills = 6;
    document.getElementById('leagueKills').innerHTML = silverKills;
    
    silverTurrets = 0.5;
    document.getElementById('leagueTurrets').innerHTML = silverTurrets;
    
    silverDeaths = 6;
    document.getElementById('leagueDeaths').innerHTML = silverDeaths;
    
    silverAssists = 6;
    document.getElementById('leagueAssists').innerHTML = silverAssists;
    
    silverDmgD = 30000;
    document.getElementById('leagueDmgD').innerHTML = silverDmgD;
    
    silverDmgT = 25000;
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
    
    goldCS = 100;
    document.getElementById('leagueCs').innerHTML = goldCS;
    
    goldGold = 9000;
    document.getElementById('leagueGold').innerHTML = goldGold;
    
    goldWinrate = 45;
    document.getElementById('leagueWinrate').innerHTML = goldWinrate;
    
    goldKills = 6;
    document.getElementById('leagueKills').innerHTML = goldKills;
    
    goldTurrets = 0.5;
    document.getElementById('leagueTurrets').innerHTML = goldTurrets;
    
    goldDeaths = 6;
    document.getElementById('leagueDeaths').innerHTML = goldDeaths;
    
    goldAssists = 6;
    document.getElementById('leagueAssists').innerHTML = goldAssists;
    
    goldDmgD = 30000;
    document.getElementById('leagueDmgD').innerHTML = goldDmgD;
    
    goldDmgT = 25000;
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
    platinumCS = 100;
    document.getElementById('leagueCs').innerHTML = platinumCS;
    
    platinumGold = 9000;
    document.getElementById('leagueGold').innerHTML = platinumGold;
    
    platinumWinrate = 45;
    document.getElementById('leagueWinrate').innerHTML = platinumWinrate;
    
    platinumKills = 6;
    document.getElementById('leagueKills').innerHTML = platinumKills;
    
    platinumTurrets = 0.5;
    document.getElementById('leagueTurrets').innerHTML = platinumTurrets;
    
    platinumDeaths = 6;
    document.getElementById('leagueDeaths').innerHTML = platinumDeaths;
    
    platinumAssists = 6;
    document.getElementById('leagueAssists').innerHTML = platinumAssists;
    
    platinumDmgD = 30000;
    document.getElementById('leagueDmgD').innerHTML = platinumDmgD;
    
    platinumDmgT = 25000;
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
    diamondCS = 100;
    document.getElementById('leagueCs').innerHTML = diamondCS;
    
    diamondGold = 9000;
    document.getElementById('leagueGold').innerHTML = diamondGold;
    
    diamondWinrate = 45;
    document.getElementById('leagueWinrate').innerHTML = diamondWinrate;
    
    diamondKills = 6;
    document.getElementById('leagueKills').innerHTML = diamondKills;
    
    diamondTurrets = 0.5;
    document.getElementById('leagueTurrets').innerHTML = diamondTurrets;
    
    diamondDeaths = 6;
    document.getElementById('leagueDeaths').innerHTML = diamondDeaths;
    
    diamondAssists = 6;
    document.getElementById('leagueAssists').innerHTML = diamondAssists;
    
    diamondDmgD = 30000;
    document.getElementById('leagueDmgD').innerHTML = diamondDmgD;
    
    diamondDmgT = 25000;
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
    masterCS = 100;
    document.getElementById('leagueCs').innerHTML = masterCS;
    
    masterGold = 9000;
    document.getElementById('leagueGold').innerHTML = masterGold;
    
    masterWinrate = 45;
    document.getElementById('leagueWinrate').innerHTML = masterWinrate;
    
    masterKills = 6;
    document.getElementById('leagueKills').innerHTML = masterKills;
    
    masterTurrets = 0.5;
    document.getElementById('leagueTurrets').innerHTML = masterTurrets;
    
    masterDeaths = 6;
    document.getElementById('leagueDeaths').innerHTML = masterDeaths;
    
    masterAssists = 6;
    document.getElementById('leagueAssists').innerHTML = masterAssists;
    
    masterDmgD = 30000;
    document.getElementById('leagueDmgD').innerHTML = masterDmgD;
    
    masterDmgT = 25000;
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
    challengerCS = 100;
    document.getElementById('leagueCs').innerHTML = challengerCS;
    
    challengerGold = 9000;
    document.getElementById('leagueGold').innerHTML = challengerGold;
    
    challengerWinrate = 45;
    document.getElementById('leagueWinrate').innerHTML = challengerWinrate;
    
    challengerKills = 6;
    document.getElementById('leagueKills').innerHTML = challengerKills;
    
    challengerTurrets = 0.5;
    document.getElementById('leagueTurrets').innerHTML = challengerTurrets;
    
    challengerDeaths = 6;
    document.getElementById('leagueDeaths').innerHTML = challengerDeaths;
    
    challengerAssists = 6;
    document.getElementById('leagueAssists').innerHTML = challengerAssists;
    
    challengerDmgD = 30000;
    document.getElementById('leagueDmgD').innerHTML = challengerDmgD;
    
    challengerDmgT = 25000;
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


function generateGamePlan () {
    document.getElementById('generateGamePlan').style.display = "block";
}

function gamePlan () {
//    var colour = document.getElementById('winrate').style.color;
////    alert(colour);
//    var value = document.getElementById('winrate').innerHTML;
//    alert(value);
    hintCount = 0;
    document.getElementById('staticPlan').style.display = "block";
    document.getElementById('planPage').style.display = "block";
    document.getElementById('usernamePlan').innerHTML = sumName;
    
    
    if (document.getElementById('kills').style.color == "red" && hintCount < 4) {
        document.getElementById('killsContent').style.display = "inline-block";
        hintCount = hintCount + 1;
    }
    
    if (document.getElementById('cs').style.color == "red" && hintCount < 4) {
        document.getElementById('csContent').style.display = "inline-block";
        hintCount = hintCount + 1;
    }
    
    if (document.getElementById('aGold').style.color == "red" && hintCount < 4) {
        document.getElementById('goldContent').style.display = "inline-block";
        hintCount = hintCount + 1;
    }
    
    
    if (document.getElementById('dmgD').style.color == "red" && hintCount < 4) {
        document.getElementById('dmgDContent').style.display = "inline-block";
        hintCount = hintCount + 1;
    }
    
    if (document.getElementById('dmgT').style.color == "red" && hintCount < 4) {
        document.getElementById('dmgTContent').style.display = "inline-block";
        hintCount = hintCount + 1;
    }
    
    
    if (document.getElementById('winrate').style.color == "red" && hintCount < 4) {
//        alert("red");
        document.getElementById('winrateContent').style.display = "inline-block";
        hintCount = hintCount + 1;
//        return(hintCount);
//        alert(hintCount);
    }
    
    
    if (document.getElementById('deaths').style.color == "red" && hintCount < 4) {
        document.getElementById('deathsContent').style.display = "inline-block";
        hintCount = hintCount + 1;
    }
    
    if (document.getElementById('assists').style.color == "red" && hintCount < 4) {
        document.getElementById('assistsContent').style.display = "inline-block";
        hintCount = hintCount + 1;
    }
    
    if (document.getElementById('turrets').style.color == "red" && hintCount < 4) {
        document.getElementById('turretsContent').style.display = "inline-block";
        hintCount = hintCount + 1;
    }
    
}


//    if (averageCS < aCs){
//        alert("lower than");
//    }
//        else if (averageCS > aCs){
//            alert("higher than");
//        }
//    }    
    
    
//    var cs = "cs";
//    var lcs = $.extend({}, rank, cs );
    
//    alert(lcs);
//    alert(rank);
    
//    alert(leagueAverageCS);
    
function closePlan(){

    document.getElementById('planPage').style.display = "none";
}


function clearerror() {
     document.getElementById('errors').innerHTML = "";
}
