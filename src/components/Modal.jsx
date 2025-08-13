import { useCart } from "../context/CartContext";
import "../styles/Modal.css";

export default function Modal({ onClose }) {
  const { cart, total, clearCart } = useCart();

  const handleStartNew = () => {
    clearCart();
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2>Order Confirmed</h2>
            <p>We hope you enjoy your food!</p>
          </div>
        </div>

        <div className="order-summary">
          {cart.map((item) => (
            <div key={item.id} className="order-item">
              {item.image?.thumbnail && (
                <img src={item.image.thumbnail} alt={item.name} />
              )}
              <div className="order-item-info">
                <h4>{item.name}</h4>
                <p>
                  <span className="quantity">{item.quantity}x</span>
                  <span className="unit-price">@ ${item.price.toFixed(2)}</span>
                </p>
              </div>
              <div className="order-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
          
          <div className="modal-total">
            <span>Order Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button onClick={handleStartNew}>Start New Order</button>
      </div>
    </div>
  );
}