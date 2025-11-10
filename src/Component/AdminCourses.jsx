import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/Authprovider.jsx';
import '../css/addcourse.css';

const AdminCourses = () => {
  const { getcourse, deletecourse, updatecourse, addLecture, user } = useContext(UserContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    const all = await getcourse();
    // show only courses created by this admin (match createdBy === user.name)
    const mine = (all || []).filter(c => c.createdBy === user?.name);
    setCourses(mine);
    setLoading(false);
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    await deletecourse(id);
    load();
  }

  const handleUpdate = async (id) => {
    const title = prompt('New title:');
    if (!title) return;
    const description = prompt('New description:');
    if (!description) return;
    await updatecourse(id, title, description, user.name, 1, 0);
    load();
  }

  const handleAddLecture = async (id) => {
    // Show inline form for adding lecture (title + file)
    setActiveCourse(id);
  }

  // state for inline lecture form
  const [activeCourse, setActiveCourse] = useState(null);
  const [lectureTitle, setLectureTitle] = useState('');
  const [lectureFile, setLectureFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const submitLecture = async (courseId) => {
    if (!lectureTitle) return alert('Enter lecture title');
    if (!lectureFile) return alert('Choose a video file');
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('video', lectureFile);
      const res = await fetch('/upload-video', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Upload failed');
      const fileUrl = json.file; // e.g. /uploads/...
      await addLecture(courseId, lectureTitle, fileUrl);
      // reset and reload
      setLectureTitle('');
      setLectureFile(null);
      setActiveCourse(null);
      load();
    } catch (err) {
      console.error('Submit lecture error', err);
      alert('Could not upload lecture: ' + err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="container">
      <div className="center-card card">
        <h2>Admin — My Courses</h2>
        {loading ? <p>Loading...</p> : (
          courses.length ? courses.map(c => (
          <div key={c._id} style={{borderBottom:'1px solid #eee',padding:'12px 0'}}>
              <h4>{c.title}</h4>
              <p className="muted">{c.description}</p>
              <div style={{display:'flex',gap:8}}>
                <button onClick={() => handleUpdate(c._id)} className="btn">Update</button>
                <button onClick={() => handleDelete(c._id)} className="btn">Delete</button>
                <button onClick={() => handleAddLecture(c._id)} className="btn">Add Lecture</button>
              </div>

              {activeCourse === c._id && (
                <div className="lecture-inline-form">
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Lecture title"
                    value={lectureTitle}
                    onChange={e => setLectureTitle(e.target.value)}
                  />
                  <input
                    className="form-input"
                    type="file"
                    accept="video/*"
                    onChange={e => setLectureFile(e.target.files[0])}
                  />
                  <div style={{display:'flex',gap:8}}>
                    <button className="btn" onClick={() => submitLecture(c._id)} disabled={uploading}>
                      {uploading ? 'Uploading...' : 'Submit Lecture'}
                    </button>
                    <button className="btn" onClick={() => { setActiveCourse(null); setLectureTitle(''); setLectureFile(null); }}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )) : <p>No courses created by you yet.</p>
        )}
      </div>
    </div>
  )
}

export default AdminCourses;
