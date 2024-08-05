import React, { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage.jsx";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/Slices/authSlice";

// lazy load pages

const VideoDetail = lazy(() => import("./pages/VideoDetail.jsx"));
const SearchPage = lazy(() => import("./pages/SearchPage.jsx"));
const SignupPage = lazy(() => import("./pages/SignupPage.jsx"));
const LikedVideos=lazy(()=>import("./pages/LikedVideos.jsx"));
const LoginPage=lazy(()=>import("./pages/LoginPage.jsx"));

// lazy load components
const AuthLayot = lazy(() => import("./components/AuthLayot"));
const Layout = lazy(() => import("./components/Layout.jsx"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense>
              <Layout />
            </Suspense>
          }
        >
          <Route
            path=""
            element={
              <AuthLayot authentication={false}>
                <HomePage />
              </AuthLayot>
            }
          />
          <Route
            path="/search/:query"
            element={
              <Suspense>
                <AuthLayot authentication={false}>
                  <SearchPage />
                </AuthLayot>
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/watch/:videoId/:ownerId"
          element={
            <Suspense >
              <AuthLayot authentication={true}>
                <VideoDetail />
              </AuthLayot>
            </Suspense>
          }
        />
        <Route
          path="/liked-videos"
          element={
           <Suspense>
             <AuthLayot authentication={true}>
              <LikedVideos />
            </AuthLayot>
           </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense>
              <SignupPage />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense>
              <LoginPage />
            </Suspense>
          }
        />
      </Routes>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
            color: "#ffffff",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
            padding: "16px",
            fontFamily: "Roboto, sans-serif",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
          },
          success: {
            icon: "✅",
            style: {
              borderRadius: "12px",
              background: "linear-gradient(135deg, #22c55e, #4ade80)",
              color: "#ffffff",
              borderLeft: "5px solid #16a34a",
            },
          },
          error: {
            icon: "❌",
            style: {
              borderRadius: "12px",
              background: "linear-gradient(135deg, #ef4444, #f87171)",
              color: "#ffffff",
              borderLeft: "5px solid #dc2626",
            },
          },
        }}
      />
    </>
  );
};

export default App;
