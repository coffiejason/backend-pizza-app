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
        //sessionStorage.get("orderId")
        if(location !== null){
            console.log("we",location.state)
            setOrderNumber(location.state)
            getData(location.state)
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
                result.status === 'served' ? setReceipt(result) : setTimeout(()=>{getData(ordernumber)},3000)
                //console.log(result)
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