import React,{useState} from 'react'
import { Header, Pizza } from '../../components'
import { useNavigate } from 'react-router-dom'

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

    function handleClick() {

        setMsg('SENDING YOUR ORDER')
        
        let raw = JSON.stringify({
            "toppings": [
                "mushrooms",
                "pear",
                "pineapple",
                "bacon",
                "cheese",
                "dandelion"
            ]
        });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: raw
        };

        fetch('http://localhost:3600/orders', requestOptions)
            .then(response => response.json())
            .then(response =>{
                setMsg('PLACE AN ORDER');
                console.log(response.id[0])
                //sessionStorage.setItem("orderId",)
                navigate("/status",{state: response.id[0]});
            })
            .catch((err)=>{
                setMsg('AN ERROR OCCURRED')

                setTimeout(()=>{
                    setMsg('PLACE AN ORDER')
                },5000)
            })
    }

    return (
        <>
            <Header />
            <>
                <label>Place an Order</label>
                <div>
                    {
                        toppings.map((topping) => (
                            <Pizza key={topping.key} image={topping.img} flavor={topping.name} toppings={topping.toppings} />
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