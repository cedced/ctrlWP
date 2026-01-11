
export enum LogStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  SUCCESS = 'success',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export interface LogStepData {
  id: number;
  step: string;
  details?: string[];
  status: LogStatus;
  duration?: string;
}

export interface Deployment {
  id: string;
  status: LogStatus;
  branch: string;
  commitHash: string;
  committer: string;
  startedAt: string;
  finishedAt?: string;
}

export interface Project {
  id: string;
  name: string;
  repoUrl: string;
  status: 'live' | 'building' | 'error';
  lastDeployedAt: string;
}

export interface Server {
  id: string;
  name: string;
  provider: 'DigitalOcean' | 'AWS' | 'Vultr';
  ipAddress: string;
  status: 'online' | 'offline' | 'provisioning';
  region: string;
}

export interface UserProfile {
    name: string;
    email: string;
    avatarUrl: string;
}

export interface Subscription {
    plan: 'Starter' | 'Pro' | 'Business';
    status: 'active' | 'past_due' | 'canceled';
    nextPaymentDate: string;
    nextPaymentAmount: number;
}
