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

function getHltbId(gameName, callback) {

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
    var gameUrl = searchPage('#suggestionsList_main a:first-child').attr('href');
    var gameId = gameUrl.replace('game.php?id=', '');

    callback(gameId);

  });

}

function getHltbLength(gameId, callback) {

  var url = 'http://howlongtobeat.com/game_main.php?id=' + gameId;

  request(url, function (error, response, body) {

    var gamePage = cheerio.load(response.body);
    var gameTime = gamePage('.gprofile_times .time_100:first-child div').text();

    callback(gameTime);

  });

}

function getJson(url, callback) {

  request(url, function (error, response, body) {

    var parsedResponse = JSON.parse(body);
    callback(parsedResponse.response);

  });

}
