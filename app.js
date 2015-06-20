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

        if(remaining < 0) {
          remaining = 0;
        }

        backlog.push({
          name: game.name,
          length: (gameLength == null) ? "N/A" : gameLength,
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

  backlog.sort(function(a, b) {

    if(a.remaining > b.remaining) {
      return 1;
    }

    if(a.remaining - b.remaining) {
      return -1;
    }

    return 0;

  });

  console.table(backlog);

}

// TODO: Rewrite using promises
