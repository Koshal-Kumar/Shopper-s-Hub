import React from 'react'

const ItemCard = () => {
  return (
    <div className="product-card rounded-md border-2 border" key={item.item_id}>
    <div className="product-card-image w-40 h-40">
      <img src={`images/items-img/${item.image}`} alt={items.name} />
    </div>
    <div className="product-card-content align-center w-full">
      <h3 className="text-center">{item.name}</h3>
      <h2 className="product-card-price text-center">{item.price}</h2>
      {renderQuantityControls(item)}
    </div>
  </div>
  )
}

export default ItemCard
