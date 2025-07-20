// import React from 'react'

// const EditOrder = () => {
//   return (
//     <div>EditOrder</div>
//   )
// }

// export default EditOrder



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import { Trash2 } from "lucide-react";

// const EditOrder = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [order, setOrder] = useState(null);
//   const [status, setStatus] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const res = await axios.get(`/api/orders/${id}`);
//         setOrder(res.data);
//         setStatus(res.data.status);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch order");
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [id]);

//   const handleUpdateStatus = async () => {
//     try {
//       await axios.put(`/api/orders/${id}/status`, { status });
//       alert("Order status updated!");
//       navigate("/orders");
//     } catch (err) {
//       alert("Failed to update order");
//     }
//   };

//   const handleCancelOrder = async () => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to cancel this order?"
//     );
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`/api/orders/${id}`);
//       alert("Order cancelled successfully!");
//       navigate("/orders");
//     } catch (err) {
//       alert("Failed to cancel order");
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;
//   if (!order) return <p>No order data found.</p>;

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
//         <h2 className="text-2xl font-bold mb-4">Edit Order #{id}</h2>

//         <div className="mb-4">
//           <label className="font-semibold">Table Number:</label>
//           <div className="p-2 border rounded">
//             {order?.table?.number ?? "Unknown"}
//           </div>
//         </div>

//         <div className="mb-4">
//           <label className="font-semibold">Items:</label>
//           {order?.items?.map((item) => (
//             <div key={item._id} className="p-2 border rounded mb-2">
//               <p>
//                 <strong>Name:</strong> {item.name}
//               </p>
//               <p>
//                 <strong>Quantity:</strong> {item.quantity}
//               </p>
//               <p>
//                 <strong>Notes:</strong> {item.notes}
//               </p>
//               <p>
//                 <strong>Category:</strong> {item.category}
//               </p>
//             </div>
//           ))}
//         </div>

//         <div className="mb-4">
//           <label htmlFor="status" className="font-semibold block mb-1">
//             Status:
//           </label>
//           <select
//             id="status"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             className="p-2 border rounded w-full"
//           >
//             <option value="pending">Pending</option>
//             <option value="preparing">Preparing</option>
//             <option value="served">Served</option>
//           </select>
//         </div>

//         <div className="flex gap-4">
//           <button
//             onClick={handleUpdateStatus}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
//           >
//             Update Status
//           </button>

//           <button
//             onClick={handleCancelOrder}
//             className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2"
//           >
//             <Trash2 size={18} />
//             Cancel Order
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EditOrder;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Trash2 } from "lucide-react";

const EditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:5002/api/orders/${id}`);
        setOrder(res.data);
        setStatus(res.data.status);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch order");
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleUpdateStatus = async () => {
    try {
      await axios.put(`http://localhost:5002/api/orders/${id}/status`, { status });
      alert("Order status updated!");
      navigate("/orders");
    } catch (err) {
      console.error("Update failed:", err.response ? err.response.data : err.message);
      alert("Failed to update order");
    }
  };

  const handleCancelOrder = async () => {
    const confirmDelete = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5002/api/orders/${id}`);
      alert("Order cancelled successfully!");
      navigate("/orders");
    } catch (err) {
      console.error("Cancel failed:", err.response ? err.response.data : err.message);
      alert("Failed to cancel order");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!order) return <p>No order data found.</p>;

  return (
    <>
      <Navbar />

      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Edit Order #{id}</h2>

        <div className="mb-4">
          <label className="font-semibold">Table Number:</label>
          <div className="p-2 border rounded">
            {order?.table?.number ?? "Unknown"}
          </div>
        </div>

        <div className="mb-4">
          <label className="font-semibold">Items:</label>
          {order?.items?.map((item) => (
            <div key={item._id} className="p-2 border rounded mb-2">
              <p>
                <strong>Name:</strong> {item.name}
              </p>
              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>
              <p>
                <strong>Notes:</strong> {item.notes}
              </p>
              <p>
                <strong>Category:</strong> {item.category}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="font-semibold block mb-1">
            Status:
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="served">Served</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleUpdateStatus}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          >
            Update Status
          </button>

          <button
            onClick={handleCancelOrder}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2"
          >
            <Trash2 size={18} />
            Cancel Order
          </button>
        </div>
      </div>
    </>
  );
};

export default EditOrder;


