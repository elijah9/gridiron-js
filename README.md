# gridiron-js
mostly so I can learn web development but would be nice if this became real

# test it out [here](https://elijah9.github.io/gridiron-js/html/index.html)

# current status
* basic Angular framework and Svg.JS usage in place
* basic framework for game logic in place

# the vision as of this commit
* a 2D football CPU vs CPU simulator (NFL ruleset)
* Angular/TypeScript
* vector based graphics using Svg.JS
* scraping engine for teams, stats (to display but also to generate player ratings)

# to do list
* game event log for play outcome
* run block mechanic
* make real (but still basic) 11 on 11 plays
* get some work done on scraping engine
* get app working via Github.io again

# scraping engine steps
since this is so big, gonna get its own section
* set up database structure using IndexedDB
* * Team, TeamRoster, Player, PlayerAttributes
* set up data access layer in TypeScript
* * teams repository class
* * DB model classes for tables
* write scraper for team info rosters using Wikipedia parameterized by year

# bugs to fix
* touchdown doesn't terminate play

# shelved tasks
* use my dad's SVG drawings instead of shapes