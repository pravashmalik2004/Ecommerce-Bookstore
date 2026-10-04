import React, { useState, useEffect } from 'react';
import { Home, Navbar, Footer } from './components/Home';
import { Books } from './pages/Books';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { books } from './data/books';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); 
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Initial load
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('bookstore_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Error loading user session:', e);
    }

    try {
      const storedCart = localStorage.getItem('bookstore_cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (e) {
      console.error('Error loading cart:', e);
    }
  }, []);

  // Save cart to local storage when it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('bookstore_cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('bookstore_cart');
    }
  }, [cart]);

  const addToCart = (bookId) => {
    if (!user) {
      try {
        localStorage.setItem('bookstore_pending_cart_item', bookId);
      } catch (e) {
        console.error('Error saving pending cart item:', e);
      }
      alert('Please log in first to add books to your cart.');
      return false; // Indicates login redirect is needed
    }

    const book = books.find((b) => b.id === bookId);
    if (!book) return true;

    setCart((prevCart) => {
      const index = prevCart.findIndex((item) => item.id === bookId);
      if (index > -1) {
        const updated = [...prevCart];
        updated[index] = { ...updated[index], qty: updated[index].qty + 1 };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: book.id,
            title: book.title,
            author: book.author,
            price: book.price,
            qty: 1,
            color1: book.color1,
            color2: book.color2,
            textColor: book.textColor,
            emoji: book.emoji,
            image: book.image,
          },
        ];
      }
    });

    return true;
  };

  const changeQty = (index, delta) => {
    setCart((prevCart) => {
      if (!prevCart[index]) return prevCart;
      const updated = [...prevCart];
      const newQty = updated[index].qty + delta;
      if (newQty <= 0) {
        updated.splice(index, 1);
      } else {
        updated[index] = { ...updated[index], qty: newQty };
      }
      return updated;
    });
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const updated = [...prevCart];
      updated.splice(index, 1);
      return updated;
    });
  };

  const loginUser = (email, password, rememberMe) => {
    if (!email || !password) {
      alert('Please fill in all fields.');
      return false;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters.');
      return false;
    }

    let name = '';
    try {
      const users = JSON.parse(localStorage.getItem('bookstore_registered_users') || '[]');
      const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
      if (foundUser) {
        if (foundUser.password && foundUser.password !== password) {
          alert('Incorrect password. Please try again.');
          return false;
        }
        name = foundUser.name;
      }
    } catch (e) {
      console.error('Error looking up registered users:', e);
    }

    if (rememberMe) {
      localStorage.setItem('bookstore_remembered_email', email);
    } else {
      localStorage.removeItem('bookstore_remembered_email');
    }

    const loginData = {
      email,
      name,
      loginTime: new Date().toLocaleString('en-IN'),
      status: 'success',
    };

    setUser(loginData);
    localStorage.setItem('bookstore_user', JSON.stringify(loginData));

    // Check for pending cart items
    const pendingItemId = localStorage.getItem('bookstore_pending_cart_item');
    if (pendingItemId) {
      localStorage.removeItem('bookstore_pending_cart_item');
      setTimeout(() => {
        addToCart(parseInt(pendingItemId));
      }, 500);
    }

    return true;
  };

  const signupUser = (name, email, phone, password, confirmPassword) => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return false;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return false;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters.');
      return false;
    }

    const userData = {
      name,
      email,
      phone,
      password, // Save password for verification and recovery
      joinedOn: new Date().toLocaleDateString('en-IN'),
    };

    try {
      const users = JSON.parse(localStorage.getItem('bookstore_registered_users') || '[]');
      users.push(userData);
      localStorage.setItem('bookstore_registered_users', JSON.stringify(users));
    } catch (e) {
      console.error('Error saving registered user:', e);
    }

    const loginData = {
      email,
      name,
      loginTime: new Date().toLocaleString('en-IN'),
      status: 'success',
    };

    setUser(loginData);
    localStorage.setItem('bookstore_user', JSON.stringify(loginData));

    // Check for pending cart items
    const pendingItemId = localStorage.getItem('bookstore_pending_cart_item');
    if (pendingItemId) {
      localStorage.removeItem('bookstore_pending_cart_item');
      setTimeout(() => {
        addToCart(parseInt(pendingItemId));
      }, 500);
    }

    return true;
  };

  const logoutUser = () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      setUser(null);
      setCart([]);
      localStorage.removeItem('bookstore_user');
      localStorage.removeItem('bookstore_cart');
      alert('You have logged out successfully.');
      setCurrentPage('home');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        user={user}
        logoutUser={logoutUser}
        cartCount={cartCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setSelectedCategory={setSelectedCategory}
      />
      <main className="flex-grow-1">
        {currentPage === 'home' && (
          <Home
            addToCart={addToCart}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setCurrentPage={setCurrentPage}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}
        {currentPage === 'books' && (
          <Books
            addToCart={addToCart}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setCurrentPage={setCurrentPage}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}
        {currentPage === 'cart' && (
          <Cart
            cart={cart}
            changeQty={changeQty}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 'login' && (
          <Login loginUser={loginUser} setCurrentPage={setCurrentPage} />
        )}
        {currentPage === 'signup' && (
          <SignUp signupUser={signupUser} setCurrentPage={setCurrentPage} />
        )}
        {currentPage === 'about' && <About />}
        {currentPage === 'contact' && <Contact />}
      </main>
      <Footer
        setCurrentPage={setCurrentPage}
        setSelectedCategory={setSelectedCategory}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
}

export default App;
