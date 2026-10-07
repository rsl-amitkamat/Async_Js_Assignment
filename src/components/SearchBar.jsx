import React from 'react';
import { Search, Loader2 } from 'lucide-react';

export default function SearchBar({ username, setUsername, onSearch, loading }) {
  const quickUsers = ['octocat', 'torvalds', 'gaearon', 'kentcdodds', 'shadcn'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  const handleSelectQuickUser = (user) => {
    setUsername(user);
    onSearch(user);
  };

  return (
    <div className="search-card">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <Search className="input-icon" size={18} />
          <input
            type="text"
            className="search-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username (e.g. octocat, torvalds)..."
            disabled={loading}
            autoFocus
          />
          <button
            type="submit"
            className="search-button"
            disabled={loading || !username.trim()}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="spin-icon" />
                <span>Fetching...</span>
              </>
            ) : (
              <span>Track User</span>
            )}
          </button>
        </div>
      </form>

      <div className="quick-suggestions">
        <span className="quick-label">Try example profiles:</span>
        {quickUsers.map((user) => (
          <button
            key={user}
            type="button"
            className="quick-btn"
            onClick={() => handleSelectQuickUser(user)}
            disabled={loading}
          >
            {user}
          </button>
        ))}
      </div>
    </div>
  );
}
