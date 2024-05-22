import React, { useEffect, useState } from 'react'
import { getDatabase, ref, child, get, update, remove } from "firebase/database";
import { Link } from 'react-router-dom'

function ManageAccount() {
    const [currentItem, setCurrentItem] = useState(null);
    const [users, setUsers] = useState([]);
      const [role, setRole] = useState('');
      const [email, setEmail] = useState('');
      const [selectedUserId, setSelectedUserId] = useState(null);
      const [query, setQuery] =useState("") //luu gia tri khi search
    
 
    // select database
    const [media, setMedia] = useState([]);
    const [filteredMedia, setFilteredMedia] = useState([]);

    useEffect(() => {
      const dbRef = ref(getDatabase());
      
      get(child(dbRef, `Users`))
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
      item.email.toLowerCase().includes(query) 
    );
    setFilteredMedia(results);
  }, [query, media]); 

    const handleDeleteMedia = (mediaId) => {
      const db = getDatabase();
      const mediaRef = ref(db, `Users/${mediaId}`);
    
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
    const handleEditMedia = (item) => {
      setEmail(item.email);
      setRole(item.auth); // Assuming 'auth' field is being used as role
      setSelectedUserId(item.id);
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      const db = getDatabase();
      const mediaRef = ref(db, `Users/${selectedUserId}`);
      update(mediaRef, {
        auth: role, // Update only the role
      }).then(() => {
        alert("Cập nhật quyền thành công");
        // Optionally reset the form or provide some feedback here
      }).catch((error) => {
        alert("lỗi cập nhật quyền:", error);
      });
    };

     return (
      <div className="mt-12 mb-8 flex flex-col gap-4">
        <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-2 p-6">
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
            Quản lý tài khoản
          </h6>
        </div>
        <form className=" space-y-6 border-2 p-6 bg-white rounded-lg" onSubmit={handleSubmit} >
        <div className="rounded-md shadow-sm ">
           <div className=' flex gap-6'>
                <input
                type="text"
                className="form-control grow outline-none border rounded-lg p-2 text-gray-500 bg-gray-100"
                value={email}
                readOnly
                />
            
          <select
              id="role" name="role" required
              onChange={(e) => setRole(e.target.value)}
              value={role}
              className='grow border focus:border-black rounded-lg p-2'>
              <option value="">---Loại tài khoản---</option>
              <option value="admin">Admin</option>
              <option value="importStaff">Nhân viên nhập</option>
              <option value="exportStaff">Nhân viên xuất</option>
            </select>
               
          </div>
          
        </div>
    
      <button type="submit" className='py-3 w-full  bg-[#6366f1] text-white font-rob mt-4 rounded-lg' >Cập nhật</button>

      </form>
       <div>
       <Link to="/admin/api/sign-up" 
            className=" cursor-pointer relative lg:px-8 md:px-6 lg:py-3 md:py-2 pm:px-6 pm:py-2 border-2 border-indigo-500 font-semibold text-white rounded-lg transition-all bg-indigo-500
            duration-1000 ease-in-out inline-block overflow-hidden capitalize shadow-md hover:bg-transparent hover:text-indigo-500
            before:absolute before:-left-[100%] hover:before:left-full before:top-0 before:w-full before:h-full
        before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent before:transition-all before:duration-500 before:ease-linear">
        Thêm tài khoản
        </Link>
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
                    Email
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Quyền hạn
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Ngày tạo
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Chức năng
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
                    {item.email}
                  </td>
                  <td className="py-4 px-6">
                    {item.auth}
                  </td>
                  <td className="py-4 px-6">
                    {item.createdAt}
                  </td>
                  <td className="py-4 px-6 flex">
                    <h2 onClick={() => handleEditMedia(item)} className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline">Sửa</h2>
                    <h2 onClick={() => handleDeleteMedia(item.id)} className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline ml-4">Xóa</h2>
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

export default ManageAccount
