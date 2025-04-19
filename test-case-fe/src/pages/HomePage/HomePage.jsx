import './HomePage.css';
import { useTracks } from '../../hooks/useTracks'; // Adjust the path as needed
import TrackCard from '../TrackCard/TrackCard';
const HomePage = () => {
  const { tracks, error, loading } = useTracks();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="home-page">
      {tracks.length > 0 ? (
        tracks.map((track) => (
          <div key={track.id} className="track">
            <TrackCard
              title={track.title}
              artist={track.artist}
              image={track.coverImage}
            />
          </div>
        ))
      ) : (
        <p>Tracks not found</p>
      )}
    </div>
  );
};
export default HomePage;
