import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navegate = useNavigate();
  async function newPassword(values) {
    try {
      const option = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: values,
      };
      let id = toast.loading("Waiting...");
      let { data } = await axios.request(option);
      console.log(data);
      toast.dismiss(id);
      toast.success("Successfully");

      setTimeout(() => {
        if (data.token) {
          navegate("home");
        }
      }, 2000);
    } catch (error) {
      toast.error("The password is not valid try again");
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: newPassword,
  });
  return (
    <>
      <Helmet>
        <title>Reset Password</title>
        <meta name="description" content="Reset password page" />
      </Helmet>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-3 px-3 md:px-0"
      >
        <input
          value={formik.values.email}
          name="email"
          onChange={formik.handleChange}
          onSubmit={formik.handleSubmit}
          type="email"
          className="outline-0 border-2 border-slate-100 w-full py-2 px-3 rounded-md"
          placeholder="Enter your email"
        />
        <input
          value={formik.values.ResetPassword}
          name="newPassword"
          onSubmit={formik.handleSubmit}
          onChange={formik.handleChange}
          type="password"
          className="outline-0 border-2 border-slate-100 w-full py-2 px-3 rounded-md"
          placeholder="Enter new password"
        />
        <button
          type="submit"
          className="bg-primary w-fit py-2 px-4 text-white rounded-lg text-lg"
        >
          Change Password
        </button>
      </form>
    </>
  );
}
