var steam = require('./steam');
var hltb = require('./hltb');
var config = require('./config');

steam.getSteamGameListByUsername(config.apiKey, config.username,

  function(gameList) {

    var smallGameList = gameList.slice(0, 5);
    smallGameList.forEach(function(game, i) {

      hltb.getGameLength(game.name, function(gameLength) {
         console.log(game.name + ": " + gameLength);
      });

    });

  }

);
