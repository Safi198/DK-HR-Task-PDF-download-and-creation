import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/home/HomePage";
import Header from "./common/Header";
import Footer from "./components/footer/Footer";
import FillTheForm from "./components/form/FillTheForm";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "./page/ForgetPassword";
import ResetPassword from "./page/ResetPassword";
import SignupRequests from "./components/signupRequests/SignupRequests";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "./features/authSlice";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Check if token exists on app load
        const token = localStorage.getItem("token");
        if (!token) {
            // If no token, clear user state
            dispatch(clearUser());
        }
    }, [dispatch]);

    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/filltheform" element={<FillTheForm />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                        path="/forgetpassword"
                        element={<ForgetPassword />}
                    />
                    <Route
                        path="/user/resetPassword"
                        element={<ResetPassword />}
                    />
                    <Route
                        path="/signuprequests"
                        element={<SignupRequests />}
                    />
                </Routes>
                <Footer />
            </BrowserRouter>
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
