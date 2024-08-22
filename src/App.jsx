import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/Slices/authSlice";
import Layout from "./components/Layout.jsx";
import { HomePage } from "./pages/HomePage.jsx";

import VideoDetail from "./pages/VideoDetail.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LikedVideos from "./pages/LikedVideos.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AuthLayot from "./components/AuthLayot";
import Playlists from "./pages/Playlists.jsx";
import Playlist from "./pages/Playlist.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import Subscriptions from "./pages/Subscriptions.jsx";
import ManageSubs from "./pages/ManageSubs.jsx";
import Collections from "./pages/Collections.jsx";
import Channel from "./pages/Channel/Channel.jsx";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
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
              <AuthLayot authentication={false}>
                <SearchPage />
              </AuthLayot>
            }
          />
          <Route
            path="/liked-videos"
            element={
              <AuthLayot authentication={true}>
                <LikedVideos />
              </AuthLayot>
            }
          />
          <Route
            path="/playlists"
            element={
              <AuthLayot authentication={true}>
                <Playlists />
              </AuthLayot>
            }
          />
          <Route
            path="/playlists/:playlistId"
            element={
              <AuthLayot authentication={true}>
                <Playlist />
              </AuthLayot>
            }
          />
          <Route
            path="/history"
            element={
              <AuthLayot authentication={true}>
                <HistoryPage />
              </AuthLayot>
            }
          />
          <Route
            path="/subscriptions"
            element={
              <AuthLayot authentication={true}>
                <Subscriptions />
              </AuthLayot>
            }
          />
          <Route
            path="/subscriptions/manage"
            element={
              <AuthLayot authentication={true}>
                <ManageSubs />
              </AuthLayot>
            }
          />
          <Route
          path="/channel/:username"
            element={
              <AuthLayot authentication={true}>
                <Channel />
              </AuthLayot>
            }
          />
        </Route>
        <Route
          path="/watch/:videoId/:ownerId"
          element={
            <AuthLayot authentication={true}>
              <VideoDetail />
            </AuthLayot>
          }
        />
        <Route
          path="/collections"
          element={
            <AuthLayot authentication={true}>
              <Collections />
            </AuthLayot>
          }
        />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
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
