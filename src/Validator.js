const Board = require("./Board.js");
class Validator {
  static validate(sudoku) {
    const validator = new Validator();

    return validator.validate(sudoku);
  }

  /**
   * @param {string} sudokuRawString
   */
  validate(sudokuRawString) {
    /**
     * @param {Board} gameState
     */
    const gameState = new Board(sudokuRawString);

    return gameState.validate();
  }
}

module.exports = Validator;
