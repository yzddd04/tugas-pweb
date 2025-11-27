
'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Download, Heart, Eye, FileText } from 'lucide-react';
import { mockProjects } from '@/lib/data';

export default function ProjectDetailPage() {
    const router = useRouter();
    const params = useParams();
    const projectId = Number(params.id);

    const project = mockProjects.find(p => p.id === projectId);
    const relatedProjects = mockProjects.filter(p => p.id !== projectId && p.tags.some(tag => project?.tags.includes(tag))).slice(0, 3);

    if (!project) return <div className="pt-20 text-center py-16">Project not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
                {/* Back Button */}
                <button
                    onClick={() => router.push('/catalog')}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                >
                    ← Back to Projects
                </button>

                {/* Header */}
                <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-6">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-gray-900">{project.title}</h1>
                        <p className="text-lg text-gray-600">{project.abstract}</p>
                    </div>

                    {/* Meta Info */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-b border-gray-200">
                        <div>
                            <div className="text-sm text-gray-600">Authors</div>
                            <div className="font-semibold text-gray-900">{project.author}</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">Department</div>
                            <div className="font-semibold text-gray-900">{project.department}</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">Year</div>
                            <div className="font-semibold text-gray-900">{project.year}</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">Type</div>
                            <div className="font-semibold text-gray-900">{project.type}</div>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-gray-900">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium text-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-4">
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold">
                            <Download size={18} /> Download PDF
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-semibold">
                            <Heart size={18} /> Like ({project.likes})
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Image */}
                        <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center text-gray-400 border border-gray-200">
                            <FileText size={96} strokeWidth={1} />
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-4">
                            <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
                            <p className="text-gray-700 leading-relaxed">
                                {project.abstract}
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                This comprehensive study explores the technical implementation, challenges, and solutions. It includes detailed methodology, experimental results, and future recommendations for further research in this field.
                            </p>
                        </div>

                        {/* Download Section */}
                        <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-4">
                            <h2 className="text-2xl font-bold text-gray-900">Resources</h2>
                            <div className="space-y-2">
                                {[
                                    { name: 'Full Report (PDF)', downloads: 245 },
                                    { name: 'Research Paper', downloads: 156 },
                                    { name: 'Source Code', downloads: 89 },
                                    { name: 'Presentation Slides', downloads: 134 }
                                ].map((resource, idx) => (
                                    <button
                                        key={idx}
                                        className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition group"
                                    >
                                        <span className="font-medium text-gray-900 group-hover:text-blue-600">{resource.name}</span>
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm text-gray-600">{resource.downloads} downloads</span>
                                            <Download size={18} className="text-gray-400 group-hover:text-blue-600" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Stats */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                            <h3 className="font-bold text-gray-900">Statistics</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 flex items-center gap-2">
                                        <Eye size={16} /> Views
                                    </span>
                                    <span className="font-bold text-gray-900">{project.views.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 flex items-center gap-2">
                                        <Heart size={16} /> Likes
                                    </span>
                                    <span className="font-bold text-gray-900">{project.likes.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 flex items-center gap-2">
                                        <Download size={16} /> Downloads
                                    </span>
                                    <span className="font-bold text-gray-900">{project.downloads.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Related Projects */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                            <h3 className="font-bold text-gray-900">Related Projects</h3>
                            <div className="space-y-3">
                                {relatedProjects.map(related => (
                                    <button
                                        key={related.id}
                                        onClick={() => router.push(`/project/${related.id}`)}
                                        className="w-full text-left p-3 rounded-lg hover:bg-blue-50 transition group"
                                    >
                                        <p className="font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2 text-sm">
                                            {related.title}
                                        </p>
                                        <p className="text-xs text-gray-600 mt-1">{related.year}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
