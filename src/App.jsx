import React, { useEffect, useState } from "react";
import axios from "axios";

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
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      desc,
      imageURL,
      price: 6000
    };

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, productData);
        alert("Product Updated");
      } else {
        await axios.post(API_URL, {
          ...productData,
          id: Date.now().toString()
        });
        alert("Product Added");
      }

      fetchProducts();
      clearForm();
    } catch (error) {
      console.log("Submit error:", error);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  const prepareUpdate = (product) => {
    setEditingId(product.id);
    setName(product.name);
    setDesc(product.desc);
    setImageURL(product.imageURL);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearForm = () => {
    setName("");
    setDesc("");
    setImageURL("");
    setEditingId(null);
  };

  return (
    <div style={{ backgroundColor: "#f3f4f6", minHeight: "100vh", padding: "20px" }}>
      
      {/* FORM */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
        <div style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#fff",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "15px" }}>
            {editingId ? "Edit Product ✏️" : "Add Product"}
          </h2>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />

            <input
              type="text"
              placeholder="Image URL"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              required
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />

            <textarea
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: "10px",
                  backgroundColor: editingId ? "#16a34a" : "#000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                {editingId ? "Update" : "Add"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={clearForm}
                  style={{
                    flex: 1,
                    padding: "10px",
                    backgroundColor: "#9ca3af",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* PRODUCTS */}
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Product Catalog</h2>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center"
      }}>
        {products.map((pr) => (
          <div key={pr.id} style={{
            width: "260px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            <img
              src={pr.imageURL}
              alt={pr.name}
              style={{ width: "100%", height: "160px", objectFit: "cover" }}
            />

            <div style={{ padding: "12px" }}>
              <h3 style={{ fontWeight: "bold" }}>{pr.name}</h3>
              <p style={{ fontSize: "14px", color: "#555" }}>{pr.desc}</p>
              <p style={{ fontWeight: "bold", color: "#2563eb" }}>Rs. {pr.price}</p>

              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <button
                  onClick={() => prepareUpdate(pr)}
                  style={{
                    flex: 1,
                    backgroundColor: "#2563eb",
                    color: "#fff",
                    border: "none",
                    padding: "6px",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProduct(pr.id)}
                  style={{
                    flex: 1,
                    backgroundColor: "#dc2626",
                    color: "#fff",
                    border: "none",
                    padding: "6px",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
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