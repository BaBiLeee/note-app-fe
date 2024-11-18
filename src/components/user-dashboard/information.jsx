import React, { useState, useEffect } from "react";
import { useGetAuthDataQuery, useUpdateUserProfileMutation } from "../../api/user/userApi";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Infor = () => {
    const accessToken = Cookies.get("token");
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        avatar: "",
    });

    const { data } = useGetAuthDataQuery({ accessToken: accessToken });
    const [updateInfo] = useUpdateUserProfileMutation();
    // Cập nhật state khi API trả về dữ liệu
    useEffect(() => {
        if (data?.data[0]) {
            setFormData({
                fullname: data.data[0].fullname || "",
                email: data.data[0].email || "",
                avatar: data.data[0].avatar || "",
            });
        }
    }, [data]);

    // Xử lý khi input thay đổi
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    

    // Hàm gửi API cập nhật dữ liệu
    const handleSubmit = async (e) => {
      e.preventDefault(); // Ngăn chặn hành vi mặc định của form
  
      try {
          // Gửi yêu cầu cập nhật thông tin
          const response = await updateInfo({
              accessToken,
              id: data?.data[0].id,
              data: { ...formData }, // Sao chép dữ liệu để đảm bảo không bị thay đổi ngoài ý muốn
          }).unwrap();
  
          // Hiển thị thông báo thành công
          toast.success("User updated successfully!");
      } catch (error) {
          // Hiển thị thông báo lỗi
          toast.error("Failed to update user. Please try again.");
          console.error("Error updating user:", error);
      }
  };
  

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
                    <form onSubmit={handleSubmit} className="">
                        <h1 className="font-bold text-sm">Name:</h1>
                        <input
                            name="fullname"
                            placeholder="Enter name"
                            value={formData.fullname} // Dùng giá trị từ state
                            onChange={handleChange}
                            className="w-full rounded-md p-2 border border-black mb-4"
                        />
                        <h1 className="font-bold text-sm">Email:</h1>
                        <input
                            name="email"
                            placeholder="Enter your email address"
                            value={formData.email} // Dùng giá trị từ state
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border border-black mb-4"
                        />
                        <span className="text-sm font-bold text-gray-700">
                            Image preview
                        </span>
                        <div className="w-96 h-96">
                            <img
                                src={formData.avatar} // Dùng giá trị từ state
                                alt="Avatar"
                                className="w-full h-auto border border-black"
                            />
                        </div>
                        <h1 className="text-sm font-bold text-gray-700 mt-10">
                            Add / Change Image
                        </h1>
                        <input
                            className="p-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="file_input_help"
                            id="file_input"
                            type="file"
                            accept="image/*"
                            // Xử lý file upload sau
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
