import { Component } from '@angular/core';
import { Level2Component } from '../level2/level2.component';

@Component({
  templateUrl: './level3.component.html',
  styleUrls: ['./level3.component.css'],
})
export class Level3Component extends Level2Component {
  private arrowColIx!: number[];

  constructor() {
    super();
  }

  public getArrowColIx(): number[] {
    return this.arrowColIx;
  }

  public getCells(): number[][] {
    return this.board;
  }

  override onRestart(): void {
    this.arrowColIx = [0, 0, 0, 0, 0, 0, 0];
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

  override getWinnerIndex(): number {
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
