// context/TracksContext.js
import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useTracks } from '../hooks/useTracks';

const TracksContext = createContext(null);

export const TracksProvider = ({ children }) => {
  const value = useTracks(); // використай твій хук

  return (
    <TracksContext.Provider value={value}>{children}</TracksContext.Provider>
  );
};

TracksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTracksContest = () => {
  const context = useContext(TracksContext);
  if (!context) throw new Error('useTracks must be used within TracksProvider');
  return context;
};
