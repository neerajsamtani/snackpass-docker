// client/src/App.js
import React, {useState, useEffect} from 'react'
import axios from "axios";

const App = (props) => {

  const [message, setMessage] = useState("none")

  const hook = () => {
      console.log('effect')
      axios
          .get('/welcome')
          .then(response => {
              console.log('promise fulfilled')
              setMessage(response.data)
          })
  }

  useEffect(hook, [])

  return (
    <div className="App">
        <h1>"Hello server!" says the client. How are you?</h1>
        <h1>"{message}" says the server</h1>
      </div>
  )
}

export default App;