import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/Authprovider.jsx';

const Login = () => {
  const { login } = useContext(UserContext); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);  // Call login function
      
      if (res) { // Check if login was successful
        setMessage('Login successful! Redirecting...');
        
        // Redirect user based on role
        if (res.role === 'admin') {
          navigate('/courses'); // Admin navigates to course management
        } else {
          navigate('/courses'); // Normal user navigates to view courses
        }
      } else {
        setMessage('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
    }
  };

  const goToRegister = () => navigate('/register');

  return (
    <div
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #1E90FF, #FF69B4)",
      color: "white",
      textAlign: "center",}}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: '300px',
          boxShadow: '2px 3px 5px rgba(0, 0, 0, 0.2)',
          padding: '30px',
          border: '1px solid #ddd',
          borderRadius: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.46)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{ width: '93%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }}
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ width: '93%', padding: '10px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '5px' }}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            background: "linear-gradient(135deg, #6a11cb, #2575fc)",
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Login
        </button>

        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          Don't have an account?{' '}
          <button
            type="button"
            onClick={goToRegister}
            style={{
              background: 'none',
              border: 'none',
              color: 'blue',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Register
          </button>
        </p>

        {message && <p style={{ textAlign: 'center', marginTop: '10px', color: 'green' }}>{message}</p>}
      </form>
    </div>
  );
};

export default Login;
