import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
const Dashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout title={"User Dashboard - watchify"}>
            <div className='container-fluid m-3 p-3'>
                <dic className="row">
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9 '>
                        <h1 className="ps-3 pt-3">User Details</h1>
                        <div className='card w-75 p-3 text-dark'>
                            <h3>User Name: {auth?.user?.name}</h3>
                            <h3>User Email: {auth?.user?.email}</h3>
                            <h3>User Contact: {auth?.user?.phone}</h3>
                            <h3>User Address: {auth?.user?.address} </h3>
                        </div>
                    </div>
                </dic>
            </div>
        </Layout>
    )
}

export default Dashboard