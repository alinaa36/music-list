import { useTracks } from '../../hooks/useTracks';
import TrackCard from '../../Components/TrackCard/TrackCard';
import styles from './HomePage.module.css';
import TrackSearchBar from '../../Components/trackSearchBar/trackSearchBar';
import TracksList from '../../Components/TracksList/TracksList';
import { TracksProvider } from '../../context';
const HomePage = () => {
  return (
    <TracksProvider>
      <div className="home-page">
        <TrackSearchBar />
        <TracksList />
      </div>
    </TracksProvider>
  );
};
export default HomePage;
