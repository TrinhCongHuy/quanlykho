import React from 'react'
import ManageAccount from '../Account/ManageAccount'
import FooterComponent from '../Footer/FooterComponent'
import HeaderComponent from './HeaderComponent'
import TabNews from './TabNews'

function Manager() {
  return (
    <div className=' flex min-h-screen bg-gray-50'>
    <TabNews/>
    <div className='p-4 ml-80 w-full'>
        <HeaderComponent name="account management"/>
        <div className='border-b-4'>
            <ManageAccount/>
        </div>
    <FooterComponent/>
    </div>
</div>
  )
}

export default Manager
