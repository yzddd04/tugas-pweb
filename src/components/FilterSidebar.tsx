
'use client';

import React from 'react';
import { Filter } from 'lucide-react';

interface FilterState {
    department: string[];
    year: number[];
    type: string[];
    tags: string[];
}

interface FilterSidebarProps {
    filters: FilterState;
    onFilterChange: (key: keyof FilterState, value: any) => void;
    onClearFilters: () => void;
}

const FilterSidebar = ({ filters, onFilterChange, onClearFilters }: FilterSidebarProps) => {
    const departments = ['Informatics', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'];
    const years = [2024, 2023, 2022, 2021];
    const types = ['Final Project', 'Research'];
    const allTags = ['AI', 'Machine Learning', 'IoT', 'Robotics', 'Blockchain', 'Healthcare', 'Energy'];

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6 h-fit sticky top-24">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Filter size={18} /> Filters
                </h3>
                <button
                    onClick={onClearFilters}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
                >
                    Clear All
                </button>
            </div>

            {/* Department Filter */}
            <div className="space-y-3">
                <h4 className="font-semibold text-sm text-gray-900">Department</h4>
                <div className="space-y-2">
                    {departments.map(dept => (
                        <label key={dept} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={filters.department.includes(dept)}
                                onChange={(e) => {
                                    const newDepts = e.target.checked
                                        ? [...filters.department, dept]
                                        : filters.department.filter(d => d !== dept);
                                    onFilterChange('department', newDepts);
                                }}
                                className="w-4 h-4 rounded border-gray-300 text-blue-600"
                            />
                            <span className="text-sm text-gray-700 group-hover:text-gray-900">{dept}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Year Filter */}
            <div className="space-y-3">
                <h4 className="font-semibold text-sm text-gray-900">Year</h4>
                <div className="space-y-2">
                    {years.map(year => (
                        <label key={year} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={filters.year.includes(year)}
                                onChange={(e) => {
                                    const newYears = e.target.checked
                                        ? [...filters.year, year]
                                        : filters.year.filter(y => y !== year);
                                    onFilterChange('year', newYears);
                                }}
                                className="w-4 h-4 rounded border-gray-300 text-blue-600"
                            />
                            <span className="text-sm text-gray-700 group-hover:text-gray-900">{year}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Type Filter */}
            <div className="space-y-3">
                <h4 className="font-semibold text-sm text-gray-900">Type</h4>
                <div className="space-y-2">
                    {types.map(type => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={filters.type.includes(type)}
                                onChange={(e) => {
                                    const newTypes = e.target.checked
                                        ? [...filters.type, type]
                                        : filters.type.filter(t => t !== type);
                                    onFilterChange('type', newTypes);
                                }}
                                className="w-4 h-4 rounded border-gray-300 text-blue-600"
                            />
                            <span className="text-sm text-gray-700 group-hover:text-gray-900">{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Tags Filter */}
            <div className="space-y-3">
                <h4 className="font-semibold text-sm text-gray-900">Tags</h4>
                <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => {
                                const newTags = filters.tags.includes(tag)
                                    ? filters.tags.filter(t => t !== tag)
                                    : [...filters.tags, tag];
                                onFilterChange('tags', newTags);
                            }}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition ${filters.tags.includes(tag)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
