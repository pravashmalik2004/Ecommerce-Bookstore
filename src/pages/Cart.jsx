import React, { useState } from 'react';

export const Cart = ({ cart, changeQty, removeFromCart, clearCart, setCurrentPage }) => {
  const [shipping, setShipping] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pin: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setShipping((prev) => ({ ...prev, [id.replace('shipping', '').toLowerCase()]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Your cart is empty! Please add some books first.');
      return;
    }

    if (!shipping.name || !shipping.phone || !shipping.street || !shipping.city || !shipping.state || !shipping.pin) {
      alert('Please fill in all shipping address fields.');
      return;
    }

    const orderTotal = cart.reduce((total, item) => total + item.price * item.qty, 0);

    const order = {
      orderId: 'ORD' + Math.floor(Math.random() * 900000 + 100000),
      date: new Date().toLocaleDateString('en-IN'),
      items: cart,
      total: orderTotal,
      shipping: {
        name: shipping.name,
        phone: shipping.phone,
        address: `${shipping.street}, ${shipping.city}, ${shipping.state} - ${shipping.pin}`,
      },
      status: 'Confirmed',
      delivery: '3-5 Working Days',
    };

    console.log('=== ORDER PLACED (JSON) ===');
    console.log(JSON.stringify(order, null, 2));

    clearCart();

    const orderDetailsMsg =
      `Order Placed Successfully!\n` +
      `Thank you for your purchase.\n\n` +
      `Order ID: ${order.orderId}\n` +
      `Date: ${order.date}\n` +
      `Items: ${order.items.length} book(s)\n` +
      `Deliver To: ${order.shipping.name}\n` +
      `Address: ${order.shipping.address}\n` +
      `Phone: ${order.shipping.phone}\n` +
      `Status: ${order.status}\n` +
      `Delivery Est: ${order.delivery}\n` +
      `Total Amount: ₹${order.total}\n\n` +
      `Your books will be delivered in 3–5 working days.`;

    alert(orderDetailsMsg);
    setCurrentPage('home');
  };

  const navigateToHome = (e) => {
    e.preventDefault();
    setCurrentPage('home');
  };

  const grandTotal = cart.reduce((total, item) => total + item.price * item.qty, 0);

  return (
    <div className="container my-5">
      <div className="section-title mb-4">My Shopping Cart</div>

      <div className="row">
        {/* Cart Items (Left Column) */}
        <div className="col-md-7 mb-4">
          <div className="address-card">
            {cart.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-cart-x text-muted" style={{ fontSize: '3.5rem' }}></i>
                <p className="cart-empty-msg mt-3">Your cart is empty.</p>
                <a href="#" onClick={navigateToHome} className="btn btn-outline-danger mt-2">Go Back to Shopping</a>
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={item.id} className="cart-item py-3">
                  {item.image ? (
                    <img src={item.image} className="cart-item-cover" style={{ objectFit: 'contain', background: '#fff' }} alt={item.title} />
                  ) : (
                    <div className="cart-item-cover" style={{ background: `linear-gradient(135deg, ${item.color1}, ${item.color2})` }}>
                      {item.emoji}
                    </div>
                  )}
                  <div className="cart-item-info">
                    <h6>{item.title}</h6>
                    <p className="mb-1 text-muted">{item.author}</p>
                    <div className="d-flex align-items-center gap-2 mt-2">
                      <span>Qty:</span>
                      <button onClick={() => changeQty(index, -1)} className="btn btn-sm btn-light border py-0 px-2" style={{ fontWeight: 'bold' }}>-</button>
                      <strong>{item.qty}</strong>
                      <button onClick={() => changeQty(index, 1)} className="btn btn-sm btn-light border py-0 px-2" style={{ fontWeight: 'bold' }}>+</button>
                      <button onClick={() => removeFromCart(index)} className="btn btn-sm btn-danger py-0 px-2 ms-3" style={{ fontSize: '0.75rem' }}>Remove</button>
                    </div>
                    <p className="cart-price mt-2 mb-0">&#8377; {item.price * item.qty}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Shipping Info & Checkout Total (Right Column) */}
        <div className="col-md-5">
          <div className="address-card mb-4">
            <h6>Shipping Address</h6>
            <div className="row g-3 mt-1">
              <div className="col-12">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="shippingName"
                  placeholder="Recipient's full name"
                  value={shipping.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="shippingPhone"
                  placeholder="+91 XXXXX XXXXX"
                  value={shipping.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12">
                <label className="form-label">Street Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="shippingStreet"
                  placeholder="House No., Street, Area"
                  value={shipping.street}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="shippingCity"
                  placeholder="City"
                  value={shipping.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">State</label>
                <input
                  type="text"
                  className="form-control"
                  id="shippingState"
                  placeholder="State"
                  value={shipping.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12">
                <label className="form-label">PIN Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="shippingPin"
                  placeholder="000000"
                  value={shipping.pin}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Checkout Total */}
          {cart.length > 0 && (
            <div className="address-card">
              <h5 className="d-flex justify-content-between align-items-center mb-0">
                <span>Total Amount: <span style={{ color: '#e84118', fontWeight: 'bold' }}>&#8377; {grandTotal}</span></span>
              </h5>
              <button className="btn-place-order w-100 py-2 mt-3" onClick={handlePlaceOrder}>
                <i className="bi bi-bag-check me-2"></i>Place Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
