import React from "react";

function DynamicComponent({ parentMenu, currentMenu }) {
  return (
    <>
      <div>DynamicComponent</div>
      <p>{parentMenu}</p>
      <p>{currentMenu}</p>
    </>
  );
}

export default DynamicComponent;
