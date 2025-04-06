import React, { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      setPassword('');
      setConfirmPassword('');
      return;
    }
    

    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', {
        name,
        email,
        phone,
        address,
        password,
      });


      if (response.status === 200) {
        alert('Signup successful!');
        navigate('/'); // Redirect user to the home page
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data); // Show error message from backend
      } else {
        console.error('Signup error:', error);
        alert('Something went wrong. Please try again.');
      }
    }

    // Here, you would handle your signup logic, such as sending data to an API
    // const signupSuccessful = true; // Replace this with your actual signup validation logic

    // if (signupSuccessful) {
    //   // Redirect to the home page on successful signup
    //   navigate('/home'); // Replace '/home' with your actual home page route
    // } else {
    //   alert("Signup failed. Please try again.");
    // }
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Full Name" 
          required
        />
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required
        />
        <input 
          type="tel" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          placeholder="Phone Number" 
          pattern="[0-9]{10}" 
          title="Enter a valid 10-digit phone number"
          required
        />
        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          placeholder="Address" 
          required
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required
        />
        <input 
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          placeholder="Confirm Password" 
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
