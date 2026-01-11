
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/mock';
import { Project } from '../types';

const StatusBadge: React.FC<{ status: Project['status'] }> = ({ status }) => {
    const statusClasses = {
        live: 'bg-green-500/20 text-green-400',
        building: 'bg-blue-500/20 text-blue-400 animate-pulse',
        error: 'bg-red-500/20 text-red-400',
    };
    return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}`}>
            {status}
        </span>
    );
};

const ProjectsPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const projectsData = await api.getProjects();
                setProjects(projectsData);
            } catch (error) {
                console.error("Failed to fetch projects", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const NoProjectsState = () => (
        <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-white">No projects</h3>
            <p className="mt-1 text-sm text-gray-400">Get started by creating a new project.</p>
            <div className="mt-6">
                <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    New Project
                </button>
            </div>
        </div>
    );

    if (loading) {
        return <div className="text-center text-gray-400">Loading projects...</div>;
    }

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-5 flex justify-between items-center border-b border-gray-800">
                <h1 className="text-lg font-semibold text-white">Projects</h1>
                {projects.length > 0 && (
                    <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-500">
                        New Project
                    </button>
                )}
            </div>
            {projects.length === 0 ? <NoProjectsState /> : (
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-800">
                        <thead className="bg-gray-950">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Repository</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Deployed</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {projects.map((project) => (
                                <tr key={project.id} className="hover:bg-gray-800/50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{project.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm"><StatusBadge status={project.status} /></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">{project.repoUrl}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{new Date(project.lastDeployedAt).toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link to="/deployments" className="text-indigo-400 hover:text-indigo-300">Deployments</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProjectsPage;