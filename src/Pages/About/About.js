// import jesus_1 from "../../Assets/jesus-1.png";
// import jesus_2 from "../../Assets/jesus-2.png";
// import jesus_3 from "../../Assets/jesus-3.png";
// import jesus_4 from "../../Assets/jesus-4.png";
import "./About.css";

export default function About() {
  return (
    <>
      <div className="JesusAbout">
        <div className="JesusAbout_div">
          <div className="Jesus_div2">
            <button className="Jesus_Button">See more</button>
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
              We give the best quality <br />
              <span>NFTs</span> for you
            </div>
            <p className="Jesus_paragraph">
              Lorem ipsum dolor sit amet consectetur. Viverra sagittis <br />
              dignissim amet cursus urna vitae et. Amet aliquet <br />
              volutpat ac at nunc.
            </p>
            <div className="Jesus_div1">
              <button className="Jesus_Button">See more</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
