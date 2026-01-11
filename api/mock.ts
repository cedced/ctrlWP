
import { Project, Server, UserProfile, Subscription, Deployment, LogStatus } from '../types';

const projects: Project[] = [
    { id: '1', name: 'My Awesome Site', repoUrl: 'github.com/user/my-awesome-site', status: 'live', lastDeployedAt: new Date().toISOString() },
    { id: '2', name: 'Client Marketing Site', repoUrl: 'github.com/user/client-marketing', status: 'live', lastDeployedAt: new Date(Date.now() - 86400000).toISOString() },
    { id: '3', name: 'E-commerce Store', repoUrl: 'github.com/user/ecomm-store', status: 'error', lastDeployedAt: new Date(Date.now() - 86400000 * 2).toISOString() },
    { id: '4', name: 'Internal Dashboard', repoUrl: 'github.com/user/internal-dash', status: 'building', lastDeployedAt: new Date(Date.now() - 86400000 * 5).toISOString() },
];

const servers: Server[] = [
    { id: '1', name: 'web-prod-01', provider: 'DigitalOcean', ipAddress: '123.45.67.89', status: 'online', region: 'SFO3' },
    { id: '2', name: 'staging-server', provider: 'Vultr', ipAddress: '98.76.54.32', status: 'online', region: 'EWR' },
    { id: '3', name: 'db-cluster-node-1', provider: 'AWS', ipAddress: '11.22.33.44', status: 'provisioning', region: 'us-east-1' },
    { id: '4', name: 'web-prod-02', provider: 'DigitalOcean', ipAddress: '123.45.67.90', status: 'offline', region: 'SFO3' },
];

const userProfile: UserProfile = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    avatarUrl: 'https://picsum.photos/id/237/100/100',
};

const subscription: Subscription = {
    plan: 'Pro',
    status: 'active',
    nextPaymentDate: new Date(Date.now() + 86400000 * 15).toLocaleDateString(),
    nextPaymentAmount: 49.00,
};

const deployments: Deployment[] = [
    { id: '#d4e5f6a', status: LogStatus.SUCCESS, branch: 'main', commitHash: 'a1b2c3d', committer: 'Jane Doe', startedAt: new Date(Date.now() - 3600000).toLocaleString(), finishedAt: new Date(Date.now() - 3540000).toLocaleString() },
    { id: '#c3d4e5f', status: LogStatus.FAILED, branch: 'main', commitHash: 'b2c3d4e', committer: 'Jane Doe', startedAt: new Date(Date.now() - 7200000).toLocaleString(), finishedAt: new Date(Date.now() - 7100000).toLocaleString() },
];

const api = {
    getSummary: () => new Promise<{ projectCount: number; serverCount: number; subscriptionStatus: Subscription['status'] }>((resolve) => {
      setTimeout(() => resolve({ projectCount: projects.length, serverCount: servers.length, subscriptionStatus: subscription.status }), 500)
    }),
    getProjects: () => new Promise<Project[]>((resolve) => setTimeout(() => resolve(projects), 500)),
    getServers: () => new Promise<Server[]>((resolve) => setTimeout(() => resolve(servers), 500)),
    getUserProfile: () => new Promise<UserProfile>((resolve) => setTimeout(() => resolve(userProfile), 500)),
    getSubscription: () => new Promise<Subscription>((resolve) => setTimeout(() => resolve(subscription), 500)),
    getDeployments: () => new Promise<Deployment[]>((resolve) => setTimeout(() => resolve(deployments), 500)),
};

export default api;
