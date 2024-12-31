import React, { useState } from 'react';
import { getAuth, confirmPasswordReset } from "firebase/auth";
import { useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const oobCode = searchParams.get('oobCode'); // Firebase token from email link
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = async () => {
        try {
            const auth = getAuth();
            await confirmPasswordReset(auth, oobCode, password);
            setMessage("Password reset successful! You can now log in.");
        } catch (error) {
            console.error(error);
            setMessage("Failed to reset password. Please try again.");
        }
    };

    return (
        <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-xl font-semibold mb-4'>Set New Password</h2>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your new password"
                    className='w-full px-4 py-2 border rounded mb-4'
                />
                <button
                    onClick={handleResetPassword}
                    className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none'>
                    Reset Password
                </button>
                {message && <p className='mt-4 text-sm text-green-500'>{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
