require('../lib/es6-array-include');

var steam = require('../lib/steam');
var config = require('../config');

steam.getSteamGameListByUsername(config.apiKey, config.username).then(

    function(gameList) {

      gameList.forEach(function(game)
      {

        if(config.exclude.includes(game.name)) {
          return;
        }

        console.log(game.name);

      });

    }

);
