import  { useState } from 'react';

import './index.css';

const OrderForm = ({ fetchOrders }) => {
  const [orderType, setOrderType] = useState('buy');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const orderData = orderType === 'buy'
      ? { buyer_qty: quantity, buyer_price: price }
      : { seller_qty: quantity, seller_price: price };

    try {
      const response = await fetch('https://stakehub-backend.onrender.com/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Order processed successfully!');
        fetchOrders(); // Refresh the orders table after submitting a new order
      } else {
        alert(`Failed to place order: ${data.error}`);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order.');
    }
  };

  return (
    <form className='form-container' onSubmit={onSubmitForm}>
      <label>
        Order Type:
        <select className='order-type' name="orderType" value={orderType} onChange={(e) => setOrderType(e.target.value)}>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
      </label>
      <br />
      <label>
        Quantity:
        <input 
          className='order-type'
          type="number" 
          name="quantity" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          required 
        />
      </label>
      <br />
      <label>
        Price:
        <input 
          className='order-type'
          type="number" 
          name="price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
        />
      </label>
      <br />
      <button className='button' type="submit">Place Order</button>
    </form>
  );
};

export default OrderForm;
