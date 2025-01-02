import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// Initial cart state
const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = { ...action.payload };
            const existingItem = state.cartItems.find(item => item._id === newItem._id);

            if (existingItem) {
                existingItem.quantity = newItem.quantity;
            } else {
                state.cartItems.push(newItem);
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
        increaseQuantity: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (existingItem) existingItem.quantity += 1;
        },
        decreaseQuantity: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (existingItem && existingItem.quantity > 1) existingItem.quantity -= 1;
        },
    },
});

// Export actions
export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

// Function to show the SweetAlert2 popup and add to the cart
export const showAddToCartPopup = (product) => async (dispatch, getState) => {
    // Check if the product already exists in the cart
    const existingItem = getState().cart.cartItems.find(item => item._id === product._id);

    if (existingItem) {
        // If exists, increase the quantity by 1
        dispatch(increaseQuantity({ _id: product._id }));
    } else {
        // If doesn't exist, add the product with quantity 1
        dispatch(addToCart({ ...product, quantity: 1 }));
    }

    // Show confirmation popup
    Swal.fire({
        icon: "success",
        title: "Book added to the cart successfully!",
        showConfirmButton: false,
        timer: 1500,
    });
};

export default cartSlice.reducer;
