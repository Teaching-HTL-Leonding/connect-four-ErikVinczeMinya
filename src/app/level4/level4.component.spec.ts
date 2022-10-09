import { TestBed } from "@angular/core/testing";
import { BoardService } from "./board.service";
import { Level4Component } from "./level4.component";

describe('Level4Component', () => {
  let component: Level4Component;
  const boardService = new BoardService();


  it('should change the playerindex', () => {
    boardService.currentPlayerIndex = 1;
    boardService.drop(0);
    expect(boardService.currentPlayerIndex).toBe(2);
  });

  it('should place pieces on the board', () => {
    boardService.drop(0);
    expect(boardService.board[5][0]).toBe(1);
    boardService.drop(1);
    expect(boardService.board[5][1]).toBe(2);
  });

  it('should get the winner if there is one', () => {
    boardService.drop(0);
    boardService.drop(1);
    boardService.drop(0);
    boardService.drop(1);
    boardService.drop(0);
    boardService.drop(1);
    boardService.drop(0);
    expect(boardService.winnerIndex).toBe(1);
  });
});
