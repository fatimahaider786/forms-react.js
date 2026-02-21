import React from "react";

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div style={{ width: "260px", backgroundColor: "#fff", borderRadius: "10px", overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
      <img src={product.imageURL} alt={product.name} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
      <div style={{ padding: "12px" }}>
        <h3 style={{ fontWeight: "bold" }}>{product.name}</h3>
        <p style={{ fontSize: "14px", color: "#555" }}>{product.desc}</p>
        <p style={{ fontWeight: "bold", color: "#2563eb" }}>Rs. {product.price}</p>
        <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
          <button onClick={() => onEdit(product)} style={{ flex: 1, backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "6px", borderRadius: "4px", cursor: "pointer" }}>Edit</button>
          <button onClick={() => onDelete(product.id)} style={{ flex: 1, backgroundColor: "#dc2626", color: "#fff", border: "none", padding: "6px", borderRadius: "4px", cursor: "pointer" }}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;