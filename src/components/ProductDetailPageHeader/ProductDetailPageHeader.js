import {BiArrowBack} from "react-icons/bi"
import { useState,useEffect } from "react";
import {LuShoppingCart} from "react-icons/lu"
import Image from "next/image";
import Link from "next/link";
export default function({props}){
    const [items,stateFunc] = useState(0);
    
    useEffect(()=>{
        const getItem = localStorage.getItem("items");
        const itemsCount = JSON.parse(getItem);
        if (itemsCount){
            let cartItems = 0
            itemsCount.forEach((item)=>{
                cartItems += item.count
            })
            stateFunc(cartItems)
        }      
    },[props])

    return(
    <div className="headerDivProPage">
        <Link href={"/home"}>
            <BiArrowBack style={{
            height:"30px" ,
            width:"50px",
            color:"rgb(13, 78, 134)",
            cursor: "pointer"
            }}/>
        </Link>
        
        <Image src={"/images/logo.png"} height={60} width={200} alt="logo"/>

        <Link href={"/cart/"}>
            <LuShoppingCart style={{
            height:"30px" ,
            width:"40px",
            color:"rgb(13, 78, 134)",
            cursor: "pointer"
            }}/>
        </Link>

        <span style={{
            position:"absolute",
            right:"14vh",
            top:"2.7vh"
        }}>{items}
        </span>
    </div>
    )
}