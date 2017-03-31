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

    // find index of 0
    let zero = this._board.indexOf('0');
    console.log(`zero = ${zero}`);

    // check possible answer with the row, col, grid
    let answer = ['1','2','3','4','5','6','7','8','9'];

    // check horizontally
    // get start index of row
    let ri = Math.floor(zero/9) * 9;
    console.log(`start ri = ${ri}`)
    let rend = ri+9;
    for ( ; ri < rend ; ri++ ) {
      console.log(`ri = ${ri}`)
      let pos = answer.indexOf(this._board[ri]);
      if (pos > -1)
        answer.splice(pos,1);
    }
    console.log(`check horizontally ---> answer = ${answer}`);


    // check vertically
    // get start index of col
    let ci = zero % 9;
    console.log(`start ci = ${ci}`)
    let cend = ci + 73;
    for ( ; ci < cend ; ci+=9 ) {
      console.log(`ci = ${ci}`)
      let pos = answer.indexOf(this._board[ci]);
      console.log(`pos = ${pos}`)
      if (pos > -1)
        answer.splice(pos,1);
    }
    console.log(`check vertically ---> answer = ${answer}`);

    // check grid
    let gi = (Math.floor((zero%9)/3) * 3) + (Math.floor(zero/27) * 27);
    console.log(`start gi = ${gi}`)


    // after checking row, col, grid
    //  check if possible answer is only 1, if it is only 1, then assign zero to that answer.
    if (answer.length == 1){
      this._board[zero] = answer[0];
    }

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
        str += this._board[i*9+j] + " ";
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
// console.log(game._board);

game.solve();

console.log(game.board());
