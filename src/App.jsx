import "./App.scss";
import { Route, Routes } from "react-router-dom";
import ChamDiem from "./pages/score/ChamDiem";
import MainHome from "./pages/home/MainHome";
import { lazy, Suspense, useEffect, useState } from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";

//auth pages lazy loading
const Main = lazy(() => import("./layout/Main"));
const Login = lazy(() => import("./pages/auth/Login"));
const Registration = lazy(() => import("./pages/auth/Registration"));

//code pages lazy loading
const Code = lazy(() => import("./pages/code/Code"));

//submission pages lazy loading
const Submission = lazy(() => import("./pages/submission/Submission"));

//problem pages lazy loading
const Problem = lazy(() => import("./pages/submission/Problem"));

const App = () => {
  const [name, setName] = useState("");
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/api/user", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const content = await response.json();
      setName(content.name);
    })();
  });
  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route path="/login" element={<Login setName={setName} />}></Route>
        <Route path="/register" element={<Registration />}></Route>
        <Route element={<Main></Main>}>
          <Route
            path="/code"
            element={
              <ChakraProvider theme={theme}>
                <Code />
              </ChakraProvider>
            }
          ></Route>
          <Route path="/" element={<MainHome></MainHome>}></Route>
          <Route path="/mark-score" element={<ChamDiem></ChamDiem>}></Route>
          <Route path="/submission" element={<Submission></Submission>}></Route>
          <Route path="/problem" element={<Problem></Problem>}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
