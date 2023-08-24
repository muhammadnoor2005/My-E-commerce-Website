import Image from "next/image";
import { getProducts } from "@/src/services/users";
import { useRouter } from "next/router";
import {LiaStarSolid} from "react-icons/lia";
import {LiaStar} from "react-icons/lia"
import { Button } from "antd";
import ProductDetailPageHeader from "@/src/components/ProductDetailPageHeader/ProductDetailPageHeader";
import { addItem } from "@/src/services/cart";
import { useState } from "react";

export default function App(props){
    const [stateVar,stateFunc] = useState(0)
    const {data} = props;
    const router = useRouter();
    const {productId} = router.query;
    const product = data.find(product=>product.id === Number(productId));
    const updatedCheck = ()=>{
        stateFunc(prevState=>prevState+1)
    }
    return(
        <div>
            <div style={{marginBottom:"70px"}}>
                <ProductDetailPageHeader props={stateVar}/>
            </div>

            <div>
                <h1 style={{marginLeft:"2%"}}>{product.name}</h1>

                <div className="productImgDiv">
                    <Image src={product.imageSrc} height={500} width={450} alt={product.imageAlt}/>
                </div>
            
                <div className="productDescDiv">
                    <div className="productHighlightsDiv">
                        <h1>Description</h1>

                        <span>The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.</span>
                        <br/><br/>

                        <span style={{fontWeight:"500"}}>Highlights</span>

                        <ul style={{color:"rgb(53, 53, 63)",fontSize:"14px"}}>
                            <li>Hand cut and sewn locally</li>
                            <li>Dyed with our proprietary colors</li>
                            <li>Pre-washed & pre-shrunk</li>
                            <li>Ultra-soft 100% cotton</li>
                        </ul>
                        <br/>

                        <span style={{fontWeight:"500"}}>Details</span>
                        <br/>

                        <span style={{fontSize:"14px"}}>The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release</span>
                    </div>

                    <div className="productPriceColorDiv">
                        <span style={{fontSize:"30px"}}>${product.price}</span>
                        <br/>

                        <span>
                            <LiaStarSolid/>
                            <LiaStarSolid/>
                            <LiaStarSolid/>
                            <LiaStar/>
                            <LiaStar/>
                            <p style={{color:"blue"}}>20 reviews</p>
                        </span>

                        <p style={{fontWeight:500}}>Colors</p>

                        <div style={{display:"flex",justifyContent:"space-between",maxWidth:"30%"}}>
                            <div style={{height:"30px",width:"30px",borderRadius:"50%",backgroundColor:"lightBlue",cursor: "pointer"}}></div>
                            <div style={{height:"30px",width:"30px",borderRadius:"50%",backgroundColor:"black",cursor: "pointer"}}></div>
                            <div style={{height:"30px",width:"30px",borderRadius:"50%",backgroundColor:"lightGreen",cursor: "pointer"}}></div>
                        </div>
                        <br/>

                        <p style={{fontWeight:500}}>Sizes</p>

                        <div style={{display:"flex"}}>
                            <div className="productSizes">S</div>
                            <div className="productSizes">M</div>
                            <div className="productSizes">L</div>
                            <div className="productSizes">XL</div>
                            <div className="productSizes">XXL</div>
                        </div>
                        
                        <br/>
                        <Button type="primary" style={{backgroundColor:"rgb(13, 78, 134)",minWidth:"90%",height:"45px",fontSize:"16px"}} onClick={()=>{addItem(product);updatedCheck()}}>Add to cart</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export async function getServerSideProps(){
    const data = getProducts();
    return{
      props:{
        data:data
      }
    }
}