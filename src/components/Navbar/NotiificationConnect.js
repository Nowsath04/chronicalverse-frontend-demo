import React from "react";

export default function NotiificationConnect() {
  const menu = ["Market place", "About as", "Contact as", "Connect wallet"];

  return (
    <div className="connect_notification">
      <ul>
        {menu.map((item) => {
          <li key={item}>{menu}</li>;
        })}
      </ul>
    </div>
  );
}
