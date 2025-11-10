// import { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import api from '../Context/api';
// import { UserContext } from '../Context/Authprovider.jsx';

// const CourseDetail = () => {
//   const { id } = useParams();
//   const { user, purchaseCourse, isCoursePurchased, addLecture } = useContext(UserContext);
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [form, setForm] = useState({ title: '', url: '' });
//   const [lectureFile, setLectureFile] = useState(null);

//   useEffect(() => {
//     (async () => {
//       setLoading(true);
//       try {
//         const res = await api.get(`/course/${id}`);
//         if (res.data && res.data.course) setCourse(res.data.course);
//       } catch (err) {
//         console.log('Fetch course error', err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [id]);

//   const toEmbed = (url) => {
//     if (!url) return null;
//     try {
//       if (url.includes('youtube') || url.includes('youtu.be')) {
//         if (url.includes('watch')) {
//           const id = new URLSearchParams(url.split('?')[1]).get('v');
//           if (id) return `https://www.youtube.com/embed/${id}`;
//         }
//         if (url.includes('youtu.be')) {
//           const parts = url.split('/');
//           const id = parts.pop();
//           return `https://www.youtube.com/embed/${id}`;
//         }
//       }
//       return url;
//     } catch (e) {
//       return url;
//     }
//   };

//   const handlePurchase = async () => {
//     const ok = await purchaseCourse(id);
//     if (ok) alert('Purchased — you can now view lectures');
//     else alert('Purchase failed');
//   };

//   const handleAddLecture = async (e) => {
//     e.preventDefault();
//     if (!form.title) return alert('Provide lecture title');

//     let urlToUse = form.url;

//     // If a file was chosen, upload it first
//     if (lectureFile) {
//       try {
//         const fd = new FormData();
//         fd.append('video', lectureFile);
//         const res = await fetch('/upload-video', { method: 'POST', body: fd });
//         const json = await res.json();
//         if (!res.ok) throw new Error(json.message || 'Upload failed');
//         urlToUse = json.file; // server returns path like /uploads/...
//       } catch (err) {
//         console.error('Upload error', err);
//         return alert('Failed to upload video: ' + err.message);
//       }
//     }

//     if (!urlToUse) return alert('Provide a video file or URL');

//     const res = await addLecture(id, form.title, urlToUse);
//     if (res && res.success) {
//       alert('Lecture added');
//       const r = await api.get(`/course/${id}`);
//       setCourse(r.data.course);
//       setForm({ title: '', url: '' });
//       setLectureFile(null);
//     } else alert('Failed to add lecture');
//   };

//   const renderLecturePlayer = (lecture) => {
//     const embed = toEmbed(lecture.url);
//     const isYou = embed && embed.includes('youtube.com/embed');
//     if (isYou) {
//       return (
//         <div className="video-box">
//           <iframe
//             title={lecture.title}
//             width="100%"
//             height="360"
//             src={embed}
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//             allowFullScreen
//           />
//           <p style={{ marginTop: 8 }}>
//             <a href={lecture.url} target="_blank" rel="noreferrer">Open on YouTube</a>
//           </p>
//         </div>
//       );
//     }
//     return (
//       <video controls width="100%" style={{ borderRadius: 10 }} crossOrigin="anonymous">
//         <source src={embed} type="video/mp4" />
//         Your browser does not support the video tag. <a href={lecture.url} target="_blank" rel="noreferrer">Open</a>
//       </video>
//     );
//   };

//   if (loading) return <div className="container center-card"><p>Loading...</p></div>;
//   if (!course) return <div className="container center-card"><p>Course not found</p></div>;

//   const purchased = isCoursePurchased(course._id);
//   const canViewLectures = user?.role === 'admin' || purchased;

//   return (
//     <div className="course-container">
//       <div className="course-card">
//         <h2>{course.title}</h2>
//         <p className="muted">{course.description}</p>

//         <div className="info-grid">
//           <p><strong> Created By:</strong> {course.createdBy}</p>
//           <p><strong> Duration:</strong> {course.duration} months</p>
//           <p><strong> Price:</strong> Rs {course.price}</p>
//         </div>

//         {user?.role === 'admin' && (
//           <div className="add-lecture">
//             <h3>Add Lecture</h3>
//             <form onSubmit={handleAddLecture}>
//               <input className="form-input" placeholder="Lecture title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
//               <input className="form-input" placeholder="Video URL (YouTube or mp4)" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} />
//               <div className="btn-group">
//                 <button className="btn primary" type="submit">Add Lecture</button>
//                 <button className="btn ghost" type="button" onClick={() => setForm({ title: '', url: '' })}>Clear</button>
//               </div>
//             </form>
//           </div>
//         )}

//         {user?.role !== 'admin' && !purchased && (
//           <div style={{ marginTop: 20 }}>
//             <button className="btn primary enroll" onClick={handlePurchase}>🎓 Buy / Enroll</button>
//           </div>
//         )}

//         {canViewLectures && (
//           <div className="lectures-section">
//             <h3>📚 Lectures</h3>
//             {course.lectures && course.lectures.length ? course.lectures.map((lec, idx) => (
//               <div key={idx} className="lecture-item">
//                 <h4>{lec.title}</h4>
//                 {renderLecturePlayer(lec)}
//               </div>
//             )) : <p className="muted">No lectures available</p>}
//           </div>
//         )}
//       </div>

//       {/* --- Embedded Styles --- */}
//       <style>{`
//         .course-container {
//           max-width: 900px;
//           margin: 70px auto;
//           padding: 20px;
//           font-family: 'Poppins', sans-serif;
//           animation: fadeIn 0.8s ease;
//         }

//         .course-card {
//           background: rgba(255, 255, 255, 0.15);
//           backdrop-filter: blur(12px);
//           border-radius: 20px;
//           padding: 40px;
//           color: #222;
//           box-shadow: 0 8px 32px rgba(0,0,0,0.15);
//           transition: all 0.4s ease;
//         }
//         .course-card:hover {
//           transform: translateY(-6px);
//           box-shadow: 0 12px 40px rgba(0,0,0,0.18);
//         }

//         h2 {
//           color: #1E88E5;
//           font-size: 2.2rem;
//           text-align: center;
//           margin-bottom: 10px;
//           letter-spacing: 0.5px;
//           animation: slideIn 0.6s ease;
//         }

//         .muted {
//           color: #555;
//           text-align: center;
//           font-size: 1rem;
//           margin-bottom: 20px;
//         }

//         .info-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 15px;
//           background: #f9fbff;
//           border-radius: 12px;
//           padding: 15px;
//           margin-bottom: 25px;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.05);
//         }

//         .add-lecture {
//           background: #f4f8ff;
//           border: 1px solid #d7e3fc;
//           border-radius: 12px;
//           padding: 20px;
//           animation: fadeInUp 0.5s ease;
//         }

//         .form-input {
//           width: 100%;
//           padding: 10px 14px;
//           border-radius: 8px;
//           border: 1px solid #ccc;
//           margin-bottom: 12px;
//           transition: all 0.2s ease;
//         }
//         .form-input:focus {
//           border-color: #1E88E5;
//           box-shadow: 0 0 5px rgba(30,136,229,0.4);
//         }

//         .btn {
//           cursor: pointer;
//           border: none;
//           border-radius: 8px;
//           padding: 10px 18px;
//           font-weight: 500;
//           transition: all 0.25s ease;
//         }

//         .btn.primary {
//           background: linear-gradient(90deg, #1E88E5, #1565C0);
//           color: white;
//         }

//         .btn.primary:hover {
//           transform: scale(1.05);
//           background: linear-gradient(90deg, #1565C0, #0D47A1);
//         }

//         .btn.ghost {
//           border: 1px solid #1E88E5;
//           color: #1E88E5;
//           background: transparent;
//         }

//         .btn.ghost:hover {
//           background: #1E88E5;
//           color: #fff;
//         }

//         .btn-group {
//           display: flex;
//           gap: 10px;
//           justify-content: flex-end;
//         }

//         .enroll {
//           width: 100%;
//           font-size: 1.1rem;
//           animation: pulse 1.5s infinite ease-in-out;
//         }

//         .lectures-section {
//           margin-top: 30px;
//         }

//         .lecture-item {
//           background: #f8faff;
//           border: 1px solid #e0e6ef;
//           border-radius: 12px;
//           padding: 16px;
//           margin-bottom: 14px;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.04);
//           transition: all 0.3s ease;
//           animation: fadeInUp 0.6s ease;
//         }

//         .lecture-item:hover {
//           transform: scale(1.02);
//           box-shadow: 0 6px 14px rgba(0,0,0,0.1);
//         }

//         iframe, video {
//           border-radius: 10px;
//           margin-top: 10px;
//           box-shadow: 0 4px 15px rgba(0,0,0,0.1);
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(15px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes slideIn {
//           from { opacity: 0; transform: translateY(-20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes pulse {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.03); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CourseDetail;






import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../Context/api';
import { UserContext } from '../Context/Authprovider.jsx';

const CourseDetail = () => {
  const { id } = useParams();
  const { user, purchaseCourse, isCoursePurchased, addLecture } = useContext(UserContext);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '' });
  const [lectureFile, setLectureFile] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await api.get(`/course/${id}`);
        if (res.data && res.data.course) setCourse(res.data.course);
      } catch (err) {
        console.log('Fetch course error', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handlePurchase = async () => {
    const ok = await purchaseCourse(id);
    if (ok) alert('Purchased — you can now view lectures');
    else alert('Purchase failed');
  };

  const handleAddLecture = async (e) => {
    e.preventDefault();
    if (!form.title) return alert('Please provide a lecture title');
    if (!lectureFile) return alert('Please select a video file');

    try {
      // Upload video to the backend
      const fd = new FormData();
      fd.append('video', lectureFile);

      const res = await fetch('/upload-video', { method: 'POST', body: fd });
      const json = await res.json();

      if (!res.ok) throw new Error(json.message || 'Video upload failed');

      // Add lecture with uploaded file path
      const videoUrl = json.file; // example: '/uploads/lecture1.mp4'
      const result = await addLecture(id, form.title, videoUrl);

      if (result && result.success) {
        alert('Lecture added successfully');
        const updated = await api.get(`/course/${id}`);
        setCourse(updated.data.course);
        setForm({ title: '' });
        setLectureFile(null);
      } else {
        alert('Failed to add lecture');
      }
    } catch (err) {
      console.error('Error adding lecture:', err);
      alert('Error: ' + err.message);
    }
  };

  const renderLecturePlayer = (lecture) => {
    return (
      <video controls width="100%" style={{ borderRadius: 10 }} crossOrigin="anonymous">
        <source src={lecture.url} type="video/mp4" />
        Your browser does not support the video tag. <a href={lecture.url} target="_blank" rel="noreferrer">Open</a>
      </video>
    );
  };

  if (loading) return <div className="container center-card"><p>Loading...</p></div>;
  if (!course) return <div className="container center-card"><p>Course not found</p></div>;

  const purchased = isCoursePurchased(course._id);
  const canViewLectures = user?.role === 'admin' || purchased;

  return (
    <div className="course-container">
      <div className="course-card">
        <h2>{course.title}</h2>
        <p className="muted">{course.description}</p>

        <div className="info-grid">
          <p><strong>Created By:</strong> {course.createdBy}</p>
          <p><strong>Duration:</strong> {course.duration} months</p>
          <p><strong>Price:</strong> Rs {course.price}</p>
        </div>

        {user?.role === 'admin' && (
          <div className="add-lecture">
            <h3>Add Lecture</h3>
            <form onSubmit={handleAddLecture}>
              <input
                className="form-input"
                placeholder="Lecture title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
              />

              {/* File upload input */}
              <input
                type="file"
                accept="video/*"
                className="form-input"
                onChange={e => setLectureFile(e.target.files[0])}
              />

              <div className="btn-group">
                <button className="btn primary" type="submit">Upload Lecture</button>
                <button
                  className="btn ghost"
                  type="button"
                  onClick={() => {
                    setForm({ title: '' });
                    setLectureFile(null);
                  }}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        )}

        {user?.role !== 'admin' && !purchased && (
          <div style={{ marginTop: 20 }}>
            <button className="btn primary enroll" onClick={handlePurchase}>🎓 Buy / Enroll</button>
          </div>
        )}

        {canViewLectures && (
          <div className="lectures-section">
            <h3>📚 Lectures</h3>
            {course.lectures && course.lectures.length ? (
              course.lectures.map((lec, idx) => (
                <div key={idx} className="lecture-item">
                  <h4>{lec.title}</h4>
                  {renderLecturePlayer(lec)}
                </div>
              ))
            ) : (
              <p className="muted">No lectures available</p>
            )}
          </div>
        )}
      </div>

      {/* --- Embedded Styles --- */}
      <style>{`
        .course-container {
          max-width: 900px;
          margin: 70px auto;
          padding: 20px;
          font-family: 'Poppins', sans-serif;
          animation: fadeIn 0.8s ease;
        }

        .course-card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 40px;
          color: #222;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
          transition: all 0.4s ease;
        }
        .course-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.18);
        }

        h2 {
          color: #1E88E5;
          font-size: 2.2rem;
          text-align: center;
          margin-bottom: 10px;
          letter-spacing: 0.5px;
          animation: slideIn 0.6s ease;
        }

        .muted {
          color: #555;
          text-align: center;
          font-size: 1rem;
          margin-bottom: 20px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
          background: #f9fbff;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 25px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .add-lecture {
          background: #f4f8ff;
          border: 1px solid #d7e3fc;
          border-radius: 12px;
          padding: 20px;
          animation: fadeInUp 0.5s ease;
        }

        .form-input {
          width: 100%;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid #ccc;
          margin-bottom: 12px;
          transition: all 0.2s ease;
        }
        .form-input:focus {
          border-color: #1E88E5;
          box-shadow: 0 0 5px rgba(30,136,229,0.4);
        }

        .btn {
          cursor: pointer;
          border: none;
          border-radius: 8px;
          padding: 10px 18px;
          font-weight: 500;
          transition: all 0.25s ease;
        }

        .btn.primary {
          background: linear-gradient(90deg, #1E88E5, #1565C0);
          color: white;
        }

        .btn.primary:hover {
          transform: scale(1.05);
          background: linear-gradient(90deg, #1565C0, #0D47A1);
        }

        .btn.ghost {
          border: 1px solid #1E88E5;
          color: #1E88E5;
          background: transparent;
        }

        .btn.ghost:hover {
          background: #1E88E5;
          color: #fff;
        }

        .btn-group {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }

        .enroll {
          width: 100%;
          font-size: 1.1rem;
          animation: pulse 1.5s infinite ease-in-out;
        }

        .lectures-section {
          margin-top: 30px;
        }

        .lecture-item {
          background: #f8faff;
          border: 1px solid #e0e6ef;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 14px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease;
        }

        .lecture-item:hover {
          transform: scale(1.02);
          box-shadow: 0 6px 14px rgba(0,0,0,0.1);
        }

        iframe, video {
          border-radius: 10px;
          margin-top: 10px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
      `}</style>
    </div>
  );
};

export default CourseDetail;
