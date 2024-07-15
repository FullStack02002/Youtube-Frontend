import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { SignupPage, LoginPage,HomePage} from "./pages";
import { AuthLayot } from "./components";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/Slices/authSlice";

const App = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getCurrentUser());

  },[dispatch])
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route
          path="/"
          element={
            <AuthLayot authentication={false}>
              <HomePage />
            </AuthLayot>
          }
        ></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
      </Routes>

<Toaster
  position="top-right"
  reverseOrder={false}
  toastOptions={{
    duration: 3000,
    style: {
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
      color: '#ffffff',
      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
      padding: '16px',
      fontFamily: 'Roboto, sans-serif',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
    },
    success: {
      icon: '✅',
      style: {
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #22c55e, #4ade80)',
        color: '#ffffff',
        borderLeft: '5px solid #16a34a',
      },
    },
    error: {
      icon: '❌',
      style: {
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #ef4444, #f87171)',
        color: '#ffffff',
        borderLeft: '5px solid #dc2626',
      },
    },
  }}
/>

    </>
  );
};

export default App;
