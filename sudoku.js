"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardData = board_string.match(/\d{9}/g);
    this.initBoard = [];
    this.fixedElem = {};
    this.freeElem = {};
    this.fixedCount = 0;
    this.freeCount = 0;
    this.solvePath = [];
    this.numInPath = [];
  }

  solver() {

    let maxPos = this.solvePath.length;
    let elem = this.freeElem;
    for (let i = 0; i < this.initBoard.length; i++) {
      for (let j = 0; j < this.initBoard.length; j ++) {
        for (let k = 0; k < maxPos; k++) {
          if (elem[k].row === i && elem[k].col === j) {
            let n = 0;
            do {
              n++;
              elem[k].number = n;
            } while(this.isAnyDupl() && n <= 9);
            if (n > 9) {
              elem[k].number = 0;
            }
          }
        }
      }
    }
  }

  solve() {
    this.solver();
  }


  // Returns a string representing the current state of the board
  board() {
    for (let i = 0; i < this.boardData.length; i++) {
      this.initBoard.push([]);
      for (let j = 0; j < this.boardData.length; j++) {
        if (this.boardData[i][j] === "0") {
          let block = this.rowColToBlock(i,j);
          this.freeElem[`${this.freeCount}`] = {id: this.freeCount,
                                                row: i,
                                                col: j,
                                                block: block,
                                                number: 0,
                                                traceVal: 0};
          this.initBoard[i].push(0);
          this.solvePath.push([i,j]);
          this.numInPath.push(0);
          this.freeCount += 1;
        } else {
          let num = Number(this.boardData[i][j]);
          let block = this.rowColToBlock(i,j);
          this.fixedElem[`${this.fixedCount}`] = {id: this.fixedCount,
                                                  row: i,
                                                  col: j,
                                                  block: block,
                                                  number: num};
          this.initBoard[i].push(num);
          this.fixedCount += 1;
        }
      }
    }
    return this.initBoard;
  }

  showBoard() {
    let showBoard = [];
    for (let row = 0; row < this.initBoard.length; row++) {
      showBoard.push([]);
      for (let col = 0; col < this.initBoard.length; col++) {
        for (let i = 0; i < this.fixedCount; i++) {
          let fixedElem = this.fixedElem[String(i)];
          if (fixedElem.row === row && fixedElem.col === col) {
            showBoard[row].push(String(fixedElem.number));
          }
        }
        for (let j = 0; j < this.freeCount; j++) {
          let freeElem = this.freeElem[String(j)];
          if (freeElem.row === row && freeElem.col === col && freeElem.number > 0) {
            showBoard[row].push(String(freeElem.number));
          } else if (freeElem.row === row && freeElem.col === col && freeElem.number === 0) {
            showBoard[row].push(" ");
          }
        }
      }
    }
    return showBoard;
}

  rowColToBlock(row, col) {
    let size = 3;
    for (let n = 0; n < size; n++) {
      if (row < size*(1+n)) {
        for (let m = 0; m < size; m++) {
          if (col < size*(1+m)) {
            return m + (size*n);
          }
        }
      }
    }
  }

  isRowEmpty(row) {
    let found = 0;
    for (let i = 0; i <this.freeCount; i ++) {
      let elem = this.freeElem[String(i)];
      if (elem.row === row && elem.number === 0) {
        found += 1;
      }
    }
    if (found > 0) {
      return true;
    } else {
      return false;
    }
  }

  isColEmpty(col) {
    let found = 0;
    for (let i = 0; i <this.freeCount; i ++) {
      let elem = this.freeElem[String(i)];
      if (elem.col === col && elem.number === 0) {
        found += 1;
      }
    }
    if (found > 0) {
      return true;
    } else {
      return false;
    }
  }

  isBlockEmpty(block) {
    let found = 0;
    for (let i = 0; i <this.freeCount; i ++) {
      let elem = this.freeElem[String(i)];
      if (elem.block === block && elem.number === 0) {
        found += 1;
      }
    }
    if (found > 0) {
      return true;
    } else {
      return false;
    }
  }

  isAnyEmpty() {
    let size = this.initBoard.length;
    let rowEmptyCount = 0;
    let colEmptyCount = 0;
    for (let row = 0; row < size; row++) {
      if (this.isRowEmpty(row)) {
        rowEmptyCount++;
      }
      for (let col = 0; col < size; col++) {
        if (this.isColEmpty(col)) {
          colEmptyCount++;
        }
      }
    }
    if (rowEmptyCount > 0 || colEmptyCount > 0) {
      return true;
    } else {
      return false;
    }
  }

  isRowDupl(row) {
    let numbers = [];
    for (let i = 0; i <this.freeCount; i ++) {
      let elem = this.freeElem[String(i)];
      if (elem.row === row && elem.number > 0) {
        numbers.push(elem.number);
      }
    }
    for (let i = 0; i <this.fixedCount; i ++) {
      let elem = this.fixedElem[String(i)];
      if (elem.row === row && elem.number > 0) {
        numbers.push(elem.number);
      }
    }
    let check = new Set(numbers);
    if (numbers.length > check.size) {
      return true;
    } else {
      return false;
    }
  }

  isColDupl(col) {
    let numbers = [];
    for (let i = 0; i <this.freeCount; i ++) {
      let elem = this.freeElem[String(i)];
      if (elem.col === col && elem.number > 0) {
        numbers.push(elem.number);
      }
    }
    for (let i = 0; i <this.fixedCount; i ++) {
      let elem = this.fixedElem[String(i)];
      if (elem.col === col && elem.number > 0) {
        numbers.push(elem.number);
      }
    }
    let check = new Set(numbers);
    if (numbers.length > check.size) {
      return true;
    } else {
      return false;
    }
  }

  isBlockDupl(block) {
    let numbers = [];
    for (let i = 0; i <this.freeCount; i ++) {
      let elem = this.freeElem[String(i)];
      if (elem.block === block && elem.number > 0) {
        numbers.push(elem.number);
      }
    }
    for (let i = 0; i <this.fixedCount; i ++) {
      let elem = this.fixedElem[String(i)];
      if (elem.block === block && elem.number > 0) {
        numbers.push(elem.number);
      }
    }
    let check = new Set(numbers);
    if (numbers.length > check.size) {
      return true;
    } else {
      return false;
    }
  }

  isAnyDupl() {
    let size = this.initBoard.length;
    let rowDuplCount = 0;
    let colDuplCount = 0;
    let blockDuplCount = 0;
    for (let row = 0; row < size; row++) {
      if (this.isRowDupl(row)) {
        rowDuplCount++;
      }
      for (let col = 0; col < size; col++) {
        let block = this.rowColToBlock(row, col);
        if (this.isColDupl(col)) {
          colDuplCount++;
        }
        if (this.isBlockDupl(block)) {
          blockDuplCount++;
        }
      }
    }
    if (rowDuplCount > 0 || colDuplCount > 0 || blockDuplCount > 0) {
      return true;
    } else {
      return false;
    }
  }

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[2]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.board();
console.log(game.showBoard());
console.log()
game.solve();
console.log(game.showBoard());
