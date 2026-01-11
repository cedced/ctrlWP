
import React, { useState, useEffect } from 'react';
import { LogStatus, Deployment } from '../types';
import StatusIcon from '../components/StatusIcon';
import api from '../api/mock';

const DeploymentRow: React.FC<{ deployment: Deployment }> = ({ deployment }) => {
    return (
        <tr className="hover:bg-gray-800/50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                <div className="flex items-center">
                    <StatusIcon status={deployment.status} className="h-5 w-5 mr-3" />
                    <span>{deployment.id}</span>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">{deployment.branch}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">{deployment.commitHash}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{deployment.committer}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{deployment.startedAt}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" className="text-indigo-400 hover:text-indigo-300">View Log</a>
            </td>
        </tr>
    );
};


const DeploymentsPage: React.FC = () => {
    const [deployments, setDeployments] = useState<Deployment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await api.getDeployments();
                setDeployments(data);
            } catch (error) {
                console.error("Failed to fetch deployments", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-400">Loading deployments...</div>;
    }

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-5 flex justify-between items-center">
                <h1 className="text-lg font-semibold text-white">Deployment History</h1>
                <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-500">
                    Deploy Now
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                    <thead className="bg-gray-950">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Deployment</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Branch</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Commit</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Committer</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Started At</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {deployments.map((deployment) => (
                            <DeploymentRow key={deployment.id} deployment={deployment} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DeploymentsPage;
