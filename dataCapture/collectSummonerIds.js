// masters player coolnice
//var summonerID = "62943148";

// beastt
//var summonerID = "33707181";

//rbarabia
//var summonerID = "62943148";

var summonerID = "22275693";


function spiderWeb(){
      
        $.ajax({
        url: 'https://euw.api.pvp.net/api/lol/euw/v1.3/game/by-summoner/' + summonerID + '/recent?api_key=771f5509-7e01-4f41-9ec2-69e7b2158c66',
        type: 'GET',
        dataType: 'json',
        data: {
        },
        success: function(resp) {
            
            for (var i = 0; i < resp.games.length; i++){
            
                if (resp.games[i].subType == "RANKED_FLEX_SR" || "RANKED_SOLO_5x5") {
                
                    for (var o = 0; o < resp.games[i].fellowPlayers.length; o++) {
                        summID = resp.games[i].fellowPlayers[o].summonerId;
//                        console.log(summID);
                        var summArr = [summID];
//                        console.log(summArr);
//                        localStorage.setItem(summArr, JSON.stringify(summArr));
                        collection(summArr);
                        
                        for (p = 0; p < summArr.length; p++){
//                        document.getElementById('errors').innerHTML = summArr[p] + " ";
                            var summArrParse = JSON.parse(summArr[p]);
                            
                            var btn = document.createElement("text");
                            var t = document.createTextNode(summArr + ", ");
                            btn.appendChild(t);
                            document.body.appendChild(btn);
                        }
                    }
                }
            }
            
            
            
            },
        
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        document.getElementById('errors').innerHTML = "Error, could not find summoner";
      }
    });
} 
            
function collection(summArr) {
//    var listofSumm = localStorage.getItem(summArr);
//    console.log(summArr);
    var summonerIds = "36807397, 52438658, 94807748, 52380501, 42009249, 43536876, 64175999, 52079972, 37166945, 33178862, 20950721, 92339762, 92369312, 26185030, 38311779, 22057761, 30269104, 21765252, 57817724, 53738693, 23751577, 43725395, 24313693, 24043930, 31972312, 43748075, 35680395, 63589020, 95167542, 19708052, 21139079, 42277225, 21622017, 24312189, 20094017, 43794696, 97547299, 92787329, 95206795, 42277225, 31027178, 20094017, 43794696, 19863502, 20052937, 22809069, 95206795, 19581736, 31027178, 42277225, 42327382, 20094017, 27941145, 94987702, 23289949, 289324, 37288795, 53737185, 27941145, 41537464, 92238586, 52292830, 25894415, 66318412, 35828642, 33655870, 94788731, 46841393, 42277225, 97816793, 20385690, 31983541, 96577516, 97716976, 19409585, 56889263, 20812847, 24254100, 88339468, 29629476, 97277462, 96016861, 23289949, 26656911, 58267469, 34532500, 24010336, 70037375, 20881158, 22275693, 34628974, 22341096, 25532701, 92787606, 20801650, 23423070, 40956931, 20020102, 68597024, 24471277, 21302646, 43573667, 85281012, 19538899, 24428523, 27427030, 20181136, 32317426, 19708052, 85177049, 86356846, 18995872, 20778901, 89747801, 19828997, 95166892, 37689587, 23307330, 87080148, 85177049, 86356846, 18995872, 28931680, 95136999, 31211177, 69868141, 24471277, 33655870, 30170629, 75068307, 24194142, 24804478, 19352674, 23314489, 20747228, 75068307, 43825991, 24745916, 19047300, 29108174, 36881128, 19828997, 19926370, 21888817, 37882499, 75068307, 33147001, 62587454, 20778901, 51628250, 93647556, 95166892, 20605205, 23307330, 49534099, 37882499, 75068307, 62587454, 20276841, 25277585, 59607544, 95166892, 75068307, 57346994, 23247536, 27492090, 91577003, 31211177, 31096976, 20832381, 20918894, 23595556, 87080148, 20815637, 52200067";
    Papa.parse(summonerIds);
    console.log(summonerIds);
//    document.write(summArr.join(", "));
}

//function capture() {
//        
//        $.ajax({
//        url: 'https://euw.api.pvp.net/api/lol/euw/v1.3/stats/by-summoner/' + summonerID + '/ranked?api_key=771f5509-7e01-4f41-9ec2-69e7b2158c66',
//        type: 'GET',
//        dataType: 'json',
//        data: {
//        },
//        success: function(resp) {
//
//            for (var i = 0; i < resp.champions.length; i++) {
//                if (resp.champions[i].id == "0"){
//                    
//                    cs = resp.champions[i].stats.totalMinionKills;
//                    
////                    JSON.stringify(resp);
////                    
////                    document.getElementById('array').innerHTML = resp;
//                
//                    
//                    // returns response as array
//                    var arr = $.map(resp.champions[i].stats, function(el) { return el; });
//                    
//                    console.log(arr);
//                    
//                    var totalSessions = arr[0];
//                    
//                    totals(totalSessions);
//                    
//
//                    document.getElementById('array').innerHTML = arr;
//                    
//                    
////                    kills = resp.champions[i].stats.totalChampionKills;
////                    averageKills = kills / played;
////                    averageKills = Math.round(averageKills * 10) / 10;
////                    document.getElementById('kills').innerHTML = averageKills + "/";
////                    
////                    assists = resp.champions[i].stats.totalAssists;
////                    averageAssists = assists / played;
////                    averageAssists = Math.round(averageAssists * 10) / 10;
////                    document.getElementById('assists').innerHTML = averageAssists;
////                    
////                    deaths = resp.champions[i].stats.totalDeathsPerSession;
////                    averageDeaths = deaths / played;
////                    averageDeaths = Math.round(averageDeaths * 10) / 10;
////                    document.getElementById('deaths').innerHTML = averageDeaths + "/";
////                    
////                    dmgD = resp.champions[i].stats.totalDamageDealt;
////                    averageDmgD = dmgD / played;
////                    averageDmgD = Math.round(averageDmgD);
////                    document.getElementById('dmgD').innerHTML = averageDmgD;
////                    
////                    dmgT = resp.champions[i].stats.totalDamageTaken;
////                    averageDmgT = dmgT / played;
////                    averageDmgT = Math.round(averageDmgT);
////                    document.getElementById('dmgT').innerHTML = averageDmgT;
////                    
////                    gold = resp.champions[i].stats.totalGoldEarned;
////                    averageGold = gold / played;
////                    averageGold = Math.round(averageGold);
////                    document.getElementById('aGold').innerHTML = averageGold;
////            
////                    turrets = resp.champions[i].stats.totalTurretsKilled;
////                    averageTurrets = turrets / played;
////                    averageTurrets = Math.round(averageTurrets * 10) / 10;
////                    document.getElementById('turrets').innerHTML = averageTurrets;
//                    
//                }
//            }
//
//            },
//        
//      error: function(XMLHttpRequest, textStatus, errorThrown) {
////        document.getElementById('errors').innerHTML = "Error, could not find summoner";
//      }
//    });
//} 
//
//function totals(totalSessions){
//    
//    var start = 0;
//    var total = start + totalSessions;
//    console.log(total);
//    
//}
//
//
//
////
////function capture() {
////        
////       function rankedLookup() {
////        
////        $.ajax({
////        url: 'https://euw.api.pvp.net/api/lol/euw/v2.5/league/by-summoner/62943148/entry?api_key=771f5509-7e01-4f41-9ec2-69e7b2158c66',
////        type: 'GET',
////        dataType: 'json',
////        data: {
////        },
////        success: function(resp) {
////            
////            
////        },
////        
////        error: function(XMLHttpRequest, textStatus, errorThrown) {
////        document.getElementById('errors').innerHTML = "Error, could not get rank";
////      }
////    });
////} 
////
////    else {
////    alert("Did not work");
////    }
////}
////
