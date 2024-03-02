import Link from 'next/link';

const Navbar = () => {
  const navbarStyle = {
    backgroundColor: 'var(--ucla-blue)',
    padding: 'var(--spacing-medium)',
  };

  const navListStyle = {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
  };

  const navItemStyle = {
    margin: '0 var(--spacing-small)',
  };

  const navLinkStyle = {
    color: 'var(--white)',
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  const navLinkHoverStyle = {
    textDecoration: 'underline',
  };

  return (
    <nav style={navbarStyle}>
      <ul style={navListStyle}>
        <li style={navItemStyle}>
          <Link href="/" legacyBehavior>
            <a style={navLinkStyle}>Home</a>
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link href="/components/Profile" legacyBehavior>
            <a style={navLinkStyle}>Profile</a>
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link href="/components/Calendar" legacyBehavior>
            <a style={navLinkStyle}>Calendar</a>
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link href="/components/FullMenu" legacyBehavior>
            <a style={navLinkStyle}>Full Menu</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
