import { createReducer } from "@reduxjs/toolkit";
import { addToCart, emptyCart, removeFromCart } from "store/actionCreator";

const initialState = {
  cartItems: [],
  totalPrice: 0.0,
};

const cartReducer = createReducer(initialState, (builder) => {
  builder.addCase(addToCart, (state, { payload: item }) => {
    //check if item already exists
    let foundItem = state.cartItems.find((product) => product._id === item._id);
    if (foundItem) {
      // increase it's quantity
      foundItem.quantity += 1;
      state.totalPrice += parseFloat(foundItem.price);
    } else {
      foundItem = { ...item };
      foundItem.quantity = 1;
      state.cartItems.push(foundItem);
      state.totalPrice += parseFloat(foundItem.price);
    }
  });
  builder.addCase(removeFromCart, (state, { payload: item, type }) => {
    // console.log(type);
    //check if item already exists
    let foundItem = findItemHelper(item, state);
    if (!foundItem) return;
    // decrease it's quantity
    foundItem.quantity -= 1;
    state.totalPrice -= parseFloat(foundItem.price);
    if (foundItem.quantity === 0) {
      //it means it sould be removed
      state.cartItems = state.cartItems.filter(
        (doc) => doc._id !== foundItem._id
      );
      // console.log(foundItem.quantity);
    }
  });
  builder.addCase(emptyCart, (state) => {
    state.cartItems = [];
    state.totalPrice = 0;
  });
});

function findItemHelper(item, state) {
  return state.cartItems.find((product) => product._id === item._id);
}
export const selectCartItemsLength = (state) => state.cart.cartItems.length;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectTotalPricce = (state) => state.cart.totalPrice;

export default cartReducer;
