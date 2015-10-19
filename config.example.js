var config = {};

// Your Steam API key
config.apiKey = 'YOUR_API_KEY';

// Your Steam username
config.username = 'YOUR_USERNAME';

// A list of game titles you want to exclude (because you have already
// finished playing them or you never want to play them)
config.exclude = ['GAME_NAME_1', 'GAME_NAME_2'];

// A map of game titles and hours you would like to *subtract* from the
// "played" amount reported by Steam (because the hours reported are incorrect
// or you have already played the game and want to reset the amount of hours
// for a better estimate)
config.playedOffsets = [];
config.playedOffsets['GAME_NAME_3'] = 5;

module.exports = config;
