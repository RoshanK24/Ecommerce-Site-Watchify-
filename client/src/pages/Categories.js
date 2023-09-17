import React from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <h1 className='text-center mt-3' >All Categories</h1>
      <div className='container'>
        <div className='row container'>
          {categories?.map((c) => (
            <div className='col-md-6 mt-5 mb-3 gx-3 gy-3'>
              <div className='card'>
                <Link to={`/category/${c.slug}`} className='btn btn-primary'>
                  {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Categories