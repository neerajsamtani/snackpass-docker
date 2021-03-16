import Product from './Product'

const ProductList = ({ orders }) => {
  return (
    <div style={{"maxWidth" : "500px", "margin": "25px auto"}} >
      {/* Note: Since the data is not going to be updated, I'm using the array index as the key while mapping through the array */}
      {/* However, if the array were to be updated then I would not do this */}
      {/* In production we would probably have product data cached in a separate table, and each product would have a unique id */}
      {orders.map((order, i) => <Product key={i} order={order} />)}
    </div>
  )
}
  
export default ProductList;