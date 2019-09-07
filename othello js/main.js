/****************************************
 * Othello
 * Command-line version of Othello.
 * Template By CIS 343, GVSU
 * Author : Harman Rai
 ****************************************/

// Import our board definitions
const board = require('./board.js');
// Import a synchronous prompt library
const prompt = require('prompt-sync')();

/**
 * saveFile
 * SYNCHRONOUS (blocking) file save function.
 * @param file - The full filename path we want to save to.
 * @param contents - The object we wish to save as a JSON file.
 */
function saveFile(file, contents){
	let fs = require('fs');
	let data = fs.writeFileSync(file, JSON.stringify(contents));
}

/**
 * loadFile
 * SYNCHRONOUS (blocking) file read function.
 * @param file - The full filename path we wish to load an object from.
 * @return contents - The object converted from JSON.
 */

function loadFile(file){
	let fs = require('fs');
	var data = fs.readFileSync(file);
	var contents = (JSON.parse(data));
	return contents;
}

/**
 * Driver function.  "main" method, if you will.
 */
function start(){
 	// Local variables
  //Sets Heigh and Width
	let height = prompt('What height for your board? ');
  let width = prompt('What width for your board? ');


	// SYNCHRONOUSLY read from keyboard
	console.log('Creating a board with size ' + height + ' x ' + width + '.');
	// Create new board object
	let myBoard = new board(height, width);

	console.log('----Othello----');
  let p2 = 'W';
	let p1 = prompt('Player 1, choose B or W ');
  //Sets P1 to Black or White
	if (p1 == 'B' || p1 == 'b'){
    p1 = 'B';
    p2 = 'W';
	} else if (p1 == 'W' || p1 == 'w'){
    p1 = 'W';
    p2 = 'B';
	} else{
    while (p1 != ('B' || 'b') || ('W' || 'w'))
		p1 = prompt('Player 1, choose B or W ');
	}
	if(p1 == 'B'){
		p1 = 'B';
		p2 = 'W';
	}else{
		p1 = 'W';
		p2 = 'B';
	}

  //Begin Game
	console.log('Player 1:' + p1);
	console.log('Player 2:' + p2);
	console.log('----Begin----');

	// Print board
	myBoard.printBoard();

  //Log of Total Moves since game start
	let totalMoves = 0;
  //Current Player
  var current = p1;
  //Exit Variable for Quiting
	let exit = false;
	// Loop, asking user input, calling appropriate functions.
	while (!myBoard.isGameOver() && !exit) {

    //If even, it is player 1's turn, else it is player 2's turn
	  if ( totalMoves%2 == 0){
			current = p1;
			console.log("Player 1 Choose, or E for Exit")
		} else {
			current = p2;
			console.log("Player 2 Choose, or E for exit")
		}

		let row = prompt('What row? ');
		let col = 0;
		let gameSave = '';
    exit = false;

    //If player chooses e, let them exit
		if ( row == "e"){
		console.log("Would you like to save?");
		gameSave = prompt('Y for yes, N for no');
    //If game save is y, save board to file in same dir
		if(gameSave == 'Y' || 'y'){
			exit = true;
			console.log("Game Saved");
			saveFile("test",myBoard);
    //Don't save game
		}else if(gameSave == 'N' || 'n'){
			exit = true;
		}else{
			console.log("The game continues!");
		}
  }

    //Player 1, if game is not exited
		if(!exit){
		col = prompt('What col? ');
		if ( col == "e"){
		console.log("Would you like to save?");
		gameSave = prompt('Y for yes, N for no');
		if(gameSave == 'Y' || 'y'){
			exit = true;
			console.log("Game Saved");
			saveFile("test",myBoard);
		}else if(gameSave == 'N' || 'n'){
			exit = true;
		}else{
			console.log("The game continues!");
		}
	}
}

  //Player 2, if game is not exited
		if(!exit){
		if ((myBoard.isValid(row - 1,col - 1,current)) == true){
			// Print board
      console.log('Good move');
			myBoard.placeDiskAt(row-1,col-1,current);
			myBoard.printBoard();
			totalMoves++;
		} else if(myBoard.isValidMoveAvailable(current) == false){
			console.log('No valid moves possible for ' + current);
		} else {
      console.log('Skipping');
      totalMoves++;
	   }
	 }

	}

 console.log('Goodbye');
	let winner = myBoard.checkWinner();
	if (winner == p1 || winner == p2) {
	console.log('Game is over. The winner is ' + winner);
	} else {
	console.log("Game is over. No winner.");
	}


	// Save board example code.
	//saveFile("test.json", myBoard);
}

console.clear();
start();
