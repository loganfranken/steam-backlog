var cheerio = require('cheerio');
var request = require('request');

function getGameLength(gameName, callback) {

  if(!gameName) {
    throw "No game name provided";
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
        throw "Request to " + url + " returned status code " + response.statusCode;
      }

      var searchPage = cheerio.load(response.body);

      var rawGameLength = searchPage('.gamelist_list li').first().find('.time_100').first().text();
      rawGameLength = rawGameLength.replace(' Hours', '').replace('½', '.5');

      var gameLength = parseFloat(rawGameLength);

      if(!gameLength) {
        throw "Game length could not be retrieved";
      }

      callback(gameLength);

    });

}

module.exports = {
  getGameLength: getGameLength
};
