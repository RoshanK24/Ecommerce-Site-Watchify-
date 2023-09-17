import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Product = () => {
  const [products, setProducts] = useState([]);

  //get all product
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <Layout title={"dashboard - Products"}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1 className='ps-3 pt-3'>All Product List</h1>
            <div className='d-flex flex-wrap'>
              {products?.map(p => (
                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>
                  <div className="card m-2" style={{ width: '18rem' }}>
                    <img className="card-img-top text-dark" src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                    <div className="card-body">
                      <h5 className="card-title text-dark">{p.name}</h5>
                      <p className="card-text text-dark">{p.description}</p>
                    </div>
                  </div>
                </Link>
              ))} 
            </div>
          </div>
        </div>
      </div>
    </Layout >
  )
}

export default Product;