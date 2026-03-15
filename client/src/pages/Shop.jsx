import React, { useContext, useEffect, useState, useMemo } from 'react';
import Title from '../components/Title';
import Item from '../components/Item';
import { ShopContext } from '../context/ShopContext';

const Shop = () => {
  const { books, searchQuery } = useContext(ShopContext);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const q = (searchQuery || '').trim().toLowerCase();

    if (q.length > 0) {
      setFilteredBooks(
        (books || []).filter((book) =>
          (book?.name || '').toLowerCase().includes(q)
        )
      );
    } else {
      setFilteredBooks(books || []);
    }

    // Reset to first page on data/search change
    setCurrPage(1);
  }, [books, searchQuery]);

  // Only in-stock books
  const inStockBooks = useMemo(
    () => (filteredBooks || []).filter((b) => b?.inStock),
    [filteredBooks]
  );

  const totalPages = Math.ceil(inStockBooks.length / itemsPerPage);

  const pagedBooks = useMemo(() => {
    const start = (currPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return inStockBooks.slice(start, end);
  }, [inStockBooks, currPage]);

  const hasResults = inStockBooks.length > 0;

  useEffect(()=>{
    window.scrollTo({top:0,behavior:'smooth'})
  },[currPage])

  return (
    <div className="max-padd-containder py-16 pt-28 ml-10 mr-10">
      <Title title1="All" title2="Books" titleStyles="pb-10" />

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

export default Shop;
