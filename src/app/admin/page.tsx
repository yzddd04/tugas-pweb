
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { mockProjects, Project } from '@/lib/data';

export default function AdminPage() {
    const router = useRouter();
    const { currentUser } = useAuth();
    const [projects, setProjects] = useState<Project[]>(mockProjects);
    const [isAddingProject, setIsAddingProject] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<Project>>({
        title: '',
        author: '',
        department: 'Informatics',
        year: new Date().getFullYear(),
        type: 'Final Project',
        abstract: '',
        tags: [],
    });

    useEffect(() => {
        if (!currentUser) {
            router.push('/login');
        }
    }, [currentUser, router]);

    if (!currentUser) return null;

    const handleAddProject = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            setProjects(projects.map(p => p.id === editingId ? { ...p, ...formData } as Project : p));
            setEditingId(null);
        } else {
            setProjects([...projects, {
                id: projects.length + 1,
                ...formData,
                views: 0,
                likes: 0,
                downloads: 0,
                tags: formData.tags || []
            } as Project]);
        }
        setFormData({ title: '', author: '', department: 'Informatics', year: new Date().getFullYear(), type: 'Final Project', abstract: '', tags: [] });
        setIsAddingProject(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
                            <p className="text-gray-600 mt-2">Welcome, {currentUser?.name}</p>
                        </div>
                        <button
                            onClick={() => setIsAddingProject(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                        >
                            <Plus size={18} /> Add Project
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { label: 'Total Projects', value: projects.length },
                            { label: 'Total Views', value: projects.reduce((sum, p) => sum + p.views, 0).toLocaleString() },
                            { label: 'Total Downloads', value: projects.reduce((sum, p) => sum + p.downloads, 0).toLocaleString() }
                        ].map((stat, idx) => (
                            <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6">
                                <div className="text-sm text-gray-600">{stat.label}</div>
                                <div className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Add/Edit Form */}
                    {isAddingProject && (
                        <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">{editingId ? 'Edit Project' : 'Add New Project'}</h2>
                                <button
                                    onClick={() => {
                                        setIsAddingProject(false);
                                        setEditingId(null);
                                        setFormData({ title: '', author: '', department: 'Informatics', year: new Date().getFullYear(), type: 'Final Project', abstract: '', tags: [] });
                                    }}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleAddProject} className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Project Title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Author(s)"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                                    required
                                />
                                <select
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                                >
                                    <option>Informatics</option>
                                    <option>Electrical Engineering</option>
                                    <option>Mechanical Engineering</option>
                                </select>
                                <input
                                    type="number"
                                    value={formData.year}
                                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                                    className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                                />
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                                >
                                    <option>Final Project</option>
                                    <option>Research</option>
                                </select>
                                <textarea
                                    placeholder="Project Abstract"
                                    value={formData.abstract}
                                    onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                                    className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none h-24 resize-none"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="md:col-span-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                                >
                                    {editingId ? 'Update Project' : 'Add Project'}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Projects Table */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Title</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Author</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Department</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Year</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Views</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {projects.map(project => (
                                        <tr key={project.id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium line-clamp-1">{project.title}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{project.author}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{project.department}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{project.year}</td>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">{project.views}</td>
                                            <td className="px-6 py-4 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setFormData(project);
                                                            setEditingId(project.id);
                                                            setIsAddingProject(true);
                                                        }}
                                                        className="p-2 hover:bg-blue-100 rounded-lg transition text-blue-600"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => setProjects(projects.filter(p => p.id !== project.id))}
                                                        className="p-2 hover:bg-red-100 rounded-lg transition text-red-600"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
