var request = require('request');

/* Retrieves the Steam ID associated with a given username */
function getSteamId(apiKey, username, callback) {

  var url = 'http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/'
            + '?key=' + apiKey
            + '&vanityurl=' + username;

  getJson(url, function(response) {

    var id = response.steamid;

    if(!id) {
      throw "Steam ID could not be retrieved";
    }

    callback(id);

  });

}

/* Returns the list of games owned by the user with a given Steam ID */
function getSteamGameList(apiKey, steamId, callback) {

  var url = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/'
            + '?key=' + apiKey
            + '&steamid=' + steamId
            + '&include_appinfo=1'
            + '&format=json';

  getJson(url, function(response) {

    var games = response.games;

    if(!games) {
      throw "Games could not be retrieved";
    }

    callback(games);

  });

}

/* Returns the list of games owned by the user with a given username */
function getSteamGameListByUsername(apiKey, username, callback) {

  getSteamId(apiKey, username, function(steamId) {
    getSteamGameList(apiKey, steamId, callback);
  });

}

/* Makes a JSON request and executes a callback with the parsed response */
function getJson(url, callback) {

  request(url, function (error, response, body) {

    if(error) {
      throw "Request to " + url + " encountered error " + error;
    }

    if(response.statusCode != 200) {
      throw "Request to " + url + " returned status code " + response.statusCode;
    }

    var parsedResponse = JSON.parse(body);
    callback(parsedResponse.response);

  });

}

module.exports = {
  getSteamId: getSteamId,
  getSteamGameList: getSteamGameList,
  getSteamGameListByUsername: getSteamGameListByUsername
};
