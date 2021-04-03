import React, { useState } from 'react';
import './Buttons.css';

let variableOffset = 0;

function Buttons(props) {
    const [buttonPrevious, toggleButtonPrevious] = useState(true)
    const [buttonNext, toggleButtonNext] = useState(false)

    
    
    function handleClick(e) {
      if(props.name === 'Volgende pagina') {
        variableOffset += 20;
        // console.log(variableOffset);
        props.changeOffset(variableOffset);
      } else if (props.name === 'Vorige pagina') {
        variableOffset -= 20;
        // console.log(variableOffset);
        props.changeOffset(variableOffset);

      }

    }

    if(props.name === 'Vorige pagina' && buttonPrevious){
    return (
      <div>
        <button className="button"disabled>{props.name}</button> 
      </div>
      );
    } else if (props.name === 'Volgende pagina' && buttonNext){
      return (
      <div>
        <button className="button"disabled>{props.name}</button> 
      </div>
    );
    } return (
      <div>
        <button className="button" onClick={handleClick}>{props.name}</button>
      </div>
    );
}

export default Buttons;