// Initialize Lucide icons
lucide.createIcons();

// ==============================
// Particles
// ==============================
function createParticles() {
  const container = document.getElementById('particles');
  const colors = ['#FF6B2B', '#00D4FF', '#A855F7', '#EC4899'];
  
  for (let i = 0; i < 40; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 3 + 1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 10 + 8;
    const delay = Math.random() * 10;
    const drift = (Math.random() - 0.5) * 200;

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${left}%;
      bottom: -10px;
      --drift: ${drift}px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      box-shadow: 0 0 ${size * 3}px ${color};
    `;
    container.appendChild(particle);
  }
}
createParticles();

// ==============================
// Scroll Animations
// ==============================
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => {
  observer.observe(el);
});

// ==============================
// Navbar scroll effect
// ==============================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 80) {
    navbar.classList.add('nav-blur', 'bg-dark-900/80', 'border-b', 'border-dark-500/50');
  } else {
    navbar.classList.remove('nav-blur', 'bg-dark-900/80', 'border-b', 'border-dark-500/50');
  }
  
  lastScroll = currentScroll;
});

// ==============================
// Mobile menu
// ==============================
const burgerBtn = document.getElementById('burger-btn');
const closeMenu = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

burgerBtn.addEventListener('click', () => {
  mobileMenu.classList.add('open');
});

closeMenu.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// ==============================
// Filter projects
// ==============================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active state
    filterBtns.forEach(b => {
      b.classList.remove('active');
      b.style.background = '';
      b.style.color = '';
    });
    btn.classList.add('active');
    
    const filter = btn.dataset.filter;
    
    projectCards.forEach(card => {
      const category = card.dataset.category;
      
      if (filter === 'all' || category === filter) {
        card.style.display = '';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.transition = 'all 0.4s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.transition = 'all 0.3s ease';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Style filter buttons
function styleFilterBtns() {
  filterBtns.forEach(btn => {
    if (btn.classList.contains('active')) {
      btn.style.background = 'linear-gradient(135deg, #FF6B2B, #A855F7)';
      btn.style.color = '#fff';
    } else {
      btn.style.background = 'rgba(34, 34, 58, 0.5)';
      btn.style.color = '#9CA3AF';
    }
  });
}

styleFilterBtns();
filterBtns.forEach(btn => btn.addEventListener('click', styleFilterBtns));

// ==============================
// Counter animation
// ==============================
const statValues = document.querySelectorAll('.stat-value[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.count);
      let current = 0;
      const increment = target / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        entry.target.textContent = Math.floor(current);
      }, 16);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statValues.forEach(el => counterObserver.observe(el));

// ==============================
// Contact form
// ==============================
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Show toast
  toast.classList.add('show');
  
  // Reset form
  contactForm.reset();
  
  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
});

// ==============================
// Smooth scroll for anchor links
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ==============================
// Parallax effect on hero
// ==============================
window.addEventListener('scroll', () => {
  const hero = document.getElementById('hero');
  const scrolled = window.pageYOffset;
  if (hero) {
    const content = hero.querySelector('.relative.z-10');
    if (content) {
      content.style.transform = `translateY(${scrolled * 0.3}px)`;
      content.style.opacity = 1 - (scrolled / 800);
    }
  }
});

// ==============================
// Mouse follow glow on hero
// ==============================
const hero = document.getElementById('hero');
if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    hero.style.setProperty('--mouse-x', `${x}px`);
    hero.style.setProperty('--mouse-y', `${y}px`);
  });
}

console.log('🦊 CoreFox-team website loaded!');