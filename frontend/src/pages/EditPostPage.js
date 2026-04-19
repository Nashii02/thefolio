import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await API.get(`/posts/${id}`);
        // Check if user is author or admin
        if (data.author?._id !== user?._id && user?.role !== 'admin') {
          setError('You cannot edit this post');
          setTimeout(() => navigate('/home'), 2000);
          return;
        }
        setTitle(data.title);
        setBody(data.body);
      } catch (err) {
        setError('Post not found');
        setTimeout(() => navigate('/home'), 2000);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const fd = new FormData();
    fd.append('title', title);
    fd.append('body', body);
    if (image) fd.append('image', image);

    try {
      await API.put(`/posts/${id}`, fd);
      setSuccess('Post updated successfully! Redirecting...');
      setTimeout(() => navigate('/home'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating post');
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div className='create-post-page'>
      <h2>Edit Post</h2>
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit} className='create-post-form'>
        <input
          className='post-title-input'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Post title'
          required
        />

        <textarea
          className='post-body-input'
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder='Write your post here...'
          rows={12}
          required
        />

        <div className='upload-block'>
          <label htmlFor='post-image'>Update Cover Image (optional):</label>
          <input
            id='post-image'
            type='file'
            accept='image/*'
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button className='publish-btn' type='submit'>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPostPage;
