import { useTracks } from '../../hooks/useTracks';
import TrackCard from '../../Components/TrackCard/TrackCard';
import styles from './HomePage.module.css';
import TrackSearchBar from '../../Components/trackSearchBar/trackSearchBar';
import TracksList from '../../Components/TracksList/TracksList';
import { TracksProvider } from '../../context/context';
import FilterSidebar from '../../Components/trackSearchBar/trackSearchBar';
const HomePage = () => {
  return (
    <TracksProvider>
      <div className={styles.homeContainer}>
        <TracksList />
      </div>
    </TracksProvider>
  );
};
export default HomePage;
