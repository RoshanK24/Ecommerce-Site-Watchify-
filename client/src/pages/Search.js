import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart.js';
import { toast } from 'react-hot-toast';
import "../styles/Card.css";


const Search = () => {
    const [values, setValue] = useSearch();
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    return (
        <Layout title={"Search result"}>
            <div className='container'>
                <div className='sh text-center'>
                    <h1>Search Result</h1>
                    <h6>{values?.result.length < 1 ? "No product found" : `found ${values.result.length}`}</h6>
                    <div className='d-flex flex-wrap mb-3 justify-content-center'>
                        {values?.result?.map(p => (
                            <div className="card m-2" key={p._id} style={{ width: '18rem' }}>
                                <img className="card-img-top" src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                                <div className="card-body">
                                    <div className="card-name-price">
                                        <h5 className="card-title">{p.name}</h5>
                                        <h5 className="card-price">
                                            {p.price.toLocaleString("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                            })}
                                        </h5>
                                    </div>
                                    <p className="card-text ">
                                        {p.description.substring(0, 60)}...
                                    </p>
                                    <button className="bt btn btn-primary" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                    <button className="bt btn btn-secondary"
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
            </div>
        </Layout>
    )
}

export default Search