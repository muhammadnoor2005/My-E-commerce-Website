import '../styles/globals.css'
import "../styles/LoginForm.css"
import "../styles/SignupForm.css"
import "../styles/Nav.css"
import "../styles/SideMenu.css"
import "../styles/FrontMidd.css"
import "../styles/ProductCard.css"
import "../styles/SubProducts.css"
import "../styles/ProductDetail.css"
import "../styles/Cart.css"

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  )
} 
