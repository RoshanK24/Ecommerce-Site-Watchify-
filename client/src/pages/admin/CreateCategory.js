import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { toast } from 'react-hot-toast';
import { Modal } from "antd"; 

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    //handle form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/category/create-category', { name, })
            if (data?.success) {
                toast.success(`${name} is created`);
                setName("");
                getAllCategory();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    //get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category');
            if (data?.success) {
                setCategories(data?.category);
            }
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCategory();
    }, [])

    //update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updatedName });
            if (data.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    //delete category
    const handleDelete = async (pId, cName) => {
        try {
            const { data } = await axios.delete(`/api/v1/category/delete-category/${pId}`);
            if (data?.success) {
                toast.success(`${cName} is deleted`);
                getAllCategory();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <Layout title={"dashboard - Create category"}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1 className='ps-3 pt-3'>
                            Manage Category
                        </h1>
                        <div className='p-3 w-75'>
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div className='w-75'>
                            <table className="table table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((c) => {
                                        return <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td className='d-flex funlogodiv'>
                                                    <div><img className='funlogo' src='/images/edit.png' onClick={() => { setVisible(true); setUpdatedName(c.name); setSelected(c); }}></img></div>
                                                    <div><img className='funlogo' src='/images/delete.png' onClick={() => { handleDelete(c._id, c.name) }}></img></div> 
                                                </td>
                                            </tr>
                                        </>
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <Modal onCancle={() => setVisible(false)} footer={null} visible={visible}>
                            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default CreateCategory;