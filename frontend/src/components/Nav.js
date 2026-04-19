import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Nav() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h1>
              Creative<span className="lime-text">Hub</span>
            </h1>
          </div>
          <nav className="main-nav">
            <ul>
              <li>
                <Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>
                  Home
                </Link>
              </li>

              <li>
                <Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''}>
                  Blog
                </Link>
              </li>

              {!user || user.role !== 'admin' ? (
                <li>
                  <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
                    Contact
                  </Link>
                </li>
              ) : null}

              {user ? (
                <>
                  <li>
                    <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
                      Profile
                    </Link>
                  </li>

                  {user.role === 'admin' && (
                    <li>
                      <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
                        Admin
                      </Link>
                    </li>
                  )}
                </>
              ) : (
                <>
                  <li>
                    <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                      About
                    </Link>
                  </li>

                  <li>
                    <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Nav;