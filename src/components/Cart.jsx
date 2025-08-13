import "../styles/Cart.css";
import { useCart } from "../context/CartContext";

export default function Cart({ onConfirm }) {
  const { cart, removeFromCart, total } = useCart();

  return (
    <div className="cart">
      <h2>Your Cart ({cart.reduce((sum, item) => sum + (item.quantity || 0), 0)})</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your added items will appear here</p>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                <p>{item.name}</p>
                <span>
                  <span className="quantity">{item.quantity || 0}x</span>
                  <span className="unit-price">@ ${item.price?.toFixed(2) || "0.00"}</span>
                  <span className="total-price">${((item.price || 0) * (item.quantity || 0)).toFixed(2)}</span>
                </span>
              </div>
              <button onClick={() => removeFromCart(item.id)}>×</button>
            </div>
          ))}

          <div className="total">
            <span>Order Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="carbon-neutral">
            This is a <strong>carbon-neutral</strong> delivery
          </div>

          <button className="confirm" onClick={onConfirm}>
            Confirm Order
          </button>
        </>
      )}
    </div>
  );
}