
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import HeroSection from '@/components/HeroSection';
import ProjectCard from '@/components/ProjectCard';
import { mockProjects } from '@/lib/data';

export default function Home() {
  const router = useRouter();
  const featuredProjects = mockProjects.slice(0, 3);
  const latestProjects = [...mockProjects].sort((a, b) => b.year - a.year).slice(0, 3);

  const handleViewDetails = (id: number) => {
    router.push(`/project/${id}`);
  };

  return (
    <div className="space-y-20">
      <HeroSection />

      {/* Featured Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-gray-900">Featured Projects</h2>
            <p className="text-lg text-gray-600">Highlighted works from our community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} onViewDetails={handleViewDetails} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Research */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-gray-900">Latest Research</h2>
            <p className="text-lg text-gray-600">Recently published studies and findings</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestProjects.map(project => (
              <ProjectCard key={project.id} project={project} onViewDetails={handleViewDetails} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-blue-600 rounded-2xl p-8 md:p-16 text-center text-white space-y-6">
          <h2 className="text-4xl font-bold">Have a project to share?</h2>
          <p className="text-xl text-blue-100">Submit your research or final project to our showcase</p>
          <button
            onClick={() => router.push('/login')}
            className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition font-semibold text-lg inline-block"
          >
            Submit Now
          </button>
        </div>
      </section>
    </div>
  );
}
