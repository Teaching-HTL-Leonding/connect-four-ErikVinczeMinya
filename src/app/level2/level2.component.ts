import { Component } from '@angular/core';

@Component({
  templateUrl: './level2.component.html',
  styleUrls: ['./level2.component.css'],
})
export class Level2Component {
  public board!: number[][];
  public currentPlayerIndex!: number;
  public currentWinnerIndex!: number;
  private playerNames!: string[];

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

  constructor() {
    this.playerNames = ['', '1', '2'];
    this.onRestart();
  }
  public getWinnerName(): string {
    if(this.currentWinnerIndex === 0) {
      return '';
    }
    return this.currentWinnerIndex === 1 ? 'Red' : 'Blue';
  }

  public get winnerIndex(): number {
    return this.currentWinnerIndex;
  }

  public getPlayerName(col: number, row: number): string {
    if (this.board[row][col] !== 0) {
      return this.playerNames[this.board[row][col]];
    }
    return '';
  }

  public getStyle(col: number, row: number): string {
    return `occupied-${this.getPlayerName(col, row)}`;
  }

  public onRestart(): void {
    this.board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.currentPlayerIndex = 1;
    this.currentWinnerIndex = 0;
  }

  getWinnerIndex(): number {
    let winner = 0;

    //rows
    for (let row = 0; row < this.board.length; row++) {
      if (
        this.board[row][0] !== 0 &&
        this.board[row][0] === this.board[row][1] &&
        this.board[row][1] === this.board[row][2] &&
        this.board[row][2] === this.board[row][3]
      ) {
        winner = this.board[row][0];
      }
    }

    //cols
    for (let col = 0; col < this.board[0].length; col++) {
      if (
        this.board[0][col] !== 0 &&
        this.board[0][col] === this.board[1][col] &&
        this.board[1][col] === this.board[2][col] &&
        this.board[2][col] === this.board[3][col]
      ) {
        winner = this.board[0][col];
      }
    }

    //diagonal (left to right)
    for (let col = 0; col < this.board[0].length; col++) {
      if (
        this.board[0][col] !== 0 &&
        this.board[0][col] === this.board[1][col + 1] &&
        this.board[1][col + 1] === this.board[2][col + 2] &&
        this.board[2][col + 2] === this.board[3][col + 3]
      ) {
        winner = this.board[0][col];
      }
    }

    //diagonal (right to left)
    for (let col = 0; col < this.board[0].length; col++) {
      if (
        this.board[0][col] !== 0 &&
        this.board[0][col] === this.board[1][col - 1] &&
        this.board[1][col - 1] === this.board[2][col - 2] &&
        this.board[2][col - 2] === this.board[3][col - 3]
      ) {
        winner = this.board[0][col];
      }
    }

    return winner;
  }

  // TODO: Complete this class by adding the appropriate code
  // At the end, this should become a working connect-four-game on a 4 x 4 board.
}
