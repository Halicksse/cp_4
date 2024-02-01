import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductsCard() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    if (products) {
      try {
        axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/product/`)
          .then((res) => setProducts(res.data[0]));
      } catch (error) {
        console.error("No product found", error);
      }
    }
  }, []);
  return (
    <div>
      {products &&
        products.map((p) => (
          <div key={p.id} className="product-card">
            <div>{p.title}</div>
            <div>{p.description}</div>
            <div>{p.price}</div>
          </div>
        ))}
    </div>
  );
}
