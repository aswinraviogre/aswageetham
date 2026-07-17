/* scripts/main.js */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const waxSeal = document.getElementById('waxSeal');
  const envelope = document.getElementById('envelope');
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const weddingCard = document.getElementById('weddingCard');
  const bgMusic = document.getElementById('bgMusic');
  const musicPlayBtn = document.querySelector('.music-toggle-btn');
  const musicIcon = document.getElementById('musicIcon');

  // Configuration
  const targetDateStr = '2026-08-20T12:15:00+05:30'; // Muhurtham Date in IST (UTC+05:30)
  
  // 1. Envelope Opening Interaction Sequence
  let isEnvelopeOpened = false;

  const openEnvelope = () => {
    if (isEnvelopeOpened) return;
    isEnvelopeOpened = true;

    // Phase 1: Open the top flap and play music
    envelope.classList.add('is-open');
    startMusic();

    // Phase 2: After the card preview slides up, fade out envelope and show main wedding card
    setTimeout(() => {
      envelopeWrapper.classList.add('is-hidden');
      weddingCard.classList.add('is-visible');
      
      // Unlock page scroll
      document.body.classList.remove('is-locked');
      
      // Start the romantic falling petals effect
      startPetalRain();
    }, 1300); // 1.3 seconds aligns with the card sliding up animation
  };

  // Click seal or envelope to open
  if (waxSeal) waxSeal.addEventListener('click', openEnvelope);
  if (envelope) envelope.addEventListener('click', (e) => {
    // Prevent double triggering if clicked seal directly
    if (e.target.closest('#waxSeal')) return;
    openEnvelope();
  });

  // 2. Background Music Controller
  let isMusicPlaying = false;
  bgMusic.volume = 0.4; // Soft background volume

  const startMusic = () => {
    if (isMusicPlaying) return;
    bgMusic.play()
      .then(() => {
        isMusicPlaying = true;
        musicIcon.className = 'fas fa-volume-up';
        musicPlayBtn.classList.add('playing');
      })
      .catch((error) => {
        console.log('Audio autoplay prevented by browser permissions. Waiting for click.');
      });
  };

  const toggleMusic = () => {
    if (isMusicPlaying) {
      bgMusic.pause();
      isMusicPlaying = false;
      musicIcon.className = 'fas fa-volume-mute';
      musicPlayBtn.classList.remove('playing');
    } else {
      bgMusic.play();
      isMusicPlaying = true;
      musicIcon.className = 'fas fa-volume-up';
      musicPlayBtn.classList.add('playing');
    }
  };

  if (musicPlayBtn) {
    musicPlayBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Avoid triggering envelope click
      toggleMusic();
    });
  }

  // 3. Dynamic Countdown Timer to Muhurtham (August 20, 2026, 12:15 PM IST)
  const targetDate = new Date(targetDateStr).getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      // If wedding has passed/commenced
      document.getElementById('days').innerText = '00';
      document.getElementById('hours').innerText = '00';
      document.getElementById('minutes').innerText = '00';
      document.getElementById('seconds').innerText = '00';
      
      const countdownTitle = document.querySelector('#countdown .section-title');
      if (countdownTitle) {
        countdownTitle.innerText = 'The Wedding Celebrations Have Commenced!';
      }
      return;
    }

    // Time calculations
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Update UI elements with leading zeros
    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
  };

  // Run countdown immediately and update every second
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 4. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Stop observing once it's revealed
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Offset trigger point slightly from bottom edge
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 5. Falling Petals Generator (Rose and Jasmine Flowers)
  const petalsContainer = document.getElementById('petalsContainer');
  const petalTypes = ['rose', 'jasmine'];

  const createPetal = () => {
    if (!petalsContainer) return;
    
    const petal = document.createElement('div');
    const type = petalTypes[Math.floor(Math.random() * petalTypes.length)];
    petal.classList.add('petal', type);

    // Randomize properties
    const size = Math.random() * 12 + 10; // size between 10px and 22px
    const left = Math.random() * 100; // start position across width
    const duration = Math.random() * 6 + 6; // slow glide, between 6s and 12s
    const delay = Math.random() * 4; // stagger delays

    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.left = `${left}%`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;
    
    // Random initial rotation
    petal.style.transform = `rotate(${Math.random() * 360}deg)`;

    petalsContainer.appendChild(petal);

    // Clean up DOM after animation ends
    setTimeout(() => {
      petal.remove();
    }, (duration + delay) * 1000);
  };

  const startPetalRain = () => {
    // Generate initial batch of petals
    for (let i = 0; i < 15; i++) {
      createPetal();
    }
    // Continuous generation
    setInterval(createPetal, 450);
  };

  // Expose startPetalRain to global scope or local envelope trigger
  window.startPetalRain = startPetalRain;

  // 6. Parallax Scrolling Effect for Traditional Kerala Artwork
  const sideArtImg = document.querySelector('.side-art-img');
  const scrollContainer = document.querySelector('.card-content-scroll');

  const handleParallax = (scrollTop) => {
    if (!sideArtImg) return;
    // Calculate translate offset (speed factor 0.15)
    const speed = 0.15;
    const yOffset = scrollTop * speed;
    sideArtImg.style.transform = `scale(1.05) translateY(${yOffset}px)`;
  };

  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', () => {
      handleParallax(scrollContainer.scrollTop);
    });
  }
  
  window.addEventListener('scroll', () => {
    // Falls back to window scroll on mobile/tablet
    if (window.innerWidth <= 992) {
      handleParallax(window.scrollY);
    }
  });

  // 7. Dynamic WhatsApp Share Trigger
  const shareWhatsappBtn = document.getElementById('shareWhatsappBtn');
  if (shareWhatsappBtn) {
    shareWhatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const shareMessage = `Together with our families, we cordially invite you to celebrate our special day on Thursday, August 20, 2026. View our interactive wedding invitation card here: ${window.location.href}`;
      
      // WhatsApp Send API URL
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
      
      // Open in a new tab/window
      window.open(whatsappUrl, '_blank');
    });
  }
});
