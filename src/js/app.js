import "../scss/style.scss";
import { h, app } from "hyperapp";

import Header from "./components/Header";
//@jsx h

const config = {
  boardSize: 4
};

const EMPTY = "empty";
const WHITE = "white";
const BLACK = "black";
const board = [];

for (let x = 0; x < config.boardSize; x++) {
  board.push([]);
  for (let y = 0; y < config.boardSize; y++) {
    board[x].push(EMPTY);
  }
}

const x2 = config.boardSize >> 1;
const y2 = config.boardSize >> 1;
board[x2 - 1][y2 - 1] = WHITE;
board[x2 - 1][y2 - 0] = BLACK;
board[x2 - 0][y2 - 1] = BLACK;
board[x2 - 0][y2 - 0] = WHITE;

const state = {
  count: 0,
  currentPlayerIsRight: true,
  board
};

const actions = {
  addDisc: e => (state, actions) => {
    console.log(e.target.dataset.yx);
    const y = e.target.dataset.yx.split(",")[0] - 0;
    const x = e.target.dataset.yx.split(",")[1] - 0;
    console.log(y, x);
    const nextBeard = state.board;
    nextBeard[y][x] = state.currentPlayerIsRight ? WHITE : BLACK;
    actions.togglePlayer();
    return { board: nextBeard };
  },
  togglePlayer: e => state => ({
    currentPlayerIsRight: !state.currentPlayerIsRight
  })
};

const view = (state, actions) => (
  <main>
    <Header state={state} />
    <table className="board">
      {state.board.map((boardx, yindex) => {
        return (
          <tr>
            {boardx.map((boardxy, xindex) => {
              return (
                <td
                  data-disc={boardxy}
                  data-yx={yindex + "," + xindex}
                  onclick={e => {
                    actions.addDisc(e);
                  }}
                />
              );
            })}
          </tr>
        );
      })}
    </table>
  </main>
);

export const main = app(state, actions, view, document.body);
