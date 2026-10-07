import React from 'react';
import { AlertCircle, RefreshCw, XCircle } from 'lucide-react';

export default function ErrorBanner({ error, onRetry }) {
  if (!error) return null;

  const isNotFound = error.toLowerCase().includes('not found');
  const isRateLimit = error.toLowerCase().includes('rate limit');

  return (
    <div className="error-banner" role="alert">
      <div className="error-icon-wrapper">
        <AlertCircle size={20} className="error-icon" />
      </div>

      <div className="error-details">
        <div className="error-title">
          {isNotFound
            ? 'GitHub User Not Found (Part 4)'
            : isRateLimit
            ? 'API Rate Limit Exceeded (Part 4)'
            : 'Network / API Error (Part 4)'}
        </div>
        <p className="error-message">{error}</p>
        <div className="error-tip">
          {isNotFound && 'Please check the spelling of the username or try one of the suggestions above.'}
          {isRateLimit && 'GitHub allows 60 unauthenticated requests per hour. Please wait a few minutes before retrying.'}
          {!isNotFound && !isRateLimit && 'Please check your internet connection or verify GitHub API availability.'}
        </div>
      </div>

      {onRetry && (
        <button type="button" className="error-retry-btn" onClick={onRetry}>
          <RefreshCw size={14} />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
}
