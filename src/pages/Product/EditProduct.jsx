import React, { useState, useEffect } from "react";
import { getDatabase, ref, child, get, update } from "firebase/database";
import { useParams } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";

function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    productCode: "",
    name: "",
    categoryCode: "",
    unit: "",
    description: "",
    images: [],
    quantity: "",
    price: "",
  });

  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const dbRef = ref(getDatabase());

    get(child(dbRef, `Products/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProduct(snapshot.val());
          setSelectedImages(snapshot.val().images || []);
        } else {
          console.log("Lỗi data");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages((prevImages) => prevImages.concat(filesArray));
    }
  };

  const handleUpdate = () => {
    const db = getDatabase();
    const updates = {
      [`Products/${id}`]: product,
    };

    update(ref(db), updates)
      .then(() => {
        alert("Cập nhật sản phẩm thành công");
      })
      .catch((error) => {
        alert("Lỗi cập nhật sản phẩm:", error);
      });
  };

  return (
    <div>
      <HeaderComponent name="Chỉnh sửa sản phẩm" />
      <div className="mt-5 bg-white rounded-lg shadow-md">
        <div className="bg-gray-700 text-white rounded-t-lg p-4 mb-4">
          <h2 className="text-xl font-semibold">Thông tin sản phẩm</h2>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Mã sản phẩm
            </label>
            <input
              type="text"
              name="productCode"
              value={product.productCode}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tên sản phẩm
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Mã danh mục
            </label>
            <input
              type="text"
              name="categoryCode"
              value={product.categoryCode}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Hình ảnh
            </label>
            <div className="flex gap-2 mt-2">
              {selectedImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Product"
                  className="w-20 h-20 object-cover rounded-md"
                />
              ))}
              <label className="flex items-center justify-center w-20 h-20 bg-gray-200 border-2 border-dashed border-gray-300 rounded-md cursor-pointer">
                <span className="text-gray-500">Chọn ảnh</span>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Số lượng
            </label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              min="0"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Đơn giá
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              min="0"
              step="0.01"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Đơn vị
            </label>
            <input
              type="text"
              name="unit"
              value={product.unit}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Mô tả sản phẩm
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            ></textarea>
          </div>

          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Cập nhật thông tin
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
