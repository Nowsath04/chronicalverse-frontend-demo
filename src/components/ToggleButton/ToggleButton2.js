import { useState } from "react";
import "./ToggleButton.css";
export default function ToggleButton2() {
  const [ToggleButton2, setToggleButton2] = useState(false);

  const handleClick2 = () => {
    setToggleButton2(!ToggleButton2);
  };
  return (
    <>
      <div className="toggle2" onClick={handleClick2}>
        {ToggleButton2 ? (
          <div className="toggle_left2"></div>
        ) : (
          <div className="toggle_right2"> </div>
        )}
      </div>
    </>
  );
}
