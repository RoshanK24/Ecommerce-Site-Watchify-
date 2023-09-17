import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [question, setQuestion] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/register', { name, email, password, phone, address, question });
            if (res && res.data.success) {
                navigate('/login');
            }
        } catch (error) {
            console.log("123")
            console.log(error);
        }
    }

    return (
        <Layout title="Register - Watchify">
            <div className='register-bg'>
                <div className='form-container'>
                    <form onSubmit={handleSubmit}>
                        <h4 className='title'> Register Now </h4>
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
                                required />
                        </div>
                        <div className="mb-3">
                            <input type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                id="exampleInputPassword"
                                placeholder="Enter Password:"
                                required />
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
                        <div className="mb-3">                          <input type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            id="exampleInputAddress"
                            placeholder="Enter Your Address:"
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

export default Register;