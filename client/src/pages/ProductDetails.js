import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useCart } from '../context/cart.js';
import "../styles/Card.css";

const ProductDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProduct] = useState([]);
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
      <div className='row container-fluid mt-3 ms-2 mb-5'>
        <div className='col-lg-4 ms-3 d-flex justify-content-center'>
          <img className="text-dark img-responsive" src={`/api/v1/product/product-photo/${product._id}`} alt={product.name} style={{ width: '300px' }} />
        </div>
        <div className='col-lg-7'>
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

      <h1 className='mx-3'>Similar Products➡️ </h1>
      <div className='container'>
        {relatedProducts.length < 1 && <p className='text-center'>No Similar Product Found</p>}
        <div className='d-flex flex-wrap mb-3 sh'>
          {relatedProducts?.map(p => (
            <div className="card m-2" style={{ width: '18rem' }}>
              <img className="card-img-top text-dark" src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text text-dark">{p.description.substring(0, 30)}...</p>
                <p className="card-text text-dark">${p.price}</p>
                <div className='allbt'>
                  <button className="btn btn-primary bt" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                  <button className="btn btn-secondary bt"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem("cart", JSON.stringify([...cart, p]));
                      toast.success("Item Added to Cart")
                    }}
                  >ADD TO CART</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetails