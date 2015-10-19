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
Kentucky Route Zero          3.5     2       1.5
Antichamber                  5.5     2       3.5
Cave Story+                  6       2       4
Quantum Conundrum            6       0       6
From Dust                    6.5     0       6.5
The Binding of Isaac         10.5    3       7.5
Mark of the Ninja            8       0       8
Super Meat Boy               10.5    1       9.5
FTL: Faster Than Light       10.5    0       10.5
The Walking Dead             12      0       12
Dishonored                   12.5    0       12.5
Spelunky                     18      5       13
Dead Island                  18      4       14
Fallout                      18      0       18
A Wizard's Lizard            23      0       23
XCOM: Enemy Unknown          26      0       26
Fallout: New Vegas           28.5    0       28.5
The Elder Scrolls V: Skyrim  31.5    1       30.5
FINAL FANTASY VII            39      8       31
Fallout 2                    31.5    0       31.5
Don't Starve                 35      0       35
Dustforce                    41      0       41
```

In most cases, `length` is equal to the "Main Story" value from HowLongToBeat.

If the "Main Story" value is not available, the script will go down the
following list, using the first value that *is* available:

* "Main Story"
* "Main + Extra"
* "Combined"
* "Completionist"

If no value can be found, "N/A" will be reported instead.

`played` is equal to how many hours Steam reports that you have played a
particular game.

`remaining` is equal to the difference between `length` and `played`.

The list is sorted by `remaining`.

## Preview

To view the list of games that will be queried (the list of Steam games *sans*
the games excluded in your `config.js`), run the following command:

```js
npm run preview
```

## License

[MIT License](http://opensource.org/licenses/MIT)
