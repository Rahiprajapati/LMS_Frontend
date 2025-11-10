// import { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../Context/Authprovider.jsx';

// const Login = () => {
//   const { login } = useContext(UserContext); 
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await login(email, password);  // Call login function
      
//       if (res) { // Check if login was successful
//         setMessage('Login successful! Redirecting...');
        
//         // Redirect user based on role
//         if (res.role === 'admin') {
//           navigate('/courses'); // Admin navigates to course management
//         } else {
//           navigate('/courses'); // Normal user navigates to view courses
//         }
//       } else {
//         setMessage('Invalid credentials. Please try again.');
//       }
//     } catch (error) {
//       setMessage('Login failed. Please check your credentials.');
//     }
//   };

//   const goToRegister = () => navigate('/register');

//   return (
//     <div style={{padding:'48px 0'}}>
//       <div className="container">
//         <div className="form-card">
//           <h2>Login</h2>
//           <form onSubmit={handleSubmit}>
//             <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
//             <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
//             <button className="btn primary" type="submit" style={{width:'100%'}}>Login</button>
//           </form>
//           <p style={{textAlign:'center',marginTop:12}}>Don't have an account? <button className="btn ghost" onClick={goToRegister}>Register</button></p>
//           {message && <p style={{ textAlign: 'center', marginTop: '10px', color: 'green' }}>{message}</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;






import { useContext, useState } from 'react';
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
      const res = await login(email, password);
      if (res) {
        setMessage('Login successful! Redirecting...');
        if (res.role === 'admin') {
          navigate('/courses');
        } else {
          navigate('/courses');
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
    <>
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");

          * {
            font-family: "Poppins", sans-serif;
            box-sizing: border-box;
          }

          .login-wrapper {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #f9fafc, #e3f2fd);
            padding: 20px;
          }

          .form-card {
            background: #ffffff;
            padding: 40px 35px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            width: 100%;
            max-width: 400px;
            text-align: center;
          }

          .form-card h2 {
            color: #1E88E5;
            font-weight: 600;
            margin-bottom: 25px;
          }

          .form-input {
            width: 100%;
            padding: 12px 14px;
            border: 1px solid #ccc;
            border-radius: 8px;
            margin-bottom: 18px;
            outline: none;
            font-size: 0.95rem;
            transition: all 0.3s ease;
          }

          .form-input:focus {
            border-color: #1E88E5;
            box-shadow: 0 0 0 2px rgba(30, 136, 229, 0.2);
          }

          .btn {
            border: none;
            outline: none;
            cursor: pointer;
            border-radius: 8px;
            padding: 10px 16px;
            font-weight: 500;
            font-size: 1rem;
            transition: all 0.3s ease;
          }

          .btn.primary {
            background-color: #1E88E5;
            color: #fff;
            width: 100%;
          }

          .btn.primary:hover {
            background-color: #1565C0;
          }

          .btn.ghost {
            background: transparent;
            color: #1E88E5;
            border: 1px solid #1E88E5;
            font-size: 0.9rem;
            padding: 6px 12px;
            border-radius: 6px;
            transition: all 0.3s ease;
          }

          .btn.ghost:hover {
            background-color: #E3F2FD;
          }

          .form-footer {
            margin-top: 15px;
            color: #444;
            font-size: 0.9rem;
          }

          .message {
            text-align: center;
            margin-top: 12px;
            font-weight: 500;
          }

          @media (max-width: 480px) {
            .form-card {
              padding: 30px 20px;
            }

            .form-card h2 {
              font-size: 1.4rem;
            }
          }
        `}
      </style>

      <div className="login-wrapper">
        <div className="form-card">
          <h2>Welcome Back 👋</h2>
          <form onSubmit={handleSubmit}>
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button className="btn primary" type="submit">
              Login
            </button>
          </form>
          <p className="form-footer">
            Don't have an account?{" "}
            <button className="btn ghost" onClick={goToRegister}>
              Register
            </button>
          </p>
          {message && (
            <p
              className="message"
              style={{
                color: message.includes("Invalid") || message.includes("failed") ? "red" : "green",
              }}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
