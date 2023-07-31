import React from "react";
import Die from "./Die";
import Confetti from "react-confetti";

export default function App() {
  const [Dice, setDice] = React.useState(allNewDice);
  const [tenzies, setTenzies] = React.useState(false);
  const [clicks, setClicks] = React.useState(0);
  const [highScore, setHighScore] = React.useState(
    () => JSON.parse(localStorage.getItem("highScore")) || 100
  );

  React.useEffect(() => {
    localStorage.setItem("highScore", JSON.stringify(highScore));
  }, [highScore]);

  React.useEffect(() => {
    let win = true;
    const val = Dice[0].value;
    for (let i = 0; i < 10; i++) {
      if (Dice[i].isHeld === false || val !== Dice[i].value) {
        win = false;
        break;
      }
    }
    if (win === true) {
      setTenzies(true);
    }
  }, [Dice]);

  function allNewDice() {
    const x = [];
    for (let i = 0; i < 10; i++) {
      x.push({
        id: i,
        value: Math.floor(Math.random() * 6 + 1),
        isHeld: false,
      });
    }
    return x;
  }

  function Hold(id) {
    setDice((prev) =>
      prev.map((item) => {
        return item.id === id ? { ...item, isHeld: !item.isHeld } : item;
      })
    );
  }
  function winHold(id) {
    setDice((prev) =>
      prev.map((item) => {
        return item;
      })
    );
  }

  function rollDice() {
    setDice(allNewDice);
  }

  function newRoll() {
    if (tenzies) {
      if (highScore > clicks) setHighScore(clicks);
      setTenzies(false);
      setClicks(0);
      rollDice();
      return;
    } else setClicks((prev) => prev + 1);
    setDice((prev) =>
      prev.map((item) => {
        return item.isHeld === true
          ? { ...item, isHeld: true }
          : { ...item, value: Math.floor(Math.random() * 6 + 1) };
      })
    );
  }
  const DieArray = Dice.map((item) => (
    <Die
      id={item.id}
      value={item.value}
      isHeld={item.isHeld}
      Hold={() => (tenzies === true ? winHold(item.id) : Hold(item.id))}
    />
  ));
  return (
    <div className="box">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="desc">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="flex">
        <div className="grid">{DieArray}</div>
      </div>
      <button className="roll" onClick={newRoll}>
        {tenzies === true ? "NEW GAME" : "ROLL"}
      </button>
      <p className="clickcount">Number of rolls : {clicks}</p>
      <p className="hscore">High score : {highScore < 100 ? highScore : ""}</p>
    </div>
  );
}
