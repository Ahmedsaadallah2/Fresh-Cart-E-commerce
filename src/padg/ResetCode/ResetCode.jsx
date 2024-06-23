import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ResetCode() {
  const navegat = useNavigate();
  async function sumbitCode(values) {
    try {
      const option = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values,
      };
      const id = toast.loading("waiting...");
      let { data } = await axios.request(option);
      console.log(data);
      toast.dismiss(id);
      toast.success("Successfully");
      setTimeout(() => {
        if (data.status === "Success") {
          navegat("/auth/resetpassword");
        }
      }, 2000);
    } catch (error) {
      toast.error("code is wrong");
    }
  }
  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: sumbitCode,
  });

  return (
    <>
      <Helmet>
        <title>Reset Code</title>
        <meta name="description" content="Reset code page" />
      </Helmet>
      <form className="px-3 md:px-0" onSubmit={formik.handleSubmit}>
        <input
          value={formik.values.resetCode}
          name="resetCode"
          onChange={formik.handleChange}
          onSubmit={formik.handleSubmit}
          type="text"
          className="outline-0 border-2 border-slate-100 w-full py-2 px-3 rounded-md"
          placeholder="Write your code"
        />
        <button
          type="submit"
          className="bg-primary w-fit py-2 px-4 text-white rounded-lg text-lg mt-3"
        >
          Send
        </button>
      </form>
    </>
  );
}
