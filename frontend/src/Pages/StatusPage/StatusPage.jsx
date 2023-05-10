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

        if(sessionStorage.getItem("orderId") !== null){
            //console.log("we",location.state[0])
            setOrderNumber(sessionStorage.getItem("orderId"))
            orderNumber ? getData(sessionStorage.getItem("orderId")) : getData(sessionStorage.getItem("orderId"))

            sessionStorage.removeItem("orderId");
        }
    },[])

    const handleInput = (e) => {
        sessionStorage.removeItem("orderId");
        let inputVal = String(e.target.value)
        inputVal.length === 10 ? getData(inputVal) : setFeedBack('')
    }

    const getData = (ordernumber) => {
        orderNumber && setFeedBack('Fetching your order ...')
        console.log('tracking')
        
        setReceipt()

        

        fetch(`http://localhost:3600/orders/${ordernumber}/report`, {
            method: 'GET',
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                !result.statusCode ? setFeedBack('') : setFeedBack('Could not find that order')

                result.status === 'served' && feedBack !== 'Could not find that order' ? setReceipt(result) : retryGetData(ordernumber,result.status)
            })
            .catch(error => console.log('error', error));
    }

    const retryGetData = (ordernumber, status) =>{
        status === 'preparing' ? setTimeout(()=>{getData(ordernumber)},10000) : setFeedBack('Could not find that order');
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
            {receipt ? (<Reciept data={receipt}/>): <Processing orderNum={orderNumber} />}
        </>
    )
}

export default StatusPage