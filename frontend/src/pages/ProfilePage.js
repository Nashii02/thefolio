import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import '../css/ProfilePage.css';

const cartoonAvatars = [
  '/avatars/avatar-1.jpg',
  '/avatars/avatar-2.jpg',
  '/avatars/avatar-3.jpg',
  '/avatars/avatar-4.jpg',
  '/avatars/avatar-5.jpg',
  '/avatars/avatar-6.jpg'
];

const ProfilePage = () => {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [pic, setPic] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || '');
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [msg, setMsg] = useState('');

  // Sync form state when user data changes
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setBio(user.bio || '');
      setSelectedAvatar(user.avatar || '');
      setPic(null); // clear any pending uploads
    }
  }, [user]);

  const previewFromUpload = useMemo(() => {
    return pic ? URL.createObjectURL(pic) : '';
  }, [pic]);

  const picSrc = previewFromUpload
    ? previewFromUpload
    : user?.profilePic
      ? `http://localhost:5000/uploads/${user.profilePic}`
      : selectedAvatar || user?.avatar || '/default-avatar.png';

  const handleProfile = async (e) => {
  e.preventDefault();
  setMsg('');

  const fd = new FormData();
  fd.append('name', name);
  fd.append('bio', bio);

  if (pic) {
    fd.append('profilePic', pic);   // uploaded image
    console.log('Saving: uploaded image', pic.name);
  } else if (selectedAvatar) {
    fd.append('avatar', selectedAvatar); // chosen cartoon avatar
    console.log('Saving: avatar', selectedAvatar);
  }

  try {
    const { data } = await API.put('/auth/profile', fd);
    console.log('Response data:', data);
    setUser(data); // updates auth context
    
    // Reset form state after successful save
    setPic(null);
    setSelectedAvatar(data.avatar || '');
    setShowAvatarPicker(false);
    
    setMsg('Profile saved successfully!');
  } catch (err) {
    console.error('Error:', err);
    setMsg(err.response?.data?.message || 'Error saving profile');
  }
};

  const handlePassword = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await API.put('/auth/change-password', {
        currentPassword: curPw,
        newPassword: newPw
      });
      setMsg('Password changed successfully!');
      setCurPw('');
      setNewPw('');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className='profile-page'>
      <div className='profile-header'>
        <h2>My Profile</h2>
      </div>

      <div className='avatar-picker-wrap'>
        <button
          type='button'
          className='profile-pic-btn'
          onClick={() => setShowAvatarPicker((prev) => !prev)}
          aria-label='Choose profile avatar'
        >
          <img src={picSrc} alt='Profile' className='profile-pic-preview' />
          <span className='avatar-edit-badge'>✎</span>
        </button>

        {showAvatarPicker && (
          <div className='avatar-popover'>
            <p className='avatar-popover-title'>Choose an avatar</p>
            <div className='avatar-grid'>
              {cartoonAvatars.map((avatar) => (
                <button
                  key={avatar}
                  type='button'
                  className={`avatar-option ${selectedAvatar === avatar ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedAvatar(avatar);
                    setPic(null); // clear upload if choosing avatar
                  }}
                >
                  <img src={avatar} alt='Cartoon avatar option' />
                </button>
              ))}
            </div>

            <label className='upload-inline'>
              <span>Or upload</span>
              <input
                type='file'
                accept='image/*'
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setPic(file);
                  if (file) setSelectedAvatar('');
                }}
              />
            </label>
          </div>
        )}
      </div>

      {msg && <p className='success-msg'>{msg}</p>}

      <form onSubmit={handleProfile}>
        <h3>Edit Profile</h3>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Display name'
        />

        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder='Short bio...'
          rows={3}
        />

        <div className='profile-actions'>
          <button type='submit' className='save-btn'>
            Save Changes
          </button>
        </div>
      </form>

      <form onSubmit={handlePassword}>
        <h3>Change Password</h3>
        <input
          type='password'
          placeholder='Current password'
          value={curPw}
          onChange={(e) => setCurPw(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='New password (min 6 chars)'
          value={newPw}
          onChange={(e) => setNewPw(e.target.value)}
          required
          minLength={6}
        />
        <button type='submit'>Change Password</button>
      </form>

      <div className='logout-section'>
        <button onClick={handleLogout} className='logout-btn'>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
