import React, { useEffect, useState } from "react";

export function Tetromino( body: Array<Array<number>>, xOrigin, yOrigin ){
  body = body;
  xOrigin = xOrigin;
  yOrigin = yOrigin;

  // Handle key press
  useEffect(() =>
    {
      function handleKeyDown(e: KeyboardEvent){
        if (e.key === 'ArrowLeft'){
          xOrigin++;
        }
      }
  
    document.addEventListener('keydown', handleKeyDown);
  
    return function cleanUp(){
      document.removeEventListener('keydown', handleKeyDown);
    }
  });

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
