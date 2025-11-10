import '../css/addcourse.css';
const Footer = () => {
  return (
    <>
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap");

          * {
            font-family: "Poppins", sans-serif;
            box-sizing: border-box;
          }

          .site-footer {
            background: linear-gradient(135deg, #f9fbff, #e8f1ff);
            border-top: 1px solid #d0e2ff;
            padding: 18px 40px; /* reduced height */
            text-align: center;
            color: #444;
            font-size: 0.9rem;
            box-shadow: 0 -1px 6px rgba(30, 136, 229, 0.08);
            margin-top: 40px;
            animation: fadeIn 1s ease-in;
          }

          .footer-inner {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
          }

          .footer-links {
            display: flex;
            gap: 18px;
            margin-top: 4px;
            flex-wrap: wrap;
            justify-content: center;
          }

          .footer-links a {
            text-decoration: none;
            color: #1E88E5;
            font-weight: 500;
            position: relative;
            transition: color 0.3s ease;
            font-size: 0.9rem;
          }

          .footer-links a::after {
            content: "";
            position: absolute;
            width: 0%;
            height: 2px;
            left: 0;
            bottom: -2px;
            background: #1E88E5;
            transition: width 0.3s ease;
          }

          .footer-links a:hover {
            color: #1565C0;
          }

          .footer-links a:hover::after {
            width: 100%;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @media (max-width: 768px) {
            .site-footer {
              padding: 15px 20px;
              font-size: 0.85rem;
            }

            .footer-links {
              flex-direction: column;
              gap: 6px;
            }
          }
        `}
      </style>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} <strong>EduLMS</strong> — Practice project</p>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;


