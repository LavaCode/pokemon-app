import React from 'react';

function Button( { name }) {

    function handleClick() {
        if(name === 'volgende') {
           console.log('Volgende knop')
        } else {
           console.log('Vorige knop')
        }
    }
    
    return(
        <>
        <button onClick={handleClick} buttontype="button">{name}</button>
        </>
    );
}

export default Button;