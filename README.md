# Min Thiha Portfolio - GitHub Integration

A modern, responsive portfolio website with real-time GitHub project integration.

## Features

- **Real GitHub Integration**: Automatically fetches and displays your actual GitHub repositories
- **Dynamic Project Cards**: Shows real stats like stars, forks, and issues
- **Responsive Design**: Works perfectly on all devices
- **Dark/Light Theme**: Toggle between themes
- **Modern Animations**: Smooth scroll animations and interactive elements
- **SEO Optimized**: Meta tags and structured data for better search visibility

## GitHub Integration Setup

### 1. Configure Your GitHub Username

Edit the `config.js` file and update your GitHub username:

```javascript
const PORTFOLIO_CONFIG = {
    github: {
        username: 'your-github-username', // Replace with your actual GitHub username
        // ... other settings
    }
};
```

### 2. Customize Personal Information

Update your personal details in `config.js`:

```javascript
personal: {
    name: 'Your Name',
    title: 'Your Title',
    email: 'your.email@example.com',
    phone: '+1234567890',
    location: 'Your Location',
    github: 'https://github.com/your-username',
    linkedin: 'https://linkedin.com/in/your-profile',
    twitter: 'https://twitter.com/your-handle',
}
```

### 3. Project Display Settings

Configure how your projects are displayed:

```javascript
projects: {
    showLanguages: true,        // Show programming languages
    showStats: true,           // Show stars, forks, issues
    showLastUpdated: true,     // Show last update date
    defaultImage: 'path/to/image.jpg', // Default project image
}
```

## GitHub API Features

The portfolio automatically fetches:

- **Repository Information**: Name, description, topics
- **Statistics**: Stars, forks, open issues
- **Languages**: Primary programming languages used
- **Metadata**: Last updated date, repository size
- **Links**: Direct links to GitHub repositories and live demos

### Repository Filtering

The system automatically filters repositories based on your settings:

- **Exclude Forks**: Only show original repositories
- **Exclude Private**: Only show public repositories
- **Featured Projects**: Repositories with more than 5 stars get featured styling

## Customization Options

### Styling

All styles are in `styles.css` with CSS custom properties for easy theming:

```css
:root {
    --color-primary: #3b82f6;
    --color-primary-dark: #2563eb;
    --color-bg-primary: #ffffff;
    --color-text-primary: #1f2937;
    /* ... more variables */
}
```

### Animations

Control animations in `config.js`:

```javascript
animations: {
    enableParallax: true,
    enableTyping: true,
    enableTilt: true,
    enableScrollAnimations: true,
}
```

## File Structure

```
project/
├── index.html          # Main HTML file
├── styles.css          # All styles and animations
├── script.js           # JavaScript functionality
├── config.js           # Configuration settings
├── README.md           # This file
└── package.json        # Dependencies
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance

- **Lazy Loading**: Images and content load as needed
- **Optimized API Calls**: Minimal GitHub API requests
- **Caching**: Browser caching for better performance
- **Compressed Assets**: Optimized images and code

## Troubleshooting

### GitHub Projects Not Loading

1. **Check Username**: Ensure your GitHub username is correct in `config.js`
2. **API Limits**: GitHub API has rate limits for unauthenticated requests
3. **Network Issues**: Check your internet connection
4. **Console Errors**: Open browser dev tools to check for JavaScript errors

### Styling Issues

1. **CSS Variables**: Ensure all CSS custom properties are defined
2. **Theme Toggle**: Check if theme switching is working properly
3. **Responsive Design**: Test on different screen sizes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the browser console for errors
3. Ensure all files are properly loaded
4. Verify your GitHub username and repository settings

---

**Note**: This portfolio uses the public GitHub API. For higher rate limits or private repository access, consider using a GitHub Personal Access Token (requires additional setup).

