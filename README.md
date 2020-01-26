# gridiron-js
mostly so I can learn web development but would be nice if this became real

# ~~test it out [here](https://elijah9.github.io/gridiron-js/html/index.html)~~ not working right now

# current status
* basic Angular framework and Svg.JS usage in place
* basic framework for game logic in place
* basic framework for data storage in place (IndexedDB)

# the vision as of this commit
* a 2D football CPU vs CPU simulator (NFL ruleset)
* Angular/TypeScript
* vector based graphics using Svg.JS
* data engine for teams, stats (to display but also to generate player ratings)
* * web scraping module

# to do list
* sim engine
* * iron out the innumerable bugs (and maybe attempt to enumerate them...)
* * finish run block mechanic
* * game clock
* data engine
* * Wikipedia team/player scraper
* get app working via Github.io again

# data engine features
## short term
* scraper for team info rosters using Wikipedia parameterized by year
* view/edit player info page
* * form for info including attributes
* scraper for player stats

## soon
* engine for generating player attributes from statistics

## later on
* create player page
* * form for info
* create team page
* * form for info
* * CSV upload feature for roster

# bugs to fix
* touchdown doesn't terminate play
* players face weird directions often

# shelved tasks
* use my dad's SVG drawings instead of shapes