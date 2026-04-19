import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import '../css/PostPage.css';

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingCommentId, setDeletingCommentId] = useState('');

  const fetchPostAndComments = useCallback(async () => {
    try {
      const { data } = await API.get(`/posts/${id}`);
      setPost(data);

      // Fetch comments
      try {
        const commentsRes = await API.get(`/comments/${id}`);
        setComments(commentsRes.data);
      } catch (err) {
        setComments([]);
      }
    } catch (err) {
      setError('Post not found');
      setTimeout(() => navigate('/blog'), 2000);
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchPostAndComments();
  }, [fetchPostAndComments]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await API.post(`/comments/${id}`, { body: newComment });
      setComments([...comments, res.data]);
      setNewComment('');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add comment. Please login as member/admin.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    const ok = window.confirm('Delete this comment?');
    if (!ok) return;

    try {
      setDeletingCommentId(commentId);
      await API.delete(`/admin/comments/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete comment');
    } finally {
      setDeletingCommentId('');
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div className='post-page'>
      <div className='post-container'>
        {/* Back Button */}
        <button className='back-button' onClick={() => navigate('/blog')}>
          ← Back to Blog
        </button>

        {post && (
          <>
            <article className='post-content'>
              <h1>{post.title}</h1>
              <div className='post-meta-info'>
                {post.author?.profilePic || post.author?.avatar ? (
                  <img 
                    src={
                      post.author?.profilePic 
                        ? `http://localhost:5000/uploads/${post.author.profilePic}`
                        : post.author?.avatar
                    }
                    alt={post.author?.name}
                    className='author-profile-pic'
                  />
                ) : (
                  <div className='author-profile-default'>👤</div>
                )}
                <div>
                  <p className='post-meta'>By <strong>{post.author?.name}</strong> · {new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              {post.image && (
                <img
                  src={`http://localhost:5000/uploads/${post.image}`}
                  alt='Post cover'
                  className='post-image'
                />
              )}
              <div className='post-body'>{post.body}</div>
            </article>

            {/* Comments Section */}
            <section className='comments-section'>
              <h2>Comments ({comments.length})</h2>

              {/* Add Comment Form */}
              {user ? (
                <form onSubmit={handleAddComment} className='add-comment-form'>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder='Share your thoughts...'
                    rows='4'
                    className='comment-input'
                  />
                  <button type='submit' className='submit-comment-btn' disabled={!newComment.trim()}>
                    Post Comment
                  </button>
                </form>
              ) : (
                <p className='login-prompt'>
                  Please <a href='/login'>login</a> to add comments.
                </p>
              )}

              {/* Comments List */}
              {comments.length === 0 ? (
                <p className='no-comments'>No comments yet. Be the first to comment!</p>
              ) : (
                <ul className='comments-list'>
                  {comments.map((comment) => (
                    <li key={comment._id} className='comment-item'>
                      <div className='comment-header'>
                        <div className='comment-author-info'>
                          {comment.author?.profilePic || comment.author?.avatar ? (
                            <img 
                              src={
                                comment.author?.profilePic 
                                  ? `http://localhost:5000/uploads/${comment.author.profilePic}`
                                  : comment.author?.avatar
                              }
                              alt={comment.author?.name}
                              className='comment-profile-pic'
                            />
                          ) : (
                            <div className='comment-profile-default'>👤</div>
                          )}
                          <div>
                            <strong>{comment.author?.name || 'User'}</strong>
                            <span className='comment-date'>
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className='comment-body'>{comment.body}</p>

                      {user?.role === 'admin' && (
                        <button
                          className='delete-comment-btn'
                          onClick={() => handleDeleteComment(comment._id)}
                          disabled={deletingCommentId === comment._id}
                        >
                          {deletingCommentId === comment._id ? '...' : 'Delete'}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default PostPage;
