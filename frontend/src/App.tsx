import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Products from "./pages/Products"
import Cart from "./pages/Cart"
import Pdf from "./pages/Pdf"

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/pdf" element={<Pdf/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
