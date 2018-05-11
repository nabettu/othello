import { h } from "hyperapp";

export default ({ state }) => (
  <header id="header">
    <div className="player black" />
    <h1>OTHELLO</h1>
    <p>
      NEXT :
      {() => {
        if (state.currentPlayerIsRight) {
          return <span>→</span>;
        } else {
          return <span>←</span>;
        }
      }}
    </p>
    <div className="player white" />
  </header>
);
