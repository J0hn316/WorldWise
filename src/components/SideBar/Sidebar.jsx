import AppNav from '../AppNav/AppNav';
import Footer from '../Footer/Footer';
import Logo from '../Logo/Logo';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <p>List of cities</p>
      <Footer />
    </div>
  );
};
export default Sidebar;
