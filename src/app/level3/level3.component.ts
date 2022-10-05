import { Component } from '@angular/core';
import { Level2Component } from '../level2/level2.component';

@Component({
  templateUrl: './level3.component.html',
  styleUrls: ['./level3.component.css'],
})
export class Level3Component extends Level2Component {
  // TODO: Complete this class by adding the appropriate code.
  // Try to avoid copying the code from level 2. Find a different solution
  // for reusing the existing logic.

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

    //diagonals (left-right) [Not Complete]
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < this.board.length; i++) {
        if (this.board[i][i + j] === this.currentPlayerIndex) {
          winnerCount++;
          if (winnerCount === 4) {
            winner = this.board[i][i + j];
            break;
          }
        } else {
          winnerCount = 0;
        }
      }
      winnerCount = 0;

      for (let i = 0; i < this.board[0].length; i++) {
        if (this.board[i + j][i] === this.currentPlayerIndex) {
          winnerCount++;
          if (winnerCount === 4) {
            winner = this.board[i + j][i];
            break;
          }
        } else {
          winnerCount = 0;
        }
      }
      winnerCount = 0;
    }
    return winner;
  }
}
