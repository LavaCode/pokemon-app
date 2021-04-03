import React, { useState } from 'react';
import './Buttons.css';

let variableOffset = 0;

function Buttons(props) {
    
    function handleClick(e) {
      if(props.name === 'Volgende pagina') {
        variableOffset += 20;
        props.changeOffset(variableOffset);
      } 
      else if (props.name === 'Vorige pagina') {
        variableOffset -= 20;
        props.changeOffset(variableOffset);
      } 
    }

    if(props.name === 'Vorige pagina'){
      return (
        <div>
          <button type="button" onClick={handleClick} className="navigation-button" disabled={variableOffset === 0}>{props.name}</button> 
        </div>
        );
      } else if (props.name === 'Volgende pagina'){
      return (
        <div>
          <button type="button" onClick={handleClick} className="navigation-button" disabled={variableOffset === 1100}>{props.name}</button> 
        </div>
      );
   } 
}

export default Buttons;