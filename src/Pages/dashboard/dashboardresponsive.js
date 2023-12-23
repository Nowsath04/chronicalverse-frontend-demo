import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ data, options }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Adjust bar thickness based on screen width
  if (windowWidth <= 700) {
    options.barThickness = 10; // Reduce bar thickness for small screens
  } else {
    options.barThickness = 25; // Default bar thickness for larger screens
  }

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
