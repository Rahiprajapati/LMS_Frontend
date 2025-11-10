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
    <div style={{padding:'48px 0'}}>
      <div className="container">
        <div className="form-card">
          <h2>Register</h2>
          <form onSubmit={handelsubmit}>
            <input className="form-input" type="text" value={names} onChange={(e) => setnames(e.target.value)} placeholder="Name" required />
            <input className="form-input" type="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder="Email" required />
            <input className="form-input" type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Password" required />
            <button className="btn primary" type="submit" style={{width:'100%'}}>Register</button>
          </form>
          <p style={{textAlign:'center',marginTop:12}}>Already have an account? <button className="btn ghost" onClick={goToLogin}>Login</button></p>
          {user&&<p>Welcome, {user.name}!</p>}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;