
import React, { useState } from 'react';
import { LogStepData, LogStatus } from '../types';
import StatusIcon from './StatusIcon';

interface LogStepProps {
  log: LogStepData;
  isLast: boolean;
}

const LogStep: React.FC<LogStepProps> = ({ log, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasDetails = log.details && log.details.length > 0;

  const getStatusColor = () => {
    switch (log.status) {
      case LogStatus.SUCCESS: return 'border-green-500/30';
      case LogStatus.RUNNING: return 'border-blue-500/30';
      case LogStatus.FAILED: return 'border-red-500/30';
      default: return 'border-gray-700';
    }
  };
  
  const isDimmed = log.status === LogStatus.PENDING || log.status === LogStatus.CANCELLED;

  return (
    <div className="relative flex items-start">
      {!isLast && (
        <div className={`absolute left-4 top-5 h-full w-0.5 ${getStatusColor()}`} aria-hidden="true" />
      )}
      <div className="flex h-8 items-center" aria-hidden="true">
        <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 ring-4 ring-gray-900`}>
          <StatusIcon status={log.status} />
        </div>
      </div>
      <div className="ml-4 min-w-0 flex-1 py-1.5">
        <div className={`text-sm ${isDimmed ? 'text-gray-500' : 'text-gray-200'}`}>
          <span className="font-semibold">{log.step}</span>
          {log.duration && <span className="ml-2 text-gray-400 text-xs">({log.duration})</span>}
        </div>
        {hasDetails && (
          <div className="mt-2">
            <button onClick={() => setIsExpanded(!isExpanded)} className="text-xs text-indigo-400 hover:text-indigo-300">
              {isExpanded ? 'Hide details' : 'Show details'}
            </button>
            {isExpanded && (
              <div className="mt-2 p-4 bg-gray-900 rounded-md text-xs font-mono text-gray-400 overflow-x-auto">
                <pre>
                  {log.details.map((line, index) => (
                    <div key={index}>
                      <span className="select-none pr-4 text-gray-600">{String(index + 1).padStart(2, ' ')}</span>
                      {line}
                    </div>
                  ))}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LogStep;
