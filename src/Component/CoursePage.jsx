import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/Authprovider.jsx";
import "../css/addcourse.css";

const CoursePage = () => {
  const { addcourse, getcourse, deletecourse, updatecourse, user } = useContext(UserContext);
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
      console.log("Fetched courses:", data);
      setCourses(data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
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
      try {
        await deletecourse(id);
        fetchCourses();
      } catch (error) {
        console.error("Error deleting course:", error);
      }
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
      try {
        await updatecourse(id, newTitle, newDescription, newCreatedBy, Number(newDuration), Number(newPrice));
        fetchCourses();
      } catch (error) {
        console.error("Error updating course:", error);
      }
    }
  };

  return (
    <div className="course-page">
      <h1 className="page-title">{user?.role === "admin" ? "Admin  Dashboard" : "User Courses"}</h1>

      {user?.role === "admin" && (
        <div className="form-container">
          <h2>Add a New Course</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Course Title" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Course Description" required />
            <input type="text" name="createdBy" value={formData.createdBy} onChange={handleChange} placeholder="Created By" required />
            <input type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration (Months)" required />
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price (Rs)" required />
            <button type="submit" className="add-btn">Add Course</button>
          </form>
        </div>
      )}

      <div className="course-list">
        {isLoading ? (
          <p className="loading-message">Loading courses...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id} className="course-item">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p><strong>Created By:</strong> {course.createdBy}</p>
              <p><strong>Duration:</strong> {course.duration} Months</p>
              <p><strong>Price:</strong> Rs {course.price}</p>
              {user?.role === "admin" ? (
                <div className="action-buttons">
                  <button onClick={() => handleUpdate(course._id)} className="update-btn">Update</button>
                  <button onClick={() => handleDelete(course._id)} className="delete-btn">Delete</button>
                </div>
              ) : (
                <button className="enroll-btn">Enroll Now</button>
              )}
            </div>
          ))
        ) : (
          <p>No courses available</p>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
