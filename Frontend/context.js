import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();


export const useCart = () => {
  return useContext(CartContext);
};


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState(null)

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        
        const response = await axios.get(`${process.env.BACKEND_URL}/api/cart`, {headers});
        if (response.status === 200) {
          setCartItems(response.data);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    if(token!=null){
      fetchCartItems();
    }
  }, [token]);

  const getAsyncStorageData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value
    } catch (error) {
      console.log("Error retrieving data:", error);
    }
  };
  
  const storeAsyncStorageData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      setToken(value)
    } catch (error) {
      console.log("Error storing data:", error);
    }
  };

  const deleteAsyncStorageData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      setToken(null)
      console.log("Token deleted successfully.");
    } catch (error) {
      console.log("Error deleting data:", error);
    }
  };

  const addItemToCart = (item) => {
    axios.post(`${process.env.BACKEND_URL}/api/cart`, item, { headers })
      .then((response) => {
        if (response.status === 200) {
          setCartItems([...cartItems, item]);
        }
      })
      .catch((error) => {
        console.error('Error adding item to cart:', error);
      });
  };
  
  const removeItemFromCart = (item) => {
    axios.post(`${process.env.BACKEND_URL}/api/cart/${item.asin}`,null, { headers })
      .then((response) => {
        if (response.status === 200) {
            const indexToRemove = cartItems.findIndex(product => product.asin === item.asin);
            if (indexToRemove !== -1) {
              const updatedCartItems = [...cartItems];
              updatedCartItems.splice(indexToRemove, 1);
              setCartItems(updatedCartItems);
            }
        }
      })
      .catch((error) => {
        console.error('Error removing item from cart:', error);
      });
  };
  
  const deleteItemFromCart = (item) => {
    axios.delete(`${process.env.BACKEND_URL}/api/cart/${item.asin}`, { headers })
      .then((response) => {
        if (response.status === 200) {
          const updatedCartItems = cartItems.filter(product => product.asin !== item.asin);
          setCartItems(updatedCartItems);
        }
      })
      .catch((error) => {
        console.error('Error deleting item from cart:', error);
      });
  };
  
  const clearCart = () => {
    axios.post(`${process.env.BACKEND_URL}/api/clear`,null, { headers })
      .then((response) => {
        if (response.status === 200) {
          setCartItems([]);
        }
      })
      .catch((error) => {
        console.error('Error clearing cart:', error);
      });
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, clearCart, setCartItems, deleteItemFromCart, getAsyncStorageData, storeAsyncStorageData, deleteAsyncStorageData, token, setToken }}>
      {children}
    </CartContext.Provider>
  );
};
