import React from "react";

export default function Die(props) {
  return (
    <div onClick={props.Hold}>
      {!props.isHeld && <div className="grid-item-unheld">{props.value}</div>}
      {props.isHeld && <div className="grid-item-held">{props.value}</div>}
    </div>
  );
}
