import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/Menu">Profile</Link>
        </li>
        <li>
          <Link href="/Calendar">Calendar</Link>
        </li>
        <li>
          <Link href="/FullMenu">Full Menu</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
