import React from "react";
import bg from "../public/getout.jpg";
const GetOut = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
      }}
      className="bg-cover h-screen bg-no-repeat flex flex-col items-center justify-center"
    >
      <div className="font-bold text-3xl text-white">
        You don't have permission here
      </div>
      <div className="font-bold text-3xl text-white">
        Please get out!!!
      </div>
    </div>
  );
};

export default GetOut;
