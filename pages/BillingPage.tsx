
import React, { useEffect, useState } from 'react';
import api from '../api/mock';
import { Subscription } from '../types';

const BillingPage: React.FC = () => {
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const subData = await api.getSubscription();
            setSubscription(subData);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading || !subscription) {
        return <div className="text-center text-gray-400">Loading billing information...</div>;
    }

    const statusClasses = {
        active: 'bg-green-500/20 text-green-400',
        past_due: 'bg-yellow-500/20 text-yellow-400',
        canceled: 'bg-red-500/20 text-red-400',
    };

    return (
        <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-lg shadow">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-white">
                        Subscription Details
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-400">
                        Manage your billing and subscription information.
                    </p>
                </div>
                <div className="border-t border-gray-800">
                    <dl>
                        <div className="bg-gray-900/50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-400">Current Plan</dt>
                            <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">{subscription.plan} Plan</dd>
                        </div>
                        <div className="bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-400">Status</dt>
                            <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[subscription.status]}`}>
                                    {subscription.status.replace('_', ' ')}
                                </span>
                            </dd>
                        </div>
                        <div className="bg-gray-900/50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-400">Next Payment</dt>
                            <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">${subscription.nextPaymentAmount.toFixed(2)} on {subscription.nextPaymentDate}</dd>
                        </div>
                    </dl>
                </div>
            </div>
             <div className="flex justify-end space-x-3">
                <button type="button" className="px-4 py-2 border border-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-800">
                    Change Plan
                </button>
                <button type="button" className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-500">
                    Update Payment Method
                </button>
            </div>
        </div>
    );
};

export default BillingPage;
