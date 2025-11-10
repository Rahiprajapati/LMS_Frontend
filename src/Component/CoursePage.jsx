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
