import React from "react";
import "./Spinner.css"
import { useSelector } from "react-redux";
export const Spinner = () => {
    const spinner = useSelector((state) => state.spinner);
  return (
    spinner.show &&
    <div className="overlay fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 z-50">
        <div className="p-4 mx-auto text-white font-semibold">{spinner.title}</div>
      <div className="spinner"></div>
    </div>
  );
};