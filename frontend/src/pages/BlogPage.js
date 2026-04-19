import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import '../css/BlogPage.css';

const BlogPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [commentsByPost, setCommentsByPost] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState('');
  const [deletingCommentId, setDeletingCommentId] = useState('');
  const { user } = useAuth();

  // New post creation
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [newPostImage, setNewPostImage] = useState(null);
  const [creatingPost, setCreatingPost] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await API.get('/posts');
      const postsData = res.data;
      setPosts(postsData);

      const commentPromises = postsData.map((post) =>
        API.get(`/comments/${post._id}`)
          .then((r) => ({ postId: post._id, comments: r.data }))
          .catch(() => ({ postId: post._id, comments: [] }))
      );

      const commentsResults = await Promise.all(commentPromises);
      const map = {};
      commentsResults.forEach(({ postId, comments }) => {
        map[postId] = comments;
      });
      setCommentsByPost(map);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.body.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    try {
      setCreatingPost(true);
      const formData = new FormData();
      formData.append('title', newPost.title);
      formData.append('body', newPost.body);
      if (newPostImage) {
        formData.append('image', newPostImage);
      }

      const res = await API.post('/posts', formData);
      setPosts([res.data, ...posts]);
      setCommentsByPost((prev) => ({ ...prev, [res.data._id]: [] }));
      setNewPost({ title: '', body: '' });
      setNewPostImage(null);
    } catch (err) {
      console.error(err);
      alert('Failed to create post. Please try again.');
    } finally {
      setCreatingPost(false);
    }
  };

  const onCommentChange = (postId, value) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  };

  const addComment = async (postId) => {
    const text = (commentInputs[postId] || '').trim();
    if (!text) return;

    try {
      const res = await API.post(`/comments/${postId}`, { body: text });
      const created = res.data;

      setCommentsByPost((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), created],
      }));

      setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    } catch (err) {
      console.error(err);
      alert('Failed to add comment. Please login as member/admin.');
    }
  };

  const canDeletePost = (post) => {
    const userId = user?._id || user?.id || '';
    const authorId =
      post?.author?._id ||
      post?.author?.id ||
      (typeof post?.author === 'string' ? post.author : '');

    return user && (user.role === 'admin' || String(userId) === String(authorId));
  };

  const handleDelete = async (postId) => {
    const ok = window.confirm('Delete this post?');
    if (!ok) return;

    try {
      setDeletingId(postId);
      await API.delete(`/posts/${postId}`);

      setPosts((prev) => prev.filter((p) => p._id !== postId));

      setCommentsByPost((prev) => {
        const next = { ...prev };
        delete next[postId];
        return next;
      });

      setCommentInputs((prev) => {
        const next = { ...prev };
        delete next[postId];
        return next;
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to delete post');
    } finally {
      setDeletingId('');
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    const ok = window.confirm('Delete this comment?');
    if (!ok) return;

    try {
      setDeletingCommentId(commentId);
      await API.delete(`/admin/comments/${commentId}`);

      setCommentsByPost((prev) => ({
        ...prev,
        [postId]: (prev[postId] || []).filter((c) => c._id !== commentId),
      }));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to delete comment');
    } finally {
      setDeletingCommentId('');
    }
  };

  if (loading) return <p className="loading">Loading community posts...</p>;

  return (
    <>
      {/* Main Blog Content */}
      <section className="blog-section">
        <div className="container">
          <div className="blog-layout">
            {/* Create Post Section */}
            {user && (
              <div className="create-post-box">
                <div className="create-post-header">
                  {user.profilePic || user.avatar ? (
                    <img 
                      src={
                        user.profilePic 
                          ? `http://localhost:5000/uploads/${user.profilePic}`
                          : user.avatar
                      } 
                      alt={user.name}
                      className="profile-pic-small"
                    />
                  ) : (
                    <div className="profile-pic-default">👤</div>
                  )}
                  <h3>{user.name}</h3>
                </div>
                <form onSubmit={handleCreatePost}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Post Title"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      required
                      maxLength="100"
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      placeholder="What's on your mind? Share your ideas, thoughts, or experiences..."
                      value={newPost.body}
                      onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                      required
                      rows="5"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewPostImage(e.target.files[0] || null)}
                      className="file-input"
                    />
                    {newPostImage && <p className="file-name">📎 {newPostImage.name}</p>}
                  </div>
                  <button type="submit" className="post-button" disabled={creatingPost}>
                    {creatingPost ? 'Publishing...' : 'Publish'}
                  </button>
                </form>
              </div>
            )}

            {/* Posts Feed */}
            <div className="posts-feed">
              <h2>Community Posts</h2>
              {posts.length === 0 ? (
                <div className="no-posts">
                  <p>No posts yet. Be the first to share!</p>
                  {!user && <Link to="/login" className="login-link">Login to create a post</Link>}
                </div>
              ) : (
                <div className="posts-list">
                  {posts.map((post) => (
                    <article 
                      key={post._id} 
                      className="post-item"
                      onClick={() => navigate(`/posts/${post._id}`)}
                    >
                      <div className="post-header">
                        <div className="post-meta">
                          <div className="post-author-info">
                            {post.author?.profilePic || post.author?.avatar ? (
                              <img 
                                src={
                                  post.author?.profilePic 
                                    ? `http://localhost:5000/uploads/${post.author.profilePic}`
                                    : post.author?.avatar
                                }
                                alt={post.author.name}
                                className="profile-pic-tiny"
                              />
                            ) : (
                              <div className="profile-pic-default-tiny">👤</div>
                            )}
                            <div>
                              <h3>{post.title}</h3>
                              <p className="post-author">
                                By <strong>{post.author?.name || 'Anonymous'}</strong> · {new Date(post.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        {canDeletePost(post) && (
                          <button
                            className="delete-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(post._id);
                            }}
                            disabled={deletingId === post._id}
                            title="Delete post"
                          >
                            {deletingId === post._id ? '...' : 'Delete'}
                          </button>
                        )}
                      </div>

                      <div className="post-content">
                        <p>{post.body}</p>
                      </div>

                      {/* Comments Section */}
                      <div className="comments-section" onClick={(e) => e.stopPropagation()}>
                        <h4>Comments ({(commentsByPost[post._id] || []).length})</h4>

                        {(commentsByPost[post._id] || []).length === 0 ? (
                          <p className="no-comments">No comments yet. Start the conversation!</p>
                        ) : (
                          <ul className="comments-list">
                            {commentsByPost[post._id].map((comment) => (
                              <li key={comment._id} className="comment-item">
                                <div className="comment-header">
                                  <div className="comment-author-info">
                                    {comment.author?.profilePic || comment.author?.avatar ? (
                                      <img 
                                        src={
                                          comment.author?.profilePic 
                                            ? `http://localhost:5000/uploads/${comment.author.profilePic}`
                                            : comment.author?.avatar
                                        }
                                        alt={comment.author?.name}
                                        className="comment-profile-pic"
                                      />
                                    ) : (
                                      <div className="comment-profile-default">👤</div>
                                    )}
                                    <div className="comment-content">
                                      <strong>{comment.author?.name || 'User'}</strong>
                                      <div className="comment-meta">
                                        <span className="comment-date">
                                          {new Date(comment.createdAt).toLocaleDateString()}
                                        </span>
                                        {user?.role === 'admin' && (
                                          <button
                                            className="comment-delete-btn"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleDeleteComment(post._id, comment._id);
                                            }}
                                            disabled={deletingCommentId === comment._id}
                                            title="Delete comment"
                                          >
                                            {deletingCommentId === comment._id ? '...' : 'Delete'}
                                          </button>
                                        )}
                                      </div>
                                      <p className="comment-body">{comment.body}</p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}

                        {user && (
                          <div className="add-comment">
                            <input
                              type="text"
                              placeholder="Share your thoughts..."
                              value={commentInputs[post._id] || ''}
                              onChange={(e) => onCommentChange(post._id, e.target.value)}
                            />
                            <button onClick={() => addComment(post._id)}>Comment</button>
                          </div>
                        )}

                        {!user && (
                          <p className="login-prompt">
                            <Link to="/login">Login</Link> to comment on posts
                          </p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;