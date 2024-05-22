import React, { useEffect, useState } from 'react'

import { getDatabase, ref, child, get, remove  } from "firebase/database";
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

function ProductsManagement() {
  const navigate = useNavigate();
  // select database
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const firstItemRank = ((currentPage - 1) * itemsPerPage) + 1;

  useEffect(() => {
    const dbRef = ref(getDatabase());

    get(child(dbRef, `Products`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const fetchedNews = Object.entries(snapshot.val()).map(([id, value]) => ({
            ...value,
            id, // đây là ID từ Firebase
            createdAt: new Date(value.createdAt).toLocaleString()
          }));
          setNews(fetchedNews);
        } else {
          console.log("No data available in News");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [query, setQuery] = useState('');
  const handleSearchChange = (event) => {
    setQuery(event.target.value.toLowerCase());
  };

  useEffect(() => {
    const results = news.filter(item =>
      item.name.toLowerCase().includes(query) ||  
      item.categoryCode.toLowerCase().includes(query) ||  
      item.productCode.toLowerCase().includes(query)
    );
    setFilteredNews(results);
    if (currentPage > Math.ceil(results.length / itemsPerPage)) {
      setCurrentPage(Math.ceil(results.length / itemsPerPage) || 1);
    }
  }, [query, news]);

  // Pagination handler
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  const handleEditNews = (newsId) => {
    navigate(`/product/edit/${newsId}`);
  }; 

  // const handleEditNews = (newsId) => {
  //   console.log('newsId', newsId)
  //   const item = news.find(item => item.id === newsId);
  //   if (item) {
  //   }
  // };
  const handleDeleteNews = (newsId) => {
    const db = getDatabase();
    const newsRef = ref(db, `Products/${newsId}`);
  
    remove(newsRef)
      .then(() => {
        console.log(`News item with ID: ${newsId} has been deleted.`);
        // Cập nhật state nếu cần
        setNews((currentNews) => currentNews.filter((item) => item.id !== newsId));
      })
      .catch((error) => {
        console.error("Error deleting news item:", error);
      });
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-4">
      <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-2 p-6">
        <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
          Sản phẩm trong kho
        </h6>
      </div>
      <div className="flex gap-4 items-center justify-center">
        
        <div className="">
          <label htmlFor="search-news" className="sr-only ">Search</label>
          <div className='border flex shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm border-gray-300 rounded'>
              <input
                type="text"
                name="search-news"
                id="search-news"
                className="outline-none w-full p-2"
                placeholder="Tìm kiếm..."
               value={query} onChange={handleSearchChange}
              />
              <button className='bg-indigo-600 px-4 rounded hover:bg-indigo-700  text-white'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </div>
          
        </div>
       </div>

       {/* ----------table------------ */}
       
       <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  #
                </th>
                <th scope="col" className="py-3 px-6">
                  Mã sản phẩm
                </th>
                <th scope="col" className="py-3 px-6">
                  Tên sản phẩm
                </th>
                <th scope="col" className="py-3 px-6">
                  Mã danh mục
                </th>
                <th scope="col" className="py-3 px-6">
                  Đơn vị
                </th>
                <th scope="col" className="py-3 px-6">
                  Số lượng
                </th>
                <th scope="col" className="py-3 px-6">
                  Đơn giá
                </th>
                <th scope="col" className="py-3 px-6">
                  Chức năng
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Example row */}
              {currentItems.map((item, index) => (
              <tr key={firstItemRank + index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="py-4 px-6">
                 {firstItemRank + index}
                </td>
                <td className="py-4 px-6">
                  {item.name}
                </td>
                <td className="py-4 px-6">
                {item.productCode}
                </td>
                <td className="py-4 px-6">
                  {item.categoryCode}
                </td>
                <td className="py-4 px-6">
                  {item.unit}
                </td>
                <td className="py-4 px-6">
                  {item.quantity}
                </td>
                <td className="py-4 px-6">
                  {item.price}
                </td>
                <td className="py-4 px-6 flex">
                  <h2 onClick={() => handleEditNews(item.id)} className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline">Sửa</h2>
                  <h2 onClick={() => handleDeleteNews(item.id)} className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline ml-4">Xóa</h2>
                </td>
              </tr>
                 ))}
              {/* Dynamic rows should be generated here based on data */}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
        <ReactPaginate
        previousLabel={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg> }
        nextLabel={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>}
        breakLabel="..."
        pageCount={totalPages}
        marginPagesDisplayed={3}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="flex gap-2"
        pageClassName="px-4 py-2 text-[16px] rounded-full hover:bg-gray-200"

        previousClassName="p-2 text-sm text-gray-600 rounded-full hover:bg-gray-300"
        nextClassName="p-2 text-sm text-gray-600 rounded-full hover:bg-gray-300"
        disabledClassName="opacity-50 cursor-not-allowed"
        activeClassName="bg-blue-600 text-white hover:bg-blue-700 "
        initialPage={currentPage - 1}
      />
  <span className="text-sm">
    Page {currentPage} of {totalPages}
  </span>
</div>

</div>

  )
}

export default ProductsManagement
