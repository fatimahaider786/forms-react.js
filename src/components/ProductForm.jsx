import React from "react";

const ProductForm = ({ onSubmit, name, setName, desc, setDesc, imageURL, setImageURL, editingId, clearForm }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
      <div style={{ width: "100%", maxWidth: "500px", backgroundColor: "#fff", padding: "25px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "15px" }}>
          {editingId ? "Edit Product ✏️" : "Add Product"}
        </h2>
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
          <input type="text" placeholder="Image URL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
          <textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} required style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" style={{ flex: 1, padding: "10px", backgroundColor: editingId ? "#16a34a" : "#000", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
              {editingId ? "Update" : "Add"}
            </button>
            {editingId && (
              <button type="button" onClick={clearForm} style={{ flex: 1, padding: "10px", backgroundColor: "#9ca3af", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;