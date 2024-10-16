import React from "react";

const Wrapper = ({ children, className }) => {
  return (
    <div className={`max-w-screen-xl mx-auto w-full ${className}`}>
      {children}
    </div >
  );
};

export default Wrapper;