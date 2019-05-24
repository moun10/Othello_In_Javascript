/**
 * Board
 * Defines a board "class" for an Othello game.
 * Template by CIS 343, GVSU
 * Author : Harman Rai
 */

module.exports = class Board {
	/**
	 * Construct the object with required state
	 */
	constructor(height, width){
    //If heigh is too small, default is 6
    if (height<6){
    this.height = 6;
    }else{
		this.height = height;
    }
    if (width<6){
    this.width = 6;
    }else{
		this.width = width;
    }
		this.board = [];
		for(let i=0; i<this.height; ++i){
			let tmp = [];
			for(let j=0; j<this.width; ++j){
            tmp.push(-1);
			}
			this.board.push(tmp);
		}

    // X and Y, change depending on size
    let x1 = 0;
    let y1 = 0;

    for(let i=6; i<this.height; ++i){
    x1++;
    ++i;
		}
    for(let j=6; j<this.width; ++j){
    y1++;
    ++j;
    }


    //Places the middle pieces.
    this.board[2+x1][2+y1] = 'B';
  	this.board[3+x1][3+y1] = 'B';
  	this.board[3+x1][2+y1] = 'W';
  	this.board[2+x1][3+y1] = 'W';

	}

	/**
	 * Print a representation of the board to the terminal.
	 */
	printBoard(){

    //Loop through board and print
		for(let i=0; i<this.height; ++i){
			for(let j=0; j<this.width; ++j){
				if(this.board[i][j] != -1){
          process.stdout.write(this.board[i][j] + '\t');
				}else{
          process.stdout.write('-\t');
        }
			}
      console.log();
    }
	}

	/**
	 * isValidMove
	 * @param row An integer row number.
	 * @param col An integer column number.
	 * @param disc A character for the disc color.
	 * @return A boolean indicating whether the move is valid.
	 */

	isValid(row, col, disc){
    let disc1 = '';
    let disc2 = '';

    //Sets oppenent disc for easier code
    if(disc == 'W'){
      disc1 = 'W';
      disc2 = 'B';
    }else{
      disc1 = 'B';
      disc2 = 'W';
    }

    //checks out of bounds
    if ( (row > this.height) || (col > this.width) ){
      return false;
    }
    if ( (row < 0) || (col < 0) ){
      return false;
    }
    //checks empty
    if (this.board[row][col] != -1)
    {
      return false;
    }

      //Checks going left
        if(this.board[row-1] != null){
          if(this.board[row-1][col] != -1){
          if(this.board[row-1][col] == disc2){
            this.board[row][col] = disc1;
            return true;
          }
          }
        }

      //Checks going right
        if(this.board[row+1] != null){
          if(this.board[row+1][col] != -1){
          if(this.board[row+1][col] == disc2){
            this.board[row][col] = disc1;
            return true;
          }
          }
        }

        //Checks going Up
        if(this.board[row-1] != null){
          if(this.board[row][col - 1] != -1){
          if(this.board[row][col - 1] == disc2){
            this.board[row][col] = disc1;
            return true;
          }
          }
        }

        //Checks going down
        if(this.board[row+1] != null){
          if(this.board[row][col + 1] != -1){
          if(this.board[row][col + 1] == disc2){
            this.board[row][col] = disc1;
            return true;
          }
          }
        }


    //Else return false
    return false;
	}

	/**
	 * placeDiscAt
	 * @param row An integer number for row.
	 * @param col An integer number for column.
	 * @param disc A character standing for disc color.
	 */
	placeDiskAt(row, col, disc){
    let disc1 = '';
    let disc2 = '';

    if(disc == 'W'){
      disc1 = 'W';
      disc2 = 'B';
    }else{
      disc1 = 'B';
      disc2 = 'W';
    }

    let tok1 = 1;
    let tok2 = 1;

    //Going up
    if(this.board[row-tok1] != null){
      while(this.board[row-tok1][col] == disc2){
        tok1++;
        if(this.board[row-tok1][col] != disc){
          while(tok2<tok1){
            this.board[row-tok2][col] = disc;
            tok2++;
          }
        }
      }
    }

    tok1 = 1;
    tok2 = 1;
    //Going down
    if(this.board[row+tok1] != null){
      while(this.board[row+tok1][col] == disc2){
        tok1++;
        if(this.board[row+tok1][col] == disc){
          while(tok2<tok1){
            this.board[row+tok2][col] = disc;
            tok2++;
          }
        }
      }
    }

    tok1 = 1;
    tok2 = 1;
    //Going left
    if(this.board[row-tok1] != null){
      while(this.board[row][col-tok1] == disc2){
        tok1++;
        if(this.board[row][col-tok1] == disc){
          while(tok2<tok1){
            this.board[row][col-tok2] = disc;
            tok2++;
          }
        }
      }
    }

    tok1 = 1;
    tok2 = 1;
    //Going right
    if(this.board[row+tok1] != null){
      while(this.board[row][col+tok1] == disc2){
        tok1++;
        if(this.board[row][col+tok1] == disc1){
          while(tok2<tok1){
            this.board[row][col+tok2] = disc;
            tok2++;
          }
        }
      }
    }




	}

	/**
	 * isValidMoveAvailable
	 * @param disc A character pertaining to a disc color.
	 * @return bool A boolean telling the user whether there are
	 *	 	valid moves availabe for that disc.
	 */
	isValidMoveAvailable(disc){
    this.disc = disc;
    //go through board and check if valid move function
    for(let i = 0; i < this.height; ++i){
      for(let j = 0; j < this.width; ++j){
        if ((this.isValid(i , j , this.disc)) == true){
          return true;
        }
      }
    }
    return false;
	}


	/**
	 * isBoardFull
	 * @return boolean Whether or not the board is full.
	 */
	isBoardFull(){
    //go through board and check if valid move function
    for(var i = 0; i < this.height; ++i){
      for(var j = 0; j < this.width; ++j){
        if (this.board[i][j] == '-'){
          return false;
        }
      }
    }
    return true;
	}

	/**
	 * isGameOver
	 * @return bool Whether or not the game is over.
	 */
	isGameOver(){
    //if board full return true
    //if no valid move possible return true
    if(this.isBoardFull() == true){
      return false;
    }
    if(this.isValidMoveAvailable(this.disc) == false){
      if(this.checkWinner() != null){
        return false;
      }
    }
    return false;
	}

	/**
	 * checkWinner
	 * @return char Which player has won.  Return null if
	 * 		a tie exists.
	 */
	checkWinner(){
    let Bcount = 0;
    let Wcount = 0;
    let winner = '';

    //Loop through board
    if(this.isBoardFull() == true){
      for(var i = 0; i < this.height; ++i){
        for(var j = 0; j < this.width; ++j){
          //Count black pieces
          if (this.board[i][j] == 'B'){
            //Count for black pieces
            Bcount++;
          //Count white pieces
          }else if (this.board[i][j] == 'W') {
            //Couont for white pieces
              Wcount++;
            }

          //Compares counts
          if (Bcount > Wcount){
            let winner = 'B';
          } else{
            let winner = 'W';
          }

        }
      }
    }

    //Returns null if no winner
    if (Bcount != Wcount){
      return winner;
    }else {
      return null;
    }

	}
}

//let board = new Board(10, 10);
//board.printBoard();
