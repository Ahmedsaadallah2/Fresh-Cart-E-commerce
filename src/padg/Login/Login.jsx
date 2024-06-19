import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { userContext } from "../../User.Context/User.context";

export default function Login() {
  const validationSchema = yup.object({
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
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  let id;
  const { setToken } = useContext(userContext);
  async function submitLogin(values) {
    try {
      const option = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };
      id = toast.loading("Waiting...");
      const { data } = await axios.request(option);
      console.log(data);
      toast.dismiss(id);
      toast.success("User Loggedin Successfully");

      setTimeout(() => {
        if (data.message == "success") {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          navigate("/home");
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
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitLogin,
  });
  console.log(formik);
  return (
    <>
      <section className="p-4 md:p-0">
        <div className=" flex items-center gap-4 mb-4 text-primary">
          <i className="fa-solid fa-user text-2xl"></i>
          <h2 className="text-4xl font-light">Login Now :</h2>
        </div>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
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
            {errorMsg ? (
              <div className="text-red-600 text-lg font-bold mt-2">
                * {errorMsg}
              </div>
            ) : (
              ""
            )}
          </div>
          <button
            type="submit"
            className="bg-primary py-2 px-5 text-white text-xl rounded-lg"
          >
            Login
          </button>
        </form>
      </section>
    </>
  );
}
