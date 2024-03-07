// components/Navbar.js
import Link from 'next/link';
import styles from '../styles/Navbar.module.css'; // Assuming you have this CSS file for styling

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          {/* Use Link with legacyBehavior prop */}
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/Profile" className={styles.navLink}>
            Profile
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/Calendar" className={styles.navLink}>
           Calendar
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
