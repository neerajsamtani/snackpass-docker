// client/src/App.js
import React, {useState, useEffect} from 'react'
import axios from "axios";
import Header  from './Header'
import ProductList from './ProductList'

const App = (props) => {

  const [orders, setOrders] = useState([])

  const hook = () => {
      axios
      .get('/api/orders')
      .then(response => {
          setOrders(response.data)
      })
  }

  useEffect(hook, [])

  return (
    <div className="App" >
        <Header />
        {
          orders.length === 0 
          ? 
            (
              <div class="spinner-border text-primary" role="status" style={{"position": "fixed", "top": "50%", "left": "50%"}}>
              <span class="visually-hidden">Loading...</span>
            </div>
            )
          : 
            <ProductList orders={orders} />
        }
    </div>
  )
}

export default App;