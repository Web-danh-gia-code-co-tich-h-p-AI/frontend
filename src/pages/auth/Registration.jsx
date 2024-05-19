import COVER_IMAGE from "../../assets/images/login-cover-image.jpg";
import GOOGLE_ICON from "../../assets/images/google-icon.png";
import MICROSOFT_ICON from "../../assets/images/microsoft-icon.png";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosConfig"; // Sử dụng instance axios đã cấu hình
import Cookies from "js-cookie";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    name: Yup.string().required("Name is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one special character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleRegister = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("/Account/register", values);

      // Hiển thị toast thông báo đăng ký thành công
      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Điều hướng đến trang đăng nhập
      navigate("/login");
    } catch (error) {
      console.error("Error registering", error);
      toast.error("Registration failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-start w-full h-screen">
      <div className="relative flex flex-col h-full laptop:w-1/2 laptop:block">
        <div className="absolute top-[20%] left-[10%] flex flex-col">
          <h1 className="my-4 text-4xl hidden laptop:block font-extrabold text-white">
            Turn Your Ideas into reality
          </h1>
          <p className="text-xl font-normal hidden laptop:block text-white">
            Start for free and get attractive offers from the community
          </p>
        </div>
        <img
          src={COVER_IMAGE}
          alt="login-cover-image"
          className="object-cover hidden laptop:block w-full h-full"
        />
      </div>

      <div className="w-full h-full bg-[#F5F5F5] flex flex-col p-8 tablet:p-20 justify-between items-center laptop:w-1/2">
        <h1 className="w-full max-w-[500px] mx-auto text-xl text-[#060606] font-semibold ">
          Interactive Brand
        </h1>

        <div className="flex flex-col w-full text-[#060606] max-w-[500px]">
          <div className="flex flex-col w-full mb-2">
            <h3 className="mb-4 text-3xl font-semibold">Register</h3>
            <p className="mb-2 text-base">
              Welcome! Please enter your details to register.
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  className="w-full py-2 my-2 text-black bg-transparent border-b border-black outline-none focus:outline-none"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email address"
                  className="w-full py-2 my-2 text-black bg-transparent border-b border-black outline-none focus:outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />

                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full py-2 my-2 text-black bg-transparent border-b border-black outline-none focus:outline-none"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />

                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  className="w-full py-2 my-2 text-black bg-transparent border-b border-black outline-none focus:outline-none"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500"
                />

                <div className="flex flex-col w-full my-4">
                  <button
                    className="w-full text-white bg-[#060606] rounded-md p-4 text-center flex items-center justify-center my-2 font-semibold cursor-pointer"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Registering..." : "Register"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="flex items-center justify-center w-full py-2 laptop:relative">
            <div className="w-full h-[1px] hidden laptop:block bg-black/40"></div>
            <p className="laptop:absolute text-lg bg-[#f5f5f5] text-black/80">
              or
            </p>
          </div>

          <div className="w-full text-[#060606] bg-white border border-black/40 rounded-md p-4 text-center flex items-center justify-center my-2 font-semibold cursor-pointer">
            <img src={GOOGLE_ICON} alt="google-icon" className="h-6 mr-2" />
            Sign up with Google
          </div>
          <div className="w-full text-[#060606] bg-white border border-black/40 rounded-md p-4 text-center flex items-center justify-center my-2 font-semibold cursor-pointer">
            <img
              src={MICROSOFT_ICON}
              alt="microsoft-icon"
              className="h-6 mr-2"
            />
            Sign up with Microsoft
          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          <p className="text-sm font-normal text-[#583838]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold underline cursor-pointer underline-offset-2"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Registration;
