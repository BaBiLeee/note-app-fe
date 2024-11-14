import React from "react";
import { useGetAuthDataQuery } from "../../api/auth/authApi";
import Cookies from "js-cookie";
const Infor = () => {
    const token = Cookies.get('token');
    const {data} = useGetAuthDataQuery({accessToken: token})
    console.log(data?.data[0].avatar);
    return (
    <div className="col-span-4 mx-4 bg-white p-6 rounded-xl shadow-sm w-full ">
      <div className="text-center p-5">
        <h1 className="font-bold text-xl">Public profile</h1>
        <span className="text-gray-700 text-sm">
          Add information about yourself
        </span>
      </div>
      <div className="p-5 border-t border-r border-gray-200 flex flex-col items-center">
        <div className="w-full max-w-lg">
          <form
            //   onSubmit={handleSubmit(onSubmit)}
            className=""
          >
            <h1 className="font-bold text-sm">Name:</h1>
            <input
              placeholder="Enter name"
              // {...register('fullName', { required: true })}
              className="w-full rounded-md p-2 border border-black mb-4"
            />
            <h1 className="font-bold text-sm">Email:</h1>
            <input
              placeholder="Enter your email address"
              // {...register('email')}
              className="w-full p-2 rounded-md border border-black mb-4"
            />
            <h1 className="font-bold text-sm">Phone:</h1>
            <input
              placeholder="Enter phone number"
              // {...register('phoneNumber')}
              className="w-full p-2 rounded-md border border-black mb-4"
            />
            <span className="text-sm font-bold text-gray-700">
              Image preview
            </span>
            <div className="w-96 h-96">
              <img
                src={data?.data[0].avatar}
                alt="altAvt"
                className="w-full h-auto border border-black"
              />
            </div>
            <h1 className="text-sm font-bold text-gray-700 mt-10">
              Add / Change Image
            </h1>
            {/* <input
                className="p-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
              /> */}
            <input
              className="p-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
              accept="image/*"
              // {...register('file')}
              // onChange={handleFileChange}
            />
            <button
              type="submit"
              className="text-white font-bold bg-black mt-4 py-2 px-4 hover:opacity-80 rounded-md"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Infor;
