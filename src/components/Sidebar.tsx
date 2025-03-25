import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth(); // ✅ Get logout function from context

  // Set the document title based on the selected route
  useEffect(() => {
    switch (location.pathname) {
      case '/navbar':
        document.title = 'Navbar Model';
        break;
      case '/circular':
        document.title = 'Circular Model';
        break;
      case '/news':
        document.title = 'Paci News';
        break;
      case '/services':
        document.title = 'Paci Services';
        break;
      case '/daily-news':
        document.title = 'Daily News';
        break;
        case '/web-links':
            document.title = 'Web links';
            break;
      default:
        document.title = 'Admin Panel';
        break;
    }
  }, [location.pathname]);

  const handleLogout = () => {
    logout(); // ✅ Call logout function
  };

  return (
    <div className="w-full bg-gray-800 text-white flex items-center px-4"> {/* ✅ Added padding for better alignment */}
      <div className="font-bold text-xl">Admin Panel</div>
      <nav className="flex flex-row ml-4"> {/* ✅ Added margin-left */}
        <ul className="flex flex-row space-x-4">
          <li>
            <Link
              to="/navbar"
              className={`block p-4 ${
                location.pathname === '/navbar' ? 'bg-gray-600' : 'hover:bg-gray-700'
              }`}
            >
              Navbar Model
            </Link>
          </li>
          <li>
            <Link
              to="/circular"
              className={`block p-4 ${
                location.pathname === '/circular' ? 'bg-gray-600' : 'hover:bg-gray-700'
              }`}
            >
              Circular Model
            </Link>
          </li>
          <li>
            <Link
              to="/news"
              className={`block p-4 ${
                location.pathname === '/news' ? 'bg-gray-600' : 'hover:bg-gray-700'
              }`}
            >
              Paci News
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className={`block p-4 ${
                location.pathname === '/services' ? 'bg-gray-600' : 'hover:bg-gray-700'
              }`}
            >
              Paci Services
            </Link>
          </li>
          <li>
            <Link
              to="/daily-news"
              className={`block p-4 ${
                location.pathname === '/daily-news' ? 'bg-gray-600' : 'hover:bg-gray-700'
              }`}
            >
              Daily News
            </Link>
          </li>
          <li>
            <Link
              to="/web-links"
              className={`block p-4 ${
                location.pathname === '/web-links' ? 'bg-gray-600' : 'hover:bg-gray-700'
              }`}
            >
              Paci Web
            </Link>
          </li>
        </ul>
      </nav>

      {/* ✅ Logout Button */}
      <button
        onClick={handleLogout}
        className="ml-auto bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
