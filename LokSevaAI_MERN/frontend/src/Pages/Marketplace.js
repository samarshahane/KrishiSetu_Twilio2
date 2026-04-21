import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Marketplace.css';
import { ShoppingBag, Plus, MapPin, Phone, MessageSquare, X } from 'lucide-react';
import { useAuth } from '../AuthContext';

const CATEGORIES = ['All', 'Crops', 'Seeds', 'Tools', 'Livestock', 'Fertilizers'];

const Marketplace = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Crops',
    price: '',
    unit: 'kg',
    quantity: '',
    description: '',
    location: ''
  });

  useEffect(() => {
    fetchProducts();
    fetchUserProfile();
  }, [user]);

  const fetchUserProfile = async () => {
    if (user?.id) {
      try {
        const res = await axios.get(`/api/users/profile?uid=${user.id}`);
        if (res.data.success) {
          setUserProfile(res.data.user);
          setNewProduct(prev => ({
            ...prev,
            location: res.data.user.district || ''
          }));
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/marketplace');
      if (res.data.success) {
        setProducts(res.data.products);
        setFilteredProducts(res.data.products);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!user || !userProfile) {
      alert("Please login and update your profile first.");
      return;
    }

    try {
      const productData = {
        ...newProduct,
        farmer_name: userProfile.full_name || user.email,
        farmer_phone: userProfile.phone || '',
        user_id: user.id
      };

      const res = await axios.post('/api/marketplace/add', productData);
      if (res.data.success) {
        setShowAddModal(false);
        fetchProducts();
        setNewProduct({
          name: '',
          category: 'Crops',
          price: '',
          unit: 'kg',
          quantity: '',
          description: '',
          location: userProfile.district || ''
        });
      }
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product. Please check your network.");
    }
  };

  return (
    <div className="marketplace-container">
      <header className="marketplace-header">
        <div>
          <h1>Community Marketplace</h1>
          <p style={{ color: '#888', marginTop: '0.5rem' }}>Direct from farmers to you. Zero commission.</p>
        </div>
        <button className="add-product-btn" onClick={() => setShowAddModal(true)}>
          <Plus size={20} />
          List My Produce
        </button>
      </header>

      <div className="market-filters">
        {CATEGORIES.map(cat => (
          <button 
            key={cat} 
            className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>Loading marketplace...</div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <div key={product._id} className="product-card">
              <img src={product.image_url} alt={product.name} className="product-image" />
              <div className="product-info">
                <div className="product-category">{product.category}</div>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                  ₹{product.price} <span>/ {product.unit}</span>
                </div>
                <div className="product-location">
                  <MapPin size={14} />
                  {product.location} • {product.farmer_name}
                </div>
                <div className="product-actions">
                  <button 
                    className="contact-btn primary"
                    onClick={() => window.open(`tel:${product.farmer_phone}`)}
                  >
                    <Phone size={16} />
                    Call
                  </button>
                  <button 
                    className="contact-btn"
                    onClick={() => window.open(`sms:${product.farmer_phone}?body=Hi, I am interested in your ${product.name} listed on KrishiSetu.`)}
                  >
                    <MessageSquare size={16} />
                    SMS
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: '#666' }}>
              No products found in this category. Be the first to list!
            </div>
          )}
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 className="modal-title">List Your Produce</h2>
              <X className="close-icon" onClick={() => setShowAddModal(false)} style={{ cursor: 'pointer' }} />
            </div>
            
            <form onSubmit={handleAddProduct}>
              <div className="form-group">
                <label>Product Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Organic Wheat" 
                  required 
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }} className="form-group">
                <div style={{ flex: 1 }}>
                  <label>Category</label>
                  <select 
                    value={newProduct.category}
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label>Quantity Available</label>
                  <input 
                    type="number" 
                    placeholder="100" 
                    required 
                    value={newProduct.quantity}
                    onChange={e => setNewProduct({...newProduct, quantity: e.target.value})}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }} className="form-group">
                <div style={{ flex: 1 }}>
                  <label>Price (₹)</label>
                  <input 
                    type="number" 
                    placeholder="2500" 
                    required 
                    value={newProduct.price}
                    onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Unit</label>
                  <select 
                    value={newProduct.unit}
                    onChange={e => setNewProduct({...newProduct, unit: e.target.value})}
                  >
                    <option value="kg">kg</option>
                    <option value="quintal">quintal</option>
                    <option value="ton">ton</option>
                    <option value="piece">piece</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Location (District)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Pune" 
                  required 
                  value={newProduct.location}
                  onChange={e => setNewProduct({...newProduct, location: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Full Description</label>
                <textarea 
                  rows="3" 
                  placeholder="Quality details, harvest date, etc."
                  value={newProduct.description}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                ></textarea>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Post Listing</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
