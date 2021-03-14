// client/src/App.js
import React, {useState, useEffect} from 'react'
import axios from "axios";
import Header  from './Header'
import ProductList from './ProductList'

const App = (props) => {

  const [orders, setOrders] = useState([])

  const hook = () => {
      console.log('effect')
      axios
          .get('/api/orders')
          .then(response => {
              console.log('promise fulfilled')
              setOrders(response.data)
          })
  }

  useEffect(hook, [])

  return (
    <div className="App">
        <Header />
        <ProductList />
        {orders}
    </div>
  )
}

export default App;