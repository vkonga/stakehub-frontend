import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader'; 
import './index.css';

const OrderTables = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(true); 

  const fetchOrders = async () => {
    try {
      const pendingResponse = await fetch('https://stakehub-backend.onrender.com/pending-orders/');
      const completedResponse = await fetch('https://stakehub-backend.onrender.com/completed-orders/');

      if (!pendingResponse.ok || !completedResponse.ok) {
        throw new Error('Error fetching orders');
      }

      const pendingData = await pendingResponse.json();
      const completedData = await completedResponse.json();

      setPendingOrders(pendingData);
      setCompletedOrders(completedData);
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderPendingOrders = () => (
    <table style={{ width: "80%", marginTop: "30px", marginLeft: "30px", marginRight: "20px" }}>
      <thead>
        <tr>
          <th style={{ textAlign: "center" }} colSpan={4}><h2>Pending Orders Table</h2></th>
        </tr>
        <tr>
          <th className='buyer'>Buyer Qty</th>
          <th className='buyer'>Buyer Price</th>
          <th className='seller'>Seller Price</th>
          <th className='seller'>Seller Qty</th>
        </tr>
      </thead>
      <tbody>
        {pendingOrders.map((order) => (
          <tr key={order.id}>
            <td className='buyer'>{order.buyer_qty}</td>
            <td className='buyer'>{order.buyer_price}</td>
            <td className='seller'>{order.seller_price}</td>
            <td className='seller'>{order.seller_qty}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderCompletedOrders = () => (
    <table style={{ width: "80%", marginTop: "30px", marginLeft: "30px", marginRight: "20px" }}>
      <thead>
        <tr>
          <th style={{ textAlign: "center" }} colSpan={2}><h2>Completed Orders Table</h2></th>
        </tr>
        <tr>
          <th>Price</th>
          <th>Qty</th>
        </tr>
      </thead>
      <tbody>
        {completedOrders.map((order) => (
          <tr key={order.id}>
            <td>{order.price}</td>
            <td>{order.qty}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      {loading ? ( 
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <ClipLoader color={"#123abc"} loading={loading} size={150} />
        </div>
      ) : (
        <>
          {renderPendingOrders()}
          {renderCompletedOrders()}
        </>
      )}
    </div>
  );
};

export default OrderTables;
