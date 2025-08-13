import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import Modal from "./components/Modal";
import { CartProvider } from "./context/CartContext";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("https://json-api.uz/api/project/dessertss/desserts")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
        console.log(data.data);
        
      })
      .catch(() => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <CartProvider>
      <div className="app">
        <h1>Desserts</h1>
        <div className="content">
          <div className="products">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <Cart onConfirm={() => setShowModal(true)} />
        </div>
        {showModal && <Modal onClose={() => setShowModal(false)} />}
      </div>
    </CartProvider>
  );
}
