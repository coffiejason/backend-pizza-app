import React from 'react'
import { useState } from 'react'

const Pizza = (props) => {

  const [checked,setChecked] = useState(false)

  const handleChecked = (e) =>{
    props.choose({key:props.id, checked:e.target.checked})
  }


  
  return (
    <div className='card-container' onClick={handleChecked}>
        <input type={'radio'} name={'select_a_pizza'} onChange={handleChecked} />
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