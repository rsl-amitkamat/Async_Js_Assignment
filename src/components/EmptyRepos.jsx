import React from 'react';
import { FolderGit2 } from 'lucide-react';

export default function EmptyRepos({ username }) {
  return (
    <div className="empty-repos-card">
      <div className="empty-icon-box">
        <FolderGit2 size={36} className="empty-icon" />
      </div>
      <h3 className="empty-heading">No Public Repositories (Part 4)</h3>
      <p className="empty-subtext">
        User <strong>@{username}</strong> does not have any public repositories yet.
      </p>
    </div>
  );
}
