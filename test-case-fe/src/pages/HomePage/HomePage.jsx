import styles from './HomePage.module.css';

import TracksList from '../../Components/TracksList/TracksList';

const HomePage = () => {
  return (
    <div className={styles.homeContainer}>
      <h1 data-testid="tracks-header">Track List</h1>
      <TracksList />
    </div>
  );
};
export default HomePage;
