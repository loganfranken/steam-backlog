# Steam Backlog

This is a small utility I wrote for myself to pair my
[Steam](http://store.steampowered.com/) library with stats from
[HowLongToBeat](http://howlongtobeat.com/).

I wanted to see which games in my backlog would take the shortest
amount of time to complete so that I could play those first.

Listen, I don't think optimizing your list of recreational activities is really
the healthiest thing, but here we are.

## How to Use

1. Clone the latest `git clone https://github.com/loganfranken/steam-backlog.git`
2. Run `npm install`
3. Rename `config.example.js` to `config.js`
4. Fill out `config.js` with your information
5. Run `npm start`

You'll get a table printed to the console like the following:

```
name                         length  played  remaining
---------------------------  ------  ------  ---------
Kentucky Route Zero          N/A     2       0
Bastion                      6.5     10      0
The Walking Dead             N/A     0       0
FEZ                          6       5       1
Antichamber                  5.5     2       3.5
Cave Story+                  6       0       6
Quantum Conundrum            6       0       6
Myst: Masterpiece Edition    7       0       7
From Dust                    7       0       7
The Binding of Isaac         10.5    3       7.5
Mark of the Ninja            8       0       8
Super Meat Boy               11      1       10
FTL: Faster Than Light       10.5    0       10.5
Dishonored                   12.5    0       12.5
Spelunky                     18      5       13
Dead Island                  18      4       14
Fallout                      17      0       17
XCOM: Enemy Unknown          25.5    0       25.5
Fallout: New Vegas           29      0       29
The Elder Scrolls V: Skyrim  31.5    1       30.5
Fallout 2                    31      0       31
FINAL FANTASY VII            39.5    8       31.5
Dustforce                    32.5    0       32.5
Don't Starve                 35      0       35
```

`length` is equal to the "Main Story" value from HowLongToBeat.

`played` is equal to how many hours Steam reports that you have played a
particular game.

`remaining` is equal to the difference between `length` and `played`.

The list is sorted by `remaining`.

Episodic games (like "Kentucky Route Zero" and "The Walking Dead") will always
have a length value of "N/A".

## License

[MIT License](http://opensource.org/licenses/MIT)
