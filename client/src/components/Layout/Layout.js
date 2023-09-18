import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast';
/*===========SEO===========*/
import { Helmet } from "react-helmet"; 


const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div style={{maxWidth: "100vw"}}>
            <Helmet>
                <meta charSet='utf-8' />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>

            <Header />
            <main style={{ minHeight: "80vh" }}>
                <Toaster />
                {children}
            </main>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: "Watchify",
    description: "mern stack project",
    keywords: "mern, react, node, mongodb, express",
    author: "SPidER"
}

export default Layout