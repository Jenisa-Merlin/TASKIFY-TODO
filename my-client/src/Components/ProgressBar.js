import React from "react";

// receives `progress` value as a prop
const ProgressBar = ({ progress }) => {
  // array colors contains the possible colors for the inner bar of the progress bar
  const colors = [
    "rgb(255,214,161)",
    "rgb(255,175,163)",
    "rgb(108,115,148)",
    "rgb(141,181,145)",
  ];
  // line selects random color from colors array to apply to the inner bar
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  // JSX representing component's UI
  return (
    <div className="outer-bar">
      <div className="inner-bar"
        style={{ width: `${progress}%`, backgroundColor: randomColor }}>
      </div>
    </div>
  );
};

export default ProgressBar;