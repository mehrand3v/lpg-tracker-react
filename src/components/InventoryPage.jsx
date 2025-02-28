import React from 'react';

const InventoryPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-200 p-4 rounded-lg">
            <h2 className="text-lg font-bold">Total Cylinders</h2>
            <p className="text-2xl mt-2">500</p>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg">
            <h2 className="text-lg font-bold">Cylinders with Customers</h2>
            <p className="text-2xl mt-2">120</p>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg">
            <h2 className="text-lg font-bold">Full in Shop</h2>
            <p className="text-2xl mt-2">200</p>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg">
            <h2 className="text-lg font-bold">Empty in Shop</h2>
            <p className="text-2xl mt-2">180</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;