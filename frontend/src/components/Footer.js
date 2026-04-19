import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Footer() {
  const { user } = useAuth();

  // Show different links based on login status
  const quickLinks = user
    ? [
        { to: '/home', label: 'Home' },
        { to: '/blog', label: 'Blog' },
        { to: '/profile', label: 'Profile' },
      ]
    : [
        { to: '/home', label: 'Home' },
        { to: '/blog', label: 'Blog' },
        { to: '/contact', label: 'Contact' },
        { to: '/about', label: 'About' },
        { to: '/login', label: 'Login' },
      ];

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <h3>
              Creative<span className="lime-text">Hub</span>
            </h3>
            <p>Email: rekin@example.com</p>
            <p>Phone: (+63) 972 752 0359</p>
            <p>Address: San Fernando, La Union, Philippines</p>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 CreativeHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
