import React, { useState } from 'react'
import { database, storage, ref, set, push, storageRef, uploadBytes, getDownloadURL, serverTimestamp } from '../../App';

function FormAddCategory() {

    const [nameID, setNameID] = useState('');
    const [category, setCategory] = useState('');

  const handleNameIDChange = (event) => {
    const newNameID = event.target.value;
    setNameID(newNameID);
};

const handleCategoryChange = (event) => {
  const newCategory = event.target.value;
  setCategory(newCategory);
};
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ( !nameID || !category) 
    return(
      alert("Please enter complete information")
    );

    const newsRef = push(ref(database, 'Category'));
    set(newsRef, {
      nameID: nameID,
      category: category,
      createdAt: serverTimestamp()
    }).then(() => {
      alert('Data uploaded successfully!');
    }).catch((error) => {
      alert('Failed to upload data:', error);
    });
  };
  
    return(
      <form className=" space-y-6 border-2 p-6 bg-white rounded-lg" onSubmit={handleSubmit} >
      <div className="rounded-md shadow-sm ">
        <h1>Thêm Danh Mục</h1>
        <div className=" flex flex-col gap-3 my-3">
         <div className=' flex gap-6'>
             <input
              type="text"
              id="title"
              className="form-control grow outline-none focus:border-black border rounded-lg p-2"
              placeholder="Tên danh mục"
              value={nameID}
              onChange={handleNameIDChange}
              />
                <input
              type="text"
              id="title"
              className="form-control grow outline-none focus:border-black border rounded-lg p-2"
              placeholder="Mã danh mục"
              value={category}
              onChange={handleCategoryChange}
              />
         </div>
             
        </div>
        <button type="submit" className='py-3 w-full  bg-[#6366f1] text-white font-rob mt-4 rounded-lg' >Thêm</button>
      </div>
    </form>
    )
}

export default FormAddCategory
