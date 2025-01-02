import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [message, setMessage] = useState("");
    const { registerUser, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            setMessage("Passwords do not match. Please try again.");
            return;
        }
        try {
            await registerUser(data.email, data.password);
            alert("User registered successfully!");
            navigate("/login");
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setMessage("This email is already in use. Please use a different email.");
            } else if (error.code === "auth/invalid-email") {
                setMessage("The email address is not valid. Please enter a valid email.");
            } else if (error.code === "auth/weak-password") {
                setMessage("The password is too weak. Please use a stronger password.");
            } else {
                setMessage("An unexpected error occurred. Please try again.");
            }
            console.error(error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            alert("Login successful!");
            navigate("/");
        } catch (error) {
            alert("Google sign-in failed!");
            console.error(error);
        }
    };

    return (
        <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-xl font-semibold mb-4'>Please Register</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label
                            className='block text-gray-700 text-sm font-bold mb-2'
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            {...register("email", { required: "Email is required" })}
                            type="email"
                            name="email"
                            id="email"
                            placeholder='Email Address'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                    </div>
                    <div className='mb-4'>
                        <label
                            className='block text-gray-700 text-sm font-bold mb-2'
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            {...register("password", { required: "Password is required" })}
                            type="password"
                            name="password"
                            id="password"
                            placeholder='Password'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                    </div>
                    <div className='mb-4'>
                        <label
                            className='block text-gray-700 text-sm font-bold mb-2'
                            htmlFor="confirmPassword"
                        >
                            Confirm Password
                        </label>
                        <input
                            {...register("confirmPassword", { required: "Confirm Password is required" })}
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder='Confirm Password'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword.message}</p>}
                    </div>
                    {message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>}
                    <div>
                        <button
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded-full w-full focus:outline-none'
                        >
                            Register
                        </button>
                    </div>
                </form>

                {/* Google Sign-In */}
                <div className='mt-4'>
                    <button
                        onClick={handleGoogleSignIn}
                        className='w-full flex flex-wrap gap-1 items-center justify-center bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 rounded-full focus:outline-none'
                    >
                        <FaGoogle className='mr-2' />
                        Sign in with Google
                    </button>
                </div>

                {/* Login Section */}
                <div className='mt-6 text-center'>
                    <p className='text-sm'>
                        Have an account?{" "}
                        <Link to="/login" className='text-blue-500 hover:text-blue-700 font-medium'>
                            Login
                        </Link>
                    </p>
                </div>

                <p className='mt-5 text-center text-gray-500 text-xs'>
                    ©2025 Book Store. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Register;
