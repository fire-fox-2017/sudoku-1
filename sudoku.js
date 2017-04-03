"use strict"

class Sudoku {
  constructor(board_string) {
    this._dataString=board_string.match(/\d{9}/g);
    this._arrBoad=[];
    this._groupBoard=[['0,0','0,1','0,2','1,0','1,1','1,2','2,0','2,1','2,2'],
                    ['0,3','0,4','0,5','1,3','1,4','1,5','2,3','2,4','2,5'],
                    ['0,6','0,7','0,8','1,6','1,7','1,8','2,6','2,7','2,8'],
                    ['3,0','3,1','3,2','4,0','4,1','4,2','5,0','5,1','5,2'],
                    ['3,3','3,4','3,5','4,3','4,4','4,5','5,3','5,4','5,5'],
                    ['3,6','3,7','3,8','4,6','4,7','4,8','5,6','5,7','5,8'],
                    ['6,0','6,1','6,2','7,0','7,1','7,2','8,0','8,1','8,2'],
                    ['6,3','6,4','6,5','7,3','7,4','7,5','8,3','8,4','8,5'],
                    ['6,6','6,7','6,8','7,6','7,7','7,8','8,6','8,7','8,8']];
  }
  // Returns a string representing the current state of the board
  board() {
    for (let i = 0; i < this._dataString.length; i++) {
      this._arrBoad.push([]);
      for (let j = 0; j < this._dataString.length; j++) {
          this._arrBoad[i].push(this._dataString[i][j]);
      }
    }
  return this._arrBoad;
  }

  solve() {
    for (let i = 0; i < this._arrBoad.length; i++) {
      for (let j = 0; j < this._arrBoad.length; j++) {
        if(this._arrBoad[i][j]=='0'){
            let tempIndex=this.checkIGroup(i+','+j);
            let tempArr=this.checkGroup(tempIndex);
            tempArr=this.checkRow(tempArr,i,j,'j');
            tempArr=this.checkRow(tempArr,i,j,'i');
            tempArr=tempArr.sort();
            if(tempArr.length>0){
            this._arrBoad[i][j]=tempArr[this.randomInd(tempArr.length)];
            }else{
              let temp=Math.floor(Math.random()*9)+1;
              this._arrBoad[i][j]=temp.toString();
            }
        }
      }
    }
  return this._arrBoad;
  }

  checkIGroup(Str){
    for (let i = 0; i < this._groupBoard.length; i++) {
      for (let j = 0; j < this._groupBoard.length; j++) {
        if(Str==this._groupBoard[i][j]){
          return i;
        }
      }
    }
  }

  checkGroup(index){
    let tempArr=[];
    let arrResult=[];
    for (let i = 0; i < 9; i++) {
      let temp=this._groupBoard[index][i];
      if(this._arrBoad[temp[0]][temp[2]]!=='0'){
        tempArr.push(this._arrBoad[temp[0]][temp[2]]);
      }
    }
    for (let i = 0; i < tempArr.length; i++) {
      for (let j = 1; j <= 9; j++) {
        let temp=j.toString();
        if(tempArr[i]!==temp){
          if(tempArr.includes(temp)){
          }else {
            if(arrResult.includes(temp)){
            }else{
              arrResult.push(temp);
            }
          }
        }
      }
    }
    return arrResult;
  }

  checkRow(arr,indI,indJ,str){
    let arrTemp=[];
    let a=[];
    let arrResult=[];
    for(let i=0;i<9;i++){
      if(indJ!==i){
          if(str=='j'){
            if(this._arrBoad[indI][i]!=='0'){
              //console.log("value "+this._arrBoad[indI][i]+" i "+arrI+" j "+i);
              arrTemp.push(this._arrBoad[indI][i]);
            }
          }else {
            if(this._arrBoad[i][indJ]!=='0'){
              //console.log("value "+this._arrBoad[indI][i]+" i "+arrI+" j "+i);
              arrTemp.push(this._arrBoad[i][indJ]);
            }
          }
      }
    }
    for(let j=0;j<arrTemp.length;j++){
      for(let i=0;i<arr.length;i++){
        let temp=arrTemp[j];
        if(arr[i]==temp){
          a.push(arr[i]);
        }
      }
    }
    let Sarr=arr.join("");
    for(let j=0;j<a.length;j++){
      Sarr=Sarr.replace(a[j],"");
    }
    arrResult=Sarr.split("");
    return arrResult;
    }

    randomInd(ind){
      let temp=Math.floor((Math.random()*ind));
      return temp;
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
console.log(game.board())
console.log();
console.log(game.solve())
