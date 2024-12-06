import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex flex-col">
      <div 
        className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <div className="flex items-center space-x-8">
          <h1 className="text-white text-xl font-bold">无畏契约准星生成器</h1>
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPath === '/' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              EDITOR
            </Link>
            <Link
              to="/BROWSE"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPath === '/BROWSE' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              BROWSE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
