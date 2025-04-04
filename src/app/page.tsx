'use client'
import React, { useEffect, useState } from "react";
import { Tetromino } from "./tetromino";

export default function Game(){
  var yPosCurrent = 2;
  var xPosCurrent = 4;
  // Theres another way where you keep track of placed pieces and current piece separately, but then you would have to figure out how 

  const [currentBoardArray, setCurrentBoardArray] = useState(createEmptyArray());

  // Array[y][x]
  function createEmptyArray(){
    var array = [];
    for (var i = 0; i < 20; i++){
      var row = [];
      for (var j = 0; j < 10; j++){
        row.push(0);
      }
      array.push(row);
    }
    return array
  }
    return (<div>
    <Board boardArray={currentBoardArray}></Board>
    </div>
    );
}


export function Piece( body: Array<Array<number>>, xOrigin: number, yOrigin: number ){
  body = body;
  xOrigin = xOrigin;
  yOrigin = yOrigin;

  

  // Body


  function getWidth(){
    var width = 0;
    for (var i = 0; i < body.length; i++){
      width = width < body[i][0] ? body[i][0] : width;
    }
    return width
  }

  function getHeight(){
    var height = 0;
    for (var i = 0; i < body.length; i++){
      height = height < body[i][1] ? body[i][1] : height;
    }
    return height;
  }

  function getSkirt(){
      var skirt = [];
      for (var i = 0; i < body.length; i++){
          if (body[i][0] == 0){
              skirt.push(body[i][1]);
          }
      }
}

}

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

function Cell({ xPos, yPos, filled }){
  if (filled)
    return (<div className="filled-cell"></div>)
  
  return (<div className="cell">
  </div>);
}