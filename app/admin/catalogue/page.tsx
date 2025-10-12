'use client';

import { useEffect, useState } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';
import ImageUpload from '@/components/ImageUpload';

export default function CataloguePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    detailedDescription: '',
    category: '',
    images: [''],
    specifications: [{ key: '', value: '' }],
    productLinks: [
      { platform: 'amazon' as 'amazon' | 'flipkart' | 'myntra' | 'nykaa' | '1mg' | 'pharmeasy' | 'healthkart' | 'bigbasket' | 'jiomart', url: '', price: 0 },
    ],
    ourPrice: 0,
    sku: '',
    tags: '',
    featured: false,
    faqs: [{ question: '', answer: '' }],
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products?status=catalogue');
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      ...formData,
      tags: formData.tags.split(',').map((t) => t.trim()),
      specifications: formData.specifications.filter((s) => s.key && s.value),
      productLinks: formData.productLinks.filter((l) => l.url && l.price > 0),
      faqs: formData.faqs.filter((f) => f.question && f.answer),
      images: formData.images.filter((img) => img),
    };

    try {
      const url = '/api/admin/products';
      const method = editingProduct ? 'PUT' : 'POST';
      const body = editingProduct
        ? { ...productData, id: editingProduct._id }
        : productData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Failed to save product');

      toast.success(
        editingProduct
          ? 'Product updated successfully'
          : 'Product added successfully'
      );
      setShowForm(false);
      setEditingProduct(null);
      resetForm();
      fetchProducts();
    } catch (error) {
      toast.error('Failed to save product');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`/api/admin/products?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete product');

      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      detailedDescription: product.detailedDescription || '',
      category: product.category,
      images: product.images.length > 0 ? product.images : [''],
      specifications:
        product.specifications.length > 0
          ? product.specifications
          : [{ key: '', value: '' }],
      productLinks:
        product.productLinks.length > 0
          ? product.productLinks
          : [{ platform: 'amazon' as const, url: '', price: 0 }],
      ourPrice: product.ourPrice,
      sku: product.sku,
      tags: product.tags.join(', '),
      featured: product.featured,
      faqs:
        product.faqs.length > 0 ? product.faqs : [{ question: '', answer: '' }],
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      detailedDescription: '',
      category: '',
      images: [''],
      specifications: [{ key: '', value: '' }],
      productLinks: [
        { platform: 'amazon' as 'amazon' | 'flipkart', url: '', price: 0 },
      ],
      ourPrice: 0,
      sku: '',
      tags: '',
      featured: false,
      faqs: [{ question: '', answer: '' }],
    });
  };

  const addField = (field: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: [
        ...prev[field], 
        field === 'images' 
          ? '' 
          : field === 'productLinks' 
            ? { platform: 'amazon' as const, url: '', price: 0 } 
            : field === 'specifications' 
              ? { key: '', value: '' } 
              : { question: '', answer: '' }
      ],
    }));
  };

  const removeField = (field: string, index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field].filter((_: any, i: number) => i !== index),
    }));
  };

  if (showForm) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h1>
          <button
            onClick={() => {
              setShowForm(false);
              setEditingProduct(null);
              resetForm();
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SKU *
              </label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Detailed Description
            </label>
            <textarea
              value={formData.detailedDescription}
              onChange={(e) =>
                setFormData({ ...formData, detailedDescription: e.target.value })
              }
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Our Price *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.ourPrice}
                onChange={(e) =>
                  setFormData({ ...formData, ourPrice: parseFloat(e.target.value) })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                Featured Product
              </span>
            </label>
          </div>

          {/* Images - Firebase Upload */}
          <div>
            <ImageUpload
              images={formData.images.filter((img) => img)}
              onImagesChange={(newImages) =>
                setFormData({ ...formData, images: newImages })
              }
              maxImages={5}
            />
          </div>

          {/* Product Links */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Links (Multiple Platforms)
              </label>
              <button
                type="button"
                onClick={() => addField('productLinks')}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                + Add Link
              </button>
            </div>
            {formData.productLinks.map((link, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                <select
                  value={link.platform}
                  onChange={(e) => {
                    const newLinks = [...formData.productLinks];
                    newLinks[index].platform = e.target.value as any;
                    setFormData({ ...formData, productLinks: newLinks });
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="amazon">Amazon</option>
                  <option value="flipkart">Flipkart</option>
                  <option value="myntra">Myntra</option>
                  <option value="nykaa">Nykaa</option>
                  <option value="1mg">1mg</option>
                  <option value="pharmeasy">PharmEasy</option>
                  <option value="healthkart">HealthKart</option>
                  <option value="bigbasket">BigBasket</option>
                  <option value="jiomart">JioMart</option>
                </select>
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => {
                    const newLinks = [...formData.productLinks];
                    newLinks[index].url = e.target.value;
                    setFormData({ ...formData, productLinks: newLinks });
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="URL"
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={link.price}
                    onChange={(e) => {
                      const newLinks = [...formData.productLinks];
                      newLinks[index].price = parseFloat(e.target.value);
                      setFormData({ ...formData, productLinks: newLinks });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Price"
                  />
                  {formData.productLinks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeField('productLinks', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Specifications */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Specifications
              </label>
              <button
                type="button"
                onClick={() => addField('specifications')}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                + Add Specification
              </button>
            </div>
            {formData.specifications.map((spec, index) => (
              <div key={index} className="grid grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  value={spec.key}
                  onChange={(e) => {
                    const newSpecs = [...formData.specifications];
                    newSpecs[index].key = e.target.value;
                    setFormData({ ...formData, specifications: newSpecs });
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Key"
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => {
                      const newSpecs = [...formData.specifications];
                      newSpecs[index].value = e.target.value;
                      setFormData({ ...formData, specifications: newSpecs });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Value"
                  />
                  {formData.specifications.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeField('specifications', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* FAQs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                FAQs
              </label>
              <button
                type="button"
                onClick={() => addField('faqs')}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                + Add FAQ
              </button>
            </div>
            {formData.faqs.map((faq, index) => (
              <div key={index} className="space-y-2 mb-4 p-3 border rounded-lg">
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => {
                    const newFaqs = [...formData.faqs];
                    newFaqs[index].question = e.target.value;
                    setFormData({ ...formData, faqs: newFaqs });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Question"
                />
                <div className="flex items-start space-x-2">
                  <textarea
                    value={faq.answer}
                    onChange={(e) => {
                      const newFaqs = [...formData.faqs];
                      newFaqs[index].answer = e.target.value;
                      setFormData({ ...formData, faqs: newFaqs });
                    }}
                    rows={2}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Answer"
                  />
                  {formData.faqs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeField('faqs', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center space-x-2"
            >
              <FiCheck />
              <span>{editingProduct ? 'Update Product' : 'Add Product'}</span>
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Catalogue Management
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <FiPlus />
          <span>Add Product</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-600 mb-4">
            No products in catalogue. Add your first product!
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product: any) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{product.ourPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      <FiEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

