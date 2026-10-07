import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import OwnerCard from './components/OwnerCard';
import RepoCard from './components/RepoCard';
import RefreshBar from './components/RefreshBar';
import ErrorBanner from './components/ErrorBanner';
import EmptyRepos from './components/EmptyRepos';
import { fetchUserProfile, fetchUserRepositories } from './api';
import { Layers, Terminal, Sparkles } from 'lucide-react';

export default function App() {
  // Input State
  const [usernameInput, setUsernameInput] = useState('octocat');
  const [activeUser, setActiveUser] = useState('');

  // Data States
  const [owner, setOwner] = useState(null);
  const [repositories, setRepositories] = useState([]);

  // Status States
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [lastUpdatedTime, setLastUpdatedTime] = useState(null);

  // Part 3: Auto-refresh State (setInterval 60 seconds)
  const REFRESH_INTERVAL_SECONDS = 60;
  const [secondsRemaining, setSecondsRemaining] = useState(REFRESH_INTERVAL_SECONDS);
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(true);

  // Interval timer references
  const countdownIntervalRef = useRef(null);

  /**
   * ==========================================================================
   * Part 1, Part 2, Part 4 & Part 5: Core Async Data Fetcher
   * ==========================================================================
   * Implemented using async/await and try...catch blocks.
   * Asynchronously fetches both owner profile and repository list.
   */
  const loadUserData = useCallback(async (targetUsername, isBackgroundRefresh = false) => {
    if (!targetUsername || !targetUsername.trim()) return;

    const trimmedUser = targetUsername.trim();

    if (isBackgroundRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
      setErrorMessage(null);
    }

    try {
      console.log(`\n======================================================`);
      console.log(`[GitHub Tracker] ${isBackgroundRefresh ? 'Auto-Refreshing' : 'Loading'} data for: @${trimmedUser}`);
      console.log(`======================================================`);

      // Part 5: Using async/await with Promise.all to fetch concurrently
      // Part 2: Fetch owner's profile information using GitHub Users API
      // Part 1: Fetch public repositories using GitHub Repos API
      const [fetchedOwner, fetchedRepos] = await Promise.all([
        fetchUserProfile(trimmedUser),
        fetchUserRepositories(trimmedUser),
      ]);

      // Part 1: Display repository information in the console
      console.log(`[Part 1] Repositories loaded (${fetchedRepos.length}):`, fetchedRepos);

      // Part 2: Display owner's details in the console
      console.log(`[Part 2] Owner details loaded:`, fetchedOwner);

      // Update state with fresh data
      setOwner(fetchedOwner);
      setRepositories(fetchedRepos);
      setActiveUser(trimmedUser);
      setErrorMessage(null);
      setLastUpdatedTime(new Date());

      // Reset the 60s countdown timer
      setSecondsRemaining(REFRESH_INTERVAL_SECONDS);

    } catch (error) {
      // Part 4 & Part 5: Error handling inside try...catch block
      console.error(`[Part 4/5] Failed to fetch data:`, error.message);

      setErrorMessage(error.message || 'An unexpected error occurred.');

      // If it wasn't a background refresh, clear old owner and repos
      if (!isBackgroundRefresh) {
        setOwner(null);
        setRepositories([]);
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  /**
   * Handle Search Form Submission
   */
  const handleSearch = (userToSearch) => {
    if (userToSearch.trim()) {
      loadUserData(userToSearch.trim(), false);
    }
  };

  /**
   * Manual Refresh Button Handler (Part 3)
   */
  const handleManualRefresh = () => {
    if (activeUser) {
      loadUserData(activeUser, true);
    }
  };

  /**
   * Toggle Auto-Refresh On/Off (Part 3)
   */
  const handleToggleAutoRefresh = () => {
    setIsAutoRefreshEnabled((prev) => !prev);
  };

  /**
   * ==========================================================================
   * Part 3: Refresh Data Automatically every 60 seconds using setInterval()
   * ==========================================================================
   */
  useEffect(() => {
    // If no active user or auto-refresh is disabled, clear any existing interval
    if (!activeUser || !isAutoRefreshEnabled) {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
      return;
    }

    // Set up 1-second ticker using setInterval to manage the 60-second cycle
    countdownIntervalRef.current = setInterval(() => {
      setSecondsRemaining((prevSeconds) => {
        if (prevSeconds <= 1) {
          // 60 seconds reached! Trigger auto-refresh
          console.log(`[Part 3] 60 seconds elapsed! Auto-refreshing data for @${activeUser}...`);
          loadUserData(activeUser, true);
          return REFRESH_INTERVAL_SECONDS;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    // Cleanup interval on unmount or dependency change
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
    };
  }, [activeUser, isAutoRefreshEnabled, loadUserData]);

  /**
   * Load default user (octocat) on first mount
   */
  useEffect(() => {
    loadUserData('octocat', false);
  }, [loadUserData]);

  return (
    <div className="app-container">
      <Header />

      <main className="main-wrapper">
        {/* Search Input Section */}
        <SearchBar
          username={usernameInput}
          setUsername={setUsernameInput}
          onSearch={handleSearch}
          loading={isLoading}
        />

        {/* Part 4: Graceful Error Handling Banner */}
        {errorMessage && (
          <ErrorBanner
            error={errorMessage}
            onRetry={() => loadUserData(activeUser || usernameInput, false)}
          />
        )}

        {/* Part 3: Auto-Refresh Banner with 60-second countdown */}
        {activeUser && !errorMessage && (
          <RefreshBar
            secondsLeft={secondsRemaining}
            intervalSeconds={REFRESH_INTERVAL_SECONDS}
            lastUpdatedTime={lastUpdatedTime}
            isAutoRefreshActive={isAutoRefreshEnabled}
            onToggleAutoRefresh={handleToggleAutoRefresh}
            onManualRefresh={handleManualRefresh}
            isRefreshing={isRefreshing}
          />
        )}

        {/* Part 2: Owner Profile Card */}
        {owner && !errorMessage && <OwnerCard owner={owner} />}

        {/* Part 1: Public Repositories List */}
        {owner && !errorMessage && (
          <section className="repos-section">
            <div className="repos-section-header">
              <div className="repos-header-left">
                <Layers size={20} className="repos-icon" />
                <h2 className="repos-title">Public Repositories</h2>
                <span className="repos-count-badge">
                  {repositories.length} {repositories.length === 1 ? 'repository' : 'repositories'}
                </span>
              </div>
            </div>

            {/* Part 4: User with no public repositories scenario */}
            {repositories.length === 0 ? (
              <EmptyRepos username={owner.login} />
            ) : (
              <div className="repos-grid">
                {repositories.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Welcome Placeholder if no user loaded */}
        {!activeUser && !isLoading && !errorMessage && (
          <div className="empty-placeholder">
            <Sparkles size={40} className="placeholder-icon" />
            <h3>Enter a GitHub username</h3>
            <p>Type any username above to inspect their profile and repositories.</p>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>GitHub Repository Tracker • Asynchronous JavaScript Assignment</p>
      </footer>
    </div>
  );
}
