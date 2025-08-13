import "../styles/ProductCard.css";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { cart, addToCart, changeQuantity } = useCart();

  const inCart = cart.find((item) => item.id === product.id);

  return (
    <div className="card">
      {product.image && (
        <picture>
          <source media="(max-width: 640px)" srcSet={product.image.mobile} />
          <source media="(max-width: 1024px)" srcSet={product.image.tablet} />
          <img src={product.image.desktop} alt={product.name} />
        </picture>
      )}

      <h3 className="name">{product.name}</h3>
      <p className="category">{product.category}</p>
      <p className="price">${product.price}</p>

      {inCart ? (
        <div className="counter">
          <button onClick={() => changeQuantity(product.id, -1)}>-</button>
          <span>{inCart.quantity}</span>
          <button onClick={() => changeQuantity(product.id, 1)}>+</button>
        </div>
      ) : (
        <button className="add-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      )}
    </div>
  );
}
