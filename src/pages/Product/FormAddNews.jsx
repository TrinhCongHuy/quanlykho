import React, { useEffect, useState } from 'react'
import { database, storage, ref, set, push, storageRef, uploadBytes, getDownloadURL, serverTimestamp } from '../../App';
import { getDatabase, child, get, remove } from 'firebase/database';
function FormAddNews() {

  const [news, setNews] = useState([]);

    const [title, setTitle] = useState('');
    const [nameID, setNameID] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [unit, setUnit] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [descriptions, setDescriptions] = useState([{ desc: '' }]);
    const [image, setImage] = useState("");
    const [temporaryData, setTemporaryData] = useState([]);

    const handleUploadFile = (event) => {
        // Kiểm tra nếu có file được chọn
        if (event.target.files.length > 0) {
          setImage(event.target.files[0]);
        //   console.log("File has been uploaded:", event.target.files[0]);
        } else {
          setImage(null);
          console.log("No file uploaded.");
        }
      };

    const handleTitleChange = (event) => {
        const newTitle = event.target.value;
        setTitle(newTitle);
  };

  const handleNameIDChange = (event) => {
    const newNameID = event.target.value;
    setNameID(newNameID);
};

useEffect(() => {
  const dbRef = ref(getDatabase());

  get(child(dbRef, `Category`))
      .then((snapshot) => {
          if (snapshot.exists()) {
              const fetchedCategories = Object.entries(snapshot.val()).map(([id, value]) => ({
                ...value,
                  id
              }));
              setCategories(fetchedCategories);
          } else {
              console.log("No data available in Category");
          }
      })
      .catch((error) => {
          console.error(error);
      });
}, []);

const handleUnitChange = (event) => {
  const newUnit = event.target.value;
  setUnit(newUnit);
};

const handleQuantityChange = (event) => {
  const newQuantity = event.target.value;
  setQuantity(newQuantity);
};
const handlePriceChange = (event) => {
  const newPrice = event.target.value;
  setPrice(newPrice);
};

  const handleDescriptionChange = (index) => (event) => {
    const newDescriptions = descriptions.map((item, idx) => {
        if (idx === index) {
            return { ...item, desc: event.target.value };
        }
        return item;
    });
    setDescriptions(newDescriptions);
};

const handleAddDescription = () => {
  setDescriptions([...descriptions, { desc: '' }]);
};

const handleDeleteDescription = () => {
  if (descriptions.length > 1) {
      setDescriptions(descriptions.slice(0, -1));
  } 
};
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!title || !nameID || !unit || !quantity || !selectedCategory || !descriptions.length === 0) 
  //   return(
  //     alert("Please enter complete information")
  //   );
  //   const database = getDatabase();
  //   const imageRef = storageRef(storage, `images/${image.name}`);
  //   const snapshot = await uploadBytes(imageRef, image);
  //   const imageUrl = await getDownloadURL(snapshot.ref);

  //   const newsRef = push(ref(database, 'Products'));
  //   set(newsRef, {
  //     name: title,
  //     productCode: nameID,
  //     unit:unit,
  //     categoryCode: selectedCategory,
  //     quantity: quantity,
  //     price: price,
  //     descriptions: descriptions.reduce((acc, item, index) => {
  //       acc[`description${index + 1}`] = item.desc;
  //       return acc;
  //   }, {}),
  //     image: imageUrl,
  //     createdAt: serverTimestamp()
  //   //   image: image
  //   }).then(() => {
  //       // set(counterRef, nextId);
  //     alert('Data uploaded successfully!');
  //   }).catch((error) => {
  //     alert('Failed to upload data:', error);
  //   });
  // };
 
  const handleSaveTemporary = async () => {
    if (!title || !nameID || !unit || !quantity || !selectedCategory || descriptions.length === 0) {
      alert("Please enter complete information");
      return;
    }
    // Optionally upload image and get URL
    let imageUrl = "";
    if (image) {
      const imageRef = storageRef(storage, `images/${image.name}`);
      const snapshot = await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(snapshot.ref);
    }
    // Save data to temporary state
    setTemporaryData([...temporaryData, {
      title,
      nameID,
      unit,
      quantity,
      price,
      selectedCategory,
      descriptions,
      imageUrl
    }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let data of temporaryData) {
      const newsRef = push(ref(getDatabase(), 'Products'));
      set(newsRef, {
        name: data.title,
        productCode: data.nameID,
        unit: data.unit,
        categoryCode: data.selectedCategory,
        quantity: data.quantity,
        price: data.price,
        descriptions: data.descriptions.reduce((acc, item, index) => {
          acc[`description${index + 1}`] = item.desc;
          return acc;
        }, {}),
        image: data.imageUrl,
        createdAt: serverTimestamp()
      }).then(() => {
        alert('Data uploaded successfully!');
      }).catch((error) => {
        alert('Failed to upload data:', error);
      });
    }
    setTemporaryData([]); // Clear temporary data after uploading
  };
  const handleEditNews = (newsId) => {
    const item = news.find(item => item.id === newsId);
    if (item) {
     
    }
  };
  const handleDeleteNews = (newsId) => {
    const db = getDatabase();
    const newsRef = ref(db, `Category/${newsId}`);
  
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
    return(
     <div>
        <form className=" space-y-6 border-2 p-6 bg-white rounded-lg" onSubmit={handleSubmit} >
        <div className="rounded-md shadow-sm ">
          <div className=" flex flex-col gap-3 my-3">
           <div className=' flex gap-6'>
                <input
                type="text"
                id="title"
                className="form-control grow outline-none focus:border-black border rounded-lg p-2"
                placeholder="Tên sản phẩm"
                value={title}
                onChange={handleTitleChange}
                />
                
               <input
                type="text"
                id="title"
                className="form-control grow outline-none focus:border-black border rounded-lg p-2"
                placeholder="Mã sản phẩm"
                value={nameID}
                onChange={handleNameIDChange}
                />
                
                 <select name="category" id="category-select" className='grow border focus:border-black rounded-lg p-2 '
                 value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} >
                  <option value="">Mã danh mục</option>
                 {categories.map((item, index) => (
                  <option key={index} value={item.category}>
                      {item.category}
                  </option>
              ))}
          </select>
           </div>
             <div className='flex gap-10'>
                  <input
                type="text"
                id="title"
                className="form-control outline-none focus:border-black border rounded-lg p-2"
                placeholder="Đơn vị"
                value={unit}
                onChange={handleUnitChange}
                />
                  <input
                type="number"
                id="title"
                className="form-control outline-none focus:border-black border rounded-lg p-2"
                placeholder="Số lượng"
                value={quantity}
                onChange={handleQuantityChange}
                />
                  <input
                type="number"
                id="title"
                className="form-control outline-none focus:border-black border rounded-lg p-2"
                placeholder="Giá nhập"
                value={price}
                onChange={handlePriceChange}
                />
             </div>
          {descriptions.map((item, index) => (
                      <textarea
                          key={index}
                          className="form-control outline-none focus:border-black border rounded-lg p-2 h-[100px]"
                          placeholder={`Mô tả ${index + 1}`}
                          value={item.desc}
                          onChange={handleDescriptionChange(index)}
                      />
                  ))}
                  <div className='flex gap-3'>
                    <button type='button' className=' bg-[#6366f1] text-white px-3 py-2 rounded-lg ' onClick={handleAddDescription}>Thêm mô tả</button>
                    {descriptions.length > 1 && (
                      <button type="button" className='border border-[#6366f1] text-[#6366f1] px-3 py-2 rounded-lg' onClick={handleDeleteDescription}>Xóa bớt</button>
                    )}
                  </div>
               
          </div>
          
          <div className="custom-file">
          <input type="file"  onChange={handleUploadFile} />
          
        </div>
        </div>
      <button type="button" className='bg-[#6366f1] text-white px-3 py-2 rounded-lg ' onClick={handleSaveTemporary}>Thêm mới</button>

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
          {temporaryData.map((item, index) => (
            <tr key={ index +1} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="py-4 px-6">
             { index +1}
            </td>
            <td className="py-4 px-6">
              {item.title}
            </td>
            <td className="py-4 px-6">
            {item.nameID}
            </td>
            <td className="py-4 px-6">
              {item.selectedCategory}
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
        </tbody>
      </table>
      <button type="submit" className='py-3 w-full  bg-[#6366f1] text-white font-rob mt-4 rounded-lg' >Nhập kho</button>

      </form>
     
     </div>
    )
}

export default FormAddNews
