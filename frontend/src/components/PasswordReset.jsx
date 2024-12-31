import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handlePasswordReset = async () => {
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset email sent! Please check your inbox.");
        } catch (error) {
            console.error(error);
            setMessage("Failed to send password reset email. Please try again.");
        }
    };

    return (
        <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-xl font-semibold mb-4'>Reset Password</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className='w-full px-4 py-2 border rounded mb-4'
                />
                <button
                    onClick={handlePasswordReset}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none'>
                    Send Reset Email
                </button>
                {message && <p className='mt-4 text-sm text-green-500'>{message}</p>}
            </div>
        </div>
    );
};

export default PasswordReset;
