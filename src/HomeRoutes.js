import React, { useEffect } from "react";
import About from "./Pages/About/About";
import Details from "./Pages/Details/Details";
import Home from "./Pages/Home/Home";
import Buysell from "./components/Buy&Sell/Buysell";
import CardMain from "./components/Card-2/CardMain";
import Navbar from "./components/Navbar/Navbar";
import Topnft from "./components/Topnft/Topnft";
import Recommended from "./components/Card-3/Recommended";
import AllCard from "./components/AllCardCollection/AllCard";
import MonalisaPage from "./Pages/MonalisaPage/MonalisaPage";
import { useSelector } from "react-redux";

function HomeRoutes() {
  const { user } = useSelector((selector) => selector.auth);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div style={{ overflow: "hidden" }}>
      <div>
        <Home />
      </div>
      <div>
        <About />
      </div>
      <div>
        <Details />
      </div>
      <div>
        <Buysell />
      </div>
      <div>
        <Topnft />
      </div>
      <div>
        <CardMain />
      </div>
    {
      user?  <div>
      <Recommended />
    </div>:""
    }
      <div>
        <MonalisaPage />
      </div>
    </div>
  );
}

export default HomeRoutes;
