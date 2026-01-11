
import React, { useEffect, useState } from 'react';
import api from '../api/mock';
import { UserProfile } from '../types';

const SettingsPage: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const profileData = await api.getUserProfile();
            setProfile(profileData);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading || !profile) {
        return <div className="text-center text-gray-400">Loading settings...</div>;
    }

    return (
        <form className="space-y-8 divide-y divide-gray-800">
            <div className="space-y-8">
                <div>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-white">Profile</h3>
                        <p className="mt-1 text-sm text-gray-400">
                            This information will be displayed publicly so be careful what you share.
                        </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                                Full name
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    defaultValue={profile.name}
                                    className="block w-full shadow-sm sm:text-sm bg-gray-800 border-gray-700 rounded-md text-white"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    defaultValue={profile.email}
                                    className="block w-full shadow-sm sm:text-sm bg-gray-800 border-gray-700 rounded-md text-white"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                             <label htmlFor="photo" className="block text-sm font-medium text-gray-300">
                                Photo
                            </label>
                            <div className="mt-1 flex items-center">
                                <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                    <img src={profile.avatarUrl} alt="User avatar" />
                                </span>
                                <button type="button" className="ml-5 bg-gray-800 py-2 px-3 border border-gray-700 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-700">
                                    Change
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-5">
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="bg-gray-800 py-2 px-4 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SettingsPage;
