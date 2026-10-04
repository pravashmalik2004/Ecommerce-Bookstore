import React, { useEffect, useState } from 'react';
import { BookCard } from '../components/BookCard';
import { books } from '../data/books';

export const Books = ({
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

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setSelectedCategory(val);
    setSearchQuery(''); // Clear search when changing category filter
  };

  return (
    <div id="books-page" className="container my-5">
      <div className="d-flex justify-content-between align-items-end flex-wrap mb-4 pb-2 border-bottom">
        <div>
          <div className="section-title mb-0" style={{ textAlign: 'left' }}>
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Books'}
          </div>
        </div>

        {/* Category Filter */}
        <div className="category-filter mb-0" style={{ marginBottom: 0, marginTop: '10px' }}>
          <label>Select Category:</label>
          <select value={selectedCategory} onChange={handleCategoryChange}>
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
              No books found in this category.
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
  );
};
