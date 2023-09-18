import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <>
            <div className='text-center'>
                <div className="list-group bg-secondary mt-5 rounded">
                    <h2 className='mt-3'>Dashboard</h2>
                    <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">
                        Profile
                    </NavLink>
                    <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">
                        Orders
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default UserMenu;