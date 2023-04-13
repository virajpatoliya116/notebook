import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import port from '../port';
const host = port
const Login = (props) => {

  const [credentials, setCredentials] = useState({email: "", password: ""})

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json();
    console.log(json)
    if(json.success){
      // Redirect and save auth tocken
      localStorage.setItem('token', json.jwtData)
      props.showAlert("Login Succesfully", "success")
      navigate('/');
      console.log(json.success)
    } else {
      console.log(json.success)
      props.showAlert("Invalid Details", "danger")
    }
  }
  
  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange}/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login
