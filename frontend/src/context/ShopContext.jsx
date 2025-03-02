import { products } from "../assets/assets";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // useNavigate hook

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    // Add item to cart
    let cartData = structuredClone(cartItems); // Create a deep copy of the cart data (create an object)

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1; // add 1 to the quantity
      } else {
        cartData[itemId][size] = 1; // create a new entry
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData); // save the updated cart data
  };

  

  const getCartCount = () => {
    let totalCount = 0;
    for(const items in cartItems){
        for(const item in cartItems[items]){
            try {
                if (cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item];
                }
            } catch (error) {
                
            }
        }
    }
    return totalCount;
}

{/* UPDATE THE QUANTITY OF THE CART - CAN DELETE OR ADD */}
const updateQuantity = async ( itemId, size, quantity) => { // for this itemId and size and quantity update the quantity in the cart

    let cartData = structuredClone(cartItems); // Create a deep copy of the cart data (create an object)

    cartData[itemId][size] = quantity; 
    setCartItems(cartData); // save the updated cart data
}


const getCartAmount =  () => {
  let totalAmount = 0;
  for(const items in cartItems){
    let itemInfo = products.find((product) => product._id === items); // get the item info from the products array
    for (const item in cartItems[items]){
      try {
        if (cartItems[items][item] > 0) {
          totalAmount += itemInfo.price * cartItems[items][item];
        }
      } catch (error) {

      }
    }  
  }
  return totalAmount;
}



{/* Need to be bellow every other component */}
const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate
  };


  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
