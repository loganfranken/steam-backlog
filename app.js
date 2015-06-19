var cheerio = require('cheerio');
var request = require('request');

var config = require('./config');

/*
var steamId = getSteamId(

  config.username,

  function(steamId) { console.log(steamId);

    getGameList(steamId, function(games) {

      storeGameList(games);

    })

  }
);
*/

/*
getHltbId("Bioshock Infinite", function(id) {

  getHltbLength(id, function(length) {

    console.log(length);

  });

});
*/

getGameLength("Bioshock Infinite", function(length) {
  console.log(length);
});

function getGameLength(gameName, callback) {

  var url = 'http://howlongtobeat.com/search_main.php?page=1';

  request.post(url,
    {form:
      {
        'queryString': gameName,
        't': 'games',
        'sorthead': 'popular',
        'sortd': 'Normal Order',
        'plat': '',
        'detail': '0'
      }
    },
    function (error, response, body) {

    var searchPage = cheerio.load(response.body);

    var rawGameLength = searchPage('.gamelist_list li').first().find('.time_100').first().text();
    rawGameLength = rawGameLength.replace(' Hours', '').replace('½', '.5');

    var gameLength = parseFloat(rawGameLength);

    callback(gameLength);

  });

}
