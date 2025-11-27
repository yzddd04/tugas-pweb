
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState<'user' | 'admin'>('user');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            login({
                name: 'John Doe',
                email: email,
                role: userType,
            });
            router.push(userType === 'admin' ? '/admin' : '/');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
                <div className="space-y-2 mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to your account</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {/* User Type Selector */}
                    <div className="grid grid-cols-2 gap-3 p-1 bg-gray-100 rounded-lg">
                        <button
                            type="button"
                            onClick={() => setUserType('user')}
                            className={`py-2 rounded-md font-medium transition ${userType === 'user'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Researcher
                        </button>
                        <button
                            type="button"
                            onClick={() => setUserType('admin')}
                            className={`py-2 rounded-md font-medium transition ${userType === 'admin'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Admin
                        </button>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-900">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="demo@its.ac.id"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition"
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-900">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
                    >
                        Sign In
                    </button>
                </form>

                {/* Demo Credentials */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-gray-600 mb-2"><strong>Demo Credentials:</strong></p>
                    <p className="text-xs text-gray-600">Email: demo@its.ac.id</p>
                    <p className="text-xs text-gray-600">Password: anything</p>
                </div>

                <button
                    onClick={() => router.push('/')}
                    className="w-full mt-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold text-gray-700"
                >
                    Continue as Guest
                </button>
            </div>
        </div>
    );
}
