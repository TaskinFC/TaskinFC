// Main JavaScript for all pages

// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const soundToggle = document.querySelector('.sound-toggle');
const soundIcon = document.getElementById('sound-icon');
const crowdAudio = document.getElementById('crowd-audio');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

// Check for saved user preferences
document.addEventListener('DOMContentLoaded', () => {
  // Theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }

  // Sound preference
  const savedSound = localStorage.getItem('sound');
  if (savedSound === 'on') {
    soundIcon.classList.remove('fa-volume-mute');
    soundIcon.classList.add('fa-volume-up');
    if (crowdAudio) {
      crowdAudio.volume = 0.2;
      
      // Only play sound if user has interacted with the page
      document.addEventListener('click', () => {
        crowdAudio.play().catch(error => {
          console.log('Audio autoplay prevented:', error);
        });
      }, { once: true });
    }
  }

  // Initialize page-specific scripts
  initPageSpecificScripts();
});

// Theme Toggle Function
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
  if (body.classList.contains('dark-mode')) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
});

// Sound Toggle Function
soundToggle.addEventListener('click', () => {
  if (crowdAudio) {
    if (crowdAudio.paused) {
      crowdAudio.volume = 0.2;
      crowdAudio.play().catch(error => {
        console.log('Audio play prevented:', error);
      });
      soundIcon.classList.remove('fa-volume-mute');
      soundIcon.classList.add('fa-volume-up');
      localStorage.setItem('sound', 'on');
    } else {
      crowdAudio.pause();
      soundIcon.classList.remove('fa-volume-up');
      soundIcon.classList.add('fa-volume-mute');
      localStorage.setItem('sound', 'off');
    }
  }
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  
  // Toggle hamburger to X
  const bars = document.querySelectorAll('.bar');
  bars.forEach(bar => bar.classList.toggle('active'));
  
  if (navLinks.classList.contains('active')) {
    // When menu is open
    bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
    bars[1].style.opacity = '0';
    bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
  } else {
    // When menu is closed
    bars[0].style.transform = 'rotate(0) translate(0)';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'rotate(0) translate(0)';
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const isMenuBtnClick = e.target.closest('.mobile-menu-btn');
  const isNavLinksClick = e.target.closest('.nav-links');
  
  if (!isMenuBtnClick && !isNavLinksClick && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    
    // Reset hamburger icon
    const bars = document.querySelectorAll('.bar');
    bars[0].style.transform = 'rotate(0) translate(0)';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'rotate(0) translate(0)';
  }
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (validateEmail(email)) {
      // Simulate successful submission
      emailInput.value = '';
      showToast('Bültene başarıyla abone oldunuz!', 'success');
    } else {
      showToast('Lütfen geçerli bir e-posta adresi girin.', 'error');
    }
  });
}

// Helper Functions
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function showToast(message, type = 'info') {
  // Create toast element if it doesn't exist
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  
  // Set toast style based on type
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  // Show toast
  toast.classList.add('show');
  
  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// CSS for toast notifications
const toastStyle = document.createElement('style');
toastStyle.textContent = `
  .toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background-color: var(--dark-gray);
    color: white;
    padding: 12px 24px;
    border-radius: 4px;
    z-index: 1000;
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 90%;
    text-align: center;
  }
  
  .toast.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
  
  .toast.success {
    background-color: var(--success);
  }
  
  .toast.error {
    background-color: var(--error);
  }
  
  .toast.info {
    background-color: var(--info);
  }
  
  .toast.warning {
    background-color: var(--warning);
  }
`;
document.head.appendChild(toastStyle);

// Detect page and initialize specific scripts
function initPageSpecificScripts() {
  const currentPath = window.location.pathname;
  const pageName = currentPath.split('/').pop().split('.')[0];
  
  // If on homepage or pageName is ''
  if (pageName === 'index' || pageName === '') {
    // Home page specific functions are in home.js
  } else if (pageName === 'team') {
    // Team page specific functions
    console.log('Team page loaded');
    // Functions in team.js
  } else if (pageName === 'fixtures') {
    // Fixtures page specific functions
    console.log('Fixtures page loaded');
    // Functions in fixtures.js
  }
  // Add more page-specific initializations as needed
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100, // Offset for fixed header
        behavior: 'smooth'
      });
    }
  });
});

// Add active class to current nav link
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    
    const linkPath = link.getAttribute('href');
    if (currentPath.includes(linkPath) && linkPath !== '/index.html') {
      link.classList.add('active');
    } else if (currentPath === '/' || currentPath === '/index.html') {
      // Set home as active on main page
      if (linkPath === 'index.html' || linkPath === '/') {
        link.classList.add('active');
      }
    }
  });
}

// Run setActiveNavLink on page load
setActiveNavLink();