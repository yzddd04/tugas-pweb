
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center gap-3 cursor-pointer">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-lg">
                            ITS
                        </div>
                        <span className="font-bold text-gray-900 hidden sm:block">ITS Showcase</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className={`${isActive('/') ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 font-medium transition`}>
                            Home
                        </Link>
                        <Link href="/catalog" className={`${isActive('/catalog') ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 font-medium transition`}>
                            Projects
                        </Link>
                        {currentUser?.role === 'admin' && (
                            <Link href="/admin" className={`${isActive('/admin') ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 font-medium transition`}>
                                Admin
                            </Link>
                        )}
                    </div>

                    {/* User Section */}
                    <div className="flex items-center gap-4">
                        {currentUser ? (
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                                    {currentUser.name.charAt(0)}
                                </div>
                                <span className="text-sm font-medium text-gray-700 hidden sm:block">{currentUser.name}</span>
                                <button onClick={handleLogout} className="p-2 hover:bg-gray-100 rounded-lg transition">
                                    <LogOut size={18} className="text-gray-600" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                            >
                                Login
                            </Link>
                        )}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden pb-4 border-t border-gray-200 animate-in fade-in slide-in-from-top-2 duration-200">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium">
                            Home
                        </Link>
                        <Link href="/catalog" onClick={() => setMobileMenuOpen(false)} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium">
                            Projects
                        </Link>
                        {currentUser?.role === 'admin' && (
                            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium">
                                Admin
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
