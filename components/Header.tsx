
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const getPageTitle = () => {
    if (location.pathname === '/') return 'Dashboard';
    if (pathnames.length > 0) {
      const lastPath = pathnames[pathnames.length - 1];
      return lastPath.charAt(0).toUpperCase() + lastPath.slice(1);
    }
    return 'Dashboard';
  };
  
  const pageTitle = getPageTitle();

  return (
    <nav className="text-sm font-medium" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex items-center">
        {pageTitle === 'Deployments' ? (
          <>
            <li className="flex items-center">
              <Link to="/projects" className="text-gray-400 hover:text-white">Projects</Link>
            </li>
            <li className="flex items-center mx-2 text-gray-500">/</li>
            <li className="flex items-center">
                <span className="text-gray-400">My Awesome Site</span>
            </li>
            <li className="flex items-center mx-2 text-gray-500">/</li>
            <li className="flex items-center">
              <span className="text-white">Deployments</span>
            </li>
          </>
        ) : (
          <li className="flex items-center">
            <span className="text-white text-lg font-semibold">{pageTitle}</span>
          </li>
        )}
      </ol>
    </nav>
  );
};

const Header: React.FC = () => {
  return (
    <header className="flex-shrink-0 bg-gray-900 border-b border-gray-800">
      <div className="flex items-center justify-between h-16 px-4 sm:px-8">
        <div className="flex items-center">
          <Breadcrumbs />
        </div>
        <div className="flex items-center">
          <button className="p-1 text-gray-400 rounded-full hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white">
            <span className="sr-only">View notifications</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          </button>
          <div className="ml-3 relative">
            <div>
              <button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white">
                <span className="sr-only">Open user menu</span>
                <img className="h-8 w-8 rounded-full" src="https://picsum.photos/id/237/100/100" alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
