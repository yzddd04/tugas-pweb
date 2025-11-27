
'use client';

import React, { useState } from 'react';
import { Eye, Heart } from 'lucide-react';
import { Project } from '@/lib/data';

interface ProjectCardProps {
    project: Project;
    onViewDetails: (id: number) => void;
}

const ProjectCard = ({ project, onViewDetails }: ProjectCardProps) => {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <div
            onClick={() => onViewDetails(project.id)}
            className="group bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer"
        >
            {/* Image */}
            <div className="h-48 bg-gradient-to-br from-blue-50 to-yellow-50 flex items-center justify-center text-6xl group-hover:scale-105 transition duration-300 overflow-hidden">
                {project.image}
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition line-clamp-2">
                        {project.title}
                    </h3>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsLiked(!isLiked);
                        }}
                        className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        <Heart size={18} className={isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
                    </button>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">{project.abstract}</p>

                <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                            {tag}
                        </span>
                    ))}
                    {project.tags.length > 2 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                            +{project.tags.length - 2}
                        </span>
                    )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <Eye size={16} />
                            <span>{project.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Heart size={16} />
                            <span>{project.likes}</span>
                        </div>
                    </div>
                    <span className="text-xs font-semibold text-gray-500">{project.type}</span>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
