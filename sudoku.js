"use strict"

class Sudoku {
    constructor(board_string) {
        this._boardString = board_string;
        this._board = [];
    }

    // Returns a string representing the current state of the board
    board() {
        let boardSize = 9
        let count = 0
        for (let i = 0; i < boardSize; i++) {
            let tempBoard = []
            for (let j = 0; j < boardSize; j++) {
                tempBoard.push(+this._boardString[count])
                count++
            }
            this._board.push(tempBoard)
        }
        return this._board
    }

    check_row(row, value) {
        for (let i = 0; i < 9; i++) {
            if (this._board[row][i] == value) {
                return false;
            }
        }
        return true;
    }

    check_column(column, value) {
        for (let i = 0; i < 9; i++) {
            if (this._board[i][column] == value) {
                return false;
            }
        }
        return true;
    }

    check_3x3_square(row, column, value) {
        let squareSize = 3,
            columnCorner = 0,
            rowCorner = 0;

        while (column >= columnCorner + squareSize) {
            columnCorner += squareSize
        }

        while (row >= rowCorner + squareSize) {
            rowCorner += squareSize
        }

        for (let i = rowCorner; i < rowCorner + squareSize; i++) {
            for (let j = columnCorner; j < columnCorner + squareSize; j++) {
                if (this._board[i][j] == value) {
                    return false
                }
            }
        }
        return true
    }

    check_value(column, row, value) {
        if (this.check_row(row, value) && this.check_column(column, value) && this.check_3x3_square(row, column, value)) {
            return true
        } else {
            return false
        }
    }

    solve() {
        let limit = 9
        for (let row = 0; row < limit; row++) {
            for (let col = 0; col < limit; col++) {
                if (this._board[row][col] == 0) {
                    for (let square = 1; square < 10; square++) {
                        if (this.check_value(col, row, square)) {
                            this._board[row][col] = square;
                            break;
                        }
                    }

                }
            }
        }
        return this._board
    }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
// var fs = require('fs')
// var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
//     .toString()
//     .split("\n")[0]

let board_string = '302609005500730000000000900000940000000000109000057060008500006000000003019082040';
var game = new Sudoku(board_string)
console.log(`Sudoku Board:`)
console.log(game.board());
console.log(`\nSudoku Solve:`)
console.log(game.solve());
