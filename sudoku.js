"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardData = board_string.match(/\d{9}/g);
    this.playBoard = [];
    this.smallBlocks = [];
    this.filledBoard = [];

    // creates objects for the elements
    this.elements =[]


  }

  createElem() {
    for (let i = 0; i < this.playBoard.length; i++) {
      for (let j = 0; j < this.playBoard.length; j++) {
        let status = "";
        if (/\s/.test(this.playBoard[i][j])) {
          status = "free";
        } else {
          status = "fixed";
        }
        let obj = {number: this.playBoard[i][j],
                   row: i,
                   col: j,
                   stat: status};
        this.elements.push(obj);
      }
    }
  }

  solve() {
    // initial fill
    let row = 0;




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
    //creates 9 smaller blocks
    let size = 3;

    for (let n = 0; n < size; n++) {
      let block = [];
      for (let i = 0; i < size; i++) {
        for (let j = size*n; j < size*(n+1); j++) {
          block.push([i,j]);
        }
      }
      this.smallBlocks.push(block);
    }

    for (let n = 0; n < size; n++) {
      let block = [];
      for (let i = size; i < size*2; i++) {
        for (let j = size*n; j < size*(n+1); j++) {
          block.push([i,j]);
        }
      }
      this.smallBlocks.push(block);
    }

    for (let n = 0; n < size; n++) {
      let block = [];
      for (let i = size*2; i < size*3; i++) {
        for (let j = size*n; j < size*(n+1); j++) {
          block.push([i,j]);
        }
      }
      this.smallBlocks.push(block);
    }

    return this.smallBlocks;
  }

  rowCheck(row) {
    //check for empty column
    let digit = /[0-9]/;
    let nonDigCount = 0;

    for (let col = 0; col < this.playBoard.length; col++) {
      if (!digit.test(this.playBoard[row][col])) {
        nonDigCount += 1;
      }
    }

    //if no empty column, check the duplicates in row
    if (nonDigCount > 0) {
      return false;
    } else {
      let duplicates = [];
      let runningItems = [this.playBoard[row][0]];
      let col = 1;
      while (col < this.playBoard.length) {
        for (let i = 0; i < runningItems.length; i++) {
          if (this.playBoard[row][col] === runningItems[i]) {
            duplicates.push(runningItems[i]);
          }
        }
        runningItems.push(this.playBoard[row][col]);
        col++;
      }
      if (duplicates.length > 0) {
        return false;
      } else {
        return true;
      }
    }
  }

  colCheck(col) {
    //check for empty row
    let digit = /[0-9]/;
    let nonDigCount = 0;

    for (let row = 0; row < this.playBoard.length; row++) {
      if (!digit.test(this.playBoard[row][col])) {
        nonDigCount += 1;
      }
    }

    //if no empty row, check the duplicates in column
    if (nonDigCount > 0) {
      return false;
    } else {
      let duplicates = [];
      let runningItems = [this.playBoard[0][col]];
      let row = 1;
      while (row < this.playBoard.length) {
        for (let i = 0; i < runningItems.length; i++) {
          if (this.playBoard[row][col] === runningItems[i]) {
            duplicates.push(runningItems[i]);
          }
        }
        runningItems.push(this.playBoard[row][col]);
        row++;
      }
      if (duplicates.length > 0) {
        return false;
      } else {
        return true;
      }
    }
  }

  blockCheck(block) {
    //check for empty element
    let digit = /[0-9]/;
    let nonDigCount = 0;

    for (let i = 0; i < this.smallBlocks[block]; i++) {
      if (!digit.test(this.smallBlocks[block][i])) {
        nonDigCount += 1;
      }
    }

    //if no empty element, check the duplicates within the block
    if (nonDigCount > 0) {
      return false;
    } else {
      let duplicates = [];
      let runningItems = [this.smallBlocks[block][0]];
      let index = 1;
      while (index < this.smallBlocks[block].length) {
        for (let i = 0; i < runningItems.length; i++) {
          if (this.smallBlocks[block][i] === runningItems[i]) {
            duplicates.push(runningItems[i]);
          }
        }
        runningItems.push(this.smallBlocks[block][index]);
        index++;
      }
      if (duplicates.length > 0) {
        return false;
      } else {
        return true;
      }
    }
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

console.log(game.board())
// game.board();
game.blocks();
game.createElem();
console.log(game.elements)
