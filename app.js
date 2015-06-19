require('./es6-array-include')();

var steam = require('./steam');
var hltb = require('./hltb');

var config = require('./config');

steam.getSteamGameListByUsername(config.apiKey, config.username,

  function(gameList) {

    gameList.forEach(function(game, i) {

      if(config.exclude.includes(game.name)) {
        return;
      }

      console.log(game.name);

    });

    /*
    var smallGameList = gameList.slice(0, 5);
    smallGameList.forEach(function(game, i) {

      hltb.getGameLength(game.name, function(gameLength) {
         console.log(game.name + ": " + gameLength);
      });

    });
    */

  }

);
