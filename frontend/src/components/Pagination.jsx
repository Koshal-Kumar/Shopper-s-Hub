import React from 'react'

const Pagination = () => {
    const [page,setPage] = useState(1);
    const [limit,setLimit] = useState(2);
    
  return (
    <>
      <div className="pagination-container">
          <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous" onClick={() => setPage(page > 1 ? page - 1 : 1)}>
        <span aria-hidden="true">«  </span>
        <span className="sr-only"> Previous</span>
      </a>
    </li>
    <li className="page-item">
      <a className="page-link" href="#" onClick={()=> setPage(1)}>
        1
      </a>
    </li>
    <li className="page-item">
      <a className="page-link" href="#" onClick={(e)=>{
         e.preventDefault();
        setPage(2)}}>
        2
      </a>
    </li>
    
    { meta.totalPages > 3 ? (
      <li style={{display: 'flex'}}>
        <a href="#"className="page-link"><span>...</span></a>
      <a className="page-link" href="#" onClick={(e)=>{
        e.preventDefault();
        setPage(3)}}>{meta.totalPages}</a>
    </li>
    ):(<li className="page-item">
      <a className="page-link" href="#" onClick={()=>setPage(3)}>
        3
      </a>
    </li>)
    }
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next" onClick={() => setPage(page < meta.totalPages ? page + 1 : page)}>
        <span className="sr-only">Next  </span>
        <span aria-hidden="true"> »</span>
      </a>
    </li>
  </ul>
</nav>

        </div>
    </>
  )
}

export default Pagination
