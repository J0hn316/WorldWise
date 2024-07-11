import Map from '../../components/Map/Map';
import Sidebar from '../../components/SideBar/Sidebar';
import styles from './AppLayout.module.css';

const AppLayout = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
};
export default AppLayout;
