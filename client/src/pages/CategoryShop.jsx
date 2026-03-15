import React, { useContext, useEffect, useState, useMemo } from 'react';
import Title from '../components/Title';
import Item from '../components/Item';
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';

const CategoryShop = () => {
  const { books = [], searchQuery = '' } = useContext(ShopContext);
  const [currPage, setCurrPage] = useState(1);
  const itemsPerPage = 10;
  const { category } = useParams();

  // Compute filtered books from books, category and searchQuery
  const filtered = useMemo(() => {
    let result = Array.isArray(books) ? books.slice() : [];

    // filter by category from URL (case-insensitive)
    if (category) {
      const catLower = category.toLowerCase();
      result = result.filter(
        (book) => (book.category || '').toLowerCase() === catLower
      );
    }

    // filter by search query (case-insensitive, if provided)
    const q = (searchQuery || '').trim().toLowerCase();
    if (q.length > 0) {
      result = result.filter((book) =>
        (book.name || '').toLowerCase().includes(q)
      );
    }

    return result;
  }, [books, category, searchQuery]);

  // Only show books that are in stock for pagination/display
  const inStock = useMemo(
    () => filtered.filter((b) => Boolean(b.inStock)),
    [filtered]
  );

  const totalPages = Math.ceil(inStock.length / itemsPerPage);

  // Ensure we reset to page 1 whenever filters change
  useEffect(() => {
    setCurrPage(1);
  }, [category, searchQuery, books]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currPage]);

  // Get current page slice
  const pagedBooks = useMemo(() => {
    if (inStock.length === 0) return [];
    const start = (currPage - 1) * itemsPerPage;
    return inStock.slice(start, start + itemsPerPage);
  }, [inStock, currPage]);

  const hasResults = inStock.length > 0;

  return (
    <div className="max-padd-containder py-16 pt-28 ml-10 mr-10">
      <Title title1="Category" title2="Books" titleStyles="pb-10" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-8">
        {hasResults ? (
          pagedBooks.map((book) => <Item key={book._id} book={book} />)
        ) : (
          <h4 className="h4 col-span-full">Oops! Nothing matched your search.</h4>
        )}
      </div>

      {/* PAGINATION */}
      {hasResults && totalPages > 1 && (
        <div className="flexCenter flex-wrap gap-2 sm:gap-4 mt-14 mb-10">
          <button
            disabled={currPage === 1}
            onClick={() => setCurrPage((prev) => Math.max(1, prev - 1))}
            className={`${currPage === 1 ? 'opacity-50 cursor-not-allowed' : ''} btn-dark !py-1 !px-3`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => {
            const pageNum = index + 1;
            const isActive = currPage === pageNum;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrPage(pageNum)}
                className={`${isActive ? 'bg-secondary !text-white' : ''} btn-light !py-1 !px-3`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            disabled={currPage >= totalPages}
            onClick={() => setCurrPage((prev) => Math.min(totalPages, prev + 1))}
            className={`${currPage >= totalPages ? 'opacity-50 cursor-not-allowed' : ''} btn-white bg-tertiary !py-1 !px-3`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryShop;

