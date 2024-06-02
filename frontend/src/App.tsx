import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Products from "./pages/Products"

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/products" element={<Products/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App