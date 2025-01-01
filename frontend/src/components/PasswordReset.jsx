import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';

const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handlePasswordReset = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);

            // Show an alert message
            alert("Password reset email sent! Please check your inbox.");

            // Navigate to the login page after sending the email
            setTimeout(() => {
                navigate("/login", { state: { resetMessage: "Password reset email sent! Please check your inbox." } });
            }, 2000); // Delay for 2 seconds before navigating
        } catch (error) {
            console.error(error);
            alert("Failed to send password reset email. Please try again.");
        }
    };

    return (
        <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-xl font-semibold mb-4'>Reset Password</h2>
                <form onSubmit={handlePasswordReset}> {/* Use onSubmit here */}
                    <div className='mb-4'>
                        <label
                            className='block text-gray-700 text-sm font-bold mb-2'
                            htmlFor="email"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                        />
                    </div>
                    <div>
                        <button
                            type="submit" // Use type="submit" for form submission
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded-full w-full focus:outline-none'
                        >
                            Send Reset Email
                        </button>
                    </div>
                </form>
                <div className='mt-6 text-center'>
                    <p className='text-sm'>
                        Remember your password?{" "}
                        <Link to="/login" className='text-blue-500 hover:text-blue-700 font-medium'>
                            Login here
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

export default PasswordReset;
