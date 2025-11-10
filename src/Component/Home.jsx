import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/Authprovider.jsx";

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");
  const handleGoToCourses = () => navigate("/courses");

  return (
    <div style={styles.hero}>
      <div style={styles.bgAnimation}></div>
      <div style={styles.container}>
        <div style={styles.contentBox}>
          <h1 style={styles.title}>Empower Your Learning Journey 🚀</h1>
          <p style={styles.subtitle}>
            Learn anytime, anywhere — explore interactive courses designed to help you grow and achieve more.
          </p>

          <div style={styles.btnGroup}>
            {user ? (
              user.role === "admin" ? (
                <>
                  <h3 style={styles.dashboardTitle}>Welcome Admin 👋</h3>
                  <button style={{ ...styles.btn, ...styles.primaryBtn }} onClick={handleGoToCourses}>
                    Manage Courses
                  </button>
                </>
              ) : (
                <>
                  <h3 style={styles.dashboardTitle}>Welcome {user.name || "Learner"} 👋</h3>
                  <button style={{ ...styles.btn, ...styles.primaryBtn }} onClick={handleGoToCourses}>
                    View Courses
                  </button>
                </>
              )
            ) : (
              <>
                <button
                  style={{ ...styles.btn, ...styles.primaryBtn, marginRight: 12 }}
                  onClick={handleLogin}
                >
                  Login
                </button>
                <button style={{ ...styles.btn, ...styles.ghostBtn }} onClick={handleRegister}>
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Video gallery removed from Home; use /videos route instead */}
    </div>
  );
};

/* 🎨 Inline Styling */
const styles = {
  hero: {
    position: "relative",
    height: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(135deg, #E3F2FD 0%, #ffffff 100%)",
    overflow: "hidden",
    fontFamily: "'Poppins', sans-serif",
  },
  bgAnimation: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background:
      "radial-gradient(circle at 20% 30%, rgba(30,136,229,0.12), transparent 70%), radial-gradient(circle at 80% 70%, rgba(21,101,192,0.1), transparent 60%)",
    animation: "moveBackground 10s ease-in-out infinite alternate",
    zIndex: 1,
  },
  container: {
    zIndex: 2,
    textAlign: "center",
    padding: "0 20px",
  },
  contentBox: {
    maxWidth: "750px",
    margin: "0 auto",
    animation: "slideUp 1.2s ease-out",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "700",
    color: "#1E88E5",
    marginBottom: "18px",
    letterSpacing: "0.5px",
    animation: "fadeInUp 1s ease",
  },
  subtitle: {
    fontSize: "1.15rem",
    color: "#444",
    lineHeight: "1.6",
    marginBottom: "30px",
    animation: "fadeInUp 1.3s ease",
  },
  dashboardTitle: {
    fontSize: "1.3rem",
    color: "#333",
    marginBottom: "12px",
    fontWeight: "600",
  },
  btnGroup: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "12px",
  },
  btn: {
    padding: "12px 28px",
    borderRadius: "8px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "1rem",
  },
  primaryBtn: {
    backgroundColor: "#1E88E5",
    color: "white",
    boxShadow: "0 4px 12px rgba(30,136,229,0.3)",
  },
  ghostBtn: {
    backgroundColor: "transparent",
    border: "2px solid #1E88E5",
    color: "#1E88E5",
  },
};

/* 🪄 Animations (added globally) */
const styleSheet = document.createElement("style");
styleSheet.textContent = `
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes moveBackground {
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
}

button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 18px rgba(30,136,229,0.3);
}

button:active {
  transform: scale(0.97);
}
`;
document.head.appendChild(styleSheet);

export default Home;
