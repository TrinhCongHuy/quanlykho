import React from 'react'
import NewsTable from '../News/NewsTable'
import HeaderComponent from './HeaderComponent'
import Dashboard from './Dashboard'
import FooterComponent from '../Footer/FooterComponent'
import MediaTable from '../Media/MediaTable'

function DefautComponent() {
  return (
    <div className=' flex min-h-screen bg-gray-50'>
        <Dashboard/>
        <div className='p-4 ml-80 w-full'>
            <HeaderComponent name="news"/>
            <div className='border-b-4'>
                <NewsTable/>
            </div>
            <div>
              <MediaTable/>
            </div>
        <FooterComponent/>
        </div>
    </div>
  )
}

export default DefautComponent
