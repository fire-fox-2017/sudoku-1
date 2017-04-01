"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardData = board_string.match(/\d{9}/g);
    this.playBoard = [];
    this.smallBlocks = [];
    this.initBoard = [];
    this.elements =[]

    this.board();
    this.blocks();
    this.createElem();
    

  }

  createElem() {
	// creates objects for the elements
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
	// try to fill all, no block check yet
	
	for (let rowIndex = 0; rowIndex < this.playBoard.length; rowIndex++) {

	  let row = rowIndex;
	
	for (let colIndex = 0; colIndex < this.playBoard.length; colIndex++) {
		
	  let col = colIndex;
	
    let msg = "";
	let guess = 0;

	do { 
	guess++;  
	
	for (let i = 0; i < this.elements.length; i++) {
	  let elem = this.elements[i];
	  if (elem.row === row && elem.col === col) {
//		  console.log(elem);
		  if (elem.stat === "free") {
			  elem.number = String(guess);
			  this.playBoard[row].splice(col, 1, String(guess));
			  msg = `Row ${row} col ${col} is filled with ${guess}`;
//			  console.log(`Guess? ${guess}`);
//			  console.log(`Row duplicate? ${this.isRowDupl(row)}`);
//			  console.log(`Col duplicate? ${this.isColDupl(col)}`);
//			  console.log(`Block duplicate? ${this.isBlockDupl(row, col)}`);
//			  console.log(elem);
		  }  else {
//		    msg = `Element in row ${row} col ${col} is fixed!`;
	      }
	  }
	}

	} while ((this.isRowDupl(row) || this.isColDupl(col) || this.isBlockDupl(row, col)) && guess < 9);
//	console.log(msg);
	
  }
  
  }

  }

  // Returns a string representing the current state of the board
  board() {
    for (let i = 0; i < this.boardData.length; i++) {
      this.playBoard.push([]);
      this.initBoard.push([]);
      for (let j = 0; j < this.boardData.length; j++) {
        if (this.boardData[i][j] === "0") {
          this.playBoard[i].push(' ');
          this.initBoard[i].push(' ');
        } else {
          this.playBoard[i].push(this.boardData[i][j]);
          this.initBoard[i].push(this.boardData[i][j]);
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
  
  rowColToBlock(row, col) {
    if (row < 3) {
		if (col < 3) {
			return 0;
		} else if (col < 6) {
			return 1;
		} else {
			return 2;
		}
	} else if (row < 6) {
		if (col < 3) {
			return 3;
		} else if (col < 6) {
			return 4;
		} else {
			return 5;
		}
	} else {
		if (col < 3) {
			return 6;
		} else if (col < 6) {
			return 7;
		} else {
			return 8;
		}
	}	  
  }
  
  isRowEmpty(row) {
    //check for empty column
    let digit = /[0-9]/;
    let nonDigCount = 0;

    for (let col = 0; col < this.playBoard.length; col++) {
      if (!digit.test(this.playBoard[row][col])) {
        nonDigCount += 1;
      }
    }
    
    if (nonDigCount > 0) {
      return true;
    } else {
      return false; 
	}
  }
  
  isRowDupl(row) {
    //check the duplicates in row
    let duplicates = [];

    let col = 0;
    while (col < this.playBoard.length && /\s/.test(this.playBoard[row][col])) {
		col++;
	}
    
    let runningItems = [this.playBoard[row][col]];
    
    col = 0;
    while (col < this.playBoard.length) {
      for (let i = 0; i < runningItems.length; i++) {
		let currentNumber = this.playBoard[row][col];
        if (!/\s/.test(currentNumber) && currentNumber === runningItems[i]) {
          duplicates.push(runningItems[i]);
        }
      }
      runningItems.push(this.playBoard[row][col]);
      col++;
    }
    // console.log(duplicates);
    
    if (duplicates.length > 1) {
      return true;
    } else {
      return false;
    }
    
  }

  isColEmpty(col) {
    //check for empty row
    let digit = /[0-9]/;
    let nonDigCount = 0;

    for (let row = 0; row < this.playBoard.length; row++) {
      if (!digit.test(this.playBoard[row][col])) {
        nonDigCount += 1;
      }
    }
    
    if (nonDigCount > 0) {
      return true;
    } else {
      return false;
    }	
  }

  isColDupl(col) {
    //check the duplicates in column
    
    let duplicates = [];

    let row = 0;
    while (row < this.playBoard.length && /\s/.test(this.playBoard[row][col])) {
		row++;
	}
    
    let runningItems = [this.playBoard[row][col]];
    
    row = 0;
      while (row < this.playBoard.length) {
        for (let i = 0; i < runningItems.length; i++) {
		  let currentNumber = this.playBoard[row][col];
          if (!/\s/.test(currentNumber) && currentNumber === runningItems[i]) {
            duplicates.push(runningItems[i]);
          }
        }
        runningItems.push(this.playBoard[row][col]);
        row++;
      }
      
      if (duplicates.length > 1) {
        return true;
      } else {
        return false;
      }
  
  }
  
  isBlockEmpty(block) {
	//check for empty element
	let digit = /[0-9]/;
    let nonDigCount = 0;

    for (let i = 0; i < this.smallBlocks[block]; i++) {
      if (!digit.test(this.smallBlocks[block][i])) {
        nonDigCount += 1;
      }
    }
    
    if (nonDigCount > 0) {
      return true;
    } else {
      return false;
	}
  }

  isBlockDupl(row, col) {
    //check the duplicates within the block
      
      let block = this.rowColToBlock(row, col);
      let blockItem = this.smallBlocks[block];
//     console.log(`Block: ${block}`);
      
      let duplicates = [];
      
      let index = 0;
      let rowIndex = blockItem[index][0];
      let colIndex = blockItem[index][1];
      while (index < blockItem.length && /\s/.test(this.playBoard[rowIndex][colIndex])) {
		index++;
		rowIndex = blockItem[index][0];
        colIndex = blockItem[index][1];
   	  }
    
      let runningItems = [this.playBoard[rowIndex][colIndex]];
      
      index = 0;
      while (index < blockItem.length) {
		rowIndex = blockItem[index][0];
        colIndex = blockItem[index][1];
//        console.log(`Elem: ${blockItem[index]}`);
        for (let i = 0; i < runningItems.length; i++) {
		  let currentNumber = this.playBoard[rowIndex][colIndex];
          if (!/\s/.test(currentNumber) && currentNumber === runningItems[i]) {
            duplicates.push(runningItems[i]);
          }
        }
        runningItems.push(this.playBoard[rowIndex][colIndex]);
        index++;
      }
      
//      console.log(`Block duplicate: ${duplicates}`);
      if (duplicates.length > 1) {
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
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

// console.log(game.elements);
console.log(game.initBoard);
console.log();
console.log(game.playBoard);
//let block = 0;
//let blockItem = game.smallBlocks[block];
//console.log(blockItem[0]);
//console.log(game.isBlockDupl(1,8));


