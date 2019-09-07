# Othello Javascript
This is a game played by two players on the linux terminal. It will ask player 1 to pick
board size and color. When he does, it uses a dynamic function to determine the correct board locations 
on a 2d array. Then will tell the user if their choice is possible or
or not possible. This game automatically executes game over if either player wins. 

[![Board](https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F9xNZnM6jtRA%2Fhqdefault.jpg&f=1&nofb=1)](https://trump2cash.biz)

The code is written in Javascript and is meant to run on a
Linux based machine.

The [`main`](main.js) file will execute the game itself, but placing the each piece occurs in board.js

```Javascript
function start(){
  // Local variables
  //Sets Heigh and Width
  let height = prompt('What height for your board? ');
  let width = prompt('What width for your board? ');


	// SYNCHRONOUSLY read from keyboard
	console.log('Creating a board with size ' + height + ' x ' + width + '.');
	// Create new board object
   let myBoard = new board(height, width)
```

Follow these steps to run the code yourself:

### 1. Download Node.Js

https://nodejs.org/en/download/package-manager/

```shell
node --version
```

### 2. Run the main file

```shell
$ node main.js
```
### 3. Play the game



## License

Copyright 2019 Harman Rai
Template GVSU
