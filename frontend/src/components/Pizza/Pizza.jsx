import React from 'react'
import { useState } from 'react'

const Pizza = (props) => {

  const handleChecked = (e) =>{
    props.choose({key:props.id, checked:e.target.checked})
  }
  
  return (
    <div className='card-container' >
        <input type={'checkbox'} onChange={handleChecked}/>
        <div className='img-div'>
            <img src={props.image}/>
        </div>
        <div className='text-div'>
            <h3>{props.flavor}</h3>
            <p>{props.toppings}</p>
        </div>
    </div>
  )
}

export default Pizza