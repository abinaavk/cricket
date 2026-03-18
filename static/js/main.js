// Global utilities and shared functionality

// Show loading overlay
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.add('active');
    }
}

// Hide loading overlay
function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Debounce function for search inputs
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Error handling for API calls
function handleApiError(error, customMessage = 'An error occurred') {
    console.error('API Error:', error);
    
    // Show user-friendly error message
    const errorMsg = error.message || customMessage;
    
    // You can implement a toast/notification system here
    alert(errorMsg);
    
    hideLoading();
}

// Get team flag emoji (fallback for actual flags)
function getTeamFlag(country) {
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
    
    return flags[country] || '🏏';
}

// Local storage helpers
const Storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Storage error:', e);
        }
    },
    
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Storage error:', e);
            return defaultValue;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Storage error:', e);
        }
    }
};

// Favorite matches functionality
const Favorites = {
    add: (matchId) => {
        const favorites = Storage.get('favoriteMatches', []);
        if (!favorites.includes(matchId)) {
            favorites.push(matchId);
            Storage.set('favoriteMatches', favorites);
        }
    },
    
    remove: (matchId) => {
        const favorites = Storage.get('favoriteMatches', []);
        const filtered = favorites.filter(id => id !== matchId);
        Storage.set('favoriteMatches', filtered);
    },
    
    has: (matchId) => {
        const favorites = Storage.get('favoriteMatches', []);
        return favorites.includes(matchId);
    },
    
    getAll: () => {
        return Storage.get('favoriteMatches', []);
    }
};

// API helper functions
const API = {
    baseUrl: window.location.origin,
    
    async get(endpoint) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },
    
    async post(endpoint, data) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    }
};

// Refresh timer for live matches
class LiveRefreshManager {
    constructor(refreshInterval = 30000) {
        this.refreshInterval = refreshInterval;
        this.timers = new Map();
    }
    
    start(key, callback) {
        // Clear existing timer if any
        this.stop(key);
        
        // Execute immediately
        callback();
        
        // Set up interval
        const timer = setInterval(callback, this.refreshInterval);
        this.timers.set(key, timer);
    }
    
    stop(key) {
        if (this.timers.has(key)) {
            clearInterval(this.timers.get(key));
            this.timers.delete(key);
        }
    }
    
    stopAll() {
        this.timers.forEach((timer, key) => {
            clearInterval(timer);
        });
        this.timers.clear();
    }
}

// Initialize refresh manager
const liveRefresh = new LiveRefreshManager();

// Clean up timers on page unload
window.addEventListener('beforeunload', () => {
    liveRefresh.stopAll();
});

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialize tooltips (if needed)
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = e.target.dataset.tooltip;
            document.body.appendChild(tooltip);
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;
            tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
        });
        
        el.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Service worker registration (for PWA support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/static/js/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initTooltips();
    
    // Add active state to current nav item
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-item').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});
