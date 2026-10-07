import React from 'react';
import { Star, GitFork, ExternalLink, Calendar, Circle } from 'lucide-react';
import { getLanguageColor } from '../languageColors';

export default function RepoCard({ repo }) {
  const langColor = getLanguageColor(repo.language);

  const formattedDate = repo.updated_at
    ? new Date(repo.updated_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'N/A';

  return (
    <article className="repo-card">
      <div className="repo-card-top">
        <div className="repo-header-row">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-title"
            title={`View ${repo.name} on GitHub`}
          >
            <span>{repo.name}</span>
            <ExternalLink size={13} className="repo-ext-icon" />
          </a>
          <span className="repo-badge">{repo.visibility || 'public'}</span>
        </div>

        <p className="repo-desc">
          {repo.description || 'No description provided.'}
        </p>
      </div>

      <div className="repo-meta">
        {repo.language && (
          <div className="repo-meta-item lang-item" title={`Language: ${repo.language}`}>
            <span
              className="lang-indicator-dot"
              style={{ backgroundColor: langColor }}
            />
            <span className="lang-name">{repo.language}</span>
          </div>
        )}

        <div className="repo-meta-item" title="Stars">
          <Star size={14} className="meta-icon" />
          <span>{repo.stargazers_count.toLocaleString()}</span>
        </div>

        <div className="repo-meta-item" title="Forks">
          <GitFork size={14} className="meta-icon" />
          <span>{repo.forks_count.toLocaleString()}</span>
        </div>

        <div className="repo-meta-item date-item" title="Last Updated">
          <Calendar size={13} className="meta-icon" />
          <span>Updated {formattedDate}</span>
        </div>
      </div>
    </article>
  );
}
