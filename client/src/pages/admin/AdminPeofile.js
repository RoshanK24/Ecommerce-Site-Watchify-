import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { toast } from 'react-hot-toast';
import "../../styles/Profile.css";
import AdminMenu from '../../components/Layout/AdminMenu';

const AdminProfile = () => {
    //context 
    const [auth, setAuth] = useAuth();

    //state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");


    //get user data 
    useEffect(() => {
        const { name, email, phone, address } = auth?.user;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
    }, [auth?.user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put('/api/v1/auth/profile', { name, email, password, phone, address });
            if (data?.error) {
                toast.error(data?.message)
            }
            else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem('auth');
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem('auth', JSON.stringify(ls));
                toast.success("Profile Updated Successfully")

            }
        } catch (error) {
            console.log(password)
            console.log(error);
        }
    }
    return (
        <Layout title={"User Dashboard - watchify"}>
            <div className='container-fluid m-3 p-3 prof'>
                <dic className="row">
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-8 mt-4'>
                        <div className='register'>
                            <div className='form-container'>
                                <form onSubmit={handleSubmit}>
                                    <h4 className='title'> User Profile </h4>
                                    <div className="mb-3">
                                        <input type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="form-control"
                                            id="exampleInputName"
                                            placeholder="Enter Your Name:"
                                            required />
                                    </div>
                                    <div className="mb-3">
                                        <input type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="form-control"
                                            id="exampleInputEmail"
                                            placeholder="Enter Your Email:"
                                            disabled
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="form-control"
                                            id="exampleInputPassword"
                                            placeholder="Enter Password:"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="form-control"
                                            id="exampleInputPhone"
                                            placeholder="Enter Your Number:"
                                            required />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="form-control"
                                            id="exampleInputAddress"
                                            placeholder="Enter Your Address:"
                                            required />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </dic>
            </div>
        </Layout>
    )
}

export default AdminProfile;