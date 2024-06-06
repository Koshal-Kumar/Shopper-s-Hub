import React from "react";
import Header from "./Header";
import Footer from "./Footer.js";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";

const Layout = ({ children, title, description, author, keywords }) => {
  return (
    <div>
      <Helmet>
        <meta charset="utf-8" />
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        <meta name="keywords" content={keywords} />
        <title>{title}</title>
      </Helmet>
      <div className="body-container">
        <div className="header-container">
          <div className="page-width">
            <Header />
          </div>
        </div>
         
        {/* <div className="page-width"> */}
          <ToastContainer />
          <main className="layout-main">{children}</main>
       
        {/* </div> */}
        <div className="footer-container">
          <div className="page-width">
          <Footer />
          </div>
        </div>
        
      </div>
    </div>
  );
};

Layout.defaultProps = {
  title: "shopper's Bay",
  description: "e-commerce website",
  author: "Koshal Kumar",
  keywords: "shopper, mern , react , node ,mongodb",
};

export default Layout;
