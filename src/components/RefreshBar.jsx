import React from 'react';
import { RefreshCw, Play, Pause, Clock } from 'lucide-react';

export default function RefreshBar({
  secondsLeft,
  intervalSeconds = 60,
  lastUpdatedTime,
  isAutoRefreshActive,
  onToggleAutoRefresh,
  onManualRefresh,
  isRefreshing,
}) {
  const formatTime = (date) => {
    if (!date) return 'Just now';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const progressPercent = ((intervalSeconds - secondsLeft) / intervalSeconds) * 100;

  return (
    <div className="refresh-bar">
      <div className="refresh-left">
        <div className="refresh-indicator">
          <Clock size={16} className="clock-icon" />
        </div>

        <div className="refresh-status-badge">
          {isAutoRefreshActive ? (
            <span className="status-pill active">
              <span className="pulsing-dot"></span>
              Every 60s (Next in {secondsLeft}s)
            </span>
          ) : (
            <span className="status-pill paused">Paused</span>
          )}
        </div>

        {lastUpdatedTime && (
          <span className="last-updated-text">
            Last synced: <strong>{formatTime(lastUpdatedTime)}</strong>
          </span>
        )}
      </div>

      <div className="refresh-controls">
        <button
          type="button"
          className="refresh-btn toggle-btn"
          onClick={onToggleAutoRefresh}
          title={isAutoRefreshActive ? 'Pause 60s auto-refresh' : 'Resume 60s auto-refresh'}
        >
          {isAutoRefreshActive ? (
            <>
              <Pause size={14} />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play size={14} />
              <span>Resume</span>
            </>
          )}
        </button>

        <button
          type="button"
          className="refresh-btn manual-btn"
          onClick={onManualRefresh}
          disabled={isRefreshing}
          title="Trigger immediate fetch and reset 60s timer"
        >
          <RefreshCw size={14} className={isRefreshing ? 'spin-icon' : ''} />
          <span>{isRefreshing ? 'Syncing...' : 'Refresh Now'}</span>
        </button>
      </div>

      {/* Progress line across bottom */}
      {isAutoRefreshActive && (
        <div className="refresh-progress-track">
          <div
            className="refresh-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
    </div>
  );
}
