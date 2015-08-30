var cheerio = require('cheerio');
var request = require('request');

/* Retrieves the length of a game from How Long to Beat */
function getGameLength(gameName) {

  return new Promise(function(resolve, reject) {

    if(!gameName) {
      reject("No game name provided");
    }

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

        if(response.statusCode != 200) {
          reject("Request to " + url + " returned status code " + response.statusCode);
        }

        var searchPage = cheerio.load(response.body);

        var rawGameLength = searchPage('.search_list_details').first().find('.search_list_tidbit').eq(1).text();
        rawGameLength = rawGameLength.replace(' Hours', '').replace('½', '.5');

        var gameLength = parseFloat(rawGameLength);

        if(!gameLength) {
          gameLength = null;
        }

        resolve(gameLength);

      });

  });

}

module.exports = {
  getGameLength: getGameLength
};
