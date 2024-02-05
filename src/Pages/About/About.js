// import jesus_1 from "../../Assets/jesus-1.png";
// import jesus_2 from "../../Assets/jesus-2.png";
// import jesus_3 from "../../Assets/jesus-3.png";
// import jesus_4 from "../../Assets/jesus-4.png";
import { useNavigate } from "react-router-dom";
import "./About.css";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/searchallcard")
  }
  return (
    <>
      <div className="JesusAbout">
        <div className="JesusAbout_div">
          <div className="Jesus_div2">
            <button className="Jesus_Button"  onClick={handleClick}>See more</button>
          </div>
          <div className="JesusImgdiv">
            <div className="Jesus_grdient"></div>
            <div className="JesusImg">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="JesusContent">
            <div className="Jesus_heading">
              We give the best quality<span> </span>
              <span>NFTs</span> for you
            </div>
            <p className="Jesus_paragraph">
              Discover excellence at its finest with our curated selection of NFTs.
              We take pride in delivering the best quality digital art
              for your collection.
            </p>
            <div className="Jesus_div1">
              <button onClick={handleClick} className="Jesus_Button">See more</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
