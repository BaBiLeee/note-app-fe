import React from "react";
import bg from "../public/sad.jpeg";
const DeadPage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
      }}
      className="bg-cover h-screen bg-no-repeat flex flex-col items-center justify-center"
    >
      <div className="font-bold text-3xl text-white">
        Please login before continuing...
      </div>
      <a className="font-bold border rounded-xl p-2 text-white bg-slate-500 hover:scale-105 hover:bg-slate-700 cursor-pointer" href="/login">
        Login here...
      </a>
    </div>
  );
};

export default DeadPage;
