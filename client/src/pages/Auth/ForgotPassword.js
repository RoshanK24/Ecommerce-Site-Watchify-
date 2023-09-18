import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [NewPassword, setNewPassword] = useState("");
    const [question, setQuestion] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();  
        try {
            const res = await axios.post('/api/v1/auth/forgot', { email, NewPassword, question });
            console.log(res);
            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    return (
        <Layout title="Forgot Password - Watchify">
            <div className='register-bg'>
                <div className='form-container'>
                    <form onSubmit={handleSubmit}>
                        <h4 className='title'> Reset Password </h4>
                        <div className="mb-3">
                            <input type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                id="exampleInputEmail"
                                placeholder="Enter Your Email:"
                                required />
                        </div>
                        <div className="mb-3">
                            <input type="password"
                                value={NewPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="form-control"
                                id="exampleInputNewPassword"
                                placeholder="Enter New Password:"
                                required />
                        </div>

                        <div className="mb-3">
                            <input type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                className="form-control"
                                id="exampleInputQuestion"
                                placeholder="What is your favorite sports:"
                                required />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>

        </Layout>
    )
}

export default ForgotPassword;