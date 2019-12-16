# gridiron-js
mostly so I can learn web development but would be nice if this became real

# test it out [here](https://elijah9.github.io/gridiron-js/html/index.html)

# the vision as of this commit
* a 2D football CPU vs CPU simulator (NFL ruleset)
* tech stack: HTML5, TypeScript, JavaScript
* vector based graphics using Paper.js

# to do list
* get it working via Github.io again
* start copying over C# classes, switching from MVVM to MVC - shouldn't be too hard since most of the code is models

# shelved tasks
* figure out why coloring the jersey isn't working (switched to circle representation of players for now)

# C# files to port over
## Models
### Football 
* ~~PositionPlayer.cs~~
#### ~~ Entities ~~
* ~~Player.cs~~
* ~~Team.cs~~
##### ~~ Builders ~~
* ~~PlayerBuilder.cs~~
* ~~TeamBuilder.cs~~
#### Game
* Ball.cs
* GamePlayer.cs
* GameSim.cs
* GameTeam.cs
* IFieldPoint.cs
* PlayRoleResolver.cs
##### Builders
* GameBuilder.cs
##### PlayerMechanics
* PlayerMechanics.cs
* PlayerRun.cs
* PursueBall.cs
###### Defense
* TackleCarrier.cs
###### Offense
* SnapBall.cs
##### Plays
* Play.cs
###### Defense
* TestDefensePlay.cs
###### Offense
* OffensePlay.cs
* TestOffensePlay.cs
## Util
* MathUtils.cs
* TwoWayDictionary.cs (?)
## ViewModels
* MainWindowViewModel.cs
### Game
* Field2DViewModel.cs
* GameViewModel2D.cs
* ScoreboardViewModel.cs
## Views
### Game
* Field2D.xaml
* GameView2D.xaml
* Scoreboard.xaml