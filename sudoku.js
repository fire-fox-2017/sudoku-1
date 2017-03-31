"use strict"

class Sudoku {
  constructor(board_string) {
    this._board_string = board_string;
    this._board = [];
    this.createBoard();

  }

  createBoard() {
    let temp = this._board_string.split('');
    for (let i = 0 ; i < temp.length ; i++) {
      this._board.push(temp[i]);
    }

  }
  solve() {
    console.log("solve!");
  }

  // Returns a string representing the current state of the board
  board() {
    let str = "";
    for (let i = 0 ; i < 9 ; i++) {
      if ( i % 3 === 0)
        str += "---------------------\n";
      for (let j = 0 ; j < 9 ; j++) {
        if (j % 3 === 0 && j != 0)
          str += "| ";
        str += this._board[i+j] + " ";
      }
      str += "\n";
    }
    str += "---------------------\n";

    // console.log("\n");
    // console.log(str);
    // console.log("\n");
    return str;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

console.log(board_string);

var game = new Sudoku(board_string);

// Remember: this will just fill out what it can and not "guess"
game.solve();

console.log(game.board());
