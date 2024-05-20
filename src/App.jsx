import "./App.scss";
import { Route, Routes } from "react-router-dom";
import ChamDiem from "./pages/score/ChamDiem";
import LandingHome from "./pages/home/LandingHome";
import Questions from "./pages/score/Questions";
import Dashboard from "./pages/dashboard/Dashboard";
import ProfilePage from "./pages/profile/ProfilePage";
import { lazy, Suspense } from "react";
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
          <Route
            path="/mark-score"
            element={
              <PrivateRoute element={<ChamDiem></ChamDiem>}></PrivateRoute>
            }
          ></Route>
          <Route
            path="/questions"
            element={
              <PrivateRoute element={<Questions></Questions>}></PrivateRoute>
            }
          ></Route>
          <Route
            path="/submission"
            element={
              <PrivateRoute element={<Submission></Submission>}></PrivateRoute>
            }
          ></Route>
          <Route
            path="/submission/user/:slug"
            element={
              <PrivateRoute
                element={<SubmissionUser></SubmissionUser>}
              ></PrivateRoute>
            }
          ></Route>
          <Route
            path="/submission/:slug"
            element={
              <PrivateRoute
                element={<SubmissionSubmit></SubmissionSubmit>}
              ></PrivateRoute>
            }
          ></Route>
          <Route
            path="/problem"
            element={
              <PrivateRoute element={<Problem></Problem>}></PrivateRoute>
            }
          ></Route>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute element={<Dashboard></Dashboard>}></PrivateRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <PrivateRoute
                element={<ProfilePage></ProfilePage>}
              ></PrivateRoute>
            }
          ></Route>
          <Route
            path="/landinghome"
            element={<LandingHome></LandingHome>}
          ></Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
