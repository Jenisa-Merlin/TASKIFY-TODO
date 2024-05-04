import React from "react";

// receives 2 props checked (whether checkbox is checked) and onChange (when checkbox state changes)
const Checkbox = ({ checked, onChange }) => {
  // JSX representing component's UI
  return (
    <input type="checkbox" checked={checked} onChange={onChange}
           style={{ width: "25px", height: "25px" }}
    />
  );
};

export default Checkbox;