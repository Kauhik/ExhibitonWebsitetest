export type Board = number[];

export const createSolvedBoard = (totalTiles: number): Board =>
  Array.from({ length: totalTiles }, (_, index) => index);

export const shuffleBoard = (totalTiles: number): Board => {
  const board = createSolvedBoard(totalTiles);
  for (let i = board.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [board[i], board[j]] = [board[j], board[i]];
  }

  if (isSolved(board)) {
    [board[0], board[board.length - 1]] = [
      board[board.length - 1],
      board[0],
    ];
  }

  return board;
};

export const swapTiles = (board: Board, indexA: number, indexB: number): Board => {
  if (indexA === indexB) {
    return board;
  }

  const next = board.slice();
  [next[indexA], next[indexB]] = [next[indexB], next[indexA]];
  return next;
};

export const isSolved = (board: Board) =>
  board.every((tile, position) => tile === position);

export const countCorrectTiles = (board: Board) =>
  board.reduce((total, tile, position) => (tile === position ? total + 1 : total), 0);

export const getTileCoordinates = (index: number, columns: number) => {
  const row = Math.floor(index / columns);
  const column = index % columns;
  return { row, column };
};
