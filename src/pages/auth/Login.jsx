import COVER_IMAGE from "../../assets/images/login-cover-image.jpg";
import GOOGLE_ICON from "../../assets/images/google-icon.png";
import MICROSOFT_ICON from "../../assets/images/microsoft-icon.png";
import { useState } from "react";
import { redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import FallbackComponent from "../../utils/FallbackComponent";

// const colors = {
//   primary: "#060606",
//   background: "#F5F5F5",
//   disbaled: "#D9D9D9",
// };
const username = "11177298";
const password = "60-dayfreetrial";
const encodedCredentials = btoa(`${username}:${password}`);

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectstate, setRedirectstate] = useState(false);

  const submitLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(
      // "http://localhost:8000/api/login",
      "https://yunomixapi-001-site1.atempurl.com/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${encodedCredentials}`,
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      }
    );

    const content = await response.json();

    setRedirectstate(true);
    props.setName(content.name);
  };
  if (redirectstate) {
    return redirect("/");
  }
  return (
    <div className="flex items-start w-full h-screen">
      <div className="relative flex flex-col hidden h-full laptop:w-1/2 laptop:block">
        <div className="absolute top-[20%] left-[10%] flex flex-col">
          <h1 className="my-4 text-4xl font-extrabold text-white">
            Turn Your Ideas into reality
          </h1>
          <p className="text-xl font-normal text-white">
            Start for free and get attractive offers from the community
          </p>
        </div>
        <img
          src={COVER_IMAGE}
          alt="login-cover-image"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="w-full h-full bg-[#F5F5F5] flex flex-col p-8 tablet:p-20 justify-between items-center laptop:w-1/2">
        <h1 className="w-full max-w-[500px] mx-auto text-xl text-[#060606] font-semibold ">
          Interactive Brand
        </h1>

        <div className="flex flex-col w-full text-[#060606] max-w-[500px]">
          <div className="flex flex-col w-full mb-2">
            <h3 className="mb-4 text-3xl font-semibold">Login</h3>
            <p className="mb-2 text-base">
              Welcome Back ! Please enter your details.
            </p>
          </div>

          <div className="flex flex-col w-full">
            <form onSubmit={submitLogin}>
              <input
                className="w-full py-2 my-2 text-black bg-transparent border-b border-black outline-none focus:outline-none"
                type="email"
                placeholder="Enter your email address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-full py-2 my-2 text-black bg-transparent border-b border-black outline-none focus:outline-none"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="items-center justify-between w-full tablet:flex">
                <div className="flex items-center w-full">
                  <input type="checkbox" className="w-4 h-4 mr-2" />
                  <p className="text-sm">Remember me for 30 days</p>
                </div>
                <p className="text-sm font-medium underline cursor-pointer whitespace-nowrap underline-offset-2">
                  Forgot Password ?
                </p>
              </div>
              <div className="flex flex-col w-full my-4">
                <button
                  className="w-full text-white bg-[#060606] rounded-md p-4 text-center flex items-center justify-center my-2 font-semibold cursor-pointer"
                  type="submit"
                >
                  Log in
                </button>
                {/* <button className="w-full text-[#060606] bg-white border border-black rounded-md p-4 text-center flex items-center justify-center my-2 font-semibold cursor-pointer">
              Register
            </button> */}
              </div>
            </form>
          </div>

          <div className="flex items-center justify-center w-full py-2 laptop:relative">
            <div className="w-full h-[1px] hidden laptop:block bg-black/40"></div>
            <p className="laptop:absolute text-lg bg-[#f5f5f5] text-black/80">
              or
            </p>
          </div>

          <div className="w-full text-[#060606] bg-white border border-black/40 rounded-md p-4 text-center flex items-center justify-center my-2 font-semibold cursor-pointer">
            <img src={GOOGLE_ICON} alt="google-icon" className="h-6 mr-2" />
            Sign in with Google
          </div>
          <div className="w-full text-[#060606] bg-white border border-black/40 rounded-md p-4 text-center flex items-center justify-center my-2 font-semibold cursor-pointer">
            <img
              src={MICROSOFT_ICON}
              alt="microsoft-icon"
              className="h-6 mr-2"
            />
            Sign in with Microsoft
          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          {/* <p>Dont have an account? Please tell to the add to get the account</p> */}
          <p className="text-sm font-normal text-[#583838]">
            Dont have an account?{" "}
            <span className="font-semibold underline cursor-pointer underline-offset-2">
              Sign up for free
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

// Login.propTypes = {
//   setName: PropTypes.func.isRequired,
// };

const EnhancedLogin = withErrorBoundary(Login, {
  FallbackComponent,
});

export default EnhancedLogin;
