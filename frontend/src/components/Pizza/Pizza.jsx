import React from 'react'
import { useState } from 'react'

const Pizza = (props) => {
  const [checked,setChecked] = useState(false);
  
  return (
    <div className='card-container' >
        <input type={'checkbox'} />
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