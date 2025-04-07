'use client'
import React, { useEffect, useState } from "react";
import { Tetromino } from "./tetromino";

export default function Game(){
  var yPosCurrent = 2;
  var xPosCurrent = 4;
  // Theres another way where you keep track of placed pieces and current piece separately, but then you would have to figure out how 
  // I use 0, 1, 2!
  
  // Array[x][y]
  const [currentBoardArray, setCurrentBoardArray] = useState(createEmptyArray(10, 20));
  var bodyCurrentPiece = createPiece();

  // Handle key press
  useEffect(() =>
    {
      function handleKeyDown(e: KeyboardEvent){
        if (e.key === 'ArrowLeft'){
          moveLeft();
        }

        if (e.key === 'ArrowRight'){
          moveRight();
        }

        if (e.key === 'ArrowDown'){
          moveDown();
        }
      }
  
    document.addEventListener('keydown', handleKeyDown);
  
    return function cleanUp(){
      document.removeEventListener('keydown', handleKeyDown);
    }
  });

  function moveLeft(){}

  function moveRight(){}
  
  function moveDown(){}


  function calculatePosition ( bodyCurrentPiece, xPos, yPos ){
  }

  function addPiece(){
  }

  function removePiece(){
    const newArray = currentBoardArray.map((row) => { return row.map((cell) => cell === 1 ? 0 : cell)})
    setCurrentBoardArray(newArray);
  }


  function createPiece(){
    return[[0,0], [0,1], [1,0], [1,1]]
  }

  function place(){
    
  }

  function startGame(){  
    bodyCurrentPiece = createPiece();
    let timer = setTimeout(makeFallingPiece, 1000);
  }

  function makeFallingPiece(){
    let timer = setTimeout(makeFallingPiece, 1000);
    moveDown();
  }

    return (<div>
    <button onClick={startGame}>Start Game</button>
    <Board boardArray={currentBoardArray}></Board>
    </div>
    );
}


// Renders playing board
function Board({ boardArray }){

  var boardRender = []
  for (var i = 0; i < 10 ; i++){
    var rowRender = [];
    for (var j = 19; j >= 0; j--){
      rowRender.push(<Cell
      key={i * 10 + j}
      xPos={i}
      yPos={j}
      filled={boardArray[i][j]}
      />);
    }
    boardRender.push(<div className="board-row" key={i}>{rowRender}</div>);
  }
  return (<div className="board">{boardRender}</div>);
}

function Cell({ xPos, yPos, filled }){
  if (filled)
    return (<div className="filled-cell"></div>)
  
  return (<div className="cell">{xPos}, {yPos}</div>);
}

function createEmptyArray( rows: number, columns: number ){
  var array = [];
  for (var i = 0; i < rows; i++){
    var row = [];
    for (var j = 0; j < columns; j++){
      row.push(0);
    }
    array.push(row);
  }
  return array
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
