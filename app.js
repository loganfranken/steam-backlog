var request = require('request');
var config = require('./config');

var steamId = getSteamId(

  config.username,

  function(steamId) {

    getGameList(steamId, function(games) {

      storeGameList(games);

    })
  }
);

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

function storeGameList(gameList) {

  console.log(gameList);
  // TODO: Implement

}

function getGameLength(gameName) {

  console.log(gameName);
  // TODO: Implement

}

function getJson(url, callback) {

  request(url, function (error, response, body) {

    if(error) {

      console.log(error);
      return;

    }

    if(response.statusCode != 200) {

      throw "Received status code " + response.statusCode
              + " while retrieving " + url;
      return;

    }

    var parsedResponse = JSON.parse(body);
    callback(parsedResponse.response);

  });

}
