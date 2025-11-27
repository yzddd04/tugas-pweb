
'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import FilterSidebar from '@/components/FilterSidebar';
import ProjectCard from '@/components/ProjectCard';
import { mockProjects } from '@/lib/data';

export default function CatalogPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('latest');
    const [filters, setFilters] = useState<{
        department: string[];
        year: number[];
        type: string[];
        tags: string[];
    }>({
        department: [],
        year: [],
        type: [],
        tags: [],
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const filteredProjects = useMemo(() => {
        let results = mockProjects.filter(project => {
            const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.abstract.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDept = filters.department.length === 0 || filters.department.includes(project.department);
            const matchesYear = filters.year.length === 0 || filters.year.includes(project.year);
            const matchesType = filters.type.length === 0 || filters.type.includes(project.type);
            const matchesTags = filters.tags.length === 0 || filters.tags.some(tag => project.tags.includes(tag));

            return matchesSearch && matchesDept && matchesYear && matchesType && matchesTags;
        });

        if (sortBy === 'views') results.sort((a, b) => b.views - a.views);
        else if (sortBy === 'likes') results.sort((a, b) => b.likes - a.likes);
        else results.sort((a, b) => b.year - a.year);

        return results;
    }, [searchTerm, filters, sortBy]);

    const paginatedProjects = filteredProjects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

    const handleFilterChange = (key: keyof typeof filters, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setFilters({ department: [], year: [], type: [], tags: [] });
        setSearchTerm('');
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-gray-900">All Projects & Research</h1>
                        <p className="text-lg text-gray-600">Browse through {filteredProjects.length} projects</p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search projects, research, authors..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition text-gray-900"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div>
                            <FilterSidebar
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                onClearFilters={handleClearFilters}
                            />
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3 space-y-6">
                            {/* Sort Bar */}
                            <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-4">
                                <div className="text-sm text-gray-600">
                                    Showing {paginatedProjects.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, filteredProjects.length)} of {filteredProjects.length}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">Sort by:</span>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                                    >
                                        <option value="latest">Latest</option>
                                        <option value="views">Most Viewed</option>
                                        <option value="likes">Most Liked</option>
                                    </select>
                                </div>
                            </div>

                            {/* Projects Grid */}
                            {paginatedProjects.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {paginatedProjects.map(project => (
                                        <ProjectCard
                                            key={project.id}
                                            project={project}
                                            onViewDetails={(id) => router.push(`/project/${id}`)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                                    <Search className="mx-auto text-gray-400 mb-4" size={48} />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
                                    <p className="text-gray-600">Try adjusting your search or filters</p>
                                </div>
                            )}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-2 pt-8">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-10 h-10 rounded-lg font-semibold transition ${page === currentPage
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-600'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
