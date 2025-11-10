// import { useContext, useEffect, useState } from 'react';
// import { UserContext } from '../Context/Authprovider.jsx';

// const MyCourses = () => {
//   const { getcourse, purchasedCourses, isCoursePurchased } = useContext(UserContext);
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     (async () => {
//       const all = await getcourse();
//       const mine = (all || []).filter(c => purchasedCourses.includes(c._id));
//       setCourses(mine);
//     })();
//   }, [getcourse, purchasedCourses]);

//   return (
//     <div className="container">
//       <div className="center-card card">
//         <h2>My Purchased Courses</h2>
//         {courses.length ? courses.map(c => (
//           <div key={c._id} style={{borderBottom:'1px solid #eee',padding:'12px 0'}}>
//             <h4>{c.title}</h4>
//             <p className="muted">{c.description}</p>
//             <p><strong>Price:</strong> Rs {c.price}</p>
//           </div>
//         )) : <p className="muted">You haven't purchased any courses yet.</p>}
//       </div>
//     </div>
//   )
// }

// export default MyCourses;





import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/Authprovider.jsx';

const MyCourses = () => {
  const { getcourse, purchasedCourses } = useContext(UserContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      const all = await getcourse();
      const mine = (all || []).filter(c => purchasedCourses.includes(c._id));
      setCourses(mine);
    })();
  }, [getcourse, purchasedCourses]);

  return (
    <div className="mycourses-page">
      <h1 className="page-title">🎓 My Purchased Courses</h1>

      {courses.length ? (
        <div className="course-grid">
          {courses.map((c, index) => (
            <div key={c._id} className="course-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <h3>{c.title}</h3>
              <p className="desc">{c.description}</p>
              <p><strong>Price:</strong> ₹{c.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-course">You haven't purchased any courses yet.</p>
      )}

      {/* ✨ Inline CSS Styles */}
      <style>{`
        .mycourses-page {
          padding: 60px 20px;
          background: linear-gradient(135deg, #f7f9fc, #e3e9ff);
          min-height: 100vh;
          font-family: 'Poppins', sans-serif;
          text-align: center;
        }
        .page-title {
          font-size: 2.2rem;
          margin-bottom: 40px;
          color: #1E88E5;
          animation: fadeDown 1s ease;
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .course-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
          justify-content: center;
          padding: 20px;
        }

        .course-card {
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          animation: fadeUp 0.6s ease forwards;
          border-top: 5px solid #1E88E5;
        }

        .course-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .course-card h3 {
          color: #0f172a;
          margin-bottom: 10px;
          font-size: 1.3rem;
        }

        .desc {
          color: #64748b;
          font-size: 0.95rem;
          margin-bottom: 10px;
        }

        .no-course {
          color: #6b7280;
          font-size: 1.1rem;
          margin-top: 40px;
        }
      `}</style>
    </div>
  );
};

export default MyCourses;
