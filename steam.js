var request = require('request');

/* Retrieves the Steam ID associated with a given username */
function getSteamId(apiKey, username) {

  return new Promise(function(resolve, reject) {

    var url = 'http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/'
              + '?key=' + apiKey
              + '&vanityurl=' + username;

    getJson(url).then(function(response) {

      var id = response.steamid;

      if(!id) {
        reject("Steam ID could not be retrieved");
      }

      resolve(id);

    });

  });

}

/* Returns the list of games owned by the user with a given Steam ID */
function getSteamGameList(apiKey, steamId) {

  return new Promise(function(resolve, reject) {

    var url = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/'
              + '?key=' + apiKey
              + '&steamid=' + steamId
              + '&include_appinfo=1'
              + '&format=json';

    getJson(url).then(function(response) {

      var games = response.games;

      if(!games) {
        throw "Games could not be retrieved";
      }

      resolve(games);

    });

  });

}

/* Returns the list of games owned by the user with a given username */
function getSteamGameListByUsername(apiKey, username) {

  return new Promise(function(resolve, reject) {

    getSteamId(apiKey, username).then(function(steamId) {
      resolve(getSteamGameList(apiKey, steamId));
    });

  });

}

/* Makes a JSON request and executes a callback with the parsed response */
function getJson(url) {

  return new Promise(function(resolve, reject) {

    request(url, function (error, response, body) {

      if(error) {
        throw "Request to " + url + " encountered error " + error;
      }

      if(response.statusCode != 200) {
        throw "Request to " + url + " returned status code " + response.statusCode;
      }

      var parsedResponse = JSON.parse(body);
      resolve(parsedResponse.response);

    });

  });

}

module.exports = {
  getSteamId: getSteamId,
  getSteamGameList: getSteamGameList,
  getSteamGameListByUsername: getSteamGameListByUsername
};
