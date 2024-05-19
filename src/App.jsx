import "./App.scss";
import { Route, Routes } from "react-router-dom";
import ChamDiem from "./pages/score/ChamDiem";
import MainHome from "./pages/home/MainHome";
import Questions from "./pages/score/Questions";
import Dashboard from "./pages/dashboard/Dashboard";
import { lazy, Suspense, useEffect, useState } from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import PrivateRoute from "./pages/auth/PrivateRoute";
import HomeFirst from "./pages/auth/HomeFirst";

import AdminPage from "./pages/auth/AdminPage";
import StudentPage from "./pages/auth/StudentPage";

// Home page lazy loading
const Home = lazy(() => import("./pages/Home"));

// Auth pages lazy loading
const Main = lazy(() => import("./layout/Main"));
const Login = lazy(() => import("./pages/auth/Login"));
const Registration = lazy(() => import("./pages/auth/Registration"));

// Code pages lazy loading
const Code = lazy(() => import("./pages/code/Code"));

// Submission pages lazy loading
const Submission = lazy(() => import("./pages/submission/Submission"));
const SubmissionUser = lazy(() => import("./pages/submission/SubmissionUser"));
const SubmissionSubmit = lazy(() =>
  import("./pages/submission/SubmissionSubmit")
);

const Problem = lazy(() => import("./pages/submission/Problem"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route
          path="/admin"
          element={<PrivateRoute element={<AdminPage />} />}
        />
        <Route
          path="/student"
          element={<PrivateRoute element={<StudentPage />} />}
        />
        <Route path="/" element={<HomeFirst />} />

        {/* Uncomment and use these routes as necessary */}
        {/* 
        <Route element={<Main />}>
          <Route path="/home" element={<Home />} />
          <Route 
            path="/code" 
            element={
              <ChakraProvider theme={theme}>
                <Code />
              </ChakraProvider>
            }
          ></Route>
          <Route path="/home" element={<MainHome></MainHome>}></Route>
          <Route path="/mark-score" element={<ChamDiem></ChamDiem>}></Route>
          <Route path="/questions" element={<Questions></Questions>}></Route>
          <Route path="/submission" element={<Submission></Submission>}></Route>
          <Route
            path="/submission/user/:slug"
            element={<SubmissionUser></SubmissionUser>}
          ></Route>
          <Route
            path="/submission/:slug"
            element={<SubmissionSubmit></SubmissionSubmit>}
          ></Route>
          <Route path="/problem" element={<Problem></Problem>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        </Route>
        */}
      </Routes>
    </Suspense>
  );
};

export default App;
