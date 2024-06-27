import React, { useState, useEffect } from 'react';

const Popup = ({ setShowPopup, message }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const duration = 3000; // 3 seconds in milliseconds
    const interval = 100; // Update every 100ms

    const timer = setTimeout(() => {
      setIsVisible(false);
      setShowPopup(false); // Call setShowPopup to hide the popup
    }, duration);

    const progressTimer = setInterval(() => {
      setProgress((prev) => prev + (100 * interval) / duration);
    }, interval);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, [setShowPopup]);

  return (
    isVisible && (
      <div style={styles.popup}>
        <div>{message}</div>
        <div style={styles.progressContainer}>
          <div style={{ ...styles.progressBar, width: `${progress}%` }}></div>
        </div>
      </div>
    )
  );
};

const styles = {
  popup: {
    padding: '10px',
    backgroundColor: '#DDEDFF',
    border: '1px solid blue',
    borderRadius: '5px',
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  progressContainer: {
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: '5px',
    overflow: 'hidden',
    marginTop: '10px',
  },
  progressBar: {
    height: '5px',
    backgroundColor: 'blue',
    transition: 'width 0.1s linear',
  },
};

export default Popup;
