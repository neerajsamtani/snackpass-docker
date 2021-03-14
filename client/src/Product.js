const Product = ({orderId, restaurant, itemName, quantity, productPrice, totalProducts}) => {
    return (
        <div>
            <ul>
                <li>{orderId} {restaurant} {itemName} {quantity} {productPrice} {totalProducts}</li>
            </ul>
        </div>
    )
  }
  
export default Product;