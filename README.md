# Steam Backlog

This is a small utility I wrote for myself to pair my
[Steam](http://store.steampowered.com/) library with stats from
[HowLongToBeat](http://howlongtobeat.com/).

Basically, I wanted to see which games in my backlog would take the shortest
amount of time to complete so that I could play those first.

Listen, I don't think optimizing your list of recreational activities is really
the healthiest thing, but here we are.

## How to Use

1. Clone the latest `git clone https://github.com/loganfranken/steam-backlog.git`
2. Run `npm install`
3. Rename `config.example.js` to `config.js`
4. Fill out `config.js` with your information
5. Run `node app.js`

You'll get a list like the following:

```
Myst: Masterpiece Edition: 7
Bastion: 6.5
Dead Island: 18
The Binding of Isaac: 10.5
Super Meat Boy: 11
From Dust: 7
Dustforce: 32.5
FTL: Faster Than Light: 10.5
The Elder Scrolls V: Skyrim: 31.5
Cave Story+: 6
Dishonored: 12.5
Mark of the Ninja: 8
Spelunky: 18
The Walking Dead: null
FEZ: 6
XCOM: Enemy Unknown: 25.5
Kentucky Route Zero: null
Antichamber: 5.5
Quantum Conundrum: 6
Don't Starve: 35
Fallout: 17
Fallout 2: 31
FINAL FANTASY VII: 39.5
Fallout: New Vegas: 29
```

## License

[MIT License](http://opensource.org/licenses/MIT)
