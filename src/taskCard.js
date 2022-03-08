import './taskCard.css'
import React from 'react'

function taskCard(props) {
  return (
    <div className='card-container'>
        <div className='content'>
        <h3>{props.description}</h3>
        <p>deadline {props.date}</p>
        </div>
        <div className='actions'>
            
        </div>
    </div>
  )
}

export default taskCard