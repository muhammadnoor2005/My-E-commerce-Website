import Nav from "@/src/components/Nav/Nav";
import FrontMidd from "@/src/components/FrontMidd/FrontMidd";
import { getSession } from "next-auth/react";
import ProductCard from "@/src/components/ProductCard/ProductCard";
import { getProducts } from "@/src/services/users";
import SubProducts from "@/src/components/SubProducts/SubProducts";
import { Divider } from "antd";

import ScrollContext from "@/src/context/ScrollContext/ScrollContext";
export default function Home(props){
  const {data} = props;

  const scrollDiv = (key)=>{
    const k = document.getElementById(key);
    window.scrollTo({top: k.offsetTop,behavior:"smooth",block:"start"});
  }

    return(
        <div>
          <ScrollContext.Provider value={{
            scrollDiv
          }}>
            <div>
                <Nav/>
            </div>
            
            <div id= "home">
                <FrontMidd/>
            </div>
            
            <br/>

            <Divider style={{color:"gray"}} id="sale">SALE</Divider>

            <div >
              <SubProducts />
            </div>
            
            <Divider style={{color:"gray"}}  id="trending">TRENDING</Divider>

            <div>
              <ProductCard props={data}/>
            </div>
          </ScrollContext.Provider>
        </div>
    )
}

export async function getServerSideProps({req}){
    const session = await getSession({req});
    if (!session){
      return{
        redirect:{
          destination:"/auth/login/",
          permanent:false,
        }
      }
    }
    const data = getProducts();
    return{
      props:{
        data:data
      }
    }
}