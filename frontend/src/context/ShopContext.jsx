import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 14;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    const local = localStorage.getItem("guest_cart");
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {
        console.error("Invalid guest_cart in localStorage");
      }
    }
    return {};
  });

  const [customProducts, setCustomProducts] = useState(() => {
    const local = localStorage.getItem("guest_customProducts");
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {
        console.error("Invalid guest_customProducts in localStorage");
      }
    }
    return {};
  });

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const addToCart = async (itemId, size, gender, customProductData = null) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    if (!gender) {
      toast.error("Select Gender");
      return;
    }

    let cartData = structuredClone(cartItems);
    const sizeGenderKey = `${size}_${gender}`;
    if (cartData[itemId]) {
      if (cartData[itemId][sizeGenderKey]) {
        cartData[itemId][sizeGenderKey] += 1;
      } else {
        cartData[itemId][sizeGenderKey] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][sizeGenderKey] = 1;
    }

    setCartItems(cartData);

    if (customProductData) {
      setCustomProducts((prev) => {
        const updated = {
          ...prev,
          [`${itemId}_${sizeGenderKey}`]: {
            _id: itemId,
            size,
            gender,
            quantity: 1,
            ...customProductData,
          },
        };
        return updated;
      });
    }

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size, gender },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.error("Error reading cart item:", error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, sizeGender, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][sizeGender] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        const [size, gender] = sizeGender.split("_");
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, gender, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      for (const sizeGenderKey in cartItems[items]) {
        try {
          const quantity = cartItems[items][sizeGenderKey];
          if (quantity > 0) {
            const itemInfo =
              products.find((product) => product._id === items) ||
              customProducts[`${items}_${sizeGenderKey}`];

            if (itemInfo) {
              totalAmount += itemInfo.price * quantity;
            }
          }
        } catch (error) {
          console.error("Error calculating cart amount:", error);
        }
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);

        const local = localStorage.getItem("guest_customProducts");
        if (local) {
          try {
            setCustomProducts(JSON.parse(local));
          } catch (e) {
            console.error("Invalid guest_customProducts in localStorage");
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (!token) {
      localStorage.setItem("guest_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, token]);

  useEffect(() => {
    localStorage.setItem(
      "guest_customProducts",
      JSON.stringify(customProducts)
    );
  }, [customProducts]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    customProducts,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
