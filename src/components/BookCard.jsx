import React from 'react';

export const BookCard = ({ book, addToCart, setCurrentPage }) => {
  const handleAddToCart = () => {
    const success = addToCart(book.id);
    if (!success) {
      setCurrentPage('login');
    }
  };

  const coverHtml = book.image ? (
    <div className="book-cover" style={{ backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <img src={book.image} alt={book.title} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
    </div>
  ) : (
    <div className="book-cover" style={{ background: `linear-gradient(135deg, ${book.color1}, ${book.color2})` }}>
      <div className="book-cover-emoji">{book.emoji}</div>
      <div className="book-cover-title" style={{ color: book.textColor }}>{book.title}</div>
      <div className="book-cover-author" style={{ color: book.textColor }}>{book.author}</div>
    </div>
  );

  return (
    <div className="book-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <div>
        {coverHtml}
        <h6>{book.title}</h6>
        <p className="author">{book.author}</p>
        <p className="price">&#8377; {book.price}</p>
      </div>
      <div style={{ marginTop: 'auto' }}>
        <button className="btn-cart" onClick={handleAddToCart}>
          <i className="bi bi-cart-plus me-1"></i>Add to Cart
        </button>
      </div>
    </div>
  );
};
