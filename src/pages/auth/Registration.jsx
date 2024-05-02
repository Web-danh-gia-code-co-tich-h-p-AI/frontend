import COVER_IMAGE from "../../assets/images/login-cover-image.jpg";
import GOOGLE_ICON from "../../assets/images/google-icon.png";
import MICROSOFT_ICON from "../../assets/images/microsoft-icon.png";
import { useState } from "react";
import { redirect } from "react-router-dom";
import { withErrorBoundary } from "react-error-boundary";
import FallbackComponent from "../../utils/FallbackComponent";

// const colors = {
//   primary: "#060606",
//   background: "#F5F5F5",
//   disbaled: "#D9D9D9",
// };

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectstate, setRedirectstate] = useState(false);
  // const usernameSmater = "11168186";
  // const passwordSmater = "60-dayfreetrial";
  // const encodedCredentials = btoa(`${usernameSmater}:${passwordSmater}`);
  const submitRegister = async (e) => {
    e.preventDefault();
    console.log({ name, email, password });
    // const response = await fetch(
    //   "yunomix280304-001-site1.ftempurl.com/api/register",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Basic ${encodedCredentials}`,
    //     },
    //     body: JSON.stringify({ name, email, password }),
    //   }
    await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    // const content = await response.json();
    // console.log(content);
    setRedirectstate(true);
  };
  if (redirectstate) {
    return redirect("/login");
  }

  return (
    <div className="flex items-start w-full h-screen">
      <div className="relative flex flex-col w-1/2 h-full">
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

      <div className="w-1/2   h-full bg-[#F5F5F5] flex flex-col p-20 justify-between items-center">
        <h1 className="w-full max-w-[500px] mx-auto text-xl text-[#060606] font-semibold ">
          Interactive Brand
        </h1>

        <div className="flex flex-col w-full text-[#060606] max-w-[500px]">
          <div className="flex flex-col w-full mb-2">
            <h3 className="mb-4 text-3xl font-semibold">Registration</h3>
            <p className="mb-2 text-base">
              Welcome to Grading System ! Please enter your details.
            </p>
          </div>

          <div className="flex flex-col w-full">
            <form onSubmit={submitRegister}>
              <input
                className="w-full py-2 my-2 text-black bg-transparent border-b border-black outline-none focus:outline-none"
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
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
              <div className="flex flex-col w-full my-4">
                <button
                  className="w-full text-white bg-[#060606] rounded-md p-4 text-center flex items-center justify-center my-2 font-semibold cursor-pointer"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          <div className="relative flex items-center justify-center w-full py-2">
            <div className="w-full h-[1px] bg-black/40"></div>
            <p className="absolute text-lg bg-[#f5f5f5] text-black/80">or</p>
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

        <div className="flex items-center justify-center w-full"></div>
      </div>
    </div>
  );
};

const EnhancedRegistration = withErrorBoundary(Registration, {
  FallbackComponent,
});

export default EnhancedRegistration;
