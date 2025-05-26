// JavaScript specific to the fixtures page

// DOM Elements
const navButtons = document.querySelectorAll('.nav-btn');
const matchCards = document.querySelectorAll('.match-card');
const statsCards = document.querySelectorAll('.stat-card');

// Initialize navigation functionality
function initNavigation() {
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      navButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get filter value
      const filter = button.getAttribute('data-filter');
      
      // Filter matches
      filterMatches(filter);
    });
  });
}

// Filter matches based on selected filter
function filterMatches(filter) {
  matchCards.forEach(card => {
    if (filter === 'all') {
      // Show all matches with animation
      showMatchCard(card);
    } else if (card.classList.contains(filter)) {
      // Show matches that match the filter
      showMatchCard(card);
    } else {
      // Hide matches that don't match
      hideMatchCard(card);
    }
  });
}

// Show match card with animation
function showMatchCard(card) {
  card.style.display = 'block';
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  }, 10);
}

// Hide match card
function hideMatchCard(card) {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    card.style.display = 'none';
  }, 400);
}


function initMatchCards() {
  matchCards.forEach((card, index) => {

    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }, 100 * index);
  });
}


/*function initVideoPlayer() {
  const summaryButtons = document.querySelectorAll('.secondary-btn');
  
  summaryButtons.forEach(button => {
    if (button.textContent === 'Maç Özeti') {
      button.addEventListener('click', () => {

        const modal = document.createElement('div');
        modal.className = 'video-modal';
        
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container';
        
        const video = document.createElement('video');
        video.className = 'plyr__video-embed';
        video.controls = true;
        
        const source = document.createElement('source');
        source.src = 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4';
        source.type = 'video/mp4';
        
        video.appendChild(source);
        videoContainer.appendChild(video);
        modal.appendChild(videoContainer);
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'modal-close';
        closeBtn.innerHTML = '&times;';
        modal.appendChild(closeBtn);
        
        document.body.appendChild(modal);
        
        const player = new Plyr(video);
        
        setTimeout(() => {
          modal.classList.add('show');
        }, 10);
        
        closeBtn.addEventListener('click', () => {
          modal.classList.remove('show');
          setTimeout(() => {
            player.destroy();
            modal.remove();
          }, 300);
        });
        
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            closeBtn.click();
          }
        });
      });
    }
  });
}
*/
function initStatsCards() {
  statsCards.forEach(card => {
    const statValue = card.querySelector('.stat-value');
    const targetValue = parseInt(statValue.textContent);
    
    statValue.textContent = '0';
    
    let currentValue = 0;
    const duration = 2000; 
    const increment = targetValue / (duration / 16); 
    
    function updateCounter() {
      currentValue += increment;
      if (currentValue >= targetValue) {
        statValue.textContent = targetValue;
        return;
      }
      
      statValue.textContent = Math.floor(currentValue);
      requestAnimationFrame(updateCounter);
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(card);
  });
}

function initHeroParallax() {
  const heroSection = document.querySelector('.fixtures-hero');
  
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const heroHeight = heroSection.offsetHeight;
      
      if (scrollPosition < heroHeight) {
        heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        
        const opacity = 1 - (scrollPosition / heroHeight);
        heroSection.querySelector('.fixtures-hero-content').style.opacity = Math.max(opacity, 0);
        heroSection.querySelector('.fixtures-hero-content').style.transform = `translateY(${scrollPosition * 0.3}px)`;
      }
    });
  }
}

function initReminders() {
  const reminderButtons = document.querySelectorAll('.outline-btn');
  
  reminderButtons.forEach(button => {
    if (button.textContent === 'Hatırlatıcı Kur') {
      button.addEventListener('click', () => {
        const isSet = button.classList.contains('active');
        
        if (!isSet) {
          button.classList.add('active');
          button.style.backgroundColor = 'var(--success)';
          button.style.borderColor = 'var(--success)';
          button.style.color = 'var(--white)';
          button.textContent = 'Hatırlatıcı Kuruldu';
          
          showToast('Maç hatırlatıcısı başarıyla kuruldu!', 'success');
        } else {
          button.classList.remove('active');
          button.style.backgroundColor = '';
          button.style.borderColor = '';
          button.style.color = '';
          button.textContent = 'Hatırlatıcı Kur';
          
          showToast('Maç hatırlatıcısı kaldırıldı.', 'info');
        }
      });
    }
  });
}

function initTicketPurchase() {
  const ticketButtons = document.querySelectorAll('.primary-btn');
  
  ticketButtons.forEach(button => {
    if (button.textContent === 'Bilet Al') {
      button.addEventListener('click', () => {
        button.textContent = 'İşleniyor...';
        button.disabled = true;
        
        setTimeout(() => {
          button.textContent = 'Bilet Al';
          button.disabled = false;
          showToast('Maçları oynadığımız halısaya gelerek bedava bir şekilde izleyip destekleyebilirsiniz.', 'info');
        }, 1500);
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initMatchCards();
  initStatsCards();
  initHeroParallax();
  initReminders();
  initTicketPurchase();
  initVideoPlayer();
  
  // Handle missing team logos
  const teamLogos = document.querySelectorAll('.team img');
  teamLogos.forEach(logo => {
    logo.onerror = function() {
      // Create canvas element for placeholder logo
      const canvas = document.createElement('canvas');
      canvas.width = 80;
      canvas.height = 80;
      const ctx = canvas.getContext('2d');
      
      // Draw a circular background
      ctx.beginPath();
      ctx.arc(40, 40, 35, 0, 2 * Math.PI);
      ctx.fillStyle = '#e61c23';
      ctx.fill();
      
      // Draw border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Add text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('TAKIM', 40, 40);
      
      // Replace the broken image with our canvas
      this.src = canvas.toDataURL();
    };
  });
});
