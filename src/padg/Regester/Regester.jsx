import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function Regester() {
  const phoneRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("name is required")
      .min(3, "name must be at least 3 characters")
      .max(15, "name must be at most 15 characters"),

    email: yup
      .string()
      .required("email is required")
      .email("email is not valid"),

    password: yup
      .string()
      .required("password is required")
      .matches(
        /^[A-Z][0-9a-zA-z]{5,25}$/,
        "password should start with uppercase letter followed by a combinations of letters and number form 5 to 25"
      ),

    rePassword: yup
      .string()
      .required("Re-Password is required")
      .oneOf(
        [yup.ref("password")],
        "password and re-password should be the same"
      ),

    phone: yup
      .string()
      .required("Phone Number is required")
      .matches(phoneRegex, "phone number is not valid"),
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  let id;
  async function submit(values) {
    try {
      const option = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };
      id = toast.loading("Waiting...");
      const { data } = await axios.request(option);
      console.log(data);
      toast.dismiss(id);
      toast.success("User Created Successfully");

      setTimeout(() => {
        if (data.message == "success") {
          navigate("/auth/login");
        }
      }, [3000]);
    } catch (error) {
      console.log(error);
      toast.dismiss(id);
      toast.error(error.response.data.message);
      setErrorMsg(error.response.data.message);
    }
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: submit,
  });
  console.log(formik);
  return (
    <>
      <section className="p-4 md:p-0">
        <div className=" flex items-center gap-4 mb-4 text-primary">
          <i className="fa-solid fa-user text-2xl"></i>
          <h2 className="text-4xl font-light">Register Now :</h2>
        </div>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Name"
              className="outline-0 border-2 border-slate-100 w-full py-2 px-3"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="text-red-600 text-lg font-bold mt-2">
                * {formik.errors.name}
              </div>
            ) : (
              ""
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="outline-0 border-2 border-slate-100 w-full py-2 px-3"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="text-red-600 text-lg font-bold mt-2">
                * {formik.errors.email}
              </div>
            ) : (
              ""
            )}
            {errorMsg ? (
              <div className="text-red-600 text-lg font-bold mt-2">
                * {errorMsg}
              </div>
            ) : (
              ""
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="password"
              className="outline-0 border-2 border-slate-100 w-full py-2 px-3"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="text-red-600 text-lg font-bold mt-2">
                * {formik.errors.password}
              </div>
            ) : (
              ""
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Re-Password"
              className="outline-0 border-2 border-slate-100 w-full py-2 px-3"
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="text-red-600 text-lg font-bold mt-2">
                * {formik.errors.rePassword}
              </div>
            ) : (
              ""
            )}
          </div>

          <div>
            <input
              type="tel"
              placeholder="Phone Number"
              className="outline-0 border-2 border-slate-100 w-full py-2 px-3"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div className="text-red-600 text-lg font-bold mt-2">
                * {formik.errors.phone}
              </div>
            ) : (
              ""
            )}
          </div>

          <button
            type="submit"
            className="bg-primary py-2 px-5 text-white text-xl rounded-lg"
          >
            Register
          </button>
        </form>
      </section>
    </>
  );
}
