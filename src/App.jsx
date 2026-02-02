import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:5050/products";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5050/products");
      setProducts(res.data);
    } catch (err) { console.log("Fetch Error:", err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, desc, ImageURL: imageURL, price: 6000};
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, productData);
        const updatedList = products.map(p => p.id === editingId ? { ...p, ...productData } : p);
        setProducts(updatedList);
        setEditingId(null);
        alert("Product Updated!");
      } else {
        const newProduct = { ...productData, id: Date.now() };
        await axios.post(API_URL, newProduct);
        setProducts([...products, newProduct]);
        alert("Product Added!");
      }
      clearForm();
    } catch (err) { console.log("Error:", err); }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Kya aap ise delete karna chahte hain?")) return;
    try {
      await axios.delete(`${"http://localhost:5050/products"}/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) { console.log("Delete Error:", err); }
  };

  const prepareUpdate = (product) => {
    setEditingId(product.id);
    setName(product.name);
    setDesc(product.desc);
    setImageURL(product.ImageURL);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearForm = () => {
    setName(""); setDesc(""); setImageURL(""); setEditingId(null);
  };

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '50px' }}>
        <div style={{ width: '100%', maxWidth: '500px', backgroundColor: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
            {editingId ? "Edit Product ✏️" : "Add New Product"}
          </h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Name</label>
              <input 
                style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '5px' }}
                type="text" value={name} placeholder="Enter Product Name" 
                onChange={(e) => setName(e.target.value)} required 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Image URL</label>
              <input 
                style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '5px' }}
                type="text" value={imageURL} placeholder="Enter your image" 
                onChange={(e) => setImageURL(e.target.value)} required 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Description</label>
              <textarea 
                style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '5px', minHeight: '80px' }}
                value={desc} placeholder="Short description..." 
                onChange={(e) => setDesc(e.target.value)} required 
              ></textarea>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                type="submit" 
                style={{ flex: 1, padding: '12px', backgroundColor: editingId ? '#16a34a' : '#000', color: '#fff', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}
              >
                {editingId ? "Update" : "Add Product"}
              </button>
              {editingId && (
                <button type="button" onClick={clearForm} style={{ flex: 1, padding: '12px', backgroundColor: '#9ca3af', color: '#fff', borderRadius: '5px', border: 'none' }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <hr style={{ margin: '40px 0', border: '0.5px solid #ccc' }} />

      {/* --- CATALOG SECTION --- */}
      <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold', marginBottom: '30px' }}>Product Catalog</h2>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {products.map((pr) => (
          <div key={pr.id} style={{ width: '280px', backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: '1px solid #eee' }}>
            <img src={pr.ImageURL} alt={pr.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <div style={{ padding: '15px' }}>
              <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '5px' }}>{pr.name}</h3>
              <p style={{ color: '#666', fontSize: '14px', height: '40px', overflow: 'hidden' }}>{pr.desc}</p>
              <p style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '20px', margin: '10px 0' }}>Rs. {pr.price}</p>
              
              {/* FIXED BUTTONS */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button 
                  onClick={() => prepareUpdate(pr)} 
                  style={{ flex: 1, padding: '8px', backgroundColor: '#2563eb', color: '#white', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteProduct(pr.id)} 
                  style={{ flex: 1, padding: '8px', backgroundColor: '#dc2626', color: '#white', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;