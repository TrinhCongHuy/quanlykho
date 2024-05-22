import React, { useEffect, useState } from 'react'

import { getDatabase, ref, child, get, set, remove } from "firebase/database";
import MediaAdmin from './MediaAdmin';

function MediaTable() {
    const [showForm, setShowForm] = useState(false); // useState hook để lưu trữ trạng thái hiển thị (mặc định là false)
    const [currentItem, setCurrentItem] = useState(null);

    const handleClick = () => {
      setShowForm(!showForm); // Thay đổi trạng thái hiển thị khi click
    };
  
    const [query, setQuery] =useState("") //luu gia tri khi search
    
    const handleChange = (event) => {
      setQuery(event.target.value.toLowerCase());
    };
  
    // select database
    const [media, setMedia] = useState([]);
    const [filteredMedia, setFilteredMedia] = useState([]);

    useEffect(() => {
      const dbRef = ref(getDatabase());
  
      get(child(dbRef, `Media`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const fetchedMedia = Object.entries(snapshot.val()).map(([id, value]) => ({
              ...value,
              id, // đây là ID từ Firebase
              createdAt: new Date(value.createdAt).toLocaleString()
            }));
            setMedia(fetchedMedia);
           
          } else {
            console.log("No data available in Media");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

  useEffect(() => {
    // Lọc media dựa trên giá trị tìm kiếm
    const results = media.filter(item =>
      item.title.toLowerCase().includes(query) 
    );
    setFilteredMedia(results);
  }, [query, media]); 
  
    const handleEditMedia = (mediaId) => {
      const item = media.find(item => item.id === mediaId);
      if (item) {
        setCurrentItem(item); // Set the current item to the one to be edited
        setShowForm(true); // Show the form
      }
    };
    const handleDeleteMedia = (mediaId) => {
      const db = getDatabase();
      const mediaRef = ref(db, `Media/${mediaId}`);
    
      remove(mediaRef)
        .then(() => {
          console.log(`Media item with ID: ${mediaId} has been deleted.`);
          // Cập nhật state nếu cần
          setMedia((currentMedia) => currentMedia.filter((item) => item.id !== mediaId));
        })
        .catch((error) => {
          console.error("Error deleting media item:", error);
        });
    };
  
    return (
      <div className="mt-12 mb-8 flex flex-col gap-4">
        <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-2 p-6">
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
            Media Table
          </h6>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <button className="rounded-full bg-indigo-500 text-white flex p-2" onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
  
          </button>
          
          <div className="">
            <label htmlFor="search-news" className="sr-only ">Search</label>
            <div className='border flex shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm border-gray-300 rounded'>
                <input
                  type="text"
                  name="search-news"
                  id="search-news"
                  className="outline-none w-full p-2"
                  placeholder="Search..."
                  value={query} onChange={handleChange}
                />
                <button className='bg-indigo-600 px-4 rounded hover:bg-indigo-700  text-white'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </div>
            
          </div>
         </div>
         {!showForm && <MediaAdmin />}
  
         {/* ----------table------------ */}
         
         <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    #
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Title
                  </th>
                 
                  <th scope="col" className="py-3 px-6">
                    Created At
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Function
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Example row */}
                {filteredMedia.map((item, index) => (
                <tr key={index+1} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="py-4 px-6">
                   {index+1}
                  </td>
                  <td className="py-4 px-6">
                    {item.title}
                  </td>
                 
                  <td className="py-4 px-6">
                    {item.createdAt}
                  </td>
                  <td className="py-4 px-6 flex">
                    <h2 onClick={() => handleEditMedia(item.id)} className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline">Edit</h2>
                    <h2 onClick={() => handleDeleteMedia(item.id)} className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline ml-4">Delete</h2>
                  </td>
                </tr>
                   ))}
                {/* Dynamic rows should be generated here based on data */}
              </tbody>
            </table>
          </div>
  </div>
  )
}

export default MediaTable
