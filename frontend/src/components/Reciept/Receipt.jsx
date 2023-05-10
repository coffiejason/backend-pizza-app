import React from 'react'
import { ReceiptItem } from '..'

const Receipt = (props) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const todayDate = `${year}-${month}-${day}`;

  return (
    <div className='reciept-container'>
      <div className="receipt">
        <header className="receipt__header">
          <p className="receipt__title">
            Order Receipt
          </p>
          <p className="receipt__date">{`${day}-${month}-${year}`}</p>
        </header>
        <dl className="receipt__list">
          <ReceiptItem name={"Dough Time"} value={console.log(props.data.doughTime)}/>
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