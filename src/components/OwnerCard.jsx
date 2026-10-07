import React from 'react';
import {
  Users,
  BookOpen,
  MapPin,
  Building,
  Link as LinkIcon,
  ExternalLink,
  Calendar,
} from 'lucide-react';

export default function OwnerCard({ owner }) {
  if (!owner) return null;

  const joinDate = owner.created_at
    ? new Date(owner.created_at).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })
    : null;

  return (
    <section className="owner-card">
      <div className="owner-card-content">
        <div className="owner-avatar-col">
          <img
            src={owner.avatar_url}
            alt={`${owner.login}'s avatar`}
            className="owner-avatar"
            loading="lazy"
          />
        </div>

        <div className="owner-info-col">
          <div className="owner-header-row">
            <div>
              <h2 className="owner-name">{owner.name || owner.login}</h2>
              <div className="owner-login">@{owner.login}</div>
            </div>

            <a
              href={owner.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="github-profile-link"
              title="Open GitHub Profile"
            >
              <span>GitHub Profile</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {owner.bio && <p className="owner-bio">{owner.bio}</p>}

          <div className="owner-stats-bar">
            <div className="stat-pill" title="Public Repositories">
              <BookOpen size={15} className="stat-icon" />
              <span className="stat-value">{owner.public_repos}</span>
              <span className="stat-label">repositories</span>
            </div>
            <div className="stat-pill" title="Followers">
              <Users size={15} className="stat-icon" />
              <span className="stat-value">{owner.followers}</span>
              <span className="stat-label">followers</span>
            </div>
            <div className="stat-pill" title="Following">
              <Users size={15} className="stat-icon" />
              <span className="stat-value">{owner.following}</span>
              <span className="stat-label">following</span>
            </div>
          </div>

          <div className="owner-meta-row">
            {owner.company && (
              <div className="owner-meta-item">
                <Building size={14} />
                <span>{owner.company}</span>
              </div>
            )}
            {owner.location && (
              <div className="owner-meta-item">
                <MapPin size={14} />
                <span>{owner.location}</span>
              </div>
            )}
            {owner.blog && (
              <div className="owner-meta-item">
                <LinkIcon size={14} />
                <a
                  href={owner.blog.startsWith('http') ? owner.blog : `https://${owner.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta-link"
                >
                  {owner.blog}
                </a>
              </div>
            )}
            {joinDate && (
              <div className="owner-meta-item">
                <Calendar size={14} />
                <span>Joined {joinDate}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
