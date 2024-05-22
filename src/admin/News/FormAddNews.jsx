import React, { useState } from 'react'
import { database, storage, ref, set, push, storageRef, uploadBytes, getDownloadURL, serverTimestamp } from '../../App';

function toSlug(text) {
    return text.toLowerCase()
    .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
    .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
    .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
    .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
    .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
    .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
    .replace(/đ/gi, 'd')
    .replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '')
    .replace(/ /gi, "-")
    .replace(/\-\-\-\-\-/gi, '-')
    .replace(/\-\-\-\-/gi, '-')
    .replace(/\-\-\-/gi, '-')
    .replace(/\-\-/gi, '-')
    .replace(/\@\-|\-\@|\@/gi, '')
      .trim();
  }

function FormAddNews() {

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [brand, setBrand] = useState('');
    const [descriptions, setDescriptions] = useState([{ desc: '' }]);
    const [image, setImage] = useState("");

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
        setSlug(toSlug(newTitle));
  };
  const handleBrandChange = (event) => {
    const newBrand = event.target.value;
    setBrand(newBrand);
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !title || !brand) 
    return(
      alert("Please enter complete information")
    );

    const imageRef = storageRef(storage, `images/${image.name}`);
    const snapshot = await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(snapshot.ref);

    // Lấy giá trị counter hiện tại và tính ID tiếp theo
  // const counterRef = ref(database, 'News/counter');
  // const counterSnapshot = await get(counterRef);
  // const nextId = (counterSnapshot.exists() ? counterSnapshot.val() : 0) + 1;

    const newsRef = push(ref(database, 'News'));
    set(newsRef, {
      title: title,
      slug: slug,
      brand:brand,
      descriptions: descriptions.reduce((acc, item, index) => {
        acc[`description${index + 1}`] = item.desc;
        return acc;
    }, {}),
      image: imageUrl,
      createdAt: serverTimestamp()
    //   image: image
    }).then(() => {
        // set(counterRef, nextId);
      alert('Data uploaded successfully!');
    }).catch((error) => {
      alert('Failed to upload data:', error);
    });
  };

      
    return(
      <form className=" space-y-6 border-2 p-6 bg-white rounded-lg" onSubmit={handleSubmit} >
      <div className="rounded-md shadow-sm ">
        <h1>Post News</h1>
        <div className=" flex flex-col gap-3 my-3">
            <input
            type="text"
            id="title"
            className="form-control outline-none border rounded-lg p-2"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            />
            <input
            type="text"
            id="slug"
            className="form-control border rounded-lg p-2 outline-none"
            placeholder="Slug"
            value={slug}
            readOnly
            />
        {descriptions.map((item, index) => (
                    <textarea
                        key={index}
                        className="form-control outline-none border rounded-lg p-2 h-[100px]"
                        placeholder={`Description ${index + 1}`}
                        value={item.desc}
                        onChange={handleDescriptionChange(index)}
                    />
                ))}
                <div className='flex gap-3'>
                  <button type='button' className=' bg-[#6366f1] text-white px-3 py-2 rounded-lg ' onClick={handleAddDescription}>Add</button>
                  {descriptions.length > 1 && (
                    <button type="button" className='border border-[#6366f1] text-[#6366f1] px-3 py-2 rounded-lg' onClick={handleDeleteDescription}>Delete</button>
                  )}
                </div>
                <input
            type="text"
            id="brand"
            className="form-control outline-none border rounded-lg p-2"
            placeholder="Brand"
            value={brand}
            onChange={handleBrandChange}
            />
        </div>
        
        <div className="custom-file">
        <input type="file"  onChange={handleUploadFile} />
        
      </div>
        <button type="submit" className='py-3 w-full  bg-[#6366f1] text-white font-rob mt-4 rounded-lg' >Post</button>
      </div>
    </form>
    )
}

export default FormAddNews
