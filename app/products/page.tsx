'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { FiSearch, FiX, FiFilter } from 'react-icons/fi';

function ProductsList() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 6000 });
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'Aqua', label: 'Aqua Raksha' },
    { value: 'Poultry', label: 'Poultry Raksha' },
    { value: 'Pashu', label: 'Pashu Raksha' },
    { value: 'International', label: 'International Range' },
    { value: 'HerbiGuard', label: 'HerbiGuard Series' },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, selectedCategory, priceRange, sortBy]);

  const fetchProducts = async () => {
    try {
      // AXION SCIENTIFICS Products Data
      const axionProducts = [
        {
          _id: '1',
          name: 'Aqua Raksha',
          description: 'Herbal formulation optimized for aquaculture species like fish and shrimp. Promotes water quality adaptation, disease resistance, and accelerated growth.',
          category: 'Aqua',
          ourPrice: 2500,
          compareAtPrice: 3000,
          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          featured: true,
          averageRating: 4.8,
          reviews: [],
          tags: ['aquaculture', 'fish', 'shrimp', 'herbal', 'growth'],
          stock: 100
        },
        {
          _id: '2',
          name: 'Poultry Raksha',
          description: 'Potent natural blend enhancing immunity, feed conversion, and weight gain in poultry farms for broilers and layers.',
          category: 'Poultry',
          ourPrice: 1800,
          compareAtPrice: 2200,
          image: 'https://images.unsplash.com/photo-1548550023-4b5b5b5b5b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          featured: true,
          averageRating: 4.7,
          reviews: [],
          tags: ['poultry', 'broilers', 'layers', 'immunity', 'growth'],
          stock: 150
        },
        {
          _id: '3',
          name: 'Pashu Raksha',
          description: 'Specialized supplements for milking and meat animals supporting health, lactation, and immunity in cows, buffaloes, sheep, goats.',
          category: 'Pashu',
          ourPrice: 3200,
          compareAtPrice: 3800,
          image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          featured: true,
          averageRating: 4.9,
          reviews: [],
          tags: ['dairy', 'cattle', 'buffalo', 'lactation', 'immunity'],
          stock: 80
        },
        {
          _id: '4',
          name: 'HerbiGuard Aqua',
          description: 'Advanced aquafeed supplement for disease prevention and growth promotion in aquaculture globally.',
          category: 'HerbiGuard',
          ourPrice: 4500,
          compareAtPrice: 5200,
          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          featured: false,
          averageRating: 4.6,
          reviews: [],
          tags: ['international', 'aquaculture', 'premium', 'global'],
          stock: 60
        },
        {
          _id: '5',
          name: 'HerbiGuard Plume',
          description: 'Targeted for robust poultry health and growth with enhanced disease resistance for international markets.',
          category: 'HerbiGuard',
          ourPrice: 2800,
          compareAtPrice: 3300,
          image: 'https://images.unsplash.com/photo-1548550023-4b5b5b5b5b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          featured: false,
          averageRating: 4.5,
          reviews: [],
          tags: ['international', 'poultry', 'premium', 'global'],
          stock: 70
        },
        {
          _id: '6',
          name: 'HerbiGuard Lacto',
          description: 'Enhances milk yield and quality in dairy animals through natural immunomodulation for global markets.',
          category: 'HerbiGuard',
          ourPrice: 4200,
          compareAtPrice: 4800,
          image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          featured: false,
          averageRating: 4.8,
          reviews: [],
          tags: ['international', 'dairy', 'milk', 'premium', 'global'],
          stock: 50
        },
        {
          _id: '7',
          name: 'HerbiGuard Fleece',
          description: 'Strengthens sheep and goats for better wool and meat production with natural immunity boost.',
          category: 'HerbiGuard',
          ourPrice: 2600,
          compareAtPrice: 3100,
          image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          featured: false,
          averageRating: 4.4,
          reviews: [],
          tags: ['international', 'sheep', 'goat', 'wool', 'meat'],
          stock: 40
        },
        {
          _id: '8',
          name: 'HerbiGuard Porci',
          description: 'Supports pig health, growth, and immunity in commercial farming with natural herbal formulation.',
          category: 'HerbiGuard',
          ourPrice: 2400,
          compareAtPrice: 2900,
          image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          featured: false,
          averageRating: 4.3,
          reviews: [],
          tags: ['international', 'pig', 'swine', 'commercial', 'growth'],
          stock: 55
        },
        {
          _id: '9',
          name: 'HerbiGuard Equi',
          description: 'Care for equines focusing on enhanced immunity, stamina, and coat quality for horses and donkeys.',
          category: 'HerbiGuard',
          ourPrice: 3800,
          compareAtPrice: 4400,
          image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          featured: false,
          averageRating: 4.7,
          reviews: [],
          tags: ['international', 'horse', 'equine', 'stamina', 'coat'],
          stock: 35
        }
      ];
      
      setProducts(axionProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product: any) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags?.some((tag: string) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (product: any) => product.category === selectedCategory
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (product: any) =>
        product.ourPrice >= priceRange.min &&
        product.ourPrice <= priceRange.max
    );

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a: any, b: any) => a.ourPrice - b.ourPrice);
        break;
      case 'price-high':
        filtered.sort((a: any, b: any) => b.ourPrice - a.ourPrice);
        break;
      case 'name':
        filtered.sort((a: any, b: any) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a: any, b: any) => b.averageRating - a.averageRating);
        break;
      case 'featured':
        filtered.sort((a: any, b: any) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange({ min: 0, max: 6000 });
    setSortBy('featured');
  };

  const activeFiltersCount = 
    (searchQuery ? 1 : 0) + 
    (selectedCategory !== 'all' ? 1 : 0) + 
    (priceRange.min > 0 || priceRange.max < 6000 ? 1 : 0);

  return (
    <div className="container-custom py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AXION SCIENTIFICS Products</h1>
        <p className="text-gray-600">
          Browse our complete collection of herbal feed supplements for poultry, aquaculture, dairy, and meat animals
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search herbal supplements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
            <option value="rating">Highest Rated</option>
          </select>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
          >
            <FiFilter className="w-5 h-5" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="mt-4 flex items-center flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchQuery && (
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm flex items-center space-x-1">
                <span>Search: {searchQuery}</span>
                <button onClick={() => setSearchQuery('')}>
                  <FiX className="w-4 h-4" />
                </button>
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm flex items-center space-x-1">
                <span>Category: {selectedCategory}</span>
                <button onClick={() => setSelectedCategory('all')}>
                  <FiX className="w-4 h-4" />
                </button>
              </span>
            )}
            {(priceRange.min > 0 || priceRange.max < 10000) && (
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm flex items-center space-x-1">
                <span>
                  Price: ₹{priceRange.min} - ₹{priceRange.max}
                </span>
                <button onClick={() => setPriceRange({ min: 0, max: 10000 })}>
                  <FiX className="w-4 h-4" />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside
          className={`${
            showFilters ? 'block' : 'hidden'
          } md:block w-full md:w-64 flex-shrink-0`}
        >
          <div className="bg-white rounded-lg shadow p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Filters</h2>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label
                    key={category.value}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      checked={selectedCategory === category.value}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-gray-700">{category.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Min: ₹{priceRange.min}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="6000"
                    step="100"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, min: parseInt(e.target.value) })
                    }
                    className="w-full accent-primary-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Max: ₹{priceRange.max}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="6000"
                    step="100"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, max: parseInt(e.target.value) })
                    }
                    className="w-full accent-primary-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-600 text-lg mb-2">No products found</p>
              <p className="text-gray-500 text-sm mb-4">
                Try adjusting your filters or search query
              </p>
              <button
                onClick={clearFilters}
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product: any) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="container-custom py-12">
        <div className="text-center">Loading products...</div>
      </div>
    }>
      <ProductsList />
    </Suspense>
  );
}

