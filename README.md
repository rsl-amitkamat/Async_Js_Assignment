# GitHub Repository Tracker (React)

An asynchronous JavaScript application built with **React**, **Vite**, and **Vanilla CSS** tracking GitHub users and public repositories using the GitHub REST API.

---

## 🚀 Live Local Server

The development server runs at:
```bash
http://localhost:5173/
```

To start or restart the dev server:
```bash
npm install
npm run dev
```

---

## 📋 Assignment Requirements & Implementation

### Part 1 – Fetch Public Repositories
- **API Endpoint:** `GET https://api.github.com/users/{username}/repos?sort=updated&per_page=100`
- **Input:** Clean search bar with quick preset tags (`octocat`, `torvalds`, `gaearon`, etc.).
- **Console Output:** Full array of repositories is logged using `console.log` on every fetch.
- **UI Display:** Responsive grid of repository cards showcasing:
  - Repository name (linked directly to GitHub)
  - Visibility badge
  - Repository description
  - Primary language with colored badge dot
  - Star count and Fork count
  - Last updated timestamp

### Part 2 – Fetch Owner Details
- **API Endpoint:** `GET https://api.github.com/users/{username}`
- **Owner Profile Card:**
  - Avatar image
  - Full name & `@username`
  - Bio & Join date
  - Stats: Public repositories count, Followers count, Following count
  - Location, Company, and Blog / Website links
  - Direct profile link on GitHub

### Part 3 – Refresh Data Automatically (60s `setInterval`)
- Periodic auto-refresh implemented using `setInterval()` with an exact 60-second timer.
- **Live UI Indicators:**
  - Active countdown badge (*"Every 60s (Next in 42s)"*)
  - Progress bar track indicating time until next automatic sync
  - Last synced timestamp (*"Last synced: 14:25:00"*)
  - **Pause / Resume** toggle button
  - **Refresh Now** button to trigger an immediate async fetch and reset the 60-second cycle

### Part 4 – Error Handling
Gracefully handles all failure edge cases:
- **Invalid GitHub username (404):** Displays a styled error banner informing the user that the username doesn't exist, along with suggestions and a retry button.
- **Network / API Failures (403 rate limits or connection errors):** Clear descriptive banners explaining the failure reason.
- **User with No Public Repositories:** Displays a clean empty state card informing the user that the account has 0 public repositories.

### Part 5 – Async/Await & Try...Catch
- All asynchronous calls are implemented cleanly using native `async/await` syntax.
- Concurrent fetching of user profile and repositories using `Promise.all([fetchUserProfile(...), fetchUserRepositories(...)])`.
- Comprehensive `try...catch` blocks handling rejected promises and network errors.

---

## 🛠️ Project Structure

```
Async_JS_Assignment/
├── index.html                  # HTML entry point with Inter font & metadata
├── package.json                # Project dependencies (React 19, Lucide icons, Vite)
├── src/
│   ├── main.jsx                # React root mount
│   ├── index.css               # Design system tokens, variables & base styles
│   ├── App.jsx                 # Main state coordinator & 60s setInterval ticker
│   ├── App.css                 # Component styling (cards, search, badges, grid)
│   ├── api.js                  # Async API service (fetch, async/await, try/catch)
│   ├── languageColors.js       # GitHub language badge color mapping
│   └── components/
│       ├── Header.jsx          # Header with 5-part assignment badges
│       ├── SearchBar.jsx       # Search input with quick user suggestions
│       ├── OwnerCard.jsx       # Part 2: Owner profile details
│       ├── RepoCard.jsx        # Part 1: Public repository card
│       ├── RefreshBar.jsx      # Part 3: Auto-refresh countdown & controls
│       ├── ErrorBanner.jsx     # Part 4: Invalid user & network errors
│       └── EmptyRepos.jsx      # Part 4: Zero public repos state
```
