const Set = require("./Set.js");

class Board {
  constructor(sudokuRawString) {
    this.board = {
      rows: [],
      columns: [],
      squares: [],
      isValid: false,
      isComplete: false,
      isSolved: false,
    };
    this.sanitized = this.sanitize(sudokuRawString);
    this.extractSets();
  }

  sanitize(sudokuRawString) {
    return sudokuRawString
      .split("")
      .filter(
        (c) => c !== "\n" && c !== " " && c !== "|" && c !== "-" && c !== "+"
      );
  }

  extractSets() {
    this.extractRows();
    this.extractColumns();
    this.extractSquares();
  }

  extractRows() {
    for (let i = 0; i < 9; i++) {
        this.board.rows.push(new Set(this.sanitized.slice(i * 9, i * 9 + 9)));
    }
  }

  extractColumns() {
    for (let i = 0; i < 9; i++) {
        let col = [];
        for (let j = 0; j < 9; j++) {
            col.push(this.sanitized[i + j * 9]);
        }
        this.board.columns.push(new Set(col));
    }
  }

  extractSquares() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let square = [];
            for (let k = 0; k < 3; k++) {
                for (let m = 0; m < 3; m++) {
                    // X = j * 3, Y = i * 27, Z = k * 9, W = m || 0, 3, 9, 27 => 81
                    square.push(this.sanitized[i * 27 + j * 3 + k * 9 + m]);
                }
            }
            this.board.squares.push(new Set(square));
        }
    }
  }

  validateCompleteSets() {
    return this.board.rows.every((row) => row.complete) && this.board.columns.every((col) => col.complete) && this.board.squares.every((square) => square.complete);
  }
  
  validateSets() {
    return this.board.rows.every((row) => row.validSet) && this.board.columns.every((col) => col.validSet) && this.board.squares.every((square) => square.validSet);
  }

  validate() {
    this.board.isValid = this.validateSets();
    this.board.isComplete = this.validateCompleteSets();
    this.board.isSolved = this.board.isValid && this.board.isComplete;
    console.log(this.board.isComplete);
    return this.board.isSolved ? 'Sudoku is valid.' : this.board.isValid && !this.board.isComplete ? 'Sudoku is valid but incomplete.' : 'Sudoku is invalid.';
  }
}

module.exports = Board;
