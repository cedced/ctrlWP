
import React, { useEffect, useState } from 'react';
import api from '../api/mock';
import { Server } from '../types';

const StatusBadge: React.FC<{ status: Server['status'] }> = ({ status }) => {
    const statusClasses = {
        online: 'bg-green-500/20 text-green-400',
        provisioning: 'bg-blue-500/20 text-blue-400 animate-pulse',
        offline: 'bg-red-500/20 text-red-400',
    };
    return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}`}>
            {status}
        </span>
    );
};

const ServersPage: React.FC = () => {
    const [servers, setServers] = useState<Server[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const serversData = await api.getServers();
                setServers(serversData);
            } catch (error) {
                console.error("Failed to fetch servers", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const NoServersState = () => (
         <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-white">No servers</h3>
            <p className="mt-1 text-sm text-gray-400">Get started by provisioning a new server.</p>
            <div className="mt-6">
                <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Provision Server
                </button>
            </div>
        </div>
    );

    if (loading) {
        return <div className="text-center text-gray-400">Loading servers...</div>;
    }

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
             <div className="p-5 flex justify-between items-center border-b border-gray-800">
                <h1 className="text-lg font-semibold text-white">Servers</h1>
                 {servers.length > 0 && (
                    <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-500">
                        Provision Server
                    </button>
                 )}
            </div>
            {servers.length === 0 ? <NoServersState /> : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-800">
                        <thead className="bg-gray-950">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">IP Address</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Provider</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Region</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {servers.map((server) => (
                                <tr key={server.id} className="hover:bg-gray-800/50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{server.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm"><StatusBadge status={server.status} /></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">{server.ipAddress}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{server.provider}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{server.region}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a href="#" className="text-indigo-400 hover:text-indigo-300">Manage</a>
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

export default ServersPage;