import React from 'react'
import { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import axios from 'axios';
import { baseUrl } from '../../url';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


const Login = () => {
  const navigate = useNavigate();
    const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [showpassword,setShowPassword]=useState(false)

  function toggle(){
    setShowPassword(!showpassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data ={
      mail:emailId,
      password
    }
    
    const response=await axios.post(`${baseUrl}/login`,data)

    

    if(response.data && response.data.accessToken){
      localStorage.removeItem("token")
      localStorage.setItem("token",response.data.accessToken);
      navigate('/home')
      
    }
    else{
      alert('No user exists')
    }
  }

  const handleOAuth =async(data)=>{
    const response=await axios.post(`${baseUrl}/login`,data)
    console.log(response)

    

    if(response.data && response.data.accessToken){
      localStorage.removeItem("token")
      localStorage.setItem("token",response.data.accessToken);
      navigate('/home')
      
    }
    else{
      alert('No user exists')
    }

  }

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          placeholder="Email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />
        <div style={{display:'flex',alignItems:'center'}}>
        <input
          type= {showpassword? "text":"password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!showpassword ?<FaRegEyeSlash  style={{marginLeft:'5px'}} onClick={toggle}/>:
        <MdOutlineRemoveRedEye onClick={toggle} />
        }
        </div>

        <button type="submit">Login</button>
      </form>
      
  <GoogleLogin
  onSuccess={credentialResponse => {
    const token =credentialResponse.credential ;
    const decoded = jwtDecode(token);
    const data ={
    
      mail:decoded.email,
      password:credentialResponse.clientId
    }
    
    handleOAuth(data)
    
    

    
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
      <p>Dont have an account? <Link to="/">Sign up here</Link></p>
    </div>
  )
}

export default Login