import React from 'react'

const RecieptItem = (props) => {

    return props.total === true ? (
        <div className="receipt__list-row receipt__list-row--total">
            <dt className="receipt__item">Total</dt>
            <dd className="receipt__cost">{`${props.value} seconds`}</dd>
        </div>

    ) :
        (


            <div className="receipt__list-row">
                <dt className="receipt__item">{props.name}</dt>
                <dd className="receipt__cost">{props.value}</dd>
            </div>
        )
}

export default RecieptItem