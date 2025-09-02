// Portfolio Configuration
const PORTFOLIO_CONFIG = {
    // GitHub Configuration
    github: {
        username: 'MinThiha23', // Your actual GitHub username
        apiBase: 'https://api.github.com',
        maxRepos: 10, // Maximum number of repositories to display
        featuredStarThreshold: 5, // Repos with more stars than this will be featured
        excludeForks: true, // Exclude forked repositories
        excludePrivate: false, // Include private repositories to show KD Campus Connect
    },
    
    // Portfolio Information
    personal: {
        name: 'Min Thiha',
        title: 'Software Developer',
        email: 'min123mth@gmail.com', // Your actual email
        phone: '011-6456-1805', // Your actual phone
        location: 'Malaysia',
        github: 'https://github.com/MinThiha23', // Your actual GitHub profile
        linkedin: 'https://linkedin.com/in/minthiha', // Replace with your actual LinkedIn
        twitter: 'https://twitter.com/minthiha', // Replace with your actual Twitter
        whatsapp: 'https://wa.me/601164561805', // Your WhatsApp link
    },
    
    // Project Settings
    projects: {
        showLanguages: true,
        showStats: true,
        showLastUpdated: true,
        defaultImage: 'https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=800',
    },
    
    // Animation Settings
    animations: {
        enableParallax: true,
        enableTyping: true,
        enableTilt: true,
        enableScrollAnimations: true,
    },
    
    // Theme Settings
    theme: {
        defaultTheme: 'light', // 'light' or 'dark'
        enableAutoTheme: true, // Automatically switch theme based on system preference
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PORTFOLIO_CONFIG;
}
