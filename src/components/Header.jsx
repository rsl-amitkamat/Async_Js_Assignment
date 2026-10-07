import React from 'react';
import { GitBranch, CheckCircle2 } from 'lucide-react';

export default function Header({ activeStep = 5 }) {

  return (
    <header className="app-header">
      <div className="brand-group">
        <div className="brand-icon-wrapper">
          <GitBranch className="brand-icon" size={24} />
        </div>
        <div>
          <h1 className="brand-title">GitHub Repo Tracker</h1>
          <p className="brand-subtitle">Asynchronous JavaScript Assignment (React)</p>
        </div>
      </div>

      <div className="assignment-pills">
      </div>
    </header>
  );
}
