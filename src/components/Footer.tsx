
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                                ITS
                            </div>
                            <span className="font-bold text-white">ITS Showcase</span>
                        </div>
                        <p className="text-sm text-gray-400">Showcasing excellence in research and innovation.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm">
                            <li><button className="hover:text-white transition">Browse Projects</button></li>
                            <li><button className="hover:text-white transition">Submit Work</button></li>
                            <li><button className="hover:text-white transition">Trending</button></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">About</h4>
                        <ul className="space-y-2 text-sm">
                            <li><button className="hover:text-white transition">About ITS</button></li>
                            <li><button className="hover:text-white transition">Contact</button></li>
                            <li><button className="hover:text-white transition">Privacy Policy</button></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Connect</h4>
                        <ul className="space-y-2 text-sm">
                            <li><button className="hover:text-white transition">Twitter</button></li>
                            <li><button className="hover:text-white transition">LinkedIn</button></li>
                            <li><button className="hover:text-white transition">GitHub</button></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; 2024 Institut Teknologi Sepuluh Nopember. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
