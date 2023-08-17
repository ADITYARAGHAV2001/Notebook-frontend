import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const [credentials,setCredentials] = useState({name: "",email: "",password:"",cpassword: ""})
    const navigate = useNavigate();
    // const host = "https://notebook-backend-ydvu.onrender.com" 
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const  {name,email,password} = credentials;
        const response = await fetch("https://notebook-backend-ydvu.onrender.com/api/auth/createuser", {
          
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({name,email,password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            // save the auth token and redirect to home
            localStorage.setItem('token',json.authtoken);
            navigate('/');
            props.showAlert("User Created Successfully","success");
        }
        else{
            props.showAlert("Invalid Credentials","danger");
        }
       
    }

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    } 
  return (
    <div className='container' >
      <form onSubmit={handleSubmit}>
  <div className="mb-3" >
    <label htmlFor="name" className="form-label">Name</label>
    <input type="name" className="form-control" id="name" name = "name"  aria-describedby="emailHelp" onChange={onchange} minLength={5} required/>
    </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name = "email"  aria-describedby="emailHelp" onChange={onchange} minLength={5} required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name = "password" onChange={onchange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm - Password</label>
    <input type="password" className="form-control" id="cpassword" name = "cpassword" onChange={onchange} minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default SignUp
