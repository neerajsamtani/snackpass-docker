// client/src/App.js
import React, {useState, useEffect} from 'react'
import axios from "axios";
import Header  from './Header'
import ProductList from './ProductList'

const App = () => {

  // Fetch Orders from database
  const [orders, setOrders] = useState([])
  const hook = () => {
      axios
      .get('/api/trendingOrders')
      .then(response => {
          setOrders(response.data)
      })
  }
  useEffect(hook, [])

  return (
    <div className="App" >
        <Header />
        {/* Displat a Spinner while waiting for data to load */}
        {
          orders.length === 0 
          ? 
            (
              <div className="spinner-border text-primary" role="status" style={{"position": "fixed", "top": "50%", "left": "50%"}}>
              <span className="visually-hidden">Loading...</span>
            </div>
            )
          : 
            <ProductList orders={orders} />
        }
    </div>
  )
}

export default App;