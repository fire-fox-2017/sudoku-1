"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardData = board_string.match(/\d{9}/g);
    this.playBoard = [];

    this.smallBlocks = [];
  }

  solve() {

  }

  // Returns a string representing the current state of the board
  board() {
    for (let i = 0; i < this.boardData.length; i++) {
      this.playBoard.push([]);
      for (let j = 0; j < this.boardData.length; j++) {
        if (this.boardData[i][j] === "0") {
          this.playBoard[i].push(' ');
        } else {
          this.playBoard[i].push(this.boardData[i][j]);
        }
      }
    }
    return this.playBoard;
  }

  blocks() {
    let size = 3;


    for (let n = 0; n < size; n++) {
      let block = [];
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          block.push([i,j]);
        }
      }
      this.smallBlocks.push(block);
    }

    // for (let n = 0; n < size; n++) {
    //   let block = [];
    //   for (let i = 0; i < size; i++) {
    //     for (let j = size*n; j < size*(n+1); j++) {
    //       block.push([i,j]);
    //     }
    //   }
    //   this.smallBlocks.push(block);
    // }




    return this.smallBlocks;
  }

  rowCheck(row) {

  }

  colCheck(col) {

  }

  blockCheck(block) {

  }

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

// console.log(game.board())
game.board();
game.blocks();
console.log(game.smallBlocks);
