import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import ProductForm from "./components/ProductForm";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const API_URL = "http://localhost:5050/products";

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Inventory Dashboard</h2>
        
        {/* Product Form */}
        <ProductForm fetchProducts={fetchProducts} />
        
        <hr />

        {/* Product Cards List */}
        <div className="d-flex flex-wrap justify-content-center gap-4 mt-4">
          {products.map((p) => (
            <ProductCard 
              key={p._id || p.id} 
              product={p} 
              fetchProducts={fetchProducts} 
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;