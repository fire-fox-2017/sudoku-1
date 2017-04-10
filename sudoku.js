"use strict"

class Sudoku {
  constructor(board_string) {
    this._board_string = board_string;
    this._papanSudoku = [];
  }

  // Returns a string representing the current state of the board
  board() {
    let ukuranPapan = 9;
    let lokasiAngka = 0;

    for (var i = 0; i < ukuranPapan; i++) {
      let tmpPapanSudoku = [];
      for (var j = 0; j < ukuranPapan; j++) {
        tmpPapanSudoku.push(+this._board_string[lokasiAngka]);
        lokasiAngka++;
      }
      this._papanSudoku.push(tmpPapanSudoku);
    }
    return this._papanSudoku;
  }

  // getAngkaRandom(){
  //   var angkaRandom = Math.floor((Math.random() * 9) + 1);
  //   return angkaRandom;
  // }

  //cek pada kolom papan, dimulai dari kolom 0, lalu lanjut ke kanan
  cekKolomPapan(barisAngka, angka) {
    for (var kolom = 0; kolom < 9; kolom++) {
      if (this._papanSudoku[barisAngka][kolom] == angka) {
        return false;
      }
    }
    return true;
  }

  //cek pada baris papan, dimulai dari baris 0, lalu turun ke bawah
  cekBarisPapan(kolomAngka, angka) {
    for (var baris = 0; baris < 9; baris++) {
      if (this._papanSudoku[baris][kolomAngka] == angka) {
        return false;
      }
    }
    return true;
  }

  //cek pada kolom 3x3
  cekKolom3x3(barisAngka, kolomAngka, angka) {
    var kotak = 3;
    var posKolom = 0;
    var posBaris = 0;

    //untuk mencari baris kotak 3x3 dari posisi angka yang ada di papan sudoku
    while (barisAngka >= posBaris + kotak) {
      posBaris += kotak; //batas baris min
    }

    //untuk mencari kolom kotak 3x3 dari posisi angka yang ada di papan sudoku
    while (kolomAngka >= posKolom + kotak) {
      posKolom += kotak; //batas kolom min
    }

    for (var baris3x3 = posBaris; baris3x3 < posBaris + kotak; baris3x3++) {
      for (var kolom3x3 = posKolom; kolom3x3 < posKolom + kotak; kolom3x3++) {
        if (this._papanSudoku[baris3x3][kolom3x3] == angka) {
          return false;
        }
      }
    }
    return true;



  }

  //hasil kesimpulan cek angka pada baris, kolom, dan kolom 3x3
  cekAngka(barisAngka, kolomAngka, angka) {
    if (this.cekBarisPapan(kolomAngka, angka) &&
      this.cekKolomPapan(barisAngka, angka) &&
      this.cekKolom3x3(barisAngka, kolomAngka, angka)) {
      return true;
    } else {
      return false;
    }
  }

  solve() {
    //panjang maksimum papan
    let panjangPapan = 9

    for (var baris = 0; baris < panjangPapan; baris++) {
      for (var kolom = 0; kolom < panjangPapan; kolom++) {
        if (this._papanSudoku[baris][kolom] == 0) {
          // this._papanSudoku[baris][kolom] = this.getAngkaRandom();
          for (var angka = 0; angka <= panjangPapan; angka++) {
            if (this.cekAngka(baris, kolom ,angka)) {
              this._papanSudoku[baris][kolom] = angka;
              break;
            }
          }
        }
      }
    }
    return this._papanSudoku;
  }
}


// The file has newlines at the end of each line,
// so we call split to remove it (\n)
// var fs = require('fs')
// var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
//   .toString()
//   .split("\n")[0]

let board_string = '096040001100060004504810390007950043030080000405023018010630059059070830003590007';

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
// game.solve()

console.log(game.board());
// console.log('Hasil Sudoku');
// console.log(game.solve());
