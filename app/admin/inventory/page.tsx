'use client';

import { useEffect, useState } from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function InventoryPage() {
  const [catalogueProducts, setCatalogueProducts] = useState([]);
  const [inventoryProducts, setInventoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const [catalogueRes, inventoryRes] = await Promise.all([
        fetch('/api/admin/products?status=catalogue'),
        fetch('/api/admin/products?status=inventory'),
      ]);

      const catalogueData = await catalogueRes.json();
      const inventoryData = await inventoryRes.json();

      setCatalogueProducts(catalogueData.products || []);
      setInventoryProducts(inventoryData.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const promoteToInventory = async (product: any) => {
    try {
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: product._id,
          status: 'inventory',
          stockLevel: 0,
        }),
      });

      if (!res.ok) throw new Error('Failed to promote product');

      toast.success('Product promoted to inventory');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to promote product');
    }
  };

  const demoteToCatalogue = async (product: any) => {
    try {
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: product._id,
          status: 'catalogue',
        }),
      });

      if (!res.ok) throw new Error('Failed to demote product');

      toast.success('Product moved to catalogue');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to demote product');
    }
  };

  const updateStock = async (productId: string, newStock: number) => {
    if (newStock < 0) return;

    try {
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: productId,
          stockLevel: newStock,
        }),
      });

      if (!res.ok) throw new Error('Failed to update stock');

      toast.success('Stock updated');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to update stock');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Inventory Management
      </h1>

      {/* Catalogue Products - Ready to Promote */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Catalogue Products
          <span className="text-sm font-normal text-gray-500 ml-2">
            (Ready to promote to inventory)
          </span>
        </h2>

        {catalogueProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
            No products in catalogue
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {catalogueProducts.map((product: any) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {product.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      ₹{product.ourPrice}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => promoteToInventory(product)}
                        className="flex items-center space-x-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                      >
                        <FiArrowUp />
                        <span>Promote to Inventory</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inventory Products - Active Stock */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Inventory Products
          <span className="text-sm font-normal text-gray-500 ml-2">
            (Active stock)
          </span>
        </h2>

        {inventoryProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
            No products in inventory
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Stock Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inventoryProducts.map((product: any) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {product.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      ₹{product.ourPrice}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            updateStock(product._id, product.stockLevel - 10)
                          }
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                        >
                          -10
                        </button>
                        <input
                          type="number"
                          value={product.stockLevel}
                          onChange={(e) =>
                            updateStock(product._id, parseInt(e.target.value))
                          }
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                        />
                        <button
                          onClick={() =>
                            updateStock(product._id, product.stockLevel + 10)
                          }
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                        >
                          +10
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {product.stockLevel <= product.lowStockThreshold ? (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          Low Stock
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          In Stock
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => demoteToCatalogue(product)}
                        className="flex items-center space-x-2 px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
                      >
                        <FiArrowDown />
                        <span>Move to Catalogue</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

