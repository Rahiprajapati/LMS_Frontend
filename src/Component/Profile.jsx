// import { useContext, useEffect, useState } from 'react';
// import { UserContext } from '../Context/Authprovider.jsx';

// const Profile = () => {
//   const { user, getcourse, purchasedCourses } = useContext(UserContext);
//   const [myCourses, setMyCourses] = useState([]);

//   useEffect(() => {
//     const load = async () => {
//       const courses = await getcourse();
//       if (courses && purchasedCourses.length) {
//         const owned = courses.filter(c => purchasedCourses.includes(c._id));
//         setMyCourses(owned);
//       } else {
//         setMyCourses([]);
//       }
//     };
//     load();
//   }, [getcourse, purchasedCourses]);

//   return (
//     <div className="container">
//       <div className="center-card card">
//         <h2>Profile</h2>
//         {user ? (
//           <div>
//             <p><strong>Name:</strong> {user.name}</p>
//             <p><strong>Email:</strong> {user.email}</p>
//             <p><strong>Role:</strong> {user.role}</p>
//             <hr />
//             <h3>My Courses</h3>
//             {myCourses.length > 0 ? (
//               <ul>
//                 {myCourses.map(c => (
//                   <li key={c._id}>{c.title} {c.price ? `- Rs ${c.price}` : ''}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="muted">You haven't purchased any courses yet.</p>
//             )}
//           </div>
//         ) : (
//           <p>Please login to view profile.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;




import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/Authprovider.jsx';

const Profile = () => {
  const { user, getcourse, purchasedCourses } = useContext(UserContext);
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    const load = async () => {
      const courses = await getcourse();
      if (courses && purchasedCourses.length) {
        const owned = courses.filter(c => purchasedCourses.includes(c._id));
        setMyCourses(owned);
      } else {
        setMyCourses([]);
      }
    };
    load();
  }, [getcourse, purchasedCourses]);

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1 className="profile-title">👤 My Profile</h1>

        {user ? (
          <div className="profile-info">
            <div className="info-group">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              {/* <p><strong>Role:</strong> {user.role}</p> */}
            </div>

            <div className="course-section">
              <h3>🎓 My Courses</h3>
              {myCourses.length > 0 ? (
                <ul>
                  {myCourses.map((c, index) => (
                    <li key={c._id} style={{ animationDelay: `${index * 0.1}s` }}>
                      {c.title} {c.price ? `- ₹${c.price}` : ''}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="muted">You haven't purchased any courses yet.</p>
              )}
            </div>
          </div>
        ) : (
          <p className="muted">Please log in to view your profile.</p>
        )}
      </div>

      {/* Inline CSS */}
      <style>{`
        .profile-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 20px;
          font-family: 'Poppins', sans-serif;
          color: #f8fafc;
        }

        .profile-card {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 40px 30px;
          width: 100%;
          max-width: 500px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
          animation: fadeUp 0.7s ease forwards;
        }

        .profile-title {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 30px;
          color: #60a5fa;
          animation: fadeDown 0.8s ease;
        }

        .info-group p {
          font-size: 1.05rem;
          margin: 8px 0;
          color: #e2e8f0;
        }

        .course-section {
          margin-top: 25px;
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 20px;
        }

        .course-section h3 {
          color: #38bdf8;
          font-size: 1.3rem;
          margin-bottom: 15px;
        }

        .course-section ul {
          list-style: none;
          padding: 0;
        }

        .course-section li {
          background: rgba(255,255,255,0.08);
          margin: 8px 0;
          padding: 10px 15px;
          border-radius: 10px;
          transition: all 0.3s ease;
          animation: fadeIn 0.5s ease forwards;
        }

        .course-section li:hover {
          background: rgba(96,165,250,0.2);
          transform: translateX(5px);
        }

        .muted {
          color: #94a3b8;
          font-size: 0.95rem;
          margin-top: 15px;
          text-align: center;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Profile;
