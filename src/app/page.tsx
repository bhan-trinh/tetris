'use client'
import React, { useEffect, useRef, useState } from "react";
import { Tetromino } from "./tetromino";

export default function Game(){
  const xPosCurrent = useRef(4);
  const yPosCurrent = useRef(17);
  // Theres another way where you keep track of placed pieces and current piece separately, but then you would have to figure out how 
  // I use 0, 1, 2!
  
  // Array[x][y]
  const [currentBoardArray, setCurrentBoardArray] = useState(createEmptyArray(10, 20));
  const bodyCurrentPiece = useRef(createPiece());

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

        if (e.key === 'ArrowUp'){
          rotateRight();
        }
      }
  
    document.addEventListener('keydown', handleKeyDown);
  
    return function cleanUp(){
      document.removeEventListener('keydown', handleKeyDown);
    }
  });

  // Body
  function getWidth() {
    var width = 0;
    for (var i = 0; i < bodyCurrentPiece.current.length; i++){
      width = width < bodyCurrentPiece.current[i][0] ? bodyCurrentPiece.current[i][0] : width;
    }
    return width
  }

  function getHeight(){
    var height = 0;
    for (var i = 0; i < bodyCurrentPiece.current.length; i++){
      height = height < bodyCurrentPiece.current[i][1] ? bodyCurrentPiece.current[i][1] : height;
    }
    return height;
  }

  function getSkirt(){
      var skirt = [];
      for (var i = 0; i < bodyCurrentPiece.current.length; i++){
          if (bodyCurrentPiece.current[i][0] == 0){
              skirt.push(bodyCurrentPiece.current[i][1]);
          }
      }
      return skirt;
    }

  function rotateRight(){
    var newArray = removePiece()
    var newBody = [];
    var bodyWidth = getWidth()
    for (const [x, y] of bodyCurrentPiece.current){
      newBody.push([y, bodyWidth - x])
    }
    bodyCurrentPiece.current = newBody
    newArray = addPiece();
    setCurrentBoardArray(newArray);
  }

  function moveLeft(){
    if (xPosCurrent.current > 0) {
    var newArray = removePiece();
    xPosCurrent.current -= 1; // why does this work and not setState?
    newArray = addPiece();
    setCurrentBoardArray(newArray);
    }
  }

  function moveRight(){
    if (xPosCurrent.current + getWidth() < 9) {
      var newArray = removePiece();
      xPosCurrent.current += 1; // why does this work and not setState?
      newArray = addPiece();
      setCurrentBoardArray(newArray);
    }
  }

  function moveDown(){
    if (yPosCurrent.current == 0) {
      place()
    }
    else{
      var newArray = removePiece();
      yPosCurrent.current -= 1; // why does this work and not setState?
      newArray = addPiece();
      setCurrentBoardArray(newArray);
    }
  }

  function calculatePosition ( bodyCurrentPiece: Array<Array<number>>, xPos: number, yPos: number ){
    return bodyCurrentPiece.map((coordinateSet) => {
      return coordinateSet.map((coordinate, axis) => {
        return coordinate = axis === 0 ? coordinate + xPos : coordinate + yPos
      })
    }
      
  );
     
  }

  function addPiece(){
    var positionCurrentPiece = calculatePosition(bodyCurrentPiece.current, xPosCurrent.current, yPosCurrent.current)
    var newArray = [...currentBoardArray];
    for (const [x, y] of positionCurrentPiece){
      newArray[x][y] = 1;
    } 
    return newArray
  }

  function removePiece(){
    var positionCurrentPiece = calculatePosition(bodyCurrentPiece.current, xPosCurrent.current, yPosCurrent.current)
    var newArray = [...currentBoardArray];
    for (const [x, y] of positionCurrentPiece){
      newArray[x][y] = 0;
    } 
    return newArray
  }

  function createPiece(){
    const OPiece = [[0,0], [0,1], [1,0], [1,1]]

    const LPiece = [[0,0], [0,1], [1,1], [2,1]]
  
    const TPiece = [[1,0], [0,1], [1,1], [2,1]]

    const IPiece = [[1,0], [1,1], [1,2], [1,3]]

    const ZPiece = [[0,1], [1,0], [1,1], [2,0]]

    const SPiece = [[0,0], [1,0], [1,1], [2,1]]

    const pieceArray = [OPiece, LPiece, TPiece, IPiece, ZPiece, SPiece] 

    return pieceArray[Math.floor(Math.random() * 6)];
  }

  function place(){
    var positionCurrentPiece = calculatePosition(bodyCurrentPiece.current, xPosCurrent.current, yPosCurrent.current)
    // Lock the current piece in place
    var newArray = [...currentBoardArray];
    for (const [x, y] of positionCurrentPiece){
      newArray[x][y] = 2;
    } 
    
    console.log("Locked!")
    // Create new piece
    bodyCurrentPiece.current = createPiece();
    xPosCurrent.current = 4;
    yPosCurrent.current = 17;

  }

  function startGame(){ 
    const newArray = addPiece();
    setCurrentBoardArray(newArray);
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

