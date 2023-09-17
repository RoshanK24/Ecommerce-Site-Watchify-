import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useCart } from '../context/cart.js';

const ProductDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const navigate = useNavigate();

  //inirial product details
  useEffect(() => {
    if (params?.slug) getProduct();
    //eslint-disable-next-line
  }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  }

  //get Similar Product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/related-procuct/${pid}/${cid}`)
      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout title={"Product-Details"}>
      <div className='row container mt-3 ms-2 mb-5'>
        <div className='col-md-3 ms-3'>
          <img className="text-dark" src={`/api/v1/product/product-photo/${product._id}`} alt={product.name} height={"300px"} width={"300px"} />
        </div>
        <div className='col-md-6'>
          <h1 className='text-center'>Product Details</h1>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Price: ${product.price}</h6>
          <h6>Category: {product.category?.name}</h6>
          <button className="btn btn-secondary ms-1"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to Cart")
            }}
          >ADD TO CART</button>
        </div>
      </div>
      <div className='row container ms-2'>
        <h1>Similar Products</h1>
        {relatedProduct.length < 1 && <p className='text-center'>No Similar Product Found</p>}
        <div className='d-flex flex-wrap mb-3'>
          {relatedProduct?.map(p => (
            <div className="card m-2" style={{ width: '18rem' }}>
              <img className="card-img-top text-dark" src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text text-dark">{p.description.substring(0, 30)}...</p>
                <p className="card-text text-dark">${p.price}</p>
                <button className="btn btn-primary m1-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                <button className="btn btn-secondary ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("Item Added to Cart")
                  }}
                >ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetails