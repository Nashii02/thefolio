import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import API from '../api/axios';
import '../css/AdminPage.css';

const AdminPage = () => {
  const { theme } = useTheme();
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [tab, setTab] = useState('users');

  useEffect(() => {
    API.get('/admin/users').then((r) => setUsers(r.data));
    API.get('/admin/posts').then((r) => setPosts(r.data));
    API.get('/contact').then((r) => setMessages(r.data));
  }, []);

  const toggleStatus = async (id) => {
    const { data } = await API.put(`/admin/users/${id}/status`);
    setUsers((prev) => prev.map((u) => (u._id === id ? data.user : u)));
  };

  const removePost = async (id) => {
    await API.put(`/admin/posts/${id}/remove`);
    setPosts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, status: 'removed' } : p))
    );
  };

  return (
    <div className='admin-page'>
      <h2>Admin Dashboard</h2>

      <div className='admin-tabs'>
        <button
          onClick={() => setTab('users')}
          className={tab === 'users' ? 'active' : ''}
        >
          Members ({users.length})
        </button>
        <button
          onClick={() => setTab('posts')}
          className={tab === 'posts' ? 'active' : ''}
        >
          All Posts ({posts.length})
        </button>
        <button
          onClick={() => setTab('messages')}
          className={tab === 'messages' ? 'active' : ''}
        >
          Messages ({messages.length})
        </button>
      </div>

      {tab === 'users' && (
        <table className='admin-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th className='action-col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`status-badge ${u.status}`}>{u.status}</span>
                </td>
                <td className='action-col'>
                  <button
                    onClick={() => toggleStatus(u._id)}
                    className={u.status === 'active' ? 'btn-danger' : 'btn-success'}
                  >
                    {u.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tab === 'posts' && (
        <table className='admin-table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th className='action-col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>{p.author?.name}</td>
                <td>
                  <span className={`status-badge ${p.status}`}>{p.status}</span>
                </td>
                <td className='action-col'>
                  {p.status === 'published' && (
                    <button className='btn-danger' onClick={() => removePost(p._id)}>
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tab === 'messages' && (
        <table className='admin-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => (
              <tr key={m._id}>
                <td>{m.name}</td>
                <td>{m.email}</td>
                <td>{m.message}</td>
                <td>{new Date(m.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPage;
