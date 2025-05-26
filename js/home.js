// JavaScript specific to the home page

// DOM Elements
const matchCountdownEl = document.getElementById('match-countdown');
const playersCarousel = document.querySelector('.players-carousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Initialize the countdown timer
function initCountdown() {
  // Set the match date (May 24, 2025 at 19:00)
  const matchDate = new Date('May 24, 2025 19:00:00').getTime();
  
  // Update the countdown every second
  const countdownTimer = setInterval(() => {
    // Get current date and time
    const now = new Date().getTime();
    
    // Calculate the time remaining
    const timeRemaining = matchDate - now;
    
    // Calculate days, hours, minutes, seconds
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    // Update the countdown display
    if (matchCountdownEl) {
      document.querySelector('.days').textContent = days.toString().padStart(2, '0');
      document.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
      document.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
      document.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // If countdown is finished
    if (timeRemaining < 0) {
      clearInterval(countdownTimer);
      if (matchCountdownEl) {
        matchCountdownEl.innerHTML = '<div class="match-live">CANLI!</div>';
      }
    }
  }, 1000);
}

// Players carousel functionality
function initPlayersCarousel() {
  if (!playersCarousel || !prevBtn || !nextBtn) return;
  
  let currentPosition = 0;
  const playerCards = document.querySelectorAll('.player-card');
  const cardWidth = playerCards[0].offsetWidth;
  const carouselWidth = playersCarousel.offsetWidth;
  const gap = parseInt(window.getComputedStyle(playersCarousel).getPropertyValue('gap'));
  const totalWidth = (cardWidth + gap) * playerCards.length - gap;
  const maxPosition = totalWidth - carouselWidth;
  
  // Slide animation function
  function slideCarousel(position) {
    playersCarousel.style.transform = `translateX(-${position}px)`;
    playersCarousel.style.transition = 'transform 0.5s ease';
  }
  
  // Next button handler
  nextBtn.addEventListener('click', () => {
    const screenWidth = window.innerWidth;
    let slideAmount;
    
    // Responsive sliding amount based on screen size
    if (screenWidth < 768) {
      slideAmount = cardWidth + gap;
    } else {
      slideAmount = (cardWidth + gap) * 2; // Slide two cards at once on larger screens
    }
    
    currentPosition = Math.min(currentPosition + slideAmount, maxPosition);
    slideCarousel(currentPosition);
    
    // Disable/enable buttons based on position
    updateButtonState();
  });
  
  // Previous button handler
  prevBtn.addEventListener('click', () => {
    const screenWidth = window.innerWidth;
    let slideAmount;
    
    // Responsive sliding amount based on screen size
    if (screenWidth < 768) {
      slideAmount = cardWidth + gap;
    } else {
      slideAmount = (cardWidth + gap) * 2; // Slide two cards at once on larger screens
    }
    
    currentPosition = Math.max(currentPosition - slideAmount, 0);
    slideCarousel(currentPosition);
    
    // Disable/enable buttons based on position
    updateButtonState();
  });
  
  // Update button state (disabled/enabled)
  function updateButtonState() {
    // Enable/disable previous button
    if (currentPosition <= 0) {
      prevBtn.setAttribute('disabled', true);
      prevBtn.style.opacity = '0.5';
      prevBtn.style.cursor = 'not-allowed';
    } else {
      prevBtn.removeAttribute('disabled');
      prevBtn.style.opacity = '1';
      prevBtn.style.cursor = 'pointer';
    }
    
    // Enable/disable next button
    if (currentPosition >= maxPosition) {
      nextBtn.setAttribute('disabled', true);
      nextBtn.style.opacity = '0.5';
      nextBtn.style.cursor = 'not-allowed';
    } else {
      nextBtn.removeAttribute('disabled');
      nextBtn.style.opacity = '1';
      nextBtn.style.cursor = 'pointer';
    }
  }
  
  // Initialize button state
  updateButtonState();
  
  // Add swipe gesture support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  playersCarousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);
  
  playersCarousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);
  
  function handleSwipe() {
    const minSwipeDistance = 50; // Minimum distance to be considered a swipe
    const swipeDistance = touchEndX - touchStartX;
    
    if (swipeDistance > minSwipeDistance) {
      // Swiped right (previous)
      prevBtn.click();
    } else if (swipeDistance < -minSwipeDistance) {
      // Swiped left (next)
      nextBtn.click();
    }
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    // Recalculate dimensions
    const updatedCardWidth = playerCards[0].offsetWidth;
    const updatedCarouselWidth = playersCarousel.offsetWidth;
    const updatedTotalWidth = (updatedCardWidth + gap) * playerCards.length - gap;
    const updatedMaxPosition = updatedTotalWidth - updatedCarouselWidth;
    
    // Update variables
    currentPosition = Math.min(currentPosition, updatedMaxPosition);
    slideCarousel(currentPosition);
    updateButtonState();
  });
}

// Initialize hero animation effects
function initHeroAnimations() {
  const heroLogo = document.querySelector('.animated-logo');
  const teamName = document.querySelector('.team-name');
  const teamSlogan = document.querySelector('.team-slogan');
  
  if (!heroLogo || !teamName || !teamSlogan) return;
  
  // Parallax effect on scroll
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Only apply effect if user has scrolled down a bit from the top
    if (scrollPosition < window.innerHeight) {
      const translateY = scrollPosition * 0.3;
      const scale = 1 - (scrollPosition * 0.0005);
      const opacity = 1 - (scrollPosition * 0.002);
      
      heroLogo.style.transform = `translateY(${translateY}px) scale(${scale})`;
      teamName.style.transform = `translateY(${translateY * 0.7}px)`;
      teamSlogan.style.transform = `translateY(${translateY * 0.5}px)`;
      
      heroLogo.style.opacity = opacity;
      teamName.style.opacity = opacity;
      teamSlogan.style.opacity = opacity;
    }
  });
}

// Initialize stats counter animation
function initStatsCounterAnimation() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  // Function to animate counting up to a target number
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    // Handle special case for position (e.g., "1.")
    const isPosition = element.textContent.includes('.');
    
    function updateCounter() {
      start += increment;
      if (start >= target) {
        if (isPosition) {
          element.textContent = `${Math.floor(target)}.`;
        } else {
          element.textContent = Math.floor(target);
        }
        return;
      }
      
      if (isPosition) {
        element.textContent = `${Math.floor(start)}.`;
      } else {
        element.textContent = Math.floor(start);
      }
      requestAnimationFrame(updateCounter);
    }
    
    updateCounter();
  }
  
  // Check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Animate stats when they come into view
  function checkStatsVisibility() {
    statNumbers.forEach(stat => {
      if (isInViewport(stat) && !stat.classList.contains('animated')) {
        // Get target number
        let targetValue;
        if (stat.textContent.includes('.')) {
          targetValue = parseFloat(stat.textContent);
        } else {
          targetValue = parseInt(stat.textContent);
        }
        
        // Start with 0
        stat.textContent = stat.textContent.includes('.') ? '0.' : '0';
        
        // Animate to target
        animateCounter(stat, targetValue);
        
        // Mark as animated
        stat.classList.add('animated');
      }
    });
  }
  
  // Check on scroll and on load
  window.addEventListener('scroll', checkStatsVisibility);
  window.addEventListener('load', checkStatsVisibility);
}

// News card hover effects
function initNewsCardEffects() {
  const newsCards = document.querySelectorAll('.news-card');
  
  newsCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const image = card.querySelector('.news-image img');
      if (image) {
        image.style.transform = 'scale(1.05)';
        image.style.transition = 'transform 0.5s ease';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const image = card.querySelector('.news-image img');
      if (image) {
        image.style.transform = 'scale(1)';
      }
    });
  });
}

// Initialize all homepage functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initPlayersCarousel();
  initHeroAnimations();
  initStatsCounterAnimation();
  initNewsCardEffects();
  
  // Fix for placeholder images - replace with actual content when available
  // For testing only - replace with actual sponsor logos in production
  const sponsors = document.querySelectorAll('.sponsor img');
  sponsors.forEach((sponsor, index) => {
    if (sponsor.getAttribute('src').includes('sponsor')) {
      // Generate placeholder sponsor logos with different colors
      const colors = ['#e61c23', '#1e3a8a', '#ffc107', '#4caf50'];
      const sponsorDiv = sponsor.parentElement;
      sponsorDiv.style.backgroundColor = '#ffffff';
      sponsorDiv.style.display = 'flex';
      sponsorDiv.style.alignItems = 'center';
      sponsorDiv.style.justifyContent = 'center';
      
      const text = document.createElement('div');
      text.style.color = colors[index % colors.length];
      text.style.fontWeight = 'bold';
      text.style.fontSize = '2rem';
      text.style.fontFamily = 'var(--font-heading)';
      text.textContent = `Sponsor ${index + 1}`;
      
      sponsorDiv.innerHTML = '';
      sponsorDiv.appendChild(text);
    }
  });
});