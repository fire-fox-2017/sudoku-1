"use strict"

class Sudoku {
  constructor(boardString) {
    this.boardSudoku = 9;
    this.content = this.strToMatrix(boardString);
    this.answer =[1,2,3,4,5,6,7,8,9];
  }

  strToMatrix(str) {
    let matrix = [];
    for (let i = 0, idx = 0; i < this.boardSudoku; i++) {
      matrix.push([]);
      for (let j = 0; j < this.boardSudoku; j++, idx++) {
        if (str[idx] != undefined) {
          matrix[i].push(parseInt(str[idx]));
        } else {
          matrix[i].push(0);
        }
      }
    }
    return matrix;
  }

  checkColumn(value, i, j) {
    // bernilai true jika kolom tidak ada yg sama
    for (let k = 0; k < this.boardSudoku; k++) {
      if (value == this.content[k][j]) {
        return false;
      }
    }
    return true;
  }

  checkRow(value, i, j) {
    // bernilai true jika baris tidak ada yang sama
    for (let k = 0; k < this.boardSudoku; k++) {
      if (value == this.content[i][k]) {
        return false;
      }
    }
    return true;
  }

  solve() {
    for (let i = 0; i < this.boardSudoku; i++) {
      for (let j = 0; j < this.boardSudoku; j++) {
        // cek elemen = 0
        if (this.content[i][j] == 0) {
          for (let k = 0; k < this.answer.length; k++) {
            if (this.checkRow(this.answer[k], i, j) && this.checkColumn(this.answer[k], i, j)) {
              this.content[i][j] = this.answer[k];
              break;
            }
          }
        }
      }
    }
    return this;
  }

  // Returns a string representing the current state of the board
  board() {
    let str = "---------------------\n";
    for (let i = 0; i < this.boardSudoku; i++) {
      for (let j = 0; j < this.boardSudoku; j++) {
        if (j == 8) {
          str += this.content[i][j] + "\n";
        } else if (j == 2 || j == 5) {
          str += this.content[i][j] + "| ";
        } else {
          str += this.content[i][j] + " ";
        }
      }

      if (i == 2 | i == 5 | i == 8) {
        str += "\n---------------------\n";
      } else {
        str += "\n";
      }
    }
    return str;
  }


}


var fs = require('fs')
var boardString = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(boardString)

console.log("Sudoku board state before solved");
console.log(game.board());
game.solve();
console.log("Sudoku board state after solved");
console.log(game.board());
