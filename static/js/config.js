/* Cricket Stats - Configuration */
/* Global configuration constants and settings */

'use strict';

const CONFIG = {
  // API Configuration
  API: {
    BASE_URL: window.location.origin,
    ENDPOINTS: {
      LIVE_MATCHES: '/api/live-matches',
      MATCH_INFO: '/api/match-info',
      RANKINGS: '/api/rankings',
      PLAYER_INFO: '/api/player-info',
    },
    TIMEOUT: 30000, // 30 seconds
    RETRIES: 3,
  },

  // Cache Configuration
  CACHE: {
    ENABLED: true,
    DURATIONS: {
      LIVE_MATCHES: 30 * 1000,        // 30 seconds
      UPCOMING_MATCHES: 5 * 60 * 1000, // 5 minutes
      PLAYERS: 24 * 60 * 60 * 1000,   // 24 hours
      RANKINGS: 60 * 60 * 1000,        // 1 hour
      MATCH_INFO: 60 * 1000,           // 1 minute
    },
  },

  // Refresh Configuration
  REFRESH: {
    LIVE_MATCHES_INTERVAL: 30000, // 30 seconds
    ENABLED_BY_DEFAULT: true,
  },

  // UI Configuration
  UI: {
    DEBOUNCE_DELAY: 300, // milliseconds
    TOAST_DURATION: 5000, // 5 seconds
    ANIMATION_DURATION: 300, // milliseconds
  },

  // Pagination
  PAGINATION: {
    ITEMS_PER_PAGE: 20,
    MAX_PAGES: 10,
  },

  // Local Storage Keys
  STORAGE_KEYS: {
    PREFERENCES: 'cricketstats_preferences',
    FAVORITES: 'cricketstats_favorites',
    CACHE_PREFIX: 'cricketstats_cache_',
    LAST_VISIT: 'cricketstats_lastvisit',
  },

  // Routes
  ROUTES: {
    HOME: '/',
    LIVE: '/live',
    MATCHES: '/matches',
    SCORECARD: '/scorecard',
    PLAYERS: '/players',
    PLAYER_DETAIL: '/player',
    RANKINGS: '/rankings',
    COMPARE: '/compare',
    CREDITS: '/credits',
  },

  // Default Preferences
  DEFAULT_PREFERENCES: {
    autoRefresh: true,
    theme: 'dark',
    favoriteTeams: [],
  },

  // Error Messages
  ERRORS: {
    NETWORK: 'No internet connection. Please check your network.',
    API_ERROR: 'Something went wrong. Please try again.',
    TIMEOUT: 'Request timed out. Please try again.',
    RATE_LIMIT: 'Too many requests. Please wait a moment.',
    NOT_FOUND: 'The requested data was not found.',
    SERVER_ERROR: 'Server error. Please try again later.',
    PARSE_ERROR: 'Invalid data received from server.',
  },

  // Feature Flags
  FEATURES: {
    WEB_SOCKETS: false, // Enable when WebSocket support is added
    OFFLINE_MODE: false, // Enable when service worker is added
    PUSH_NOTIFICATIONS: false, // Enable when notifications are implemented
  },
};

// Freeze config to prevent modifications
Object.freeze(CONFIG);
Object.freeze(CONFIG.API);
Object.freeze(CONFIG.API.ENDPOINTS);
Object.freeze(CONFIG.CACHE);
Object.freeze(CONFIG.CACHE.DURATIONS);
Object.freeze(CONFIG.REFRESH);
Object.freeze(CONFIG.UI);
Object.freeze(CONFIG.PAGINATION);
Object.freeze(CONFIG.STORAGE_KEYS);
Object.freeze(CONFIG.ROUTES);
Object.freeze(CONFIG.DEFAULT_PREFERENCES);
Object.freeze(CONFIG.ERRORS);
Object.freeze(CONFIG.FEATURES);

// Export for use in other modules
window.CONFIG = CONFIG;
