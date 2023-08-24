import Menu from "../Menu/Menu";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SideMenu from "@/src/components/Nav/SideMenu/SideMenu";
import {Input} from "antd"
const {Search} = Input;
import {BiUserCircle} from "react-icons/bi";
import {LuShoppingCart} from "react-icons/lu";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home(){
    const [items,stateFunc] = useState(0);
    const router = useRouter();

    const onSearch = (value)=>{
        router.push(`/home/search/${value}`)
    }
    
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
      
    },[])
    
    return(
        <div>
            <div className="menuDiv">
                <Image src={"/images/logo.png"} width={150} height={55} className="menuImg"/>

                <Menu/>

                <Search placeholder="search" onSearch={onSearch} enterButton className="searchBox" />

                <SideMenu/>

                <Link href={"/profile/"}><BiUserCircle className="userIcon"/></Link>
                <Link href={"/cart/"}><LuShoppingCart className="cartIcon"/></Link>

                <span className="cartItemCount">{items}</span>
            </div>
        </div>
    )
}