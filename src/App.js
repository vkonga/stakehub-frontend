
import OrderForm from './components/OrderForm';
import OrderTables from './components/OrderTables';

import './App.css'

const App = () => {
  return (
    <div className="container">
      <h2 className="text-center">Order Management System</h2>
      <OrderForm fetchOrders={() => window.location.reload()} />
      
      <OrderTables />
    </div>
  );
};

export default App;
