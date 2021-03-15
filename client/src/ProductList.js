import Product from './Product'

const ProductList = ({ orders }) => {
  return (
    <>
      {/* Note: Since the data is not going to be updated, I'm using the array index as the key while mapping */}
      {/* However, if the array were to be updated then I would not do this */}
      {orders.map((order, i) => <Product key={i} order={order} />)}
    </>
  )
}
  
export default ProductList;