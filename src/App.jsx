import "./App.scss";
import { Route, Routes } from "react-router-dom";
import ChamDiem from "./pages/score/ChamDiem";
import LandingHome from "./pages/home/LandingHome";
import Questions from "./pages/score/Questions";
import ProfilePage from "./pages/profile/ProfilePage";
import { lazy, Suspense } from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import PrivateRoute from "./pages/auth/PrivateRoute";

// Auth pages lazy loading
const Main = lazy(() => import("./layout/Main"));
const Login = lazy(() => import("./pages/auth/Login"));
const Registration = lazy(() => import("./pages/auth/Registration"));
const UserPage = lazy(() => import("./pages/auth/UserPage"));
const StudentPage = lazy(() => import("./pages/auth/StudentPage"));
const TeacherPage = lazy(() => import("./pages/auth/TeacherPage"));
const AdminPage = lazy(() => import("./pages/auth/AdminPage"));

// Code pages lazy loading
const Code = lazy(() => import("./pages/code/Code"));

// Other pages lazy loading
const AboutUs = lazy(() => import("./pages/auth/AboutUs"));
const Unauthorized = lazy(() => import("./pages/auth/Unauthorized"));
const NotFound = lazy(() => import("./pages/auth/NotFound"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>} className="">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route element={<Main />}>
          <Route
            path="/"
            element={<LandingHome />}
            allowedRoles={["Teacher", "Admin", "User", "Student"]}
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute element={<AdminPage />} allowedRoles="Admin" />
            }
          />
          <Route
            path="/teacher"
            element={
              <PrivateRoute element={<TeacherPage />} allowedRoles="Teacher" />
            }
          />
          <Route
            path="/student"
            element={
              <PrivateRoute element={<StudentPage />} allowedRoles="Student" />
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoute element={<UserPage />} allowedRoles="User" />
            }
          />
          <Route
            path="/code"
            element={
              <PrivateRoute
                element={
                  <ChakraProvider theme={theme}>
                    <Code />
                  </ChakraProvider>
                }
                allowedRoles={["Student", "Teacher"]}
              />
            }
          ></Route>
          <Route
            path="/mark-score"
            element={
              <PrivateRoute
                element={<ChamDiem></ChamDiem>}
                allowedRoles="Teacher"
              ></PrivateRoute>
            }
          ></Route>
          <Route
            path="/questions"
            element={
              <PrivateRoute
                element={<Questions></Questions>}
                allowedRoles="Teacher"
              ></PrivateRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <PrivateRoute
                element={<ProfilePage></ProfilePage>}
                allowedRoles={["Teacher", "Admin", "User", "Student"]}
              ></PrivateRoute>
            }
          ></Route>

          <Route path="/about-us" element={<AboutUs />}></Route>
          <Route path="/unauthorized" element={<Unauthorized />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
