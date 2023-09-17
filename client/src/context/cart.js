import { useState,  useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({children}) => {
    const [Cart, setCart] = useState([]);

    useEffect(()=>{
        let existingCartItem = localStorage.getItem("cart");
        if(existingCartItem) setCart(JSON.parse(existingCartItem));
    },[])
    return (
        <CartContext.Provider value = {[Cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
} 

//custom hook
const useCart = () => useContext(CartContext);

export {useCart,CartProvider};