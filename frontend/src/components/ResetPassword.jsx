import React, { useState } from 'react';
import { getAuth, confirmPasswordReset } from "firebase/auth";
import { useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const oobCode = searchParams.get('oobCode'); // Firebase token from email link
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        try {
            const auth = getAuth();
            await confirmPasswordReset(auth, oobCode, password);
            setMessage("Password reset successful! You can now log in.");
        } catch (error) {
            setMessage("Failed to reset password. Please try again.");
        }
    };

    return (
        <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-xl font-semibold mb-4'>Set New Password</h2>
                
                <div className='mb-4'>
                    <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor="password"
                    >
                        New Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your new password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
                    />
                </div>

                <div className='mb-4'>
                    <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor="confirmPassword"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
                    />
                </div>

                {message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>}

                <div className='mb-2 text-left'>
                    <p className='text-sm'>
                        <Link
                            to="/login"
                            className='text-blue-500 hover:text-blue-700 font-medium'
                        >
                            Back to Login
                        </Link>
                    </p>
                </div>

                <div>
                    <button
                        onClick={handleResetPassword}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded-full w-full focus:outline-none'
                    >
                        Reset Password
                    </button>
                </div>

                <p className='mt-5 text-center text-gray-500 text-xs'>
                    ©2025 Book Store. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;
