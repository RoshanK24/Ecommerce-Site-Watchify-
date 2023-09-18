import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            <div className='text-center'>
                <div className="list-group bg-secondary mt-5 rounded">
                    <h3 className='pt-4'>Admin Panel</h3>
                    <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">
                        Create Category
                    </NavLink>
                    <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">
                        Create Product
                    </NavLink>
                    <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">
                        Product
                    </NavLink>
                    <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">
                        Orders
                    </NavLink>
                    <NavLink to="/dashboard/admin/profile" className="list-group-item list-group-item-action">
                        Profile
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default AdminMenu