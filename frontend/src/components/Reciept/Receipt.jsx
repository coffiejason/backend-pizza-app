import React from 'react'
import { ReceiptItem } from '..'

const Receipt = (props) => {
  return (
    <div className='reciept-container'>
      <div className="receipt">
        <header className="receipt__header">
          <p className="receipt__title">
            Order Receipt
          </p>
          <p className="receipt__date">21 December 2020</p>
        </header>
        <dl className="receipt__list">
          <ReceiptItem name={"Dough Time"} value={props.data.doughTime}/>
          <ReceiptItem name={"Topping Time"} value={props.data.toppingTime}/>
          <ReceiptItem name={"Oven Time"} value={props.data.ovenTime}/>
          <ReceiptItem name={"Walking Time"} value={props.data.walkingDistance}/>
          <ReceiptItem total={true} value={props.data.totalTime} />
        </dl>
      </div>

    </div>
  )
}

export default Receipt