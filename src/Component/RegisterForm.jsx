import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/Authprovider.jsx';
const RegisterForm = () => {
  const{register,user}=useContext(UserContext)
  const [names, setnames] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();
  const handelsubmit = async(e) => {
    e.preventDefault();
    try{
      await register(names, email, password);  // ✅ Corrected
      navigate('/login')
      
    }
    catch (error) {
      console.error('Registration failed:', error);
      alert("Registration failed. Please try again.");
    }
};
const goToLogin = () => {
  navigate('/login'); // Redirects to login page
};

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
      textAlign: "center",
    }}
    >
      <form
        onSubmit={handelsubmit} 
        style={{
          width: '300px',
          boxShadow: '2px 3px 5px rgba(0, 0, 0, 0.2)', 
          padding: '30px', 
          border: '1px solid #ddd', 
          borderRadius: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.46)', 
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2> 

        <input
          type="text"
          value={names}
          onChange={(e) => setnames(e.target.value)}
          placeholder="Name"
          required
          style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }}
        />

        <input
          type="email" 
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="Email"
          required
          style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }}
        />

        <input
          type="password" 
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Password"
          required
          style={{ width: '100%', padding: '10px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '5px' }}
        />

        <button
          type="submit" 
          style={{
            width: '100%',
            padding: '12px',
            background: "linear-gradient(135deg,rgb(5, 201, 96),rgb(0, 163, 49))",
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Register
        </button>
        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          Already have an account?{' '}
          <button
            type="button"
            onClick={goToLogin}
            style={{
              background: 'none',
              border: 'none',
              color: 'blue',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Login
          </button>
        </p>
      </form>
      {user&&<p>Welcome, {user.name}!</p>}
    </div>
  );
};

export default RegisterForm;