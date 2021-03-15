import Product from './Product'

const ProductList = ({ orders }) => {
  return (
    <div style={{"max-width": "540px", "margin": "25px auto"}} >
      {/* Note: Since the data is not going to be updated, I'm using the array index as the key while mapping */}
      {/* However, if the array were to be updated then I would not do this */}
      {orders.map((order, i) => <Product key={i} order={order} />)}
    </div>
  )
}
  
export default ProductList;