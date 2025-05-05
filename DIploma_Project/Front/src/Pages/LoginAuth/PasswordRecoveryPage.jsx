import React from 'react';
import { Link } from 'react-router-dom';
export default function PasswordRecoveryPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#4D6F97] to-transparent">
            <div className="rounded-[30px] shadow-md w-[400px] bg-[linear-gradient(180deg,rgba(255,255,255,0.915)_0%,#FFFFFF_26%,#A3A3A3_99.99%,rgba(222,222,222,0)_100%)]">
                <div className="border-b border-gray-300 py-4 text-center">
                    <h1 className="text-2xl font-semibold text-black">Password Recovery</h1>
                </div>
                <div className="p-6 flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="px-4 py-2 rounded-sm bg-gray-200 placeholder-gray-600 outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        className="px-4 py-2 rounded-sm bg-gray-200 placeholder-gray-600 outline-none"
                    />
                    <button className="bg-sky-600 text-white py-2 rounded-full hover:bg-sky-700 transition">
                        Send
                    </button>
                    <p className="text-center text-sm text-black">
                        Not a member ? <Link to="/signup" className="text-sky-600 hover:underline">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
