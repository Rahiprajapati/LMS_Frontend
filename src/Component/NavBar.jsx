import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/Authprovider.jsx";
import logo from "./Assets/Logo.png"; 

const NavBar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");

          * {
            box-sizing: border-box;
            font-family: "Poppins", sans-serif;
          }

          .site-header {
            position: sticky;
            top: 0;
            width: 100%;
            z-index: 1000;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          }

          .nav-inner {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 40px;
            transition: all 0.3s ease;
          }

          .brand {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: #1E88E5;
            font-weight: 600;
            font-size: 1.4rem;
            transition: transform 0.3s ease;
          }

          .brand:hover {
            transform: scale(1.03);
          }

          .brand img {
            height: 40px;
            width: auto;
            margin-right: 10px;
            border-radius: 8px;
          }

          .menu-toggle {
            display: none;
            background: none;
            border: none;
            font-size: 1.8rem;
            cursor: pointer;
            color: #1E88E5;
          }

          .main-nav {
            display: flex;
            align-items: center;
            gap: 25px;
            transition: all 0.3s ease;
          }

          .main-nav a {
            color: #222;
            text-decoration: none;
            font-weight: 500;
            position: relative;
            transition: color 0.3s ease;
          }

          .main-nav a::after {
            content: "";
            position: absolute;
            bottom: -3px;
            left: 0;
            width: 0%;
            height: 2px;
            background: #1E88E5;
            transition: width 0.3s ease;
          }

          .main-nav a:hover {
            color: #1E88E5;
          }

          .main-nav a:hover::after {
            width: 100%;
          }

          .auth-links {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .btn {
            border: none;
            outline: none;
            cursor: pointer;
            border-radius: 8px;
            padding: 7px 16px;
            font-weight: 500;
            transition: all 0.3s ease;
          }

          .btn.primary {
            background: linear-gradient(90deg, #1E88E5, #1565C0);
            color: #fff;
          }

          .btn.primary:hover {
            transform: scale(1.05);
          }

          .btn.logout {
            background: linear-gradient(90deg, #E53935, #C62828);
            color: #fff;
          }

          .btn.logout:hover {
            transform: scale(1.05);
          }

          /* MOBILE DESIGN */
          @media (max-width: 900px) {
            .nav-inner {
              padding: 12px 25px;
              flex-wrap: wrap;
            }

            .menu-toggle {
              display: block;
            }

            .main-nav {
              width: 100%;
              flex-direction: column;
              align-items: flex-start;
              background: rgba(255,255,255,0.95);
              border-top: 1px solid #ddd;
              border-radius: 10px;
              padding: 0 20px;
              margin-top: 8px;
              max-height: 0;
              opacity: 0;
              overflow: hidden;
              transform: translateY(-10px);
              transition: all 0.4s ease;
            }

            .main-nav.open {
              max-height: 400px;
              opacity: 1;
              transform: translateY(0);
              padding: 10px 20px 15px;
            }

            .auth-links {
              width: 100%;
              justify-content: flex-start;
              gap: 10px;
              margin-top: 10px;
            }

            .auth-links .btn {
              font-size: 0.9rem;
              padding: 6px 14px;
            }

            .main-nav a {
              padding: 5px 0;
            }
          }
        `}
      </style>

      <header className="site-header">
        <div className="nav-inner">
          <Link to="/" className="brand">
            <img src={logo} alt="EduLMS Logo" />
            EduLMS
          </Link>

          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>

          <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
            <Link to="/">Home</Link>
            <Link to="/courses">Courses</Link>

            {!user ? (
              <div className="auth-links">
                <Link to="/login" className="btn primary">
                  Login
                </Link>
                <Link to="/register" className="btn primary">
                  Register
                </Link>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
                {user.role === "user" && (
                  <Link to="/my-courses" className="nav-link">
                    My Courses
                  </Link>
                )}
                {user.role === "admin" && (
                  <Link to="/admin/courses" className="nav-link">
                    Admin
                  </Link>
                )}
                <button className="btn logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default NavBar;
