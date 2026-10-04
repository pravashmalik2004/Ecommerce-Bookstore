import React, { useEffect, useState } from 'react';
import { BookCard } from './BookCard';
import { books } from '../data/books';
import logo from '../assets/logo.jpg';

// === Navbar Component ===
export const Navbar = ({
  user,
  logoutUser,
  cartCount,
  searchQuery,
  setSearchQuery,
  currentPage,
  setCurrentPage,
  setSelectedCategory,
}) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setSelectedCategory('all');
    setCurrentPage('home');
  };

  const getDisplayName = () => {
    if (!user) return 'Profile';
    let displayName = user.name;
    if (!displayName && user.email) {
      const parts = user.email.split('@');
      displayName = parts[0];
      displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
    }
    if (displayName && displayName.length > 18) {
      displayName = displayName.substring(0, 15) + '...';
    }
    return displayName || 'User';
  };

  const handleNavClick = (page, category = null, e = null) => {
    if (e) e.preventDefault();
    if (category) {
      setSelectedCategory(category);
      setSearchQuery('');
      setLocalSearch('');
    } else if (page === 'books' && !category) {
      setSelectedCategory('all');
      setSearchQuery('');
      setLocalSearch('');
    }
    setCurrentPage(page);
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container">
        {/* Logo */}
        <a
          className="navbar-brand d-flex align-items-center gap-2"
          href="#"
          onClick={(e) => handleNavClick('home', null, e)}
        >
          <img src={logo} alt="BookSpace Logo" style={{ height: '38px', borderRadius: '4px' }} />
          <div>
            <span className="book-text">Book</span><span className="store-text">Space</span>
            <small>Read More, Learn More</small>
          </div>
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto ms-3">
            <li className="nav-item">
              <a
                className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                href="#"
                onClick={(e) => handleNavClick('home', null, e)}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${currentPage === 'books' ? 'active' : ''}`}
                href="#"
                onClick={(e) => handleNavClick('books', null, e)}
              >
                Books
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Categories</a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#" onClick={(e) => handleNavClick('books', 'Fiction', e)}>Fiction</a></li>
                <li><a className="dropdown-item" href="#" onClick={(e) => handleNavClick('books', 'Self Help', e)}>Self Help</a></li>
                <li><a className="dropdown-item" href="#" onClick={(e) => handleNavClick('books', 'Science', e)}>Science</a></li>
                <li><a className="dropdown-item" href="#" onClick={(e) => handleNavClick('books', 'History', e)}>History</a></li>
                <li><a className="dropdown-item" href="#" onClick={(e) => handleNavClick('books', 'Programming', e)}>Programming</a></li>
                <li><a className="dropdown-item" href="#" onClick={(e) => handleNavClick('books', 'Children', e)}>Children</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
                href="#"
                onClick={(e) => handleNavClick('about', null, e)}
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
                href="#"
                onClick={(e) => handleNavClick('contact', null, e)}
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Search */}
          <div className="d-flex align-items-center gap-3 ms-2">
            <form onSubmit={handleSearchSubmit} className="d-flex">
              <input
                className="search-box"
                type="text"
                placeholder="Search books..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
              <button className="search-btn" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>

            {/* Cart Icon */}
            <a
              className="cart-icon position-relative"
              href="#"
              onClick={(e) => handleNavClick('cart', null, e)}
            >
              <i className="bi bi-cart3"></i>
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
                  {cartCount}
                </span>
              )}
            </a>

            {/* Profile Dropdown */}
            <div className="dropdown">
              <button className="profile-btn dropdown-toggle" data-bs-toggle="dropdown">
                {user ? (
                  <>
                    <i className="bi bi-person-check-fill me-1"></i> {getDisplayName()}
                  </>
                ) : (
                  <>
                    <i className="bi bi-person-circle"></i> Profile
                  </>
                )}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                {user ? (
                  <>
                    <li>
                      <span className="dropdown-item-text text-muted" style={{ fontSize: '0.85rem' }}>
                        <i className="bi bi-person me-2"></i>{getDisplayName()}
                      </span>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item btn btn-link text-start" onClick={logoutUser}>
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <a className="dropdown-item" href="#" onClick={(e) => handleNavClick('login', null, e)}>Login</a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#" onClick={(e) => handleNavClick('signup', null, e)}>Sign Up</a>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// === HeroCarousel Component ===
export const HeroCarousel = ({ onExploreClick }) => {
  return (
    <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
      </div>

      <div className="carousel-inner">
        {/* Slide 1 */}
        <div className="carousel-item active">
          <div className="slide-bg slide-1" style={{ width: '100%', height: '400px' }}></div>
          <div className="carousel-caption">
            <h5>Welcome to BookSpace</h5>
            <h2>Find Your Next<br /><strong>Great Read</strong></h2>
            <p>Explore thousands of books across all categories and genres.</p>
            <button className="btn-shop" onClick={onExploreClick}>Shop Now</button>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="carousel-item">
          <div className="slide-bg slide-2" style={{ width: '100%', height: '400px' }}></div>
          <div className="carousel-caption">
            <h5>New Arrivals 2026</h5>
            <h2>Bestsellers &amp;<br /><strong>Top Picks</strong></h2>
            <p>Handpicked books to inspire, educate, and entertain you.</p>
            <button className="btn-shop" onClick={onExploreClick}>Explore Now</button>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="carousel-item">
          <div className="slide-bg slide-3" style={{ width: '100%', height: '400px' }}></div>
          <div className="carousel-caption">
            <h5>Special Offers Coming Soon</h5>
            <h2>Up to 50% Off<br /><strong>Selected Books</strong></h2>
            <p>Grab your favourite titles at amazing discounted prices today.</p>
            <button className="btn-shop" onClick={onExploreClick}>Get Deals</button>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
};

// === Footer Component ===
export const Footer = ({ setCurrentPage, setSelectedCategory, setSearchQuery }) => {
  const navigateTo = (page, category = null, e) => {
    e.preventDefault();
    if (category) {
      if (setSelectedCategory) setSelectedCategory(category);
      if (setSearchQuery) setSearchQuery('');
    } else {
      if (setSelectedCategory) setSelectedCategory('all');
      if (setSearchQuery) setSearchQuery('');
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5>About Us</h5>
            <p>BookSpace is your one-stop destination for books of all genres. Read more, learn more and grow every day.</p>
          </div>
          <div className="col-md-4 mb-4">
            <h5>Quick Links</h5>
            <a href="#" onClick={(e) => navigateTo('home', null, e)}>Home</a>
            <a href="#" onClick={(e) => navigateTo('books', null, e)}>Books</a>
            <a href="#" onClick={(e) => navigateTo('about', null, e)}>About</a>
            <a href="#" onClick={(e) => navigateTo('contact', null, e)}>Contact</a>
          </div>
          <div className="col-md-4 mb-4">
            <h5>Categories</h5>
            <a href="#" onClick={(e) => navigateTo('books', 'Fiction', e)}>Fiction</a>
            <a href="#" onClick={(e) => navigateTo('books', 'Science', e)}>Science</a>
            <a href="#" onClick={(e) => navigateTo('books', 'History', e)}>History</a>
            <a href="#" onClick={(e) => navigateTo('books', 'Self Help', e)}>Self Help</a>
            <a href="#" onClick={(e) => navigateTo('books', 'Programming', e)}>Programming</a>
            <a href="#" onClick={(e) => navigateTo('books', 'Children', e)}>Children</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 BookSpace. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// === Home Page Component ===
export const Home = ({
  addToCart,
  searchQuery,
  setSearchQuery,
  setCurrentPage,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [filteredBooks, setFilteredBooks] = useState(books);

  // Handle filtering
  useEffect(() => {
    let result = books;

    // Apply Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.author.toLowerCase().includes(query) ||
          b.category.toLowerCase().includes(query)
      );
    }

    // Apply Category
    if (selectedCategory !== 'all') {
      result = result.filter(
        (b) => b.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredBooks(result);
  }, [selectedCategory, searchQuery]);

  const scrollToBooks = () => {
    const section = document.getElementById('book-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home">
      <HeroCarousel onExploreClick={scrollToBooks} />

      {/* Featured / All Books Grid */}
      <div className="container my-5" id="book-section">
        <div className="d-flex justify-content-between align-items-end flex-wrap mb-4 pb-2 border-bottom">
          <div>
            <div className="section-title mb-0" style={{ textAlign: 'left' }}>
              {searchQuery ? `Search Results for "${searchQuery}"` : selectedCategory !== 'all' ? `${selectedCategory} Books` : 'Featured Books'}
            </div>
          </div>

          {/* Category Filter */}
          <div className="category-filter mb-0" style={{ marginBottom: 0, marginTop: '10px' }}>
            <label>Select Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSearchQuery('');
              }}
            >
              <option value="all">All Categories</option>
              <option value="Fiction">Fiction</option>
              <option value="Self Help">Self Help</option>
              <option value="Finance">Finance</option>
              <option value="Psychology">Psychology</option>
              <option value="Programming">Programming</option>
              <option value="Science">Science</option>
            </select>
          </div>
        </div>

        {/* Book Grid */}
        <div className="row g-4" id="bookGrid">
          {filteredBooks.length === 0 ? (
            <div className="col-12 text-center">
              <p style={{ color: '#888', fontSize: '1.1rem', marginTop: '30px' }}>
                <i className="bi bi-search" style={{ fontSize: '2rem' }}></i>
                <br />
                No books found.
              </p>
            </div>
          ) : (
            filteredBooks.map((book) => (
              <div key={book.id} className="col-6 col-md-3">
                <BookCard book={book} addToCart={addToCart} setCurrentPage={setCurrentPage} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
