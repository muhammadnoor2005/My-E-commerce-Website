
export default function Home() {
  return(
    <div>
      Loading...
    </div>
  )
}
export async function getServerSideProps(){
  return{
    redirect:{
      destination:"/auth/signup",
      permanent:true,
    }
  }
}
