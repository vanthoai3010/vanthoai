// Portfolio Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Add animated background to body
  const animatedBg = document.createElement('div');
  animatedBg.className = 'animated-bg';
  document.body.prepend(animatedBg);
  
  // Navigation active state
  const navLinks = document.querySelectorAll('.sidebar-nav a');
  const sections = document.querySelectorAll('section');
  
  // Add smooth reveal animation to sections
  const addSmoothReveal = () => {
    sections.forEach((section, index) => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      section.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Use Intersection Observer for smooth reveal
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
      revealObserver.observe(section);
    });
  };
  
  // Mobile menu toggle
  const createMobileMenu = () => {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    // Create mobile toggle button
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'neon-toggle mobile-toggle';
    mobileToggle.innerHTML = '<i class="ri-menu-line"></i>';
    mobileToggle.style.position = 'fixed';
    mobileToggle.style.top = '20px';
    mobileToggle.style.left = '20px';
    mobileToggle.style.zIndex = '1000';
    mobileToggle.style.display = 'none';
    
    document.body.appendChild(mobileToggle);
    
    // Show/hide mobile toggle based on screen size
    const updateMobileMenu = () => {
      if (window.innerWidth <= 768) {
        mobileToggle.style.display = 'flex';
        sidebar.classList.add('mobile');
      } else {
        mobileToggle.style.display = 'none';
        sidebar.classList.remove('mobile');
        sidebar.style.transform = '';
      }
    };
    
    // Toggle sidebar on mobile
    mobileToggle.addEventListener('click', () => {
      if (sidebar.style.transform === 'translateX(0px)') {
        sidebar.style.transform = 'translateX(-100%)';
      } else {
        sidebar.style.transform = 'translateX(0)';
      }
    });
    
    // Close sidebar when clicking on a link (mobile)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          sidebar.style.transform = 'translateX(-100%)';
        }
      });
    });
    
    // Initialize and add resize listener
    updateMobileMenu();
    window.addEventListener('resize', updateMobileMenu);
  };
  
  // Scroll spy for navigation
  const scrollSpy = () => {
    const scrollPosition = window.scrollY;
    
    // Determine which section is in view
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all links
        navLinks.forEach(link => {
          link.parentElement.classList.remove('active');
        });
        
        // Add active class to current section link
        const activeLink = document.querySelector(`.sidebar-nav a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.parentElement.classList.add('active');
        }
      }
    });
  };
  
  // Smooth scroll for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 50,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add scroll event listener for scroll spy
  window.addEventListener('scroll', scrollSpy);
  
  // Initialize scroll spy on page load
  scrollSpy();
  
  // Initialize mobile menu
  createMobileMenu();
  
  // Project card hover effects with improved smoothness
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    // Add initial transition for smoother animation
    card.style.transition = 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)';
    
    card.addEventListener('mouseenter', function() {
      this.classList.add('glow');
    });
    
    card.addEventListener('mouseleave', function() {
      this.classList.remove('glow');
    });
  });
  
  // Form submission handling
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const name = this.querySelector('#name').value;
      const email = this.querySelector('#email').value;
      const message = this.querySelector('#message').value;
      
      // Simple validation
      if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
      }
      
      // Simulate form submission
      showNotification('Message sent successfully!', 'success');
      
      // Reset form
      this.reset();
    });
  }
  
  // Notification system
  function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.notification');
    if (!notification) {
      notification = document.createElement('div');
      notification.className = 'notification';
      document.body.appendChild(notification);
      
      // Style the notification
      Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '8px',
        color: '#fff',
        zIndex: '1000',
        opacity: '0',
        transform: 'translateY(20px)',
        transition: 'all 0.3s ease'
      });
    }
    
    // Set notification type
    if (type === 'success') {
      notification.style.background = 'linear-gradient(to right, rgba(59, 130, 246, 0.9), rgba(16, 185, 129, 0.9))';
      notification.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.5)';
    } else if (type === 'error') {
      notification.style.background = 'linear-gradient(to right, rgba(239, 68, 68, 0.9), rgba(236, 72, 153, 0.9))';
      notification.style.boxShadow = '0 0 15px rgba(236, 72, 153, 0.5)';
    } else {
      notification.style.background = 'linear-gradient(to right, rgba(59, 130, 246, 0.9), rgba(139, 92, 246, 0.9))';
      notification.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.5)';
    }
    
    // Set message
    notification.textContent = message;
    
    // Show notification
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(20px)';
    }, 3000);
  }
  
  // Add parallax effect to hero section with improved smoothness
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    // Add initial background properties for parallax
    heroSection.style.backgroundSize = 'cover';
    heroSection.style.backgroundPosition = 'center';
    heroSection.style.backgroundAttachment = 'fixed';
    
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < window.innerHeight) {
        const translateY = scrollPosition * 0.3;
        heroSection.style.backgroundPositionY = `-${translateY}px`;
      }
    });
  }
  
  // Add typing effect to job title with improved smoothness
  const jobTitle = document.querySelector('.job-title');
  if (jobTitle) {
    const text = jobTitle.textContent;
    jobTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
      if (i < text.length) {
        jobTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80); // Slightly faster for better smoothness
      }
    }
    
    // Start typing effect
    setTimeout(typeWriter, 800);
  }
  
  // Add skill animation with improved smoothness
  const skills = document.querySelectorAll('.skill');
  skills.forEach((skill, index) => {
    skill.style.animationDelay = `${index * 0.1}s`;
    skill.style.opacity = '0';
    skill.style.transform = 'translateY(10px)';
    skill.style.transition = 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)'; // Improved easing
  });
  
  // Animate skills when they come into view
  const skillsContainer = document.querySelector('.skills-container');
  if (skillsContainer) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        skills.forEach((skill, index) => {
          setTimeout(() => {
            skill.style.opacity = '1';
            skill.style.transform = 'translateY(0)';
          }, index * 80); // Slightly faster for better smoothness
        });
      }
    }, { threshold: 0.3 }); // Lower threshold for earlier animation
    
    observer.observe(skillsContainer);
  }
  
  // Simple Back to Top button
  const createScrollTopButton = () => {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="ri-arrow-up-line"></i>';
    
    // Style the button with simple appearance
    Object.assign(scrollTopBtn.style, {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: '0',
      transition: 'all 0.3s ease',
      zIndex: '99',
      cursor: 'pointer',
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
      color: '#ffffff',
      fontSize: '20px'
    });
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
      } else {
        scrollTopBtn.style.opacity = '0';
      }
    });
    
    // Scroll to top when clicked
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };
  
  // Add smooth page transitions
  const addPageTransitions = () => {
    // Add transition styles
    const transitionStyles = document.createElement('style');
    transitionStyles.textContent = `
      .page-transition {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(10, 10, 10, 0.9), rgba(17, 17, 17, 0.9));
        z-index: 9999;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
      }
    `;
    document.head.appendChild(transitionStyles);
    
    // Create transition element
    const transitionElement = document.createElement('div');
    transitionElement.className = 'page-transition';
    document.body.appendChild(transitionElement);
    
    // Show transition on page load
    transitionElement.style.opacity = '1';
    
    // Hide transition after page loads
    setTimeout(() => {
      transitionElement.style.opacity = '0';
      
      // Remove transition element after animation completes
      setTimeout(() => {
        transitionElement.remove();
      }, 600);
    }, 300);
  };
  
  // Initialize all features
  addPageTransitions();
  addSmoothReveal();
  createScrollTopButton();
  createFallingSnow(); // Initialize falling snow

  // Function to create falling snow
  function createFallingSnow() {
    const snowCount = 50; // Number of snowflakes
    const container = document.querySelector('.portfolio-container');
    
    // Create snowflakes
    for (let i = 0; i < snowCount; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      
      // Randomize snowflake properties
      const size = Math.random() * 5 + 3; // Random size between 3-8px
      const startPositionX = Math.random() * 100; // Random start position
      const startOpacity = Math.random() * 0.3 + 0.7; // Random opacity
      const duration = Math.random() * 5 + 5; // Random duration between 5-10s
      
      // Set snowflake styles
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      snowflake.style.left = `${startPositionX}%`;
      snowflake.style.opacity = startOpacity;
      snowflake.style.animationDuration = `${duration}s`;
      snowflake.style.animationDelay = `${Math.random() * 5}s`;
      
      // Add snowflake to container
      if (container) {
        container.appendChild(snowflake);
      } else {
        document.body.appendChild(snowflake);
      }
    }
  }
}); 