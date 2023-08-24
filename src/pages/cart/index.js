import { Image } from "antd";
import { useEffect, useState } from "react";
import { addItem,decreaseItemCount,deleteItem } from "@/src/services/cart";
import {Button} from "antd";
import CartPageHeader from "@/src/components/CartPageHeader/CartPageHeader";
import Link from "next/link";

export default function Cart (){
    const [items,stateFunc] = useState([]);
    const [count,setCount] = useState(0);

    let empty = false;

    const update = ()=>{
        setCount(prevState => prevState + 1);
    }
    useEffect(()=>{
        const getItems = localStorage.getItem("items")
        if (getItems){
            stateFunc(JSON.parse(getItems));
        }
    },[count]);

    if (items.length === 0){
        empty = true
    }

    const cartItems = items.map((p)=>{
        return(
            <div className="oneCartItem" key={p.id}>
                <Image src={p.imageSrc} alt={p.imageAlt} className="cartImage"/>
                <div className="oneCartItemFirstChild">
                    <div className="cartNameDiv">

                        <Link href={`home/product/${p.id}`} style={{textDecoration:"none",color:"black"}}>
                            <span className="cartHeading">{p.name}</span><br/>
                        </Link>

                        <div style={{
                            fontSize:"11px",
                            color:"gray"
                        }}>Hand cut and sewn locally ultra-soft 100% cotton Pre-washed & pre-shrunk
                        <br/><br/>
                        
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                                <span>
                                    <b>Color : {p.color}</b>
                                </span>

                                <span style={{
                                    color:"red",
                                    cursor:"pointer"
                                }} onClick={()=>{deleteItem(p);update()}}>Remove</span>
                            </div>
                        </div>

                    </div>
                    <div className="cartItemPrice" >
                        <span style={{fontWeight:"500"}}>{`$${p.price}`}</span><br/>
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                            <span>Quantity</span>
                                
                            <div style={{
                                display:"flex",
                                justifyContent:"space-between",
                                minWidth:"100%",
                                cursor:"pointer",
                                
                            }}>
                                <span onClick={()=>{ decreaseItemCount(p);update()}}>-</span>
                                <span><b>{p.count}</b></span>
                                <span onClick={()=>{addItem(p);update()}}>+</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    let amount = 0
    items.forEach((item)=>{
        if (item.cartSum)
            amount += item.cartSum; 
        else{
            amount += item.price; 
        }
    })
    return(
        <div>

            <div  style={{marginBottom:"70px"}}>
                <CartPageHeader/>
           </div>

            <div className="cartPageAmount">
                <span className="amountSpan">{items.length} item(s) in cart</span>
                <span className="amountSpan">Total Amount <span style={{color:"GrayText"}}>${amount?amount+".00":"0.00"}</span></span>
            </div>

            <div className={empty?"showZeroItem":"hideZeroItem"}>
                <h1>Cart is empty</h1>
            </div>

            <div className={empty?"cartMainDivHide":"cartMainDiv"}>
                <div className="cartItemsDiv">
                    {cartItems}
                </div>

                <div className="checkoutDiv">
                    <div style={{fontWeight:"600",fontSize:"22px",textAlign:"center"}}>Summary</div>
                    <br/>

                    <div>
                        <div className="checkoutDivPrice">
                            <span>Subtotal</span>
                            <span className="checkoutSpan">${amount?amount+".00":"0.00"}</span>
                        </div>
                        <hr/>
                        <div className="checkoutDivPrice"> 
                            <span>Delivery fee</span>
                            <span className="checkoutSpan">${amount?"8.00":"0.00"}</span>
                        </div>
                        <hr/>
                        <div className="checkoutDivPrice">
                            <span>Tax</span>
                            <span className="checkoutSpan">${amount?"1.00":"0.00"}</span>
                        </div>
                        <hr/>
                        <div className="checkoutDivPrice">
                            <span style={{fontWeight:"600"}}>Total</span>
                            <span style={{fontWeight:"600"}}>${amount?amount+9+".00":"0.00"}</span>
                        </div>
                    </div>
                    <br/>
                    <Button type="primary" style={{
                            backgroundColor:"rgb(13, 78, 134)",
                            minWidth:"90%",
                            height:"43px",
                            fontSize:"16px"
                        }} >Checkout</Button>
                </div>
           </div>
        </div>
    )
}