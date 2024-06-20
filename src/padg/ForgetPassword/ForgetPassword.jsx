import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const naveget = useNavigate();
  async function submitEmail(values) {
    try {
      const option = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "POST",
        data: values,
      };
      let id = toast.loading("Waiting...");
      const { data } = await axios.request(option);
      console.log(data);
      toast.dismiss(id);
      toast.success("successfully");
      setTimeout(() => {
        if (data.statusMsg == "success") {
          naveget("/auth/reset");
        }
      }, 2000);
    } catch (error) {
      toast.error("Your email is not valid");
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: submitEmail,
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col px-3 md:px-0"
      >
        <input
          type="email"
          className="w-full border-2 border-gray-200 p-2 rounded-md outline-none"
          placeholder="Enter Your Email"
          value={formik.values.email}
          name="email"
          onChange={formik.handleChange}
          onSubmit={formik.handleSubmit}
        />
        <button
          type="submit"
          className="bg-primary w-fit py-2 px-4 text-white rounded-lg text-lg mt-3"
        >
          Send Code
        </button>
      </form>
    </>
  );
}
