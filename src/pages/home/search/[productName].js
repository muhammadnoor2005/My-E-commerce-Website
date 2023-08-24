import ProductDetailPageHeader from "@/src/components/ProductDetailPageHeader/ProductDetailPageHeader";
import { getProducts } from "@/src/services/users";
import { useRouter } from "next/router";
import { Card } from 'antd';
const { Meta } = Card;
import Link from 'next/link';
import Image from 'next/image';

export default function App(props){
    const {data} = props;
    const router = useRouter();
    const {productName} = router.query;

    let searchedResult = []
    data.forEach((p)=>{
        if(p.name.toLowerCase() === productName.toLowerCase()){
            searchedResult.push(p)
        }
    });

    const products = searchedResult.map((pro)=>{
        return(
            <Link key={pro.id} href={`/home/product/${pro.id}`} className='productsCard'>
            <Card 
              hoverable
              cover={<Image src={pro.imageSrc} width={170} height={180} alt={pro.imageAlt}/>}
            >
              <Meta title={pro.name} description={`$${pro.price}`} />
              
            </Card>
          </Link>
        )
    })

    return(
        <div>
            <div style={{marginBottom:"70px"}}>
                <ProductDetailPageHeader/>
            </div>

            <div style={{marginLeft:"4%",
                marginRight:"4%",
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center"}}>
                <h1>{productName}</h1>
                
                <span>{searchedResult.length} results found</span>
            </div>

            <div className='products'>
                {products}
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