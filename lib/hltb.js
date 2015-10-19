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
          return;
        }

        var searchPage = cheerio.load(response.body);
        var gameLengths = searchPage('.search_list_details').first().find('.search_list_tidbit');

        var mainLength = parseGameLength(gameLengths.eq(1).text());
        var mainExtrasLength = parseGameLength(gameLengths.eq(3).text());
        var completionistLength = parseGameLength(gameLengths.eq(5).text());
        var combinedLength = parseGameLength(gameLengths.eq(7).text());

        resolve({
          'main': mainLength,
          'mainExtras': mainExtrasLength,
          'completionist': completionistLength,
          'combined': combinedLength
        });

      });

  });

}

function parseGameLength(input)
{
  if(!input)
  {
    return null;
  }

  var rawGameLength = input.replace(' Hours', '').replace('½', '.5');
  var gameLength = parseFloat(rawGameLength);

  return gameLength ? gameLength : null;
}

module.exports = {
  getGameLength: getGameLength
};
