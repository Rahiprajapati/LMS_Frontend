// import { useContext, useEffect, useState } from "react";
// import { Link } from 'react-router-dom';
// import { UserContext } from "../Context/Authprovider.jsx";
// import "../css/addcourse.css";

// const CoursePage = () => {
//   const { addcourse, getcourse, deletecourse, updatecourse, user, purchaseCourse, isCoursePurchased, addLecture } = useContext(UserContext);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     createdBy: "",
//     duration: "",
//     price: ""
//   });
//   const [courses, setCourses] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const data = await getcourse();
//       console.log("Fetched courses:", data);
//       setCourses(data || []);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//       setError("Failed to load courses");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addcourse(
//         formData.title,
//         formData.description,
//         formData.createdBy,
//         Number(formData.duration),
//         Number(formData.price)
//       );
//       setFormData({ title: "", description: "", createdBy: "", duration: "", price: "" });
//       fetchCourses();
//     } catch (error) {
//       console.error("Error adding course:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this course?")) {
//       try {
//         await deletecourse(id);
//         fetchCourses();
//       } catch (error) {
//         console.error("Error deleting course:", error);
//       }
//     }
//   };

//   const handleUpdate = async (id) => {
//     const courseToUpdate = courses.find(course => course._id === id);
//     if (!courseToUpdate) return;

//     const newTitle = prompt("Enter new title:", courseToUpdate.title);
//     const newDescription = prompt("Enter new description:", courseToUpdate.description);
//     const newCreatedBy = prompt("Enter creator:", courseToUpdate.createdBy);
//     const newDuration = prompt("Enter duration (Months):", courseToUpdate.duration);
//     const newPrice = prompt("Enter price (Rs):", courseToUpdate.price);

//     if (newTitle && newDescription && newCreatedBy && newDuration && newPrice) {
//       try {
//         await updatecourse(id, newTitle, newDescription, newCreatedBy, Number(newDuration), Number(newPrice));
//         fetchCourses();
//       } catch (error) {
//         console.error("Error updating course:", error);
//       }
//     }
//   };

//   const handleAddLecture = (courseId) => {
//     const title = prompt('Lecture title:');
//     if (!title) return;
//     const url = prompt('Lecture video URL (mp4 or youtube link):');
//     if (!url) return;

//     // Call backend to persist
//     (async () => {
//       const res = await addLecture(courseId, title, url);
//       if (res && res.success) {
//         alert('Lecture added');
//         fetchCourses();
//       } else {
//         alert('Failed to add lecture');
//       }
//     })();
//   }

//   const handlePurchase = async (id) => {
//     const ok = await purchaseCourse(id);
//     if (ok) {
//       alert('Purchase simulated — you can now view lectures for this course.');
//       // trigger re-render: fetchCourses will reflect purchased state only client-side
//       setCourses(prev => [...prev]);
//     } else {
//       alert('Purchase failed.');
//     }
//   }

//   const renderLecturePlayer = (lecture) => {
//     if (!lecture || !lecture.url) return null;
//     const url = lecture.url;
//     const isYouTube = url.includes('youtube') || url.includes('youtu.be');
//     if (isYouTube) {
//       // Convert to embed URL if possible
//       let embed = url;
//       if (url.includes('watch')) {
//         const id = new URLSearchParams(url.split('?')[1]).get('v');
//         if (id) embed = `https://www.youtube.com/embed/${id}`;
//       } else if (url.includes('youtu.be')) {
//         const parts = url.split('/'); embed = `https://www.youtube.com/embed/${parts.pop()}`;
//       }
//       return (
//         <div className="lecture-player">
//           <iframe title={lecture.title} width="100%" height="360" src={embed} frameBorder="0" allowFullScreen />
//         </div>
//       );
//     }
//     // fallback to HTML5 video
//     return (
//       <video controls width="100%" style={{borderRadius:8}}>
//         <source src={url} />
//         Your browser does not support the video tag.
//       </video>
//     );
//   }

//   return (
//     <div className="course-page">
//       <h1 className="page-title">{user?.role === "admin" ? "Admin  Dashboard" : "User Courses"}</h1>

//       {user?.role === "admin" && (
//         <div className="form-container">
//           <h2>Add a New Course</h2>
//           <form onSubmit={handleSubmit}>
//             <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Course Title" required />
//             <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Course Description" required />
//             <input type="text" name="createdBy" value={formData.createdBy} onChange={handleChange} placeholder="Created By" required />
//             <input type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration (Months)" required />
//             <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price (Rs)" required />
//             <button type="submit" className="add-btn">Add Course</button>
//           </form>
//         </div>
//       )}

//       <div className="course-list">
//           {isLoading ? (
//           <p className="loading-message">Loading courses...</p>
//         ) : error ? (
//           <p className="error-message">{error}</p>
//         ) : courses.length > 0 ? (
//           courses.map((course) => (
//             <div key={course._id} className="course-item">
//               <h3><Link to={`/courses/${course._id}`}>{course.title}</Link></h3>
//               <p>{course.description}</p>
//               <p><strong>Created By:</strong> {course.createdBy}</p>
//               <p><strong>Duration:</strong> {course.duration} Months</p>
//               <p><strong>Price:</strong> Rs {course.price}</p>
//               {user?.role === "admin" ? (
//                 <div className="action-buttons">
//                   <button onClick={() => handleUpdate(course._id)} className="update-btn">Update</button>
//                   <button onClick={() => handleDelete(course._id)} className="delete-btn">Delete</button>
//                   <button onClick={() => handleAddLecture(course._id)} className="add-lecture">Add Lecture</button>
//                 </div>
//               ) : (
//                 <div>
//                   {isCoursePurchased(course._id) ? (
//                     <div className="purchased-area">
//                       <p className="muted">You've purchased this course — click the title to view lectures.</p>
//                     </div>
//                   ) : (
//                     <button onClick={() => handlePurchase(course._id)} className="enroll-btn">Buy / Enroll</button>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No courses available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CoursePage;





// import { useContext, useEffect, useState } from "react";
// import { Link } from 'react-router-dom';
// import { UserContext } from "../Context/Authprovider.jsx";

// const CoursePage = () => {
//   const { addcourse, getcourse, deletecourse, updatecourse, user, purchaseCourse, isCoursePurchased, addLecture } = useContext(UserContext);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     createdBy: "",
//     duration: "",
//     price: ""
//   });
//   const [courses, setCourses] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const data = await getcourse();
//       setCourses(data || []);
//     } catch (error) {
//       setError("Failed to load courses");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addcourse(
//         formData.title,
//         formData.description,
//         formData.createdBy,
//         Number(formData.duration),
//         Number(formData.price)
//       );
//       setFormData({ title: "", description: "", createdBy: "", duration: "", price: "" });
//       fetchCourses();
//     } catch (error) {
//       console.error("Error adding course:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this course?")) {
//       await deletecourse(id);
//       fetchCourses();
//     }
//   };

//   const handleUpdate = async (id) => {
//     const courseToUpdate = courses.find(course => course._id === id);
//     if (!courseToUpdate) return;
//     const newTitle = prompt("Enter new title:", courseToUpdate.title);
//     const newDescription = prompt("Enter new description:", courseToUpdate.description);
//     const newCreatedBy = prompt("Enter creator:", courseToUpdate.createdBy);
//     const newDuration = prompt("Enter duration (Months):", courseToUpdate.duration);
//     const newPrice = prompt("Enter price (Rs):", courseToUpdate.price);

//     if (newTitle && newDescription && newCreatedBy && newDuration && newPrice) {
//       await updatecourse(id, newTitle, newDescription, newCreatedBy, Number(newDuration), Number(newPrice));
//       fetchCourses();
//     }
//   };

//   const handleAddLecture = async (courseId) => {
//     // show inline form for upload
//     setActiveCourse(courseId);
//   }

//   // inline lecture upload state (for admin)
//   const [activeCourse, setActiveCourse] = useState(null);
//   const [lectureTitle, setLectureTitle] = useState('');
//   const [lectureFile, setLectureFile] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const submitLecture = async (courseId) => {
//     if (!lectureTitle) return alert('Enter lecture title');
//     if (!lectureFile) return alert('Choose a video file');
//     setUploading(true);
//     try {
//       const fd = new FormData();
//       fd.append('video', lectureFile);
//       const res = await fetch('/upload-video', { method: 'POST', body: fd });
//       const json = await res.json();
//       if (!res.ok) throw new Error(json.message || 'Upload failed');
//       const fileUrl = json.file;
//       const added = await addLecture(courseId, lectureTitle, fileUrl);
//       if (added && added.success) {
//         alert('Lecture added');
//         fetchCourses();
//         setActiveCourse(null);
//         setLectureTitle('');
//         setLectureFile(null);
//       } else {
//         alert('Failed to add lecture');
//       }
//     } catch (err) {
//       console.error('Submit lecture error', err);
//       alert('Could not upload lecture: ' + err.message);
//     } finally {
//       setUploading(false);
//     }
//   }

//   const handlePurchase = async (id) => {
//     const ok = await purchaseCourse(id);
//     if (ok) {
//       alert('Purchase simulated!');
//       setCourses(prev => [...prev]);
//     } else {
//       alert('Purchase failed.');
//     }
//   };

//   return (
//     <div className="course-page">
//       <h1 className="page-title">{user?.role === "admin" ? "Admin Dashboard" : "Available Courses"}</h1>

//       {user?.role === "admin" && (
//         <div className="form-container">
//           <h2>Add a New Course</h2>
//           <form onSubmit={handleSubmit}>
//             <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Course Title" required />
//             <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Course Description" required />
//             <input type="text" name="createdBy" value={formData.createdBy} onChange={handleChange} placeholder="Created By" required />
//             <input type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration (Months)" required />
//             <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price (Rs)" required />
//             <button type="submit" className="add-btn">Add Course</button>
//           </form>
//         </div>
//       )}

//       <div className="course-list">
//         {isLoading ? (
//           <p className="loading-message">Loading courses...</p>
//         ) : error ? (
//           <p className="error-message">{error}</p>
//         ) : courses.length > 0 ? (
//           courses.map((course, index) => (
//             <div key={course._id} className="course-item" style={{ animationDelay: `${index * 0.1}s` }}>
//               <h3><Link to={`/courses/${course._id}`}>{course.title}</Link></h3>
//               <p>{course.description}</p>
//               <p><strong>Created By:</strong> {course.createdBy}</p>
//               <p><strong>Duration:</strong> {course.duration} Months</p>
//               <p><strong>Price:</strong> ₹{course.price}</p>
//               {user?.role === "admin" ? (
//                 <div>
//                   <div className="action-buttons">
//                     <button onClick={() => handleUpdate(course._id)} className="update-btn">✏️ Update</button>
//                     <button onClick={() => handleDelete(course._id)} className="delete-btn">🗑 Delete</button>
                    
//                   </div>

//                   {activeCourse === course._id && (
//                     <div className="lecture-inline-form" style={{marginTop:12}}>
//                       <input type="text" placeholder="Lecture title" value={lectureTitle} onChange={e => setLectureTitle(e.target.value)} />
//                       <input type="file" accept="video/*" onChange={e => setLectureFile(e.target.files[0])} />
//                       <div style={{display:'flex',gap:8}}>
//                         <button className="add-btn" onClick={() => submitLecture(course._id)} disabled={uploading}>{uploading ? 'Uploading...' : 'Submit Lecture'}</button>
//                         <button className="add-btn" onClick={() => { setActiveCourse(null); setLectureTitle(''); setLectureFile(null); }}>Cancel</button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div>
//                   {isCoursePurchased(course._id) ? (
//                     <p className="muted">✅ You’ve purchased this course</p>
//                   ) : (
//                     <button onClick={() => handlePurchase(course._id)} className="enroll-btn">Buy / Enroll</button>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No courses available</p>
//         )}
//       </div>

//       {/* ✨ Stylish Animations + CSS */}
//       <style>{`
//         .course-page {
//           padding: 50px 20px;
//           background: linear-gradient(135deg, #f0f4ff, #e3e9ff);
//           min-height: 100vh;
//           font-family: 'Poppins', sans-serif;
//           text-align: center;
//         }
//         .page-title {
//           font-size: 2.4rem;
//           margin-bottom: 30px;
//           color: #1e40af;
//           animation: fadeDown 1s ease;
//         }
//         @keyframes fadeDown {
//           from { opacity: 0; transform: translateY(-20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .form-container {
//           background: #fff;
//           margin: 0 auto 40px;
//           padding: 25px;
//           border-radius: 12px;
//           max-width: 600px;
//           box-shadow: 0 5px 15px rgba(0,0,0,0.1);
//           animation: slideUp 1s ease;
//         }
//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .form-container input, .form-container textarea {
//           width: 100%;
//           padding: 10px;
//           margin-bottom: 12px;
//           border: 1px solid #ccc;
//           border-radius: 8px;
//         }
//         .add-btn {
//           background: #2563eb;
//           color: white;
//           border: none;
//           padding: 10px 20px;
//           border-radius: 8px;
//           cursor: pointer;
//           transition: 0.3s;
//         }
//         .add-btn:hover {
//           background: #1e40af;
//           transform: scale(1.05);
//         }
//         .course-list {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//           gap: 20px;
//           justify-content: center;
//           padding: 20px;
//         }
//         .course-item {
//           background: #fff;
//           border-radius: 12px;
//           padding: 20px;
//           box-shadow: 0 5px 15px rgba(0,0,0,0.1);
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//           animation: fadeUp 0.6s ease forwards;
//         }
//         .course-item:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 8px 25px rgba(0,0,0,0.15);
//         }
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .action-buttons button, .enroll-btn {
//           margin: 5px;
//           padding: 8px 15px;
//           border: none;
//           border-radius: 8px;
//           cursor: pointer;
//           font-weight: 500;
//           transition: 0.3s;
//         }
//         .update-btn { background: #10b981; color: #fff; }
//         .update-btn:hover { background: #059669; }
//         .delete-btn { background: #ef4444; color: #fff; }
//         .delete-btn:hover { background: #dc2626; }
//         .add-lecture { background: #facc15; color: #000; }
//         .add-lecture:hover { background: #eab308; }
//         .enroll-btn { background: #3b82f6; color: white; }
//         .enroll-btn:hover { background: #1e40af; transform: scale(1.05); }
//         .muted { color: #6b7280; font-size: 0.9rem; }
//       `}</style>
//     </div>
//   );
// };

// export default CoursePage;





import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { UserContext } from "../Context/Authprovider.jsx";

const CoursePage = () => {
  const { addcourse, getcourse, deletecourse, updatecourse, user, purchaseCourse, isCoursePurchased } = useContext(UserContext);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    createdBy: "",
    duration: "",
    price: ""
  });
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getcourse();
      setCourses(data || []);
    } catch (error) {
      setError("Failed to load courses");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addcourse(
        formData.title,
        formData.description,
        formData.createdBy,
        Number(formData.duration),
        Number(formData.price)
      );
      setFormData({ title: "", description: "", createdBy: "", duration: "", price: "" });
      fetchCourses();
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      await deletecourse(id);
      fetchCourses();
    }
  };

  const handleUpdate = async (id) => {
    const courseToUpdate = courses.find(course => course._id === id);
    if (!courseToUpdate) return;
    const newTitle = prompt("Enter new title:", courseToUpdate.title);
    const newDescription = prompt("Enter new description:", courseToUpdate.description);
    const newCreatedBy = prompt("Enter creator:", courseToUpdate.createdBy);
    const newDuration = prompt("Enter duration (Months):", courseToUpdate.duration);
    const newPrice = prompt("Enter price (Rs):", courseToUpdate.price);

    if (newTitle && newDescription && newCreatedBy && newDuration && newPrice) {
      await updatecourse(id, newTitle, newDescription, newCreatedBy, Number(newDuration), Number(newPrice));
      fetchCourses();
    }
  };

  const handlePurchase = async (id) => {
    const ok = await purchaseCourse(id);
    if (ok) {
      alert('Course purchased successfully!');
      setCourses(prev => [...prev]);
    } else {
      alert('Purchase failed.');
    }
  };

  return (
    <div className="course-page">
      <h1 className="page-title">{user?.role === "admin" ? "Admin Dashboard" : "Explore Courses"}</h1>

      {user?.role === "admin" && (
        <div className="form-container">
          <h2 className="form-title">Add New Course</h2>
          <form onSubmit={handleSubmit} className="course-form">
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Course Title" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Course Description" required />
            <input type="text" name="createdBy" value={formData.createdBy} onChange={handleChange} placeholder="Created By" required />
            <input type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration (Months)" required />
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price (Rs)" required />
            <button type="submit" className="btn primary">Add Course</button>
          </form>
        </div>
      )}

      <div className="course-list">
        {isLoading ? (
          <p className="loading-message">Loading courses...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : courses.length > 0 ? (
          courses.map((course, index) => (
            <div key={course._id} className="course-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <h3><Link to={`/courses/${course._id}`} className="course-title">{course.title}</Link></h3>
              <p className="course-desc">{course.description}</p>
              <p><strong>Created By:</strong> {course.createdBy}</p>
              <p><strong>Duration:</strong> {course.duration} Months</p>
              <p><strong>Price:</strong> ₹{course.price}</p>

              {user?.role === "admin" ? (
                <div className="action-buttons">
                  <button onClick={() => handleUpdate(course._id)} className="btn green">Update</button>
                  <button onClick={() => handleDelete(course._id)} className="btn red">Delete</button>
                </div>
              ) : (
                <div className="student-action">
                  {isCoursePurchased(course._id) ? (
                    <p className="muted">✅ You’ve already purchased this course</p>
                  ) : (
                    <button onClick={() => handlePurchase(course._id)} className="btn primary">Buy / Enroll</button>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>

      {/* ✨ Clean Styling */}
      <style>{`
        .course-page {
          padding: 60px 20px;
          background: linear-gradient(135deg, #e0e7ff, #f9fafb);
          min-height: 100vh;
          font-family: 'Poppins', sans-serif;
        }

        .page-title {
          font-size: 2.6rem;
          font-weight: 700;
          color: #1e3a8a;
          text-align: center;
          margin-bottom: 40px;
          animation: fadeDown 1s ease;
        }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .form-container {
          background: #ffffff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          max-width: 600px;
          margin: 0 auto 50px;
        }

        .form-title {
          font-size: 1.5rem;
          margin-bottom: 20px;
          color: #1e40af;
        }

        .course-form input, .course-form textarea {
          width: 100%;
          padding: 12px;
          margin-bottom: 12px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          transition: 0.3s;
        }

        .course-form input:focus, .course-form textarea:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 2px #bfdbfe;
        }

        .btn {
          padding: 10px 18px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .btn.primary { background: linear-gradient(90deg, #2563eb, #1e40af); color: #fff; }
        .btn.primary:hover { transform: scale(1.05); }

        .btn.green { background: #16a34a; color: white; }
        .btn.red { background: #dc2626; color: white; }

        .course-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
          padding: 0 20px;
        }

        .course-card {
          background: #ffffff;
          border-radius: 14px;
          padding: 20px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: fadeUp 0.6s ease forwards;
        }

        .course-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .course-title {
          color: #1e3a8a;
          text-decoration: none;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .course-desc {
          color: #374151;
          font-size: 0.95rem;
          margin: 10px 0;
          min-height: 50px;
        }

        .action-buttons, .student-action {
          margin-top: 15px;
        }

        .muted {
          color: #6b7280;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

export default CoursePage;
