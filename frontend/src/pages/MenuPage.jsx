

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const MenuPage = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]); 
  const [selectedItems, setSelectedItems] = useState([]); 
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false);

  // Fetch menu items from the backend
  useEffect(() => {
    const controller = new AbortController();
    const fetchMenu = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5002/api/menu", {
          signal: controller.signal
        });
        setMenu(response.data);
        setError('');
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError('Could not load menu. Try refreshing.');
          console.error("Error fetching menu:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();

    return () => controller.abort(); // Cleanup to avoid memory leaks
  }, []); // Fetch menu only once when the component mounts

  const handleSelectItem = (item) => {
    setSelectedItems(prevItems => {
      const exists = prevItems.find(orderItem => orderItem._id === item._id);
      if (exists) {
        return prevItems.filter(orderItem => orderItem._id !== item._id); // Remove item if it exists
      } else {
        return [...prevItems, item]; // Add item if it's not selected
      }
    });
  };

  // Proceed to NewOrder page with selected items
  const proceedToNewOrder = () => {
    if (selectedItems.length === 0) {
      setError('Please select at least one item');
      return;
    }
    navigate('/orders/new', { state: { addedItems: selectedItems } });
  };

  const formatPrice = (price) => {
    return `৳ ${new Intl.NumberFormat('en-BD', { minimumFractionDigits: 2 }).format(price)}`;
  };

  return (
    <div className="min-h-screen bg-rose-50">
      <Navbar />
      <div className="container mx-auto p-4">

        <h1 className="text-2xl font-bold mb-6">Menu</h1>

        {/* Error message */}
        {error && <div className="bg-red-100 p-4 rounded mb-4 text-red-800">{error}</div>}

        {/* Loading state */}
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rose-500"></div>
            <p className="mt-2 text-gray-600">Loading menu...</p>
          </div>
        ) : (
          <>
            {/* Menu items display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {menu.map((item) => (
                <div
                  key={item._id}
                  className={`bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer ${
                    selectedItems.some(selectedItem => selectedItem._id === item._id) 
                      ? 'bg-green-300' // Change color when selected
                      : 'hover:bg-rose-200'
                  }`}
                  onClick={() => handleSelectItem(item)}
                >
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                  <p className="text-gray-800 font-bold mt-4">
                    {formatPrice(item.price)}
                  </p>
                </div>
              ))}
            </div>

            {/* Button to proceed to NewOrder page */}
            <div className="mt-6 text-center">
              <button
                onClick={proceedToNewOrder}
                disabled={selectedItems.length === 0}
                className={`px-6 py-3 rounded-lg ${selectedItems.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-rose-500 hover:bg-rose-600 text-white'}`}
              >
                {selectedItems.length > 0
                  ? `Proceed with ${selectedItems.length} items`
                  : 'Select items to continue'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
