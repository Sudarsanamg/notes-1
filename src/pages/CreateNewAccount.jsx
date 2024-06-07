import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/css.css';
import axios from 'axios';
import { baseUrl } from '../../url';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";




const CreateNewAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let errors = {};
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length === 0) {
      try {
        // Send POST request to create user
        const data={
          name:formData.username,
          mail:formData.email,
          password:formData.password
        }
        const response = await axios.post(`${baseUrl}/create-account`, data);
        // Log the response from the server
        if(response.data && response.data.accessToken){
          localStorage.removeItem("token")
          localStorage.setItem("token",response.data.accessToken);
          navigate('/login'); // Redirect to login page after successful registration
        }

        

      } catch (error) {
        console.error('Error creating user:', error);
        if (error.response && error.response.data && error.response.data.error) {
          setErrors({ server: error.response.data.error });
        } else {
          setErrors({ server: 'An error occurred while creating the user' });
        }
      }
    } else {
      setErrors(errors);
    }
  };

  const  handleOAuth =async(credentialResponse)=>{
    const token =credentialResponse.credential ;
    //console.log(credentialResponse.credential)
    const decoded = jwtDecode(token);
    //console.log(credentialResponse.clientId)
    if(decoded.email_verified==true){
      try {
        
      
      const data ={
        name:decoded.name,
        mail:decoded.email,
        password:credentialResponse.clientId
      }
      //console.log(data)
      let response = await axios.post(`${baseUrl}/create-account`, data);
    
      // Log the response from the server
      response=await axios.post(`${baseUrl}/login`,{
        mail:decoded.email,
        password:credentialResponse.clientId

      })
    console.log(response)

    

    if(response.data && response.data.accessToken){
      localStorage.removeItem("token")
      localStorage.setItem("token",response.data.accessToken);
      navigate('/home')
      
    }
    else{
      alert('No user exists')
    }
      
    
     } catch (error) {
        console.error('Error creating user:', error);
        if (error.response && error.response.data && error.response.data.error) {
          setErrors({ server: error.response.data.error });
        } else {
          setErrors({ server: 'An error occurred while creating the user' });
        }
      }
    }
    
  }
  return (
    <div className="form-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Create Account</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
      <GoogleLogin
  onSuccess={credentialResponse => {
    //console.log(credentialResponse);
    handleOAuth(credentialResponse)

  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
      {errors.server && <div className="text-danger">{errors.server}</div>}
    </div>
  );
};

export default CreateNewAccount;
