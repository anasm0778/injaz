import React from "react";
import "../loading-spinner/LoadingSpinner.css" // Import the CSS file for styling

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loader">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;