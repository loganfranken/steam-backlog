require('./lib/es6-array-include');
require('console.table');

var steam = require('./lib/steam');
var hltb = require('./lib/hltb');

var config = require('./config');

function getGameLength(game) {

  if(config.exclude.includes(game.name)) {
    return;
  }

  return new Promise(function(resolve, reject) {

    hltb.getGameLength(game.name).then(function(gameLength) {

      var played = Math.round(game.playtime_forever/60);

      var remaining = (gameLength - played);

      if(remaining < 0) {
        remaining = 0;
      }

      resolve({
        name: game.name,
        length: (gameLength == null) ? "N/A" : gameLength,
        played: played,
        remaining: remaining
      });

    });

  });

}

function filterUndefined(input) {
  return input;
}

function sortBacklog(backlog) {

  backlog.sort(function(a, b) {

    if(a.remaining > b.remaining) {
      return 1;
    }

    if(a.remaining - b.remaining) {
      return -1;
    }

    return 0;

  });

}

steam.getSteamGameListByUsername(config.apiKey, config.username).then(

    function(gameList) {

      Promise
        .all(gameList.map(getGameLength).filter(filterUndefined))
        .then(function(backlog) {
          sortBacklog(backlog);
          console.table(backlog);
        });

    }

);
