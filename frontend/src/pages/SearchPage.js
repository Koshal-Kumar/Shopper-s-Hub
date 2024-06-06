import React from 'react'
import Layout from '../components/layouts/Layout'
import { useSearch } from '../context/search'
import ProductCard from '../components/layouts/ProductCard'
import { Badge } from 'antd'

const SearchPage = () => {
    const [values,setValues] =useSearch()
  return (
    <Layout>
        <div className="page-width">
        <div className="body-search-container">
        
          <h1 className="mt-4">Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : ``}
          </h6>
          <div className=" mt-2 p-2 search-item-container">
            {values?.results.map((p) => (
            
            <Badge.Ribbon
            color="red"
            placement="start"
            text={`${p.discount}% off`}
            style={{ fontSize: '16px', padding: '6px 20px' }}
          >
                <ProductCard myProduct={p} />
              </Badge.Ribbon>
              
            ))}
          </div>
        </div>
      </div>
        
     
    </Layout>
  )
}

export default SearchPage
