function getSumms() {

//var summs = "36807397, 52438658, 94807748, 52380501, 42009249, 43536876, 64175999, 52079972, 37166945, 33178862, 20950721, 92339762, 92369312, 26185030, 38311779, 22057761, 30269104, 21765252, 57817724, 53738693, 23751577, 43725395, 24313693, 24043930, 31972312, 43748075, 35680395, 63589020, 95167542, 19708052, 21139079, 42277225, 21622017, 24312189, 20094017, 43794696, 97547299, 92787329, 95206795, 42277225, 31027178, 20094017, 43794696, 19863502, 20052937, 22809069, 95206795, 19581736, 31027178, 42277225, 42327382, 20094017, 27941145, 94987702, 23289949, 289324, 37288795, 53737185, 27941145, 41537464, 92238586, 52292830, 25894415, 66318412, 35828642, 33655870, 94788731, 46841393, 42277225, 97816793, 20385690, 31983541, 96577516, 97716976, 19409585, 56889263, 20812847, 24254100, 88339468, 29629476, 97277462, 96016861, 23289949, 26656911, 58267469, 34532500, 24010336, 70037375, 20881158, 22275693, 34628974, 22341096, 25532701, 92787606, 20801650, 23423070, 40956931, 20020102, 68597024, 24471277, 21302646, 43573667, 85281012, 19538899, 24428523, 27427030, 20181136, 32317426, 19708052, 85177049, 86356846, 18995872, 20778901, 89747801, 19828997, 95166892, 37689587, 23307330, 87080148, 85177049, 86356846, 18995872, 28931680, 95136999, 31211177, 69868141, 24471277, 33655870, 30170629, 75068307, 24194142, 24804478, 19352674, 23314489, 20747228, 75068307, 43825991, 24745916, 19047300, 29108174, 36881128, 19828997, 19926370, 21888817, 37882499, 75068307, 33147001, 62587454, 20778901, 51628250, 93647556, 95166892, 20605205, 23307330, 49534099, 37882499, 75068307, 62587454, 20276841, 25277585, 59607544, 95166892, 75068307, 57346994, 23247536, 27492090, 91577003, 31211177, 31096976, 20832381, 20918894, 23595556, 87080148, 20815637, 52200067"

var summs = "36807397, 52438658, 94807748, 52380501, 52380501";

summs = summs.replace(/\s+/g, '');
//alert(summs);
    
var summms = summs.split(',');

console.log(summms);

getData(summms);
    
}
// summms = summoner id array

//function getDataTimer(summs) {
//    var timer = setInterval(getData(summs), 1000); 
//}



var p = 0;

function getData(summms) {
//    length = summms[0];
//    alert(length);
    

      
    for (var i = 0; i < summms.length; i++){
       
//         setTimeout(function (summms[i]){
        $.ajax({
        url: 'https://euw.api.pvp.net/api/lol/euw/v1.3/stats/by-summoner/' + summms[i] + '/ranked?api_key=771f5509-7e01-4f41-9ec2-69e7b2158c66',
        type: 'GET',
        dataType: 'json',
        data: {
        },
        success: function(resp) {
           
            for (var o = 0; o < resp.champions.length; o++) {
                if (resp.champions[o].id == "0"){
                    
                    played = resp.champions[o].stats.totalSessionsPlayed;
                    
                    cs = resp.champions[o].stats.totalMinionKills;
                    csPlayed = cs / played;
                    csPlayed = Math.round(csPlayed);
                    console.log(csPlayed);
                }
            }
            
            },
        
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        document.getElementById('errors').innerHTML = "Error, could not find summoner";
      }
    });
//     }, 1000)}
}
           







//function capturrre() {
//        
//       function rankedLookup() {
//        
//        $.ajax({
//        url: 'https://euw.api.pvp.net/api/lol/euw/v2.5/league/by-summoner/62943148/entry?api_key=771f5509-7e01-4f41-9ec2-69e7b2158c66',
//        type: 'GET',
//        dataType: 'json',
//        data: {
//        },
//        success: function(resp) {
//            
//            
//            
//            
//            
//            
//            
//            soloTier = resp[summonerID][0].tier;
//            document.getElementById('soloTier').innerHTML = soloTier + " ";
//            soloDiv = resp[summonerID][0].entries[0].division;
//            document.getElementById('soloDiv').innerHTML = soloDiv + " ";
//            soloLp = resp[summonerID][0].entries[0].leaguePoints;
//            document.getElementById('soloLp').innerHTML = soloLp + "LP";
//            
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
//        },
//        
//        error: function(XMLHttpRequest, textStatus, errorThrown) {
//        document.getElementById('errors').innerHTML = "Error, could not get rank";
//      }
//    });
//} 
//
//    else {
//    alert("Did not work");
//    }
//}
//
