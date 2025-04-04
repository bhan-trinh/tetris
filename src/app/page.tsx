'use client'
import React, { useEffect, useState } from "react";
import { Tetromino } from "./tetromino";


// Renders playing board
function Board({ boardArray }){

  var boardRender = []
  for (var i = 0; i < 20; i++){
    var rowRender = [];
    for (var j = 0; j < 10; j++){
      rowRender.push(<Cell
      key={i * 10 + j}
      xPos={i}
      yPos={j}
      filled={boardArray[i][j]}
      />);
    }
    boardRender.push(<div className="board-row" key={i}>{rowRender}</div>);
  }
  return (boardRender);
}
