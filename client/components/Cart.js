import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Cart = () => {
  const [cart, setCart] = useState([]);

  const userId = localStorage.getItem('userId')
console.log(userId)

  useEffect(() => {
    if (userId) {
      axios.get(`/api/cart/${userId}`).then((response) => {
        setCart(response.data);

      });

    } else {
      axios.get(`/api/products/guest`).then((response) => {

        setCart(response.data);
      });
    }


  }, []);

  let mappedCart;

  if (cart) {
    mappedCart = cart.map((product) => {
      return (
        <div key={product.id} className="cart-items">
          <div className="image-box">
            <img className="cart-images" src={product.imageUrl}></img>
          </div>
          <div className="about">
            <h1 className="title">{product.name}</h1>
          </div>
          <div className = 'cart-counter'>
            <div className = 'cart-counter-btn'>-</div>
            <div className = 'cart-count'>{product.quantity}</div>
            <div className = 'cart-counter-btn'>+</div>
          </div>
          <div className = 'cart-prices'></div>
        </div>
      );
    });
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h3 className="cart-title">Shopping Cart</h3>
        <h5 className="cart-action">Remove all</h5>
      </div>

      <div>{mappedCart}</div>
      <h2>total</h2>
      <button>
        <h3>Purchase</h3>
      </button>
    </div>
  );
};

export default Cart;

// //<div class=”Header”>
//  <h3 class=”Heading”>Shopping Cart</h3>
//  <h5 class=”Action”>Remove all</h5>
//  </div>
