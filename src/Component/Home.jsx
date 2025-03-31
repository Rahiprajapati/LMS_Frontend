import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/Authprovider.jsx";

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");
  const handleGoToCourses = () => navigate("/addcourse");

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
      <h1 style={{ fontSize: "3rem", marginBottom: "20px", textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
        Welcome to Course Portal
      </h1>

      {user ? (
        user.role === "admin" ? (
          <>
            <h2>Admin Dashboard</h2>
            <button
              onClick={handleGoToCourses}
              style={{
                padding: "12px 24px",
                fontSize: "18px",
                backgroundColor: "#ff5722",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                boxShadow: "3px 3px 6px rgba(0,0,0,0.3)",
              }}
            >
              Manage Courses
            </button>
          </>
        ) : (
          <>
            <h2>User Dashboard</h2>
            <button
              onClick={handleGoToCourses}
              style={{
                padding: "12px 24px",
                fontSize: "18px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                boxShadow: "3px 3px 6px rgba(0,0,0,0.3)",
              }}
            >
              View Courses
            </button>
          </>
        )
      ) : (
        <div>
          <button
            onClick={handleLogin}
            style={{
              padding: "12px 24px",
              fontSize: "18px",
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginRight: "10px",
              boxShadow: "3px 3px 6px rgba(0,0,0,0.3)",
            }}
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            style={{
              padding: "12px 24px",
              fontSize: "18px",  //rgb(26, 255, 0)
              background: "linear-gradient(135deg,rgb(18, 200, 103),rgb(6, 239, 115))",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "3px 3px 6px rgba(0,0,0,0.3)",
            }}
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
