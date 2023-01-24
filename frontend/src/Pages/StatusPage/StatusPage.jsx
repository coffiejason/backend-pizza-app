import React, { useState,useEffect } from 'react'
import { Header, Reciept } from '../../components'
import { useLocation } from 'react-router-dom';
import Processing from '../../components/Processing/Processing';



const StatusPage = () => {
    const [orderNumber, setOrderNumber] = useState();
    const [feedBack, setFeedBack] = useState('');
    const [receipt, setReceipt] = useState();
    const location = useLocation();

    useEffect(()=>{
        
        console.log('rendered')

        if(location !== null){
            console.log("we",location.state[0])
            setOrderNumber(location.state[0])
            orderNumber ? getData(orderNumber) : getData(location.state[0])
        }
    },[])

    const handleInput = (e) => {
        let inputVal = String(e.target.value)
        inputVal.length === 10 ? getData(inputVal) : setFeedBack('')
    }

    const getData = (ordernumber) => {
        orderNumber && setFeedBack('Fetching your order ...')
        
        setReceipt()

        

        fetch(`http://localhost:3600/orders/${ordernumber}/report`, {
            method: 'GET',
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                !result.statusCode ? setFeedBack('') : setFeedBack('Could not find that order')

                result.status === 'served' && feedBack !== 'Could not find that order' ? setReceipt(result) : setTimeout(()=>{getData(ordernumber)},10000)
            })
            .catch(error => console.log('error', error));
    }


    return (
        <>
            <Header />

            <label>Track an Order</label>
            <div className='status-container'>
                <h3>Your Order Number is:</h3>
                {orderNumber ? (<p>{orderNumber}</p>)
                :
                (<input type={'text'} placeholder={'Enter Tracking number'} maxLength={'10'}  onChange={(e) => { handleInput(e) }} />)}
                
                <p>{feedBack}</p>
                <p>{receipt && receipt.doughTime}</p>

            </div>
            {

            }
            {receipt ? (<Reciept data={receipt}/>): (<Processing />)}
        </>
    )
}

export default StatusPage