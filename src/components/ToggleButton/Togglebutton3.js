import { useState } from "react";
import "./ToggleButton.css";
export default function ToggleButton3() {
  const [ToggleButton3, setToggleButton3] = useState(false);

  const handleClick3 = () => {
    setToggleButton3(!ToggleButton3);
  };
  return (
    <>
      <div className="toggle3" onClick={handleClick3}>
        {ToggleButton3 ? (
          <div className="toggle_left3"></div>
        ) : (
          <div className="toggle_right3"> </div>
        )}
      </div>
    </>
  );
}
