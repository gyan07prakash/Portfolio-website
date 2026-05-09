/* ===== ACTIVE NAV ON SCROLL ===== */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    // Map hero section to the About nav link
    if (current === 'hero') current = 'about';

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


/* ===== SCROLL FADE-IN ANIMATIONS ===== */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(
    '.project-card, .edu-item, .social-card, .about-left, .about-right, .skill-group, .resume-download-card'
).forEach(el => observer.observe(el));


/* ===== TYPEWRITER EFFECT ===== */
const phrases = [
    'Developer · Data Analyst · ML Enthusiast',
    'Building things for the web.',
    'Turning data into visual stories.',
    'Always learning, always building.',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typeEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 70;

    if (!isDeleting && charIndex === currentPhrase.length) {
        speed = 2000; // pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 400; // pause before next phrase
    }

    setTimeout(type, speed);
}

type();
