'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Box,
  DollarSign,
  Package,
  Layers,
  TrendingDown,
  X
} from 'lucide-react';

type Currency = 'USD' | 'SYP';
type ProductCategory = 'mdf' | 'wood' | 'glue' | 'accessories' | 'custom_wood' | 'other';

interface Product {
  id: string;
  name: string;
  nameAr: string;
  category: ProductCategory;
  priceUSD: number;
  priceSYP: number;
  stock: number;
  unit: string;
  dimensions?: string;
  description?: string;
  supplier?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

const categoryLabels: Record<ProductCategory, { ar: string; en: string; icon: string }> = {
  mdf: { ar: 'MDF', en: 'MDF', icon: '📦' },
  wood: { ar: 'خشب', en: 'Wood', icon: '🌲' },
  glue: { ar: 'غراء', en: 'Glue', icon: '🧪' },
  accessories: { ar: 'ملحقات', en: 'Accessories', icon: '🔩' },
  custom_wood: { ar: 'خشب مخصص', en: 'Custom Wood', icon: '🎨' },
  other: { ar: 'أخرى', en: 'Other', icon: '📋' },
};

const units = ['قطعة (Piece)', 'متر (Meter)', 'متر مربع (m²)', 'متر مكعب (m³)', 'كيلوغرام (kg)'];

// Exchange rate: 1 USD = 10,000 SYP (new)
const EXCHANGE_RATE = 10000;

export default function ProductsPage() {
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<ProductCategory | 'all'>('all');
  const [currency, setCurrency] = useState<Currency>('SYP');
  const [showAddForm, setShowAddForm] = useState(false);

  // New/Edit Product Form State
  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    category: 'mdf' as ProductCategory,
    priceUSD: 0,
    priceSYP: 0,
    stock: 0,
    unit: 'قطعة (Piece)',
    dimensions: '',
    description: '',
    supplier: '',
    imageUrl: '',
  });

  // Load products from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem('bader-products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Save products to localStorage
  const saveProducts = (newProducts: Product[]) => {
    localStorage.setItem('bader-products', JSON.stringify(newProducts));
    setProducts(newProducts);
  };

  const handleCreateProduct = () => {
    if (!formData.name || !formData.nameAr || formData.priceUSD <= 0) {
      alert('يرجى ملء جميع الحقول المطلوبة (Please fill all required fields)');
      return;
    }

    // Calculate SYP price if not provided
    const priceSYP = formData.priceSYP > 0 ? formData.priceSYP : formData.priceUSD * EXCHANGE_RATE;

    const newProduct: Product = {
      id: `product-${Date.now()}`,
      name: formData.name,
      nameAr: formData.nameAr,
      category: formData.category,
      priceUSD: formData.priceUSD,
      priceSYP,
      stock: formData.stock,
      unit: formData.unit,
      dimensions: formData.dimensions || undefined,
      description: formData.description || undefined,
      supplier: formData.supplier || undefined,
      imageUrl: formData.imageUrl || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveProducts([...products, newProduct]);
    resetForm();
    setShowAddForm(false);
    alert('تم إضافة المنتج بنجاح (Product added successfully)');
  };

  const handleUpdateProduct = () => {
    if (!selectedProduct) return;

    // Calculate SYP price if not provided
    const priceSYP = formData.priceSYP > 0 ? formData.priceSYP : formData.priceUSD * EXCHANGE_RATE;

    const updatedProducts = products.map((product) =>
      product.id === selectedProduct.id
        ? {
            ...product,
            ...formData,
            priceSYP,
            updatedAt: new Date().toISOString(),
          }
        : product
    );

    saveProducts(updatedProducts);
    resetForm();
    setView('list');
    setSelectedProduct(null);
    alert('تم تحديث المنتج بنجاح (Product updated successfully)');
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟ (Are you sure you want to delete this product?)')) {
      saveProducts(products.filter((product) => product.id !== productId));
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      nameAr: product.nameAr,
      category: product.category,
      priceUSD: product.priceUSD,
      priceSYP: product.priceSYP,
      stock: product.stock,
      unit: product.unit,
      dimensions: product.dimensions || '',
      description: product.description || '',
      supplier: product.supplier || '',
      imageUrl: product.imageUrl || '',
    });
    setView('edit');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      nameAr: '',
      category: 'mdf',
      priceUSD: 0,
      priceSYP: 0,
      stock: 0,
      unit: 'قطعة (Piece)',
      dimensions: '',
      description: '',
      supplier: '',
      imageUrl: '',
    });
    setSelectedProduct(null);
  };

  const convertPrice = (usd: number, syp: number): string => {
    if (currency === 'USD') {
      return `$${usd.toFixed(2)}`;
    } else {
      return `${(syp > 0 ? syp : usd * EXCHANGE_RATE).toLocaleString('ar-SY')} ل.س`;
    }
  };

  const getStockColor = (stock: number): string => {
    if (stock <= 0) return 'bg-red-200 text-red-800';
    if (stock < 10) return 'bg-yellow-200 text-yellow-800';
    return 'bg-green-200 text-green-800';
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nameAr.includes(searchQuery) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  // Category counts
  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<ProductCategory, number>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50" dir="rtl">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-900">المواد (Products)</h1>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">إضافة (Add)</span>
            </button>
          </div>
          <p className="text-gray-600">
            تصفح وأدج مكتبة المواد والأسعار
            <br />
            <span className="text-sm">Browse and manage your materials library</span>
          </p>
        </div>

        {/* Currency Toggle */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign size={20} className="text-green-600" />
              <span className="font-semibold text-gray-900">عرض السعر (Show Price in)</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  currency === 'USD'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('SYP')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  currency === 'SYP'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                SYP (ل.س)
              </button>
            </div>
          </div>
          {currency === 'SYP' && (
            <p className="text-sm text-gray-600 mt-2">
              صرف الدولار: 1 USD = {EXCHANGE_RATE.toLocaleString('ar-SY')} ل.س (جديد)
              <br />
              Exchange Rate: 1 USD = {EXCHANGE_RATE.toLocaleString()} SYP (new)
            </p>
          )}
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-lg">
          <div className="relative mb-3">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="بحث بالاسم أو الوصف... (Search by name or description)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none text-right"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                filterCategory === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              الكل (All) ({products.length})
            </button>
            {Object.entries(categoryLabels).map(([category, info]) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category as ProductCategory)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  filterCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="ml-1">{info.icon}</span>
                {info.ar} ({categoryCounts[category as ProductCategory] || 0})
              </button>
            ))}
          </div>
        </div>

        {/* List View */}
        {view === 'list' && (
          <>
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center text-gray-500">
                <Package size={48} className="mx-auto mb-4 text-gray-300" />
                <p>لا توجد منتجات</p>
                <p className="text-sm">No products found</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  إضافة منتج (Add Product)
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all"
                  >
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800`}>
                        {categoryLabels[product.category].icon} {categoryLabels[product.category].ar}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStockColor(product.stock)}`}>
                        {product.stock} {product.unit.split(' ')[0]}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{product.nameAr}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.name}</p>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign size={18} className="text-green-600" />
                      <span className="text-xl font-bold text-green-700">
                        {convertPrice(product.priceUSD, product.priceSYP)}
                      </span>
                    </div>

                    {/* Details */}
                    {product.dimensions && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Layers size={16} />
                        <span>{product.dimensions}</span>
                      </div>
                    )}

                    {product.supplier && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <TrendingDown size={16} />
                        <span>{product.supplier}</span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm"
                      >
                        <Edit size={16} />
                        <span>تعديل (Edit)</span>
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Add Product Form (Modal) */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">إضافة منتج (Add Product)</h2>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    resetForm();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Name (Arabic) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    اسم المنتج (عربي) *
                  </label>
                  <input
                    type="text"
                    value={formData.nameAr}
                    onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-right"
                    placeholder="أدخل اسم المنتج بالعربية"
                  />
                </div>

                {/* Name (English) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Name (English)
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-left"
                    placeholder="Enter product name in English"
                    dir="ltr"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    الفئة (Category)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(categoryLabels).map(([category, info]) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: category as ProductCategory })}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                          formData.category === category
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <span className="ml-1">{info.icon}</span>
                        {info.ar}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price USD */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    السعر بالدولار (Price in USD) *
                  </label>
                  <div className="relative">
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.priceUSD}
                      onChange={(e) => setFormData({ ...formData, priceUSD: parseFloat(e.target.value) || 0 })}
                      className="w-full pr-8 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-left"
                      placeholder="0.00"
                      dir="ltr"
                    />
                  </div>
                  {formData.priceUSD > 0 && (
                    <p className="text-sm text-gray-600 mt-1">
                      ≈ {(formData.priceUSD * EXCHANGE_RATE).toLocaleString('ar-SY')} ل.س (جديد)
                    </p>
                  )}
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    الكمية (Stock)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-right"
                    placeholder="0"
                  />
                </div>

                {/* Unit */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    الوحدة (Unit)
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none bg-white"
                  >
                    {units.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dimensions */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    الأبعاد (Dimensions)
                  </label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-right"
                    placeholder="مثال: 2.4 م × 1.2 م × 18 مم"
                  />
                </div>

                {/* Supplier */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    المورد (Supplier)
                  </label>
                  <input
                    type="text"
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-right"
                    placeholder="اسم المورد"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    الوصف (Description)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-right"
                    rows={3}
                    placeholder="أدخل وصف المنتج..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleCreateProduct}
                  className="w-full bg-green-600 text-white py-4 rounded-xl shadow-lg hover:bg-green-700 transition-all hover:shadow-xl flex items-center justify-center gap-2 font-bold text-lg mt-6"
                >
                  <Plus size={24} />
                  <span>إضافة المنتج (Add Product)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit View */}
        {view === 'edit' && selectedProduct && (
          <div className="space-y-4">
            <button
              onClick={() => {
                setView('list');
                setSelectedProduct(null);
              }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <X size={20} />
              <span>إلغاء (Cancel)</span>
            </button>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">تعديل المنتج (Edit Product)</h2>

              <div className="space-y-4">
                {/* Name (Arabic) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    اسم المنتج (عربي) *
                  </label>
                  <input
                    type="text"
                    value={formData.nameAr}
                    onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-right"
                  />
                </div>

                {/* Name (English) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Name (English)
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-left"
                    dir="ltr"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    الفئة (Category)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(categoryLabels).map(([category, info]) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: category as ProductCategory })}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                          formData.category === category
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <span className="ml-1">{info.icon}</span>
                        {info.ar}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price USD */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    السعر بالدولار (Price in USD) *
                  </label>
                  <div className="relative">
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.priceUSD}
                      onChange={(e) => setFormData({ ...formData, priceUSD: parseFloat(e.target.value) || 0 })}
                      className="w-full pr-8 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-left"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    الكمية (Stock)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-right"
                  />
                </div>

                {/* Unit */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    الوحدة (Unit)
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none bg-white"
                  >
                    {units.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dimensions */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    الأبعاد (Dimensions)
                  </label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-right"
                  />
                </div>

                {/* Supplier */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    المورد (Supplier)
                  </label>
                  <input
                    type="text"
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-right"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    الوصف (Description)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-right"
                    rows={3}
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleUpdateProduct}
                  className="w-full bg-green-600 text-white py-4 rounded-xl shadow-lg hover:bg-green-700 transition-all hover:shadow-xl flex items-center justify-center gap-2 font-bold text-lg mt-6"
                >
                  <Edit size={24} />
                  <span>حفظ التعديلات (Save Changes)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
