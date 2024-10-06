import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
      <nav className="bg-blue-500 p-4">
        <ul className="flex space-x-4 text-white">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/practice">Practice</Link></li>
        </ul>
      </nav>
    );
  }  

export default Header;
