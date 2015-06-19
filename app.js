var cheerio = require('cheerio');
var request = require('request');

var config = require('./config');

/*
var steamId = getSteamId(

  config.username,

  function(steamId) { console.log(steamId);

    getGameList(steamId, function(games) {

      storeGameList(games);

    })

  }
);
*/

/*
getHltbId("Bioshock Infinite", function(id) {

  getHltbLength(id, function(length) {

    console.log(length);

  });

});
*/

getGameLength("Bioshock Infinite", function(length) {
  console.log(length);
});

function getSteamId(username, callback) {

  var url = 'http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/'
            + '?key=' + config.apiKey
            + '&vanityurl=' + config.username;

  getJson(url, function(response) {

    var id = response.steamid;
    callback(id);

  });

}

function getGameList(steamId, callback) {

  var url = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/'
            + '?key=' + config.apiKey
            + '&steamid=' + steamId
            + '&include_appinfo=1'
            + '&format=json';

  getJson(url, function(response) {

    var games = response.games;
    callback(games);

  });

}

function getGameLength(gameName, callback) {

  var url = 'http://howlongtobeat.com/search_main.php?page=1';

  request.post(url,
    {form:
      {
        'queryString': gameName,
        't': 'games',
        'sorthead': 'popular',
        'sortd': 'Normal Order',
        'plat': '',
        'detail': '0'
      }
    },
    function (error, response, body) {

    var searchPage = cheerio.load(response.body);

    var rawGameLength = searchPage('.gamelist_list li').first().find('.time_100').first().text();
    rawGameLength = rawGameLength.replace(' Hours', '').replace('½', '.5');

    var gameLength = parseFloat(rawGameLength);

    callback(gameLength);

  });

}

function getJson(url, callback) {

  request(url, function (error, response, body) {

    var parsedResponse = JSON.parse(body);
    callback(parsedResponse.response);

  });

}
