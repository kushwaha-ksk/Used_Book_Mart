// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from './Title'
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// // import required modules
// import { Autoplay } from 'swiper/modules';
// import Item from './Item';

// const RelatedBooks = ({book,id}) => {
//     const[relatedBooks,setRelatedBooks] = useState([]) 
//     const{books} = useContext(ShopContext)

//     useEffect(()=>{
//         if(books.length > 0){
//             let booksCopy = book.slice()
//             booksCopy = booksCopy.filter((item)=>item.category === book.category && id !== item._id)
//             setRelatedBooks(booksCopy.slice(0,6))
//         }
//     },[books])
//   return (
//     <section className='max-padd-container'>
//       <Title title1={"Related"} title2={"Books"} titleStyles={"pb-10"} />
//       {/* CONTAINER */}
//                     {
//                      <Swiper 
//                      autoplay={{
//                         delay:4000,
//                         disableOnInteraction:false,
//                         }}
//                         breakpoints={{
//                             355:{
//                                 slidesPerView:2,
//                                 spaceBetween:20,
//                             },
//                              600:{
//                                 slidesPerView:3,
//                                 spaceBetween:30,
//                             },
//                              900:{
//                                 slidesPerView:4,
//                                 spaceBetween:30,
//                             },
//                              1200:{
//                                 slidesPerView:5,
//                                 spaceBetween:30,
//                             },
//                      }}
//                      modules={[Autoplay]}
//                      className='min-h-[333px]'
//                      >
//                      {
//                       RelatedBooks.map((book)=>(
//                         <SwiperSlide key={book._id}>
//                             <Item book={book}/>
//                         </SwiperSlide>
//                       ))
//                      }
//                      </Swiper>
//                     }
//     </section>
//   )
// }

// export default RelatedBooks

import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import Item from './Item';

const RelatedBooks = ({ book, id }) => {
  const [relatedBooks, setRelatedBooks] = useState([]);
  const { books = [] } = useContext(ShopContext);

  useEffect(() => {
    // defensive checks
    if (!book || !Array.isArray(books) || books.length === 0) {
      setRelatedBooks([]);
      return;
    }

    // filter books with same category, exclude the current book by id
    const booksCopy = books.filter(
      (item) => item.category === book.category && item._id !== id
    );

    setRelatedBooks(booksCopy.slice(0, 6));
  }, [books, book, id]);

  return (
    <section className="max-padd-container mt-6">
      <Title title1="Related" title2="Books" titleStyles="pb-10" />

      {/* show a message if none found */}
      {relatedBooks.length === 0 ? (
        <p className="h4">No related books found.</p>
      ) : (
        <Swiper
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            355: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            600: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            900: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          modules={[Autoplay]}
          className="min-h-[333px]"
        >
          {relatedBooks.map((rb) => (
            <SwiperSlide key={rb._id}>
              <Item book={rb} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default RelatedBooks;
