"use strict"

class Sudoku {
  constructor(board_string) {
  this._value = board_string;
  this._board = [];
  }

  board() {
    let baris =[]
    let k=0;
    for(let i=0; i<9;i++){
      baris =[];
      for(let j=0;j<9;j++){
          baris.push(this._value[k])
          k++;
      }
      this._board.push(baris);
    }
    console.log(this._board);
  }

  cekValueTersisa(arrTerpakai){
    let string;
    let valueTersisa=[];
    for(let i=1;i<=9;i++){
        string=''+i;
        if(arrTerpakai.indexOf(string) == -1 ){
            valueTersisa.push(''+i)
        }
    }
    return valueTersisa;
  }


  cekValueTerpakai(baris, kolom){
    let tmpValue=[]

    for(let i=0; i<9;i++){
      for(let j=0;j<9;j++){
          if(i==baris){
              tmpValue.push(this._board[i][j])
          }

          if(j==kolom){
              tmpValue.push(this._board[i][j])
          }
      }
    }

    var columnCorner = 0,
        rowCorner = 0,
        squareSize = 3;

    // Find the left-most column
    while(kolom >= columnCorner + squareSize) {
      columnCorner += squareSize;
    }

    // Find the upper-most row
    while(baris >= rowCorner + squareSize) {
      rowCorner += squareSize;
    }

    // Iterate through each row
    for(var i = rowCorner; i < rowCorner + squareSize; i++) {
      // Iterate through each column
      for(var j = columnCorner; j < columnCorner + squareSize; j++) {
        // Return false is a match is found
        tmpValue.push(this._board[i][j])
      }
    }
    return tmpValue;
  }

  // backtracking(lastpostion){
  //
  // }


  solve() {
    for(let row=0; row<9; row++){
      for(let col=0; col<9; col++){
        if(this._board[row][col] == 0){
          let terpakai = this.cekValueTerpakai(row, col)
          let sisaNilai = this.cekValueTersisa(terpakai)
          // console.log(sisaNilai)
          let randomIndex = sisaNilai.length
          if(sisaNilai.length == 0){
            this._board[row][col] = String(Math.floor(Math.random()*9)+1)
          }
          else {
            this._board[row][col] = sisaNilai[Math.floor(Math.random()*randomIndex)]
          }
        }
      }
    }
    console.log(this._board)
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku('619030040270061008000047621486302079000014580031009060005720806320106057160400030')

console.log('PAPAN AWAL')
game.board();

console.log('\nSOLVE')
game.solve();
