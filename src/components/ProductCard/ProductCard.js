import React from 'react';
import { Card } from 'antd';
import Image from 'next/image';
const { Meta } = Card;
import Link from 'next/link';

export default function ProductCard({props}) {
    const products = props.map((data)=>{
        return(
          <Link key={data.id} href={`home/product/${data.id}`} className='productsCard'>
            <Card 
              hoverable
              cover={<Image src={data.imageSrc} width={170} height={180} alt={data.imageAlt}/>}
            >
              <Meta title={data.name} description={`$${data.price}`} />
            </Card>
          </Link>
        )
    });
    
    return(
      <div className='products'>{products}</div>
    )
};
