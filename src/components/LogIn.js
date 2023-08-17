import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LogIn = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const navigate = useNavigate();
  const host = "https://notebook-backend-ydvu.onrender.com"
  const handleSubmit = async (e) => {
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem('token', json.authtoken);
        props.showAlert("Logged In Successfully", "success");
        navigate('/');
      } else {
        props.showAlert("Invalid Credentials", "danger");
      }
    } catch (error) {
      console.error("Error during fetch: ", error);
      props.showAlert("Error connecting to the server.", "danger");
    }


  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id='email' name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id='password' name='password' value={credentials.password} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default LogIn
