import Header from "../layout/headerfooter/Header";
import Footer from "../layout/headerfooter/Footer";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const username = "11168186";
const password = "60-dayfreetrial";
const encodedCredentials = btoa(`${username}:${password}`);
const Main = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "http://localhost:8000/api/user",
        // "https://yunomix280304-001-site1.ftempurl.com/api/user",
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Basic ${encodedCredentials}`,
          },
          credentials: "include",
        }
      );

      const content = await response.json();

      setName(content.name);
    })();
  });
  return (
    <>
      <Header name={name} setName={setName} />
      {/* <Header></Header> */}
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default Main;
