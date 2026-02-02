import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {
    const loginUrl = "http://localhost:5102/auth/login"
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loginHandle = async (e) => {
        e.preventDefault()
        try {
            const loginRes = await axios.post(loginUrl, {
                email, password
            })
            localStorage.setItem("app", loginRes.data.jwtToken)
            alert("Loged In Successful")
            console.log("data", loginRes.data);
            return loginRes.data
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
      <form onSubmit={loginHandle}>
        <h3>Email:</h3>
        <input type="email" value= {email} onChange={(e) => setEmail(e.target.value)}/>
        <h3>Password: </h3>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Login
