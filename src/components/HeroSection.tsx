
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { mockProjects } from '@/lib/data';

const HeroSection = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16 px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in duration-700">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                        ITS <span className="text-blue-600">Showcase</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600">
                        Explore final projects and research innovations from Institut Teknologi Sepuluh Nopember.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Link
                        href="/catalog"
                        className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                        Explore Projects <ArrowRight size={20} />
                    </Link>
                    <Link
                        href="/login"
                        className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition font-semibold text-lg border-2 border-blue-600"
                    >
                        Submit Work
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 text-center">
                    {[
                        { label: 'Projects', value: mockProjects.length },
                        { label: 'Departments', value: 5 },
                        { label: 'Total Views', value: '12K+' },
                        { label: 'Active Researchers', value: '500+' }
                    ].map((stat, idx) => (
                        <div key={idx} className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition">
                            <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                            <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
