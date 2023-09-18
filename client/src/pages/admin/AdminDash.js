import React from 'react'
import Layout from "./../../components/Layout/Layout.js"
import AdminMenu from '../../components/Layout/AdminMenu.js'
import { useAuth } from '../../context/auth.js'
const AdminDash = () => {
    const [auth] = useAuth();
    return (
        <Layout title={"Admin Dashboard - watchify"}>
            <div className='container-fluid m-3 p-3'>
                <div className="row">
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1 className="ps-3 pt-3">Admin Details</h1>
                        <div className='card w-75 p-3 mt-4 text-dark'>
                            <h3>Admin Name: {auth?.user?.name}</h3>
                            <h3>Admin Email: {auth?.user?.email}</h3>
                            <h3>Admin Contect: {auth?.user?.phone}</h3>
                            <h3>Admin Address: {auth?.user?.address} </h3>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDash