import React, { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import Slider from "react-slick";
import "./DashBoard.css";
import arrow from "../../asserts/images/arrow-left (1) 1.png";
import DashBoardCard from "../../components/dashBoardCard/DashBoardCard";
import { dashboardCard, dashboardCard2 } from "./Data";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-gradient";
import Chart from "chart.js/auto";
import mobilebackarrow from "../../Assets/mobileBackarrow.png";
import { AiOutlineLeft } from "react-icons/ai";

const DashBoard = () => {
  const slider = useRef(null);
  const [barThickness, setBarThickness] = useState(24); // Initial bar thickness
  const [dropdown, setDropDown] = useState(false);
  const [headingContent, setHeadingContent] = useState("Date");

  const handleSubmit = () => {
    setDropDown(!dropdown);
  };

  const handleDropdownItemClick = (newContent) => {
    setHeadingContent(newContent);
    setDropDown(false);
    // Close the dropdown when an item is clicked
  };

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,

    responsive: [
      {
        breakpoint: 928,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "100px",
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
        },
      },
      {
        breakpoint: 610,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "100px",
          dots: false,
          arrows: false,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 470,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "45px",
          dots: false,
          arrows: false,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 450,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "35px",
          dots: false,
          arrows: false,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 430,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "30px",
          dots: false,
          arrows: false,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 415,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "25px",
          dots: false,
          arrows: false,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 410,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "35px",
          dots: false,
          arrows: false,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 395,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "30px",
          dots: false,
          arrows: false,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 380,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "22px",
          dots: false,
          arrows: false,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  // Function to calculate and set the bar thickness based on screen width
  const calculateBarThickness = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 750) {
      setBarThickness(15);
    } else {
      setBarThickness(24);
    }
    if (windowWidth <= 550) {
      setBarThickness(8);
    } else {
      setBarThickness(15);
    }
  };

  // Call the function initially and on window resize
  useEffect(() => {
    calculateBarThickness();
    window.addEventListener("resize", calculateBarThickness);
    return () => {
      window.removeEventListener("resize", calculateBarThickness);
    };
  }, []);

  // Define a gradient background for the chart
  const gradientColors = {
    primary: {
      top: "rgba(193, 0, 162, 1)",
      bottom: "rgba(151, 0, 193, 1)",
    },
  };

  // Create a linear gradient background
  const gradientBackground = (ctx) => {
    const chart = ctx.chart;
    const { top, bottom } = gradientColors.primary;
    const gradient = chart.ctx.createLinearGradient(0, 0, 0, chart.height);
    gradient.addColorStop(0.5, top);
    gradient.addColorStop(1, bottom);
    return gradient;
  };

  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [
          5000, 6000, 8000, 4000, 3000, 8000, 5000, 6500, 4800, 8000, 5000,
          2800,
        ],
        backgroundColor: gradientBackground,
        borderRadius: Number.MAX_VALUE,
        barThickness: barThickness,
        barPercentage: 0.1, // Adjust this value to reduce the gap between bars
        categoryPercentage: 0.1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false, // Optionally, you can hide the legend
      },
    },
    scales: {
      x: {
        ticks: {
          color: "rgba(255, 255, 255, 1)",
        },
      },
      y: {
        beginAtZero: true,
        scaleLabel: {
          display: true,
          labelString: "Custom Y-Axis Label",
        },
        ticks: {
          color: "rgba(255, 255, 255, 1)",
          // callback: (value, index, values) => {
          //   return customYAxisLabels[index];
          // },
        },
      },
    },
  };

  //

  return (
    <>
      <div className="dashboard">
        <div className="dashboard_container">
          <div className="dashboard_head">
            <img src={arrow} className="backarrow" />
            <AiOutlineLeft className="responsive_arrow" />
            <div>
              <h3>Dashboard</h3>
              <p>
                The Rise of Digital Collectibles: Exploring the Uncharted Path
                of NFTs
              </p>
            </div>
          </div>
          <div className="dashboard_box">
            <div className="dashboard_box_content">
              <h4>Investment tracking</h4>
              <p>$ 10,000</p>
            </div>
            <div className="dashboard_box_boder">
              <div className="dashboard_inside_box">
                <div className="dashboard_bar_content_div">
                  <div className="dashboard_bar_content">
                    <h4>Growth : 50%</h4>
                    <p>Current value : $ 15,000</p>
                  </div>
                  <div className="dashboard_bar_year">
                    <p>2022</p>
                    <div className="dashnord_input_dropdown_div">
                      <RiArrowDropDownLine
                        className="dashnord_input_dropdown"
                        onClick={handleSubmit}
                      />
                      <div className="dashboard_bar_selectinput">
                        {headingContent}
                      </div>
                      {dropdown && (
                        <div className="dropdown_date_div">
                          <div
                            onClick={() => handleDropdownItemClick("Date")}
                            className="dashboard_option"
                          >
                            Date
                          </div>
                          <div
                            onClick={() => handleDropdownItemClick("Month")}
                            className="dashboard_option"
                          >
                            Month
                          </div>
                          <div
                            onClick={() => handleDropdownItemClick("Year")}
                            className="dashboard_option"
                          >
                            Year
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    overflow: "scroll",
                    position: "relative",
                  }}
                >
                  <div className="dashboard_main_bar_chart">
                    <Bar
                      options={chartOptions}
                      data={chartData}
                      className="dashboard_bar_chart"
                    ></Bar>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="recent_transaction">
            <div className="recent_transaction_content">
              <h4>Recent transactions</h4>
              <p>View all</p>
            </div>
            <div className="recent_transaction_box_boder">
              <div className="recent_transaction_inside_box">
                {dashboardCard.map((item, index) => {
                  return <DashBoardCard key={index} item={item} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashbord_slider_header">
        <h4>Recent transactions</h4>
      </div>
      <div className="Dashboard_slider">
        <Slider ref={slider} {...settings}>
          {dashboardCard2.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <DashBoardCard item={item} />
              </React.Fragment>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default DashBoard;
