import ProductDetailPageHeader from "@/src/components/ProductDetailPageHeader/ProductDetailPageHeader"


export default function(){
    return(
        <div>
          <div>
            <ProductDetailPageHeader/>
          </div>
          <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            minHeight:"90vh"
          }}>
            <h1>
                Your profile page
            </h1>
          </div>
        </div>
    )
}