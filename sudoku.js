"use strict"

class Sudoku {
  constructor(board_string) {
    this._number = board_string
  }

  // Returns a string representing the current state of the board
  board(){
    let arrnum = this._number.split('').map(Number)
    let board = []
    let row = 9
    for (let i = 0; i < arrnum.length; i+=row) {
      board.push(arrnum.slice(i,i+row))
    }
    this._number = board
    for(let i=0; i<9; i++){
      if(i===0||i===3||i===6){
        console.log('---------------------')
      }
      console.log(`${board[i].slice(0,3).join(' ')} | ${board[i].slice(3,6).join(' ')} | ${board[i].slice(6).join(' ')}`)
      if(i===8){
        console.log('---------------------')
      }
    }
    // console.log(this._number)
  }

  posZero(){
    let arr = []
    for (let i = 0; i < this._number.length; i++) {
      for (let j=0; j < this._number[i].length; j++){
        if(this._number[i][j] == 0){
          arr.push([i,j])
        }
      }
    }
    return arr
  }

  checkRow(board,row,val){ //true
    for(let i=0; i<board[row].length; i++) { //
      if(val === board[row][i]){
        return false
      }
    }
    return true
  }

  checkCol(board,col,val){
    for(let i=0; i<board.length; i++){
      if(val == board[i][col]){
        return false
      }
    }
    return true
  }

  checkBox(board,row,col,val){
    let rowCorner = 0
    let colCorner = 0
    let box = 3
    // searching row terkiri
    while(row >= rowCorner + box){
      rowCorner += box
    }

    // searching colom terkiri
    while(col >= colCorner + box){
      colCorner += box
    }

    // looping mulai pojokan kotak3x3 !
    for(let i = rowCorner; i < rowCorner+box; i++){
      for(let j = colCorner; j < colCorner+box; j++){
        if (val == board[i][j]){
          return false
        }
      }
    }
    return true
  }

  getNumber(board,row,col,val){
    if(this.checkRow(board,row,val) && this.checkCol(board,col,val) && this.checkBox(board,row,col,val)){
      return true
    } else {
      return false
    }
  }

  solve() {
    let pos = this.posZero()
    let board = this._number
    let limit = 9
    let row,col,val,found,i;
    for (i=0; i < pos.length;) {
      //return lokasi posisi 0
      row = pos[i][0]
      col = pos[i][1]
      /* mengecek nilai selanjutnya
       apabila next position, tidak ada angka yang bisa ditemukan dan dilakukan decreament
       nilia yang sudah didapat sebelumnya akan di increment dan dilakukan kembali untuk mengetes angka selanjutnya */
      val = board[row][col] + 1
      found = false

      //melakukan mengecek kondisi baris kolom dan kotaknya bro
      while (found === false && val <= limit){
        if(this.getNumber(board,row,col,val)){
            board[row][col] = val
            found = true
            i++
        } else {
            val++
        }
      }
      // apabila tidak ada angka yang mungkin ditaruh dilakukan decreament
      if(found == false){
        board[row][col] = 0
        i--
      }
    }
    // console.log(board.length);
    for(let j =0; j<board.length; j++){

      if(j==0 || j==3 || j==6){
        console.log('---------------------')
      }
      console.log(`${board[j].slice(0,3).join(' ')} | ${board[j].slice(3,6).join(' ')} | ${board[j].slice(6).join(' ')}`);
      if(j==8){
        console.log('---------------------')
      }
    }

  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
// var fs = require('fs')
// var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
//   .toString()
//   .split("\n")[0]

var game = new Sudoku("619030040270061008000047621486302079000014580031009060005720806320126057160400030")

// Remember: this will just fill out what it can and not "guess"
game.board()
console.log('this solved:')
game.solve()

// console.log(game.board())
