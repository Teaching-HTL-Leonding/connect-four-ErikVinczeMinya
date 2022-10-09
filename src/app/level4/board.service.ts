import { Injectable } from '@angular/core';

/**
 * Logic for a connect-four-board.
 */
@Injectable({
  providedIn: 'root',
})
export class BoardService {
    public board!: number[][];
    public currentPlayerIndex!: number;
    private currentWinnerIndex!: number;

    constructor() {
      this.restart();
    }

    public get winnerIndex(): number {
      return this.currentWinnerIndex;
    }

    public drop(colIx: number) {
      console.log(`Coin dropped in column ${colIx}`);
      for (let row = this.board.length - 1; row >= 0; row--) {
        if (this.currentWinnerIndex === 0 && this.board[row][colIx] === 0) {
          this.board[row][colIx] = this.currentPlayerIndex;
          break;
        }
      }
      this.currentWinnerIndex = this.getWinnerIndex();
      this.currentPlayerIndex = this.currentPlayerIndex === 1 ? 2 : 1;
    }

    public restart(): void {
      this.board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ];
      this.currentPlayerIndex = 1;
      this.currentWinnerIndex = 0;
    }

    private getWinnerIndex(): number {
      let winner = 0;
      let winnerCount = 0;

      //rows
      for (let row = 0; row < this.board.length; row++) {
        winnerCount = 0;
        for (let col = 0; col < this.board[row].length; col++) {
          if (this.board[row][col] === this.currentPlayerIndex) {
            winnerCount++;
            if (winnerCount === 4) {
              winner = this.board[row][col];
              break;
            }
          } else {
            winnerCount = 0;
          }
        }
        if (winner !== 0) {
          break;
        }
      }

      //cols
      for (let col = 0; col < this.board[0].length; col++) {
        winnerCount = 0;
        for (let row = 0; row < this.board.length; row++) {
          if (this.board[row][col] === this.currentPlayerIndex) {
            winnerCount++;
            if (winnerCount === 4) {
              winner = this.board[row][col];
              break;
            }
          } else {
            winnerCount = 0;
          }
        }
        if (winner !== 0) {
          break;
        }
      }

      //diagonals
      for (let row = 0; row < this.board.length; row++) {
        for (let col = 0; col < this.board[row].length; col++) {
          if (this.board[row][col] === this.currentPlayerIndex) {
            if (this.board[row + 1] !== undefined) {
              if (this.board[row + 1][col + 1] === this.currentPlayerIndex) {
                if (this.board[row + 2] !== undefined) {
                  if (this.board[row + 2][col + 2] === this.currentPlayerIndex) {
                    if (this.board[row + 3] !== undefined) {
                      if (
                        this.board[row + 3][col + 3] === this.currentPlayerIndex
                      ) {
                        winner = this.board[row][col];
                        break;
                      }
                    }
                  }
                }
              }
            }
            if (this.board[row + 1] !== undefined) {
              if (this.board[row + 1][col - 1] === this.currentPlayerIndex) {
                if (this.board[row + 2] !== undefined) {
                  if (this.board[row + 2][col - 2] === this.currentPlayerIndex) {
                    if (this.board[row + 3] !== undefined) {
                      if (
                        this.board[row + 3][col - 3] === this.currentPlayerIndex
                      ) {
                        winner = this.board[row][col];
                        break;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (winner !== 0) {
          break;
        }
      }

      return winner;
    }
  }
