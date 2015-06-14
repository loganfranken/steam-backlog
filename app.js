var request = require('request');
var config = require('./config');

var steamId = getSteamId(config.username, getGameList);

function getSteamId(username, callback) {

  var url = 'http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/'
            + '?key=' + config.apiKey
            + '&vanityurl=' + config.username;

  request(url, function (error, response, body) {

    if (!error && response.statusCode == 200) {

      var parsedResponse = JSON.parse(body);
      var id = parsedResponse.response.steamid;
      callback(id);

    }

  });

}

function getGameList(steamId) {

  var url = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/'
            + '?key=' + config.apiKey
            + '&steamid=' + steamId
            + '&include_appinfo=1'
            + '&format=json';

  request(url, function (error, response, body) {

    if (!error && response.statusCode == 200) {

      /*
      var parsedResponse = JSON.parse(body);
      var id = parsedResponse.response;
      callback(id);
      */

      console.log(body);

    }

  });

}
