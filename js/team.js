// JavaScript specific to the team page

// DOM Elements
const filterButtons = document.querySelectorAll('.filter-btn');
const playerCards = document.querySelectorAll('.player-card');

// Filter functionality
function initFilterSystem() {
  // Add click event to each filter button
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get filter value
      const filterValue = button.getAttribute('data-filter');
      
      // Filter players
      filterPlayers(filterValue);
    });
  });
}

// Filter players based on selected filter
function filterPlayers(filter) {
  playerCards.forEach(card => {
    if (filter === 'all') {
      // Show all players
      card.style.display = 'block';
      
      // Add fade-in animation
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      }, 10);
    } else if (card.classList.contains(filter)) {
      // Show cards that match the filter
      card.style.display = 'block';
      
      // Add fade-in animation
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      }, 10);
    } else {
      // Hide cards that don't match
      card.style.display = 'none';
    }
  });
}

// Initialize player cards with staggered animation
function initPlayerCards() {
  playerCards.forEach((card, index) => {
    // Set initial state
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    // Staggered animation on page load
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }, 100 * index);
  });
}

// Add hover effects for player cards
function addPlayerCardEffects() {
  playerCards.forEach(card => {
    const frontImage = card.querySelector('.player-image img');
    
    // Zoom effect on image hover
    if (frontImage) {
      card.addEventListener('mouseenter', () => {
        frontImage.style.transform = 'scale(1.1)';
      });
      
      card.addEventListener('mouseleave', () => {
        // Only reset if card isn't flipped
        if (!card.querySelector('.player-card-inner').style.transform.includes('180deg')) {
          frontImage.style.transform = 'scale(1)';
        }
      });
    }
  });
}

// Make player stats dynamic with animation
function initPlayerStats() {
  const statValues = document.querySelectorAll('.stat-value');
  
  statValues.forEach(stat => {
    const originalValue = stat.textContent;
    stat.textContent = '0';
    
    // Create animation
    let currentValue = 0;
    const targetValue = parseInt(originalValue);
    const duration = 1500; // milliseconds
    const stepTime = Math.abs(Math.floor(duration / targetValue));
    
    // Function to increment counter
    const incrementCounter = () => {
      if (currentValue < targetValue) {
        currentValue += 1;
        stat.textContent = currentValue;
        setTimeout(incrementCounter, stepTime);
      }
    };
    
    // Trigger animation when card is flipped
    const playerCard = stat.closest('.player-card');
    
    if (playerCard) {
      playerCard.addEventListener('mouseenter', () => {
        // Wait for the card to flip and then start the animation
        setTimeout(() => {
          if (stat.textContent === '0') {
            incrementCounter();
          }
        }, 400);
      });
    }
  });
}

// Implement player image loading with fade-in
function handlePlayerImageLoading() {
  const playerImages = document.querySelectorAll('.player-image img');
  
  playerImages.forEach(img => {
    // Set initial state
    img.style.opacity = '0';
    
    // When image loads, fade it in
    img.addEventListener('load', () => {
      img.style.opacity = '1';
      img.style.transition = 'opacity 0.5s ease';
    });
    
    // If image is already loaded
    if (img.complete) {
      img.style.opacity = '1';
    }
  });
}

// Apply parallax effect to team-hero section
function initTeamHeroParallax() {
  const heroSection = document.querySelector('.team-hero');
  
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const heroHeight = heroSection.offsetHeight;
      
      // Only apply effect if we're scrolling within the hero section view
      if (scrollPosition < heroHeight) {
        // Parallax effect
        heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        
        // Fade effect
        const opacity = 1 - (scrollPosition / heroHeight);
        heroSection.querySelector('.team-hero-content').style.opacity = Math.max(opacity, 0);
        heroSection.querySelector('.team-hero-content').style.transform = `translateY(${scrollPosition * 0.3}px)`;
      }
    });
  }
}

// Smooth scroll to team sections from filters
function initSmoothScrolling() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetSection = document.querySelector('.player-grid');
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 150,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Initialize team page
document.addEventListener('DOMContentLoaded', () => {
  initFilterSystem();
  initPlayerCards();
  addPlayerCardEffects();
  initPlayerStats();
  handlePlayerImageLoading();
  initTeamHeroParallax();
  initSmoothScrolling();
  
  // Replace placeholder images if needed
  const placeholderImages = document.querySelectorAll('img[src*="placeholder"]');
  placeholderImages.forEach(img => {
    // This is just a fallback in case images are missing
    img.src = 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  });
  
  // Check for missing team logo
  const logoImages = document.querySelectorAll('.logo');
  logoImages.forEach(logo => {
    logo.onerror = function() {
      // Create canvas element for placeholder logo
      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext('2d');
      
      // Draw a circular background
      ctx.beginPath();
      ctx.arc(50, 50, 45, 0, 2 * Math.PI);
      ctx.fillStyle = '#e61c23';
      ctx.fill();
      
      // Draw border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Add text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('AFC', 50, 50);
      
      // Replace the broken image with our canvas
      this.src = canvas.toDataURL();
    };
  });
});