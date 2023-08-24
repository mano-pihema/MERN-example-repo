import './App.css'

import { useState, useEffect } from 'react'

import Axios from 'axios'

function App() {
  const [list, setList] = useState([])

  const [form, setForm] = useState({ name: '', age: 0, username: '' })

  useEffect(() => {
    Axios.get('http://localhost:3001/getUsers').then((response) => {
      setList(response.data)
    })
  }, [])

  function inputHandler(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function subHandler(e) {
    e.preventDefault()
    Axios.post('http://localhost:3001/addUsers', form).then(() => {
      setList([...list, form])
    })
  }

  return (
    <div className="App">
      <div className="userDisplay">
        {list.map((user) => {
          return (
            <div>
              <h1>{user.name}</h1>
              <h1>{user.age}</h1>
              <h1>{user.username}</h1>
            </div>
          )
        })}
      </div>
      <div>
        <input
          type="text"
          placeholder="name"
          name="name"
          onChange={inputHandler}
        />
        <input
          type="number"
          placeholder="age"
          name="age"
          onChange={inputHandler}
        />
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={inputHandler}
        />
        <button onClick={subHandler}>submit</button>
      </div>
    </div>
  )
}

export default App
