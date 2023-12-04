import React, { useEffect } from "react";

export const Alert = ({ type, msg, list, removeAlert }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      removeAlert();
    }, 2000);
    return () => clearTimeout(timeOut);
  }, [list]);
  return (
    <div>
      <p className={`alert alert-${type}`}>{msg}</p>
    </div>
  );
};
