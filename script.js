// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const themeToggle = document.getElementById('theme-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const skillsSection = document.getElementById('skills');
const contactForm = document.querySelector('.contact-form form');

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggle(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggle(newTheme);
}

function updateThemeToggle(theme) {
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    
    if (theme === 'dark') {
        sunIcon.style.opacity = '0';
        moonIcon.style.opacity = '1';
    } else {
        sunIcon.style.opacity = '1';
        moonIcon.style.opacity = '0';
    }
}

// Navigation Management
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingNavLink) {
                correspondingNavLink.classList.add('active');
            }
        }
    });
}

function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = 'none';
    }
    
    // Update for dark theme
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        }
    }
}

// Skills Animation
function animateSkills() {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelector('.skills-content').classList.add('skills-loaded');
                skillsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
}

// Smooth Scrolling for Navigation Links
function handleSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileMenu();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Handling
function handleContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Intersection Observer for Animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.project-card, .skill-item, .about-content, .contact-content');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Parallax Effect for Hero Section
function handleParallaxEffect() {
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroSection && heroContent) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;
            
            if (scrolled < heroHeight) {
                const yPos = scrolled * 0.5;
                heroContent.style.transform = `translateY(${yPos}px)`;
            }
        });
    }
}

// Typing Animation for Hero Title
function initTypingAnimation() {
    const titleRole = document.querySelector('.title-role');
    if (!titleRole) return;
    
    const roles = ['Software Developer', 'Full-Stack Developer', 'Problem Solver', 'Tech Enthusiast'];
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function typeAnimation() {
        const currentRole = roles[currentRoleIndex];
        
        if (isDeleting) {
            titleRole.textContent = currentRole.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            titleRole.textContent = currentRole.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }
        
        if (!isDeleting && currentCharIndex === currentRole.length) {
            setTimeout(() => {
                isDeleting = true;
            }, 2000);
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        }
        
        const speed = isDeleting ? 100 : 150;
        setTimeout(typeAnimation, speed);
    }
    
    // Start animation after initial delay
    setTimeout(typeAnimation, 1000);
}

// Project Card Tilt Effect
function initProjectTiltEffect() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(5deg) translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
    });
}

// GitHub API Configuration
const GITHUB_USERNAME = PORTFOLIO_CONFIG.github.username;
const GITHUB_API_BASE = PORTFOLIO_CONFIG.github.apiBase;

// GitHub Projects Integration
async function fetchGitHubProjects() {
    try {
        const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${PORTFOLIO_CONFIG.github.maxRepos}`);
        const repos = await response.json();
        
        if (response.ok) {
            return repos.filter(repo => {
                // Exclude forks and private repos
                if (PORTFOLIO_CONFIG.github.excludeForks && repo.fork) return false;
                if (PORTFOLIO_CONFIG.github.excludePrivate && repo.private) return false;
                
                // Exclude test repositories and config files
                const excludedRepos = [
                    'test_student_management_system',
                    'minthiha23',
                    'test',
                    'demo',
                    'config',
                    'profile',
                    'readme',
                    'codealpha_tasks',
                    'nextjs-ai-chatbot'
                ];
                
                // Include specific repositories we want to show
                const includedRepos = [
                    'kda-campusconnect',
                    'recording_system',
                    'vehicle-management-system',
                    'exco-budget-management-system',
                    'sentiment-analysis-app',
                    'weather-dashboard',
                    'HV-System-v2'
                ]; 
                
                const repoName = repo.name.toLowerCase();
                
                // If we have specific repositories to include, only show those
                if (includedRepos.length > 0) {
                    return includedRepos.some(included => repoName.includes(included));
                }
                
                // Otherwise, exclude test repositories
                if (excludedRepos.some(excluded => repoName.includes(excluded))) return false;
                
                return true;
            });
        } else {
            console.error('Failed to fetch GitHub projects:', repos.message);
            return [];
        }
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        return [];
    }
}

async function getRepoLanguages(repoName) {
    try {
        const response = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}/languages`);
        const languages = await response.json();
        return Object.keys(languages).slice(0, 5); // Get top 5 languages
    } catch (error) {
        console.error('Error fetching languages:', error);
        return [];
    }
}

function generateAttractiveDescription(repoName, repoDescription) {
    const descriptions = {
        'recording_system': 'A comprehensive recording and management system designed to streamline data collection, storage, and retrieval processes. Features include real-time data capture, advanced search capabilities, and robust reporting tools.',
        'vehicle_management': 'An advanced vehicle management system that handles fleet tracking, maintenance scheduling, driver management, and route optimization. Features real-time GPS tracking, automated maintenance alerts, and comprehensive reporting dashboard.',
        'helpdesk': 'A modern helpdesk system with ticket management, real-time notifications, file attachments, and analytics dashboard. Streamlines customer support operations with automated workflows and detailed reporting.',
        'equipment': 'A comprehensive equipment management system for tracking, maintaining, and optimizing asset utilization. Features include inventory management, maintenance scheduling, and detailed reporting capabilities.',
        'quotation': 'A professional quotation management system that streamlines the quote creation, approval, and tracking process. Includes staff management, role-based access, and real-time status updates.',
        'vulnerability': 'A sophisticated web application vulnerability scanner that detects SQL injection, XSS attacks, and security misconfigurations. Provides detailed reports and recommendations for security improvements.',
        'enterprise': 'A comprehensive enterprise management system that integrates multiple business functions including ticketing, quotations, fleet tracking, and dashboard analytics for complete business oversight.',
        'kd_campus_connect': 'A modern campus connectivity platform designed to enhance student engagement and communication. Features include real-time messaging, event management, resource sharing, and collaborative learning tools for educational institutions.',
        'kda-campusconnect': 'A comprehensive campus connection platform designed to bridge the gap between students, faculty, and administration. Features include real-time communication, event management, resource sharing, and community engagement tools. Built with modern web technologies and now live for public use.',
        'campus_connect': 'A comprehensive campus management system that connects students, faculty, and administrators. Features include course management, attendance tracking, communication tools, and academic resource sharing.',
        'kd_campus': 'An innovative campus connectivity solution that bridges the gap between students and educational resources. Features include digital learning tools, campus navigation, and integrated communication systems.',
        'vehicle_management_system': 'A comprehensive vehicle management system designed for fleet operations, maintenance tracking, and driver management. Features include real-time GPS tracking, automated maintenance alerts, fuel management, and detailed reporting dashboards.',
        'exco_budget_management_system': 'A sophisticated budget management system for EXCO members of the Kedah State Government. Features include budget allocation, expense tracking, approval workflows, financial reporting, and role-based access control for government officials.',
        'sentiment_analysis_app': 'An intelligent sentiment analysis application that analyzes text to determine emotional tone and sentiment. Features include real-time text processing, sentiment scoring, emotion classification, and detailed analytics dashboard. Built with modern AI/ML technologies for accurate sentiment detection.',
        'weather_dashboard': 'A dynamic weather dashboard application that provides real-time weather information, forecasts, and interactive weather maps. Features include current conditions, hourly/daily forecasts, weather alerts, and customizable location tracking with beautiful visualizations.',
        'hv_system_v2': 'An innovative computer control system that combines hand gesture recognition and voice commands for hands-free computer operation. Features include real-time gesture detection, voice command processing, customizable shortcuts, and accessibility features for enhanced user experience.'
    };
    
    const repoKey = repoName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    return descriptions[repoKey] || repoDescription || 'A professional software project showcasing modern development practices and innovative solutions for real-world challenges.';
}

function getProjectStatus(repoName) {
    const statuses = {
        'kda_campusconnect': 'LIVE',
        'kda-campusconnect': 'LIVE',
        'recording_system': 'LIVE',
        'vehicle_management_system': 'LIVE',
        'exco_budget_management_system': 'LIVE',
        'vehicle_management': 'LIVE', 
        'helpdesk': 'LIVE',
        'equipment': 'LIVE',
        'quotation': 'LIVE',
        'vulnerability': 'FYP',
        'enterprise': 'LIVE',
        'sentiment_analysis_app': 'AI/ML',
        'weather_dashboard': 'LIVE',
        'hv_system_v2': 'FYP'
    };
    
    const repoKey = repoName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    return statuses[repoKey] || 'DEV';
}

function createProjectCard(repo) {
    const languages = repo.languages && repo.languages.length > 0 ? repo.languages : (repo.language ? [repo.language] : []);
    const description = generateAttractiveDescription(repo.name, repo.description);
    const status = getProjectStatus(repo.name);
    
    return `
        <div class="project-card ${repo.stargazers_count > PORTFOLIO_CONFIG.github.featuredStarThreshold ? 'featured' : ''}" data-github="true" data-repo="${repo.name}">
            <div class="project-image">
                <img src="${getProjectImage(repo.name)}" alt="${repo.name}">
                <div class="project-overlay">
                                            <div class="project-links">
                            <a href="${repo.html_url}" class="project-link" target="_blank" rel="noopener">
                                <span>CODE</span>
                            </a>
                            ${getDemoLink(repo.name) ? `<a href="${getDemoLink(repo.name)}" class="project-link demo-link" target="_blank" rel="noopener">
                                <span>DEMO</span>
                            </a>` : (repo.homepage ? `<a href="${repo.homepage}" class="project-link demo-link" target="_blank" rel="noopener">
                                <span>DEMO</span>
                            </a>` : `<a href="${repo.html_url}" class="project-link demo-link" target="_blank" rel="noopener">
                                <span>DEMO</span>
                            </a>`)}
                        </div>
                </div>
            </div>
                                            <div class="project-content">
                    <div class="project-header">
                        <div class="project-category">${repo.topics && repo.topics.length > 0 ? repo.topics[0].charAt(0).toUpperCase() + repo.topics[0].slice(1) : (repo.language || 'Software Project')}</div>
                        <div class="project-status ${status.toLowerCase()}">${status}</div>
                    </div>
                    <h3 class="project-title">${repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
                <p class="project-description">
                    ${description}
                </p>
                <div class="project-tech">
                    ${languages.map(lang => `<span class="tech-tag">${lang}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

async function loadGitHubProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    // Show loading state
    projectsGrid.innerHTML = `
        <div class="loading-projects">
            <div class="loading-spinner"></div>
            <p>Loading projects from GitHub...</p>
        </div>
    `;

    try {
        const repos = await fetchGitHubProjects();
        
        if (repos.length === 0) {
            projectsGrid.innerHTML = `
                <div class="no-projects">
                    <p>Unable to load projects from GitHub. Please check your username or try again later.</p>
                    <button onclick="loadGitHubProjects()" class="btn-primary">Retry</button>
                </div>
            `;
            return;
        }

        // Fetch languages for each repo
        const reposWithLanguages = await Promise.all(
            repos.map(async (repo) => {
                const languages = await getRepoLanguages(repo.name);
                return { ...repo, languages };
            })
        );

        // Generate project cards
        const projectCards = reposWithLanguages.map(repo => createProjectCard(repo)).join('');
        projectsGrid.innerHTML = projectCards;

        // Add click handlers for project cards
        addProjectCardHandlers();

    } catch (error) {
        console.error('Error loading GitHub projects:', error);
        projectsGrid.innerHTML = `
            <div class="error-projects">
                <p>Failed to load projects. Please try again later.</p>
                <button onclick="loadGitHubProjects()" class="btn-primary">Retry</button>
            </div>
        `;
    }
}

function getDemoLink(repoName) {
    const demoLinks = {
        'exco_budget_management_system': 'https://exco.kesug.com',
        'exco-budget-management-system': 'https://exco.kesug.com',
        'kda_campusconnect': 'https://kda-campusconnect.vercel.app/',
        'kda-campusconnect': 'https://kda-campusconnect.vercel.app/',
        'recording_system': null, // Add when you have a demo
        'vehicle_management_system': null, // Add when you have a demo
        'sentiment_analysis_app': 'https://sentiment-analysis-app-vh6x.onrender.com/',
        'weather_dashboard': 'https://project-r1aadj807-minthiha23s-projects.vercel.app',
        'weather-dashboard': 'https://project-r1aadj807-minthiha23s-projects.vercel.app'
    };
    
    const repoKey = repoName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    console.log('getDemoLink called for:', repoName, 'repoKey:', repoKey, 'result:', demoLinks[repoKey]);
    return demoLinks[repoKey] || null;
}

function getProjectImage(repoName) {
    const images = {
        'kda_campusconnect': 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
        'kda-campusconnect': 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800',
        'recording_system': 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800',
        'vehicle_management_system': 'https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=800',
        'exco_budget_management_system': 'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=800',
        'helpdesk': 'https://images.pexels.com/photos/92904/pexels-photo-92904.jpeg?auto=compress&cs=tinysrgb&w=800',
        'equipment': 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
        'quotation': 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
        'vulnerability': 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
        'enterprise': 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
        'sentiment_analysis_app': 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
        'weather_dashboard': 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
        'hv_system_v2': 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800'
    };
    
    const repoKey = repoName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    return images[repoKey] || PORTFOLIO_CONFIG.projects.defaultImage;
}

function formatRepoSize(sizeInKB) {
    if (sizeInKB < 1024) {
        return `${sizeInKB} KB`;
    } else {
        const sizeInMB = (sizeInKB / 1024).toFixed(1);
        return `${sizeInMB} MB`;
    }
}

function addProjectCardHandlers() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.project-link')) {
                const githubLink = card.querySelector('a[href*="github.com"]');
                if (githubLink) {
                    window.open(githubLink.href, '_blank', 'noopener');
                }
            }
        });
    });
}

// Initialize EmailJS
function initEmailJS() {
    emailjs.init("drE46cZZOcouigtZj");
}

// Contact Form Handler
async function handleContactForm(event) {
    event.preventDefault();
    
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const formMessage = document.getElementById('formMessage');
    
    // Get form data
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    submitBtn.disabled = true;
    
    try {
        // Send email using EmailJS
        const result = await emailjs.send(
            'service_23gzzm7', // Your Gmail service ID
            'template_pw84jxl', // Your Contact Us template
            {
                name: name,
                email: email,
                subject: subject,
                message: message,
                time: new Date().toLocaleString()
            }
        );
        
        // Show success message
        showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        form.reset();
        
    } catch (error) {
        console.error('Email sending failed:', error);
        showFormMessage('Failed to send message. Please try again or contact me directly via email/WhatsApp.', 'error');
    } finally {
        // Reset button state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }
}

// Show form message
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Initialize Everything
function init() {
    // Theme
    initTheme();
    themeToggle.addEventListener('click', toggleTheme);
    
    // Navigation
    navToggle.addEventListener('click', toggleMobileMenu);
    handleSmoothScrolling();
    
    // Scroll Events
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateActiveNavLink();
    });
    
    // Animations
    animateSkills();
    setupIntersectionObserver();
    handleParallaxEffect();
    initTypingAnimation();
    initProjectTiltEffect();
    
    // Initialize EmailJS
    initEmailJS();
    
    // Load GitHub Projects
    loadGitHubProjects();
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu when resizing to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
    
    // Prevent scroll when mobile menu is open
    navMenu.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
            closeMobileMenu();
        }
    });
}

// Start when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = '👋 Come back! - Min Thiha Portfolio';
    } else {
        document.title = 'Min Thiha - Software Developer Portfolio';
    }
});

// Easter egg - Konami code
let konamiSequence = [];
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiSequence.push(e.code);
    konamiSequence = konamiSequence.slice(-konamiCode.length);
    
    if (konamiSequence.join(',') === konamiCode.join(',')) {
        showNotification('🎉 Konami code activated! You found the easter egg!', 'success');
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);