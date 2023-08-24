import {BiArrowBack} from "react-icons/bi"
import {BiUserCircle} from "react-icons/bi"
import Image from "next/image";
import Link from "next/link";
export default function(){
    return(
    <div className="headerDivProPage">
        <Link href={"/home/"}>
            <BiArrowBack style={{
            height:"30px" ,
            width:"50px",
            color:"rgb(13, 78, 134)",
            cursor: "pointer"
            }}/>
        </Link>

        <Image src={"/images/logo.png"} height={60} width={200} alt="logo"/>

        <Link href={"/profile/"}>
            <BiUserCircle style={{
            height:"30px" ,
            width:"40px",
            color:"rgb(13, 78, 134)",
            cursor: "pointer"
            }}/>
        </Link>
    </div>
    )
}