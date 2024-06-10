import { useState, useContext, createContext, useEffect } from 'react';

const CartContext =createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

 
    useEffect(() => {
        let existingCartItem = localStorage.getItem("cart");
        console.log("from cart context",existingCartItem)

        if (existingCartItem)setCart(JSON.parse(existingCartItem));
        else{
        }
      }, []);
    
    return (
    <CartContext.Provider value={[cart, setCart]} >
        {children}
    </CartContext.Provider>
    )
}

const useCart = ()=> useContext(CartContext);

export { CartProvider, useCart};