import React from "react";
import { Formik } from "formik";
import bg from "../public/giphy.gif";
import { useRegisterMutation } from "../api/user/userApi";
import { toast } from "react-toastify";

const Signup = () => {
  const [signup, {data, isLoading, error }] = useRegisterMutation(); 
  console.log("hee", data);
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
      }}
      className="bg-cover h-screen bg-no-repeat flex items-center justify-center"
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <Formik
          initialValues={{ email: "", password: "" , fullname: ""}}
          validate={(values) => {
            const errors = {};
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (
              !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})$/i.test(values.password)
            ) {
              errors.password = "Invalid password"
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              const response = await signup({
                email: values.email, 
                password: values.password,
                fullname: values.fullname
              }).unwrap(); 
              toast.success(response.message);
            } catch (err) {
              toast.error(err.data.email[0]);
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
                Please enter your signup details to continue
              </p>
              <div>
                <input
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
                  type="email"
                  name="email"
                  required="true"
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
                  required="true"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <div>
                <input
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
                  type="fullname"
                  name="fullname"
                  required="true"
                  placeholder="Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullname}
                />
                {errors.fullName && touched.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full p-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Sign Up
              </button>
              <div className="text-center">
                Already have an account?{" "}
                <span className="font-bold cursor-pointer text-red-400 hover:text-black">
                  <a href="/login">Sign in now</a>
                </span>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
