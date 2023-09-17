import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { toast } from "react-hot-toast";

const AdminOrders = () => {
    const [status] = useState([
        "Not Process",
        "Processing",
        "Shipped",
        "Deliverd",
        "cancel",
    ]);
    const [orders, setOrders] = useState([]);
    const [auth] = useAuth();
    const getOrders = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/all-orders");
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    const handleChange = async (orderId, value) => {
        try {
            console.log(value, orderId)
            const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
                st: value,
            });
            console.log(data)
            toast.success("Status changed");
            getOrders();
        } catch (error) {
            toast.error("Status not changed");
            console.log(error);
        }
    };
    return (
        <Layout title={"All Orders Data"}>
            <div className="container-fluid p-3 m-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center">All Orders</h1>
                        {orders?.map((o, i) => {
                            return (
                                <div className="shadow pe-3">
                                    <table className="table mb-0 mt-2">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Buyer</th>
                                                <th scope="col"> date</th>
                                                <th scope="col">Payment</th>
                                                <th scope="col">Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>
                                                {/* <Select
                                                        bordered={false}
                                                        onChange={(value) => handleChange(o._id, value)}
                                                        defaultValue={o?.status}
                                                        className="text-dark"
                                                    >
                                                        {status.map((s, i) => (
                                                            <Option key={i} value={s} className="text-dark">
                                                                {s}
                                                            </Option>
                                                        ))}
                                                    </Select> */}

                                                    <div className="nav-item dropdown">
                                                        <div className="nav-link dropdown-toggle text-light p-0 " data-bs-toggle="dropdown" aria-expanded="false">
                                                            {o?.status}
                                                        </div>
                                                        <ul className="dropdown-menu text-dark" >
                                                            {status?.map(c => (
                                                                <li><div className="dropdown-item" onClick={() => handleChange(o._id, c)}>{c}</div></li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td>{o?.buyer?.name}</td>
                                                <td>{moment(o?.createAt).fromNow()}</td>
                                                <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                                <td>{o?.products?.length}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="container">
                                        {o?.products?.map((p, i) => (
                                            <div className="row p-3 card flex-row rounded-0" key={p._id}>
                                                <div className="col-md-2">
                                                    <img
                                                        src={`/api/v1/product/product-photo/${p._id}`}
                                                        alt={p.name}
                                                        width={"150px"}
                                                        height={"150px"}
                                                    />
                                                </div>
                                                <div className="col-md-7 text-dark">
                                                    <h5>{p.name}</h5>
                                                    <p className="text-dark">{p.description.substring(0, 50)}....</p>
                                                    <h6>Price : {p.price}</h6>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminOrders;