import React from 'react'
import Layout from '../components/Layout/Layout.js'

const PageNotFound = () => {
  return (
    <Layout>
      <div className='pnf'>
        <h1 className='num'>404</h1>
        <h1 className='text'>Page not found...</h1>
      </div>

    </Layout>
  )
}

export default PageNotFound