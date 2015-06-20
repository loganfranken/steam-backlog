require('./es6-array-include')();
require('console.table');

var steam = require('./steam');
var hltb = require('./hltb');

var config = require('./config');

var backlog = [];

steam.getSteamGameListByUsername(config.apiKey, config.username,

  function(gameList) {

    var totalGameCount = 0;
    var gameCount = 0;

    gameList.forEach(function(game, i) {

      if(config.exclude.includes(game.name)) {
        return;
      }

      totalGameCount++;

      hltb.getGameLength(game.name, function(gameLength) {

        var played = Math.round(game.playtime_forever/60);
        var remaining = (gameLength - played);

        backlog.push({
          name: game.name,
          length: gameLength,
          played: played,
          remaining: remaining
        });

        gameCount++;

        if(gameCount >= totalGameCount) {
          displayBacklogList();
        }

      });

    });

  }

);

function displayBacklogList() {
  console.table(backlog);
}

// TODO: Sort list
