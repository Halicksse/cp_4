import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductsCard() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    try {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/product/`)
        .then((res) => setProducts(res.data));
    } catch (error) {
      console.error("Error fetching products", error);
    }
  }, []);

  // const addToCart = () => {
  //   e.prevent.default;
  // };

  return (
    <div className="h-screen flex flex-wrap gap-3 justify-evenly">
      {products &&
        products.map((p) => (
          <div
            key={p.id}
            className="border shadow-md rounded-lg mb-5 p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
          >
            <div className="text-lg font-semibold "> {p.name}</div>
            <div>Description: {p.description}</div>
            <div className="text-primary text-xl font-semibold">{p.price}$</div>
            <button
              type="button"
              className=" border bg-stone-200 shadow-sm text-grey px-3 py-1 rounded-md ml-2 hover:bg-primary-dark transition duration-300"
              // onClick={() => addToCart(p)}
            >
              Add to Cart
            </button>
          </div>
        ))}
    </div>
  );
}
