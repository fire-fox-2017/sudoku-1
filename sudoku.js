"use strict"

class Sudoku {
  constructor(board_string) {
    this.string=board_string.split("");
    this.boardUrut=[];
    this.zona=[];
    this.digit=[];
  }

  solve() {
    function hapusKosong(arr){
      let index;
      for(let i = 0 ; i < arr.length ; i++){
        index = arr.indexOf('0');
        if (index > -1) {
        arr.splice(index, 1);
        }
      }
      return arr;
      //console.log(arr);
    }

    for(let i = 0 ; i <=(9*9)-(9-1) ; i = i+9 ){
      this.boardUrut.push(this.string.slice(i,(i+9)));
    }

    function isiKotak(x,y,arr,temp){
      let baris = x;
      let kolom = y;
      let bool = false;
      for(let i = x ; i <= (baris+2); i++){
        for(let j = y ; j <= (kolom+2); j++){
          if((arr[i][j] !=='0')){
            temp[temp.indexOf(arr[i][j])]='0';
          }
        }
      }
      temp = hapusKosong(temp);

      for(let i=x;i<=(baris+2);i++){
        for(let j=y;j<=(kolom+2);j++){
          if(arr[i][j]==='0'){
            for(let k=0;k<temp.length;k++){
              if(checkBaris(temp[k],i,arr)&&checkKolom(temp[k],j,arr)){
                arr[i][j]=temp[k];
                bool=true;
                break;
              }
            }
            if(bool===false){
              arr[i][j]=String(Math.floor((Math.random() * 9) + 1));
            }else{
              bool=false;
            }
          }
        }
      }
      return arr;
    }

    function checkBaris(n,x,arr){
      let bool=false;
      for(let i=x;i<=x;i++){
        for(let j=0;j<=8;j++){
          if(arr[i][j]===n){
            return false
          }
        }
      }
      return true
    }

    function checkKolom(n,y,arr){
      for(let i=0;i<=8;i++){
        for(let j=y;j<=y;j++){
            if(arr[i][j]===n){
              return false
            }
        }
      }
      return true
    }

    for(let i=0;i<=6;i=i+3){
      for (let j=0;j<=6;j=j+3) {
         this.digit=['1','2','3','4','5','6','7','8','9',]
         this.boardUrut = isiKotak(i,j,this.boardUrut,this.digit);
      }
    }
  }
  // Returns a string representing the current state of the board
  board() {
    return this.boardUrut;
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
console.log("After");
game.solve()
console.log(game.board());
