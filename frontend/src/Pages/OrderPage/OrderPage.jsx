import React,{useState} from 'react'
import { Header, Pizza } from '../../components'
import { json, useNavigate } from 'react-router-dom'

let toppings = [
    {
        key: 1,
        name: "Pizza Neapolitan",
        img: "https://www.jotform.com/uploads/LaurelWood/form_files/pizza-assortment-set_1284-20110.jpg",
        toppingsarr: ["Cheese", "Pear", "Mushrooms"],
        toppings: "Cheese, Pear, Mushrooms"
    },
    {
        key: 2,
        name: "Pizza Pepperoni",
        img: "https://www.jotform.com/uploads/LaurelWood/form_files/pizza-assortment-set_1284-20110%2520copy%25202.jpg",
        toppingsarr: ["Cheese", "Pear", "Mushrooms"],
        toppings: "Cheese, Pear, Mushrooms"

    },
    {
        key: 3,
        name: "Pizza Mare e Monti",
        img: "https://www.jotform.com/uploads/LaurelWood/form_files/pizza-assortment-set_1284-20110%2520copy.jpg",
        toppingsarr: ["Cheese", "Pear", "Mushrooms"],
        toppings: "Cheese, Pear, Mushrooms"
    },
    {
        key: 4,
        name: "Pizza Mare e Monti",
        img: "https://www.jotform.com/uploads/LaurelWood/form_files/slices-pizza_23-2147517737%20copy%204.jpg",
        toppingsarr: ["Cheese", "Pear", "Mushrooms"],
        toppings: "Cheese, Pear, Mushrooms"
    },
]



const OrderPage = () => {

    const [msg,setMsg] = useState('PLACE AN ORDER');
    const navigate = useNavigate();
    const set1 = [];

    const handleChoose = (val) =>{
        //const a = toppings.find(item => item.key === val.key)
        //set1.add(val.key)

        val.checked ? set1.push(val.key) : set1.pop(val.key)
        console.log(val)
        console.log(set1)
    }

    const handleClick = () => {
        let orderList = []

        set1.forEach((num)=>{
            const a = toppings.find(item => item.key === num)
            const b = {name: a.name, toppings: a.toppingsarr}
            orderList.push(b)
        })

        console.log(orderList)
        
        let raw = JSON.stringify(orderList[0]);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: raw
        };

        if(orderList.length != 0){
            setMsg('SENDING YOUR ORDER')
            
            fetch('http://localhost:3600/orders', requestOptions)
            .then(response => response.json())
            .then(response =>{
                setMsg('PLACE AN ORDER');
                console.log(response.id[0])
                sessionStorage.setItem("orderId",response.id)
                navigate("/status",);
            })
            .catch((err)=>{
                setMsg('AN ERROR OCCURRED')
                //alert('ENSURE THE SERVER IS RUNNING');

                setTimeout(()=>{
                    
                    setMsg('PLACE AN ORDER');
                    alert('ENSURE THE SERVER IS RUNNING');
                },5000)
            })

        }
        else{
            alert('Select at least on pizza')
        }
    }

    return (
        <>
            <Header />
            <>
                <label>Place an Order </label>
                <div>
                    {
                        toppings.map((topping) => (
                            <Pizza key={topping.key} id={topping.key} image={topping.img} flavor={topping.name} toppings={topping.toppings} choose={handleChoose}/>
                        ))
                    }
                </div>
                <div>
                    <button className="primary-button" onClick={handleClick}>
                        {msg}
                    </button>
                </div>
                <label className='track-order-text' onClick={()=>{navigate("/status")}}>Track an Order</label>
            </>
        </>
    )
}

export default OrderPage