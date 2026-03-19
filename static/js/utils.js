/* Cricket Stats - Utility Functions */
/* Reusable helper functions */

'use strict';

const Utils = {
  /**
   * Debounce function - delays execution until after wait time
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  debounce(func, wait = 300) {
    let timeoutId;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeoutId);
        func.apply(this, args);
      };
      clearTimeout(timeoutId);
      timeoutId = setTimeout(later, wait);
    };
  },

  /**
   * Throttle function - limits execution rate
   * @param {Function} func - Function to throttle
   * @param {number} limit - Minimum time between executions
   * @returns {Function} Throttled function
   */
  throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  /**
   * Format number with commas
   * @param {number} num - Number to format
   * @returns {string} Formatted number
   */
  formatNumber(num) {
    if (num === null || num === undefined) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  /**
   * Format date to readable string
   * @param {string|Date} date - Date to format
   * @returns {string} Formatted date
   */
  formatDate(date) {
    const d = new Date(date);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return d.toLocaleDateString('en-US', options);
  },

  /**
   * Format time to readable string
   * @param {string|Date} date - Date to format
   * @returns {string} Formatted time
   */
  formatTime(date) {
    const d = new Date(date);
    const options = { hour: '2-digit', minute: '2-digit' };
    return d.toLocaleTimeString('en-US', options);
  },

  /**
   * Get relative time string (e.g., "2 hours ago")
   * @param {string|Date} date - Date to format
   * @returns {string} Relative time string
   */
  getRelativeTime(date) {
    const now = new Date();
    const then = new Date(date);
    const seconds = Math.floor((now - then) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return this.formatDate(date);
  },

  /**
   * Generate initials from name
   * @param {string} name - Full name
   * @returns {string} Initials (2 chars max)
   */
  getInitials(name) {
    if (!name) return '??';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  },

  /**
   * Truncate text with ellipsis
   * @param {string} text - Text to truncate
   * @param {number} length - Maximum length
   * @returns {string} Truncated text
   */
  truncate(text, length = 50) {
    if (!text || text.length <= length) return text;
    return text.substring(0, length) + '...';
  },

  /**
   * Generate unique ID
   * @returns {string} Unique ID
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  /**
   * Sleep for specified milliseconds
   * @param {number} ms - Milliseconds to sleep
   * @returns {Promise} Promise that resolves after delay
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  /**
   * Check if value is empty
   * @param {*} value - Value to check
   * @returns {boolean} True if empty
   */
  isEmpty(value) {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim().length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
  },

  /**
   * Deep clone object
   * @param {Object} obj - Object to clone
   * @returns {Object} Cloned object
   */
  deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof Array) return obj.map(item => this.deepClone(item));
    
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = this.deepClone(obj[key]);
      }
    }
    return clonedObj;
  },

  /**
   * Parse query string to object
   * @param {string} queryString - Query string (with or without ?)
   * @returns {Object} Parsed parameters
   */
  parseQueryString(queryString) {
    const params = {};
    const query = queryString.startsWith('?') ? queryString.substr(1) : queryString;
    
    if (!query) return params;
    
    query.split('&').forEach(param => {
      const [key, value] = param.split('=');
      params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });
    
    return params;
  },

  /**
   * Build query string from object
   * @param {Object} params - Parameters object
   * @returns {string} Query string
   */
  buildQueryString(params) {
    const parts = [];
    for (const key in params) {
      if (params.hasOwnProperty(key) && params[key] !== null && params[key] !== undefined) {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
      }
    }
    return parts.length > 0 ? '?' + parts.join('&') : '';
  },

  /**
   * Scroll to top of page smoothly
   */
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  },

  /**
   * Scroll to element smoothly
   * @param {string|Element} element - Element or selector
   */
  scrollToElement(element) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },

  /**
   * Check if element is in viewport
   * @param {Element} element - Element to check
   * @returns {boolean} True if in viewport
   */
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  /**
   * Get team flag emoji (fallback for actual images)
   * @param {string} country - Country name
   * @returns {string} Flag emoji or abbreviation
   */
  getTeamFlag(country) {
    const flags = {
      'India': '🇮🇳',
      'Australia': '🇦🇺',
      'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      'Pakistan': '🇵🇰',
      'New Zealand': '🇳🇿',
      'South Africa': '🇿🇦',
      'West Indies': '🇯🇲',
      'Sri Lanka': '🇱🇰',
      'Bangladesh': '🇧🇩',
      'Afghanistan': '🇦🇫'
    };
    
    return flags[country] || country.substring(0, 3).toUpperCase();
  },

  /**
   * Show toast notification
   * @param {string} message - Message to show
   * @param {string} type - Type (success, error, info, warning)
   */
  showToast(message, type = 'info') {
    // Simple toast implementation
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      padding: 16px 24px;
      background: var(--color-bg-card);
      border: 1px solid var(--color-border-bright);
      border-radius: var(--radius-base);
      box-shadow: var(--shadow-lg);
      z-index: 9999;
      animation: slideDown 300ms ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'fadeOut 300ms ease-out';
      setTimeout(() => toast.remove(), 300);
    }, CONFIG.UI.TOAST_DURATION);
  },

  /**
   * Copy text to clipboard
   * @param {string} text - Text to copy
   * @returns {Promise<boolean>} True if successful
   */
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.showToast('Copied to clipboard', 'success');
      return true;
    } catch (err) {
      console.error('Failed to copy:', err);
      this.showToast('Failed to copy', 'error');
      return false;
    }
  },

  /**
   * Check if online
   * @returns {boolean} True if online
   */
  isOnline() {
    return navigator.onLine;
  },

  /**
   * Get user agent info
   * @returns {Object} User agent info
   */
  getUserAgent() {
    const ua = navigator.userAgent;
    return {
      isMobile: /Mobile|Android|iPhone|iPad|iPod/i.test(ua),
      isTablet: /iPad|Android/i.test(ua) && !/Mobile/i.test(ua),
      isDesktop: !/Mobile|Android|iPhone|iPad|iPod/i.test(ua),
      isIOS: /iPhone|iPad|iPod/i.test(ua),
      isAndroid: /Android/i.test(ua),
      isSafari: /Safari/i.test(ua) && !/Chrome/i.test(ua),
      isChrome: /Chrome/i.test(ua),
      isFirefox: /Firefox/i.test(ua),
    };
  },
};

// Export for use in other modules
window.Utils = Utils;
