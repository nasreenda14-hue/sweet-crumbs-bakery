import React, { useEffect, useState } from "react";
import axios from "axios";


function OrderTable() {
    const [orders, setOrders] = useState([]);

      useEffect(() => {
    axios

      .get(`${import.meta.env.VITE_API_URL}/api/v1/orders`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleStatusChange = async (id, status) => {
  try {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/v1/orders/${id}/status`,
      { status }
    );

    
    setOrders((prev) =>
      prev.map((order) =>
        order._id === id ? { ...order, status } : order
      )
    );

  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl shadow-md">
        
        
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th className="px-4 py-3 text-left">Order No</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Phone</th>
            <th className="px-4 py-3 text-left">Product</th>
            <th className="px-4 py-3 text-left">Quantity</th>
            <th className="px-4 py-3 text-left">Message</th>
            <th className="px-4 py-3 text-left">Status</th>
          </tr>
        </thead>

       
        <tbody className="text-gray-700 text-sm">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={order._id || index} className="border-b">
                
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{order.name}</td>
                <td className="px-4 py-3">{order.phone}</td>
                <td className="px-4 py-3">{order.product}</td>
                <td className="px-4 py-3">{order.quantity}</td>
                <td className="px-4 py-3">{order.message}</td>

             
                <td>
          <select
            value={order.status}
            onChange={(e) =>
              handleStatusChange(order._id, e.target.value)
            }
            className="border p-1"
          >
            <option value="pending">Pending</option>
            <option value="prepared">Prepared</option>
            <option value="delivered">Delivered</option>
            <option value="cancel">Cancel</option>
          </select>
        </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No Orders Found
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
}

export default OrderTable;