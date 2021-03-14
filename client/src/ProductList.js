import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Product from './Product'

const ProductList = (props) => {

    const [products, setProducts] = useState([{
        "Order ID": 25583,
        "Restaurant": "Hogwarts",
        "Item Name": "Chicken Tikka Masala",
        "Quantity": 1,
        "Product Price": 8.95,
        "Total products": 12
      },
      {
        "Order ID": 25582,
        "Restaurant": "Hogwarts",
        "Item Name": "Tandoori King Prawn Masala",
        "Quantity": 1,
        "Product Price": 12.95,
        "Total products": 5
      }])

    // TODO: Use hook after populating database

    // const hook = () => {
    //     console.log('effect')
    //     axios
    //         .get('http://localhost:3001/Orders')
    //         .then(response => {
    //             console.log('promise fulfilled')
    //             setProducts(response.data.slice(0, 500))
    //         })
    // }

    // useEffect(hook, [])

    return (
      <>
        <h2>ProductList</h2>
            {products.map(productInfo => <Product 
                                            orderId={productInfo["Order ID"]} 
                                            restaurant={productInfo["Restaurant"]} 
                                            itemName={productInfo["Item Name"]} 
                                            quantity={productInfo["Quantity"]} 
                                            productPrice={productInfo["Product Price"]} 
                                            totalProducts={productInfo["Total Products"]} 
                                        />)}
      </>
    )
}
  
export default ProductList;