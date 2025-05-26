import userModel from "../models/userModel.js";

//add products to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size, gender } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

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
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//update  user cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, gender, quantity } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    const sizeGenderKey = `${size}_${gender}`;
    cartData[itemId][sizeGenderKey] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//get user cart data
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
