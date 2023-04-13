import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import port from '../port';

const Signup = (props) => {

  
  const [credentials, setCredentials] = useState();

  let handleChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value}) 
  }

  const navigate = useNavigate();

  let handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${port}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
    });
    const json = await response.json();
    console.log(json)
    if(json.success){
      // Redirect and save auth tocken
      localStorage.setItem('token', json.jwtData)
      navigate('/login');
      console.log(json.success)
      props.showAlert("Account Create Successfully", "success")
    } else {
      console.log(json.success)
      props.showAlert("Invalid credentials", "danger")
    }  
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" class="form-control" name="name" id="name" aria-describedby="emailHelp" onChange={handleChange} />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} />
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" name="password" id="password" onChange={handleChange} />
        </div>
        <div class="mb-3">
          <label for="cpassword" class="form-label">Confirm Password</label>
          <input type="password" name="cpassword" class="form-control" id="cpassword" onChange={handleChange} />
        </div>
        
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
