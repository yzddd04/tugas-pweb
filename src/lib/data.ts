
import React from 'react';

export interface Project {
  id: number;
  title: string;
  author: string;
  department: string;
  year: number;
  type: string;
  abstract: string;
  tags: string[];
  views: number;
  likes: number;
  downloads: number;
}

export const mockProjects: Project[] = [
  {
    id: 1,
    title: 'AI-Powered Disease Detection System',
    author: 'Ahmad Rizki, Siti Nurhaliza',
    department: 'Informatics',
    year: 2024,
    type: 'Final Project',
    abstract: 'An advanced machine learning system for early disease detection using medical imaging and neural networks.',
    tags: ['AI', 'Machine Learning', 'Healthcare'],
    views: 1250,
    likes: 340,
    downloads: 245
  },
  {
    id: 2,
    title: 'IoT Smart Building Management',
    author: 'Budi Santoso',
    department: 'Electrical Engineering',
    year: 2024,
    type: 'Research',
    abstract: 'Research on energy-efficient building automation using IoT sensors and predictive analytics.',
    tags: ['IoT', 'Smart Building', 'Energy Efficiency'],
    views: 890,
    likes: 210,
    downloads: 156
  },
  {
    id: 3,
    title: 'Autonomous Robotics Navigation',
    author: 'Rahmat Hidayat, Dwi Putri',
    department: 'Mechanical Engineering',
    year: 2023,
    type: 'Final Project',
    abstract: 'Development of autonomous navigation system for mobile robots using SLAM and ROS.',
    tags: ['Robotics', 'Computer Vision', 'Autonomous Systems'],
    views: 2100,
    likes: 520,
    downloads: 380
  },
  {
    id: 4,
    title: 'Blockchain Supply Chain Tracking',
    author: 'Maya Kusuma',
    department: 'Informatics',
    year: 2024,
    type: 'Research',
    abstract: 'Distributed ledger technology for transparent supply chain management and product authentication.',
    tags: ['Blockchain', 'Supply Chain', 'Security'],
    views: 650,
    likes: 180,
    downloads: 120
  },
  {
    id: 5,
    title: 'Renewable Energy Optimization',
    author: 'Hendra Wijaya',
    department: 'Electrical Engineering',
    year: 2023,
    type: 'Research',
    abstract: 'Advanced algorithms for optimizing renewable energy distribution in smart grids.',
    tags: ['Energy', 'Optimization', 'Sustainability'],
    views: 980,
    likes: 290,
    downloads: 210
  },
  {
    id: 6,
    title: 'Natural Language Processing Chatbot',
    author: 'Lisa Mardiana, Ari Kusuma',
    department: 'Informatics',
    year: 2024,
    type: 'Final Project',
    abstract: 'Intelligent chatbot using transformer-based NLP for customer support automation.',
    tags: ['NLP', 'AI', 'Deep Learning'],
    views: 1540,
    likes: 410,
    downloads: 290
  },
];

export const colors = {
  primary: '#005FAB',
  secondary: '#FFC107',
  dark: '#2A2A2A',
  light: '#F5F5F5',
  success: '#4CAF50',
  danger: '#F44336',
};
