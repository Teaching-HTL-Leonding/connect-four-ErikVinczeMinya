import { Component } from '@angular/core';
import { BoardService } from './board.service';

@Component({
  selector: 'app-level4',
  templateUrl: './level4.component.html',
  styleUrls: ['./level4.component.css'],
})
export class Level4Component {
  public arrowColIx!: number[];
  boardService: BoardService;
  private playerNames!: string[];

  constructor(boardService: BoardService) {
    this.arrowColIx = [0, 0, 0, 0, 0, 0, 0];
    this.boardService = boardService;
    this.playerNames = ['', '1', '2'];
  }

  public getWinnerName(): string {
    if(this.boardService.winnerIndex === 0) {
      return '';
    }
    return this.boardService.winnerIndex === 1 ? 'Red' : 'Blue';
  }

  public getStyle(col: number, row: number): string {
    return `occupied-${this.getPlayerName(col, row)}`;
  }

  public getCells(): number[][] {
    return this.boardService.board;
  }

  public getPlayerName(col: number, row: number): string {
    if (this.boardService.board[row][col] !== 0) {
      return this.playerNames[this.boardService.board[row][col]];
    }
    return '';
  }
  public getArrowColIx(): number[] {
    return this.arrowColIx;
  }
}
