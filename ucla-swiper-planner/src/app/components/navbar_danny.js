// components/Navbar.js
// WE CAN PROBABLY DELETE THIS ONCE NAV BAR IS COMPLETELY WORKING 

import React from 'react';
import Link from 'next/link';

const Navbar = ({ onPageChange }) => {
  return (
    <nav className="navbar navbar-dark bg-dark d-flex">
      <Link href="/" onClick={() => onPageChange('Home')} className="navbar-brand">
        UCLA-Swiper-Planner
      </Link>
      <div className="navbar-nav ml-auto">
        <Link href="/" onClick={() => onPageChange('Home')} className="nav-link mr-5">
          Home&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Link>
        <Link href="/" onClick={() => onPageChange('FullMenu')} className="nav-link mr-5">
          Full Menu&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Link>
        <Link href="/" onClick={() => onPageChange('Profile')} className="nav-link mr-5">
          Profile&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Link>
        <Link href="/" onClick={() => onPageChange('Calendar')} className="nav-link">
          Calendar
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
