import React, { useEffect } from "react";
import { Formik } from "formik";
import bg from "../public/giphy.gif";
import { useLoginMutation } from "../api/auth/authApi";
import { setToken } from "../api/feature/token";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Login = () => {
  const [login, { data, isLoading, error }] = useLoginMutation();
  console.log("hee", data?.data.user.admin);

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
      }}
      className="bg-cover h-screen bg-no-repeat flex items-center justify-center"
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              const response = await login({
                email: values.email,
                password: values.password,
              }).unwrap();
              // setToken(response.data.accessToken);
              toast.success(response.message);
              Cookies.set("token", response.data.accessToken, {
                expires: 7,
                secure: true,
              });
              Cookies.set("admin", response.data.user.admin);
              if (response.data.user.admin == true) {
                setTimeout(() => {
                  window.location.href = "/dashboard";
                }, 2000);
              } else {
                setTimeout(() => {
                  window.location.href = "/note";
                }, 2000);
              }
            } catch (err) {
              toast.error(err.data.message);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h1 className="text-3xl font-semibold text-gray-800 text-center">
                Welcome Back
              </h1>
              <p className="text-gray-500 text-center">
                Please enter your login details to continue
              </p>
              <div>
                <input
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <input
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting || isLoading} // Disable button when submitting or loading
                className="w-full p-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                {isLoading ? "Logging in..." : "Log In"}{" "}
                {/* Show loading state */}
              </button>
              {error && (
                <p className="text-red-500 text-sm mt-2 text-center">
                  {error.message || "An error occurred. Please try again."}
                </p>
              )}
              <div className="text-center">
                Don't have an account?{" "}
                <span className="font-bold cursor-pointer text-red-400 hover:text-black">
                  <a href="/signup">Sign up now</a>
                </span>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
