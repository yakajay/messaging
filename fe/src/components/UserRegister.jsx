import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const UserRegister = () => {
    const getUserRes = "http://localhost:5102/auth/register";

    const [username, setUsername] = useState(" ")
    const [password, setPassword] = useState(" ")
    const [email, setEmail] = useState(" ")

    const userHandler = async (e) => {
        e.preventDefault()
        try {
            const userRes = await axios.post(getUserRes, {
                username, password, email
            })
            alert("Registration Successful")
            return res.json(userRes)
        } catch (error) {
            console.log("Failed Registration");
        }
    }
  return (
    <div>
      <form onSubmit={userHandler}>
        <h3>Username:</h3>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <h3>Email:</h3>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <h3>Password:</h3>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default UserRegister
