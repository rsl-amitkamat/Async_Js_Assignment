/**
 * ============================================================================
 * GitHub API Service
 * ============================================================================
 * Handles asynchronous communication with GitHub REST API.
 * Uses async/await with try...catch blocks for robust error handling.
 */

const BASE_URL = 'https://api.github.com';

/**
 * Part 2 & Part 5: Fetch Owner Profile Details
 * GET https://api.github.com/users/{username}
 * 
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} - User profile data object
 */
export async function fetchUserProfile(username) {
  try {
    console.log(`[Part 2] Fetching owner profile details for: "${username}"...`);
    
    const response = await fetch(`${BASE_URL}/users/${encodeURIComponent(username)}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    // Part 4: Error Handling for specific HTTP status codes
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`User "${username}" was not found. Please check the spelling.`);
      } else if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded (60 req/hr for unauthenticated requests). Please try again later.');
      } else {
        throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
      }
    }

    const userData = await response.json();
    console.log(`[Part 2] Successfully fetched owner details for "${username}":`, userData);
    return userData;
  } catch (error) {
    console.error(`[Part 2/Part 4] Error fetching user profile:`, error.message);
    throw error;
  }
}

/**
 * Part 1 & Part 5: Fetch Public Repositories
 * GET https://api.github.com/users/{username}/repos
 * 
 * @param {string} username - GitHub username
 * @returns {Promise<Array>} - Array of public repository objects
 */
export async function fetchUserRepositories(username) {
  try {
    console.log(`[Part 1] Fetching public repositories for: "${username}"...`);
    
    // Sort by most recently updated, up to 100 repositories
    const response = await fetch(
      `${BASE_URL}/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    // Part 4: Error Handling
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`User "${username}" was not found.`);
      } else if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
      }
    }

    const reposData = await response.json();

    // Part 1 requirement: Display repository information in console
    console.log(`[Part 1] Successfully fetched ${reposData.length} repositories for "${username}":`, reposData);
    
    return reposData;
  } catch (error) {
    console.error(`[Part 1/Part 4] Error fetching repositories:`, error.message);
    throw error;
  }
}

/**
 * Helper to fetch both owner profile and repositories concurrently using Promise.all
 * @param {string} username 
 * @returns {Promise<{ owner: Object, repos: Array }>}
 */
export async function fetchGitHubTrackerData(username) {
  try {
    const [owner, repos] = await Promise.all([
      fetchUserProfile(username),
      fetchUserRepositories(username),
    ]);

    return { owner, repos };
  } catch (error) {
    // Re-throw so caller try...catch handles it gracefully
    throw error;
  }
}
