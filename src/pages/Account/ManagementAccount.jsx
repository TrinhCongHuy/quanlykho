import React from 'react'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import ManageAccount from '../../admin/Account/ManageAccount'

function ManagementAccount() {
  return (
    <div>
    <HeaderComponent name="Quản lý tài khoản"/>
    <ManageAccount/>
</div>
  )
}

export default ManagementAccount
