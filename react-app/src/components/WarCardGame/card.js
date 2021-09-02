import React from 'react';
import './card.css';

function Card(props) {

    return (
        <div className="card">
           {props.suit}
        </div>
    );
}

export default Card;
