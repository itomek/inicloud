/**
 * Theme Manager
 * Handles light/dark theme switching and persistence
 */
class ThemeManager {
  constructor() {
    this.storageKey = 'inicloud9-theme';
    this.theme = this.getStoredTheme() || this.getSystemTheme();
    this.init();
  }

  init() {
    this.setTheme(this.theme, false);
    this.setupToggle();
    this.watchSystemTheme();
  }

  getStoredTheme() {
    try {
      return localStorage.getItem(this.storageKey);
    } catch (e) {
      console.warn('localStorage not available');
      return null;
    }
  }

  getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  setTheme(theme, save = true) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    
    if (save) {
      try {
        localStorage.setItem(this.storageKey, theme);
      } catch (e) {
        console.warn('Could not save theme preference');
      }
    }

    window.dispatchEvent(new CustomEvent('themechange', { 
      detail: { theme } 
    }));
  }

  toggle() {
    const newTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  setupToggle() {
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.addEventListener('click', () => this.toggle());
      
      toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggle();
        }
      });
    }
  }

  watchSystemTheme() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', (e) => {
          if (!this.getStoredTheme()) {
            this.setTheme(e.matches ? 'dark' : 'light', false);
          }
        });
      }
    }
  }

  getCurrentTheme() {
    return this.theme;
  }
}

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
  });
} else {
  window.themeManager = new ThemeManager();
}
