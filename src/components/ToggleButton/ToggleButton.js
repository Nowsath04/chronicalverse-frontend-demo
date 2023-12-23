import { useState } from "react";
import "./ToggleButton.css";
export default function ToggleButton() {
  const [ToggleButton, setToggleButton] = useState(false);

  const handleClick = () => {
    setToggleButton(!ToggleButton);
  };
  return (
    <>
      <div className="toggle" onClick={handleClick}>
        {ToggleButton ? (
          <div className="toggle_left"></div>
        ) : (
          <div className="toggle_right"> </div>
        )}
      </div>
    </>
  );
}
