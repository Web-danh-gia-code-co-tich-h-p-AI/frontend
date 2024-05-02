import Header from "../layout/headerfooter/Header";
import Footer from "../layout/headerfooter/Footer";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default Main;
