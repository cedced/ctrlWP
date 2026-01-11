
import React, { useEffect, useState } from 'react';
import api from '../api/mock';
import { Subscription } from '../types';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  status?: 'active' | 'past_due' | 'canceled';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, status }) => {
  const statusClasses = {
    active: 'text-green-400',
    past_due: 'text-yellow-400',
    canceled: 'text-red-400',
  };
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="bg-gray-800 p-3 rounded-lg">
            {icon}
          </div>
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-400 truncate">{title}</dt>
            <dd>
              <div className={`text-2xl font-bold text-white ${status ? statusClasses[status] : ''}`}>
                {value}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

const DashboardPage: React.FC = () => {
    const [summary, setSummary] = useState<{ projectCount: number; serverCount: number; subscriptionStatus: Subscription['status'] } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const summaryData = await api.getSummary();
            setSummary(summaryData);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading || !summary) {
        return <div className="text-center text-gray-400">Loading dashboard...</div>;
    }

    const stats = [
        { name: 'Total Sites', value: summary.projectCount, icon: <svg className="h-6 w-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
        { name: 'Active Servers', value: summary.serverCount, icon: <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg> },
        { name: 'Billing Status', value: summary.subscriptionStatus.split('_').join(' ').replace(/\b\w/g, l => l.toUpperCase()), status: summary.subscriptionStatus, icon: <svg className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg> },
    ];

    return (
        <div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((item) => (
                    <StatCard key={item.name} title={item.name} value={item.value} icon={item.icon} status={item.status as any} />
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;
