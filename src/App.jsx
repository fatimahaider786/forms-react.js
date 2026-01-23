import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [imageURL, setImageURL] = useState("");


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5050/products");
        setProducts(res.data);
      } catch (err) { console.log("Fetch Error:", err); }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        id: Date.now(),
        name,
        price: 2000,
        ImageURL: imageURL,
        desc
      };
      await axios.post("http://localhost:5050/products", newProduct);
      setProducts([...products, newProduct]);
      setName(""); setDesc(""); setImageURL("");
    } catch (err) { console.log(err); }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      
      <div className="max-w-7xl mx-auto bg-white p-4 rounded-lg shadow-md mb-10">
        <h2 className="text-lg font-bold mb-4">Add New Product</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-row items-end gap-3 w-full">
          
          <div className="flex-1">
            <input 
              className="border p-2 rounded w-full focus:ring-1 focus:ring-black outline-none"
              type="text" value={name} placeholder="Product Name" 
              onChange={(e) => setName(e.target.value)} required 
            />
          </div>

          <div className="flex-1">
            <input 
              className="border p-2 rounded w-full focus:ring-1 focus:ring-black outline-none"
              type="text" value={imageURL} placeholder="Image Link (URL)" 
              onChange={(e) => setImageURL(e.target.value)} required 
            />
          </div>

          <div className="flex-[1.5]"> 
            <textarea 
              className="border p-2 rounded w-full focus:ring-1 focus:ring-black outline-none resize-none"
              rows="1"
              value={desc} placeholder="Description" 
              onChange={(e) => setDesc(e.target.value)} required
            ></textarea>
          </div>

          <button type="submit" className="bg-black text-white px-6 py-2 rounded font-bold hover:bg-gray-800 transition whitespace-nowrap">
            Add Product
          </button>
        </form>
      </div>

      <hr className="mb-10" />

      <h2 className="text-2xl font-bold text-center mb-6">Product Catalog</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
        {products.map((pr) => (
          <div className="bg-white border rounded-lg overflow-hidden flex flex-col shadow-sm" key={pr.id}>
            <div className="h-40 w-full bg-gray-200">
              <img 
                src={pr.ImageURL} 
                alt={pr.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="p-3 flex flex-col flex-grow">
              <h3 className="font-bold text-sm truncate">{pr.name}</h3>
              <p className="text-gray-600 text-[10px] mt-1 line-clamp-2 h-6">{pr.desc}</p>
              <p className="text-blue-600 font-bold mt-2 text-sm">Rs. {pr.price || 0}</p>
              <button className="mt-auto bg-black text-white text-xs py-2 rounded mt-2">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;