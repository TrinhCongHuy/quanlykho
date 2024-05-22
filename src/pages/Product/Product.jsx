import React from 'react'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import ProductsManagement from './ProductsManagement'

function Product() {
  return (
    <div>
        <HeaderComponent name="Sản phẩm"/>

      {/* Bảng Product */}
      <div className=' flex flex-col gap-10'>
        <ProductsManagement/>
      </div>
    </div>
  )
}

export default Product
