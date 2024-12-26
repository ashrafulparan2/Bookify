import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import React, { useState } from 'react';

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

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

// Function to show SweetAlert2 popup and dispatch addToCart
export const showAddToCartPopup = (product) => async (dispatch, getState) => {
    // Check if the item is already in the cart
    const existingItem = getState().cart.cartItems.find(item => item._id === product._id);
    const initialQuantity = existingItem ? existingItem.quantity : 1;  // Start with 0 if item isn't in cart

    Swal.fire({
        title: "Set Quantity",
        html: `
            <div class="flex justify-center items-center">
                <button id="decreaseBtn" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">-</button>
                <span id="quantity" class="mx-4 text-xl">${initialQuantity}</span>
                <button id="increaseBtn" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">+</button>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: "Add to Cart",
        confirmButtonColor: "#3085d6",
        cancelButtonText: "Cancel",
        cancelButtonColor: "#d33",
        preConfirm: () => {
            const quantity = parseInt(document.getElementById("quantity").innerText, 10);
            return quantity > 0 ? quantity : Swal.showValidationMessage("Quantity must be greater than 0");
        },
        didOpen: () => {
            let quantity = initialQuantity;
            const quantityElement = document.getElementById("quantity");
            const decreaseBtn = document.getElementById("decreaseBtn");
            const increaseBtn = document.getElementById("increaseBtn");
            const confirmButton = Swal.getConfirmButton();

            confirmButton.disabled = quantity === 0; // Disable button initially if quantity is 0

            const updateButtonState = () => {
                confirmButton.disabled = quantity === 0; // Enable only if quantity > 0
            };

            decreaseBtn.addEventListener("click", () => {
                if (quantity > 0) {
                    quantity--;
                    quantityElement.innerText = quantity;
                    updateButtonState();
                }
            });

            increaseBtn.addEventListener("click", () => {
                quantity++;
                quantityElement.innerText = quantity;
                updateButtonState();
            });
        },
    }).then((result) => {
        if (result.isConfirmed) {
            const quantity = result.value;
            dispatch(addToCart({ ...product, quantity }));

            // Show confirmation popup
            Swal.fire({
                icon: "success",
                title: "Product Added to the Cart",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    });
};


export default cartSlice.reducer;
