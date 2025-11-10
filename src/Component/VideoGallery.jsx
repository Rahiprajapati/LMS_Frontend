import { useEffect, useState } from 'react';

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [likes, setLikes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('videoLikes') || '{}');
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    localStorage.setItem('videoLikes', JSON.stringify(likes));
  }, [likes]);

  async function fetchVideos() {
    try {
      const res = await fetch('/videos');
      if (!res.ok) throw new Error('Could not fetch videos');
      const data = await res.json();
      setVideos(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return alert('Choose a video file first');
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('video', file);
      const res = await fetch('/upload-video', {
        method: 'POST',
        body: fd
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Upload failed');
      // refresh list
      await fetchVideos();
      setFile(null);
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  }

  function toggleLike(url) {
    setLikes(prev => ({ ...prev, [url]: !prev[url] }));
  }

  return (
    <div style={styles.container}>
      <h2>Video Gallery</h2>

      <form onSubmit={handleUpload} style={styles.form}>
        <input
          type="file"
          accept="video/*"
          onChange={e => setFile(e.target.files[0])}
        />
        <button type="submit" disabled={uploading} style={styles.uploadBtn}>
          {uploading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>

      <div style={styles.grid}>
        {videos.length === 0 && <p>No videos yet. Upload one above.</p>}
        {videos.map(url => (
          <div key={url} style={styles.card}>
            <video
              controls
              style={styles.video}
              src={url}
            />
            <div style={styles.cardFooter}>
              <button onClick={() => toggleLike(url)} style={styles.likeBtn}>
                {likes[url] ? '💙 Liked' : '🤍 Like'}
              </button>
              <a href={url} download style={styles.download}>Download</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: 980, margin: '24px auto', padding: '0 16px' },
  form: { display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18 },
  uploadBtn: { padding: '8px 12px', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 },
  card: { border: '1px solid #eee', padding: 8, borderRadius: 8, background: '#fff' },
  video: { width: '100%', maxHeight: 240, background: '#000' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', marginTop: 8, alignItems: 'center' },
  likeBtn: { border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 16 },
  download: { textDecoration: 'none', color: '#1E88E5' }
};

export default VideoGallery;
