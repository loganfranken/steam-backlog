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

      hltb.getGameLength(game.name, function(gameLength) {
        console.log(game.name + ": " + gameLength);
      });

    });

  }

);

// TODO: Add README
// TODO: Sort list
// TODO: Calculate Remaining Hours (based on played hours)
