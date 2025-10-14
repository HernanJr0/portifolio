const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

function scrollHeader() {
    const nav = document.getElementById('header');
    if (this.scrollY >= 80) nav.classList.add('scroll-header');
    else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active');
        }
    });
}
window.addEventListener('scroll', scrollActive);

const professions = [
    "Desenvolvedor Full-Stack",
    "Desenvolvedor Front-end",
    "Desenvolvedor Back-end",
    "Técnico em Informática"
];

let currentProfession = 0;
let currentChar = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenWords = 2000;

function typeWriter() {
    const typingText = document.querySelector('.typing-text');
    const current = professions[currentProfession];

    if (isDeleting) {
        typingText.textContent = current.substring(0, currentChar - 1);
        currentChar--;
    } else {
        typingText.textContent = current.substring(0, currentChar + 1);
        currentChar++;
    }

    let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && currentChar === current.length) {
        typeSpeed = delayBetweenWords;
        isDeleting = true;
    } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentProfession = (currentProfession + 1) % professions.length;
    }

    setTimeout(typeWriter, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
});

const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skills')) {
                const skillBars = entry.target.querySelectorAll('.skills__percentage');
                skillBars.forEach(bar => {
                    const percentage = bar.dataset.percentage;
                    setTimeout(() => {
                        bar.style.width = percentage + '%';
                    }, 200);
                });
            }
            
            if (entry.target.classList.contains('education')) {
                const languageBars = entry.target.querySelectorAll('.language__bar');
                languageBars.forEach(bar => {
                    const level = bar.dataset.level;
                    setTimeout(() => {
                        bar.style.width = level + '%';
                    }, 200);
                });
            }
            
            if (entry.target.classList.contains('experience')) {
                const timelineItems = entry.target.querySelectorAll('.timeline__item');
                timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 200);
                });
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.skills, .education, .experience').forEach(section => {
    observer.observe(section);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline__item');
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.6s ease';
    });
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const homeImg = document.querySelector('.home__img-blob');
    
    if (homeImg) {
        homeImg.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

document.querySelectorAll('.about__box, .contact__card, .skills__content, .education__content').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

function addRippleEffect(element) {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

document.querySelectorAll('.btn, .contact__button').forEach(addRippleEffect);

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.about__subtitle');
            counters.forEach(counter => {
                const text = counter.textContent;
                if (text.includes('1+')) {
                    counter.textContent = '0+';
                    animateCounter(counter, 1);
                } else if (text.includes('10+')) {
                    counter.textContent = '0+';
                    animateCounter(counter, 10);
                }
            });
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelector('.about').addEventListener('DOMContentLoaded', () => {
    aboutObserver.observe(document.querySelector('.about'));
});

document.querySelectorAll('.home__social-link').forEach((link, index) => {
    link.style.animationDelay = `${index * 0.2}s`;
    link.classList.add('floating');
});

const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
    .floating {
        animation: float 3s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(floatingStyle);

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--body-color);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.5s ease;
    }
    
    .loading-spinner {
        width: 50px;
        height: 50px;
        border: 3px solid var(--first-color-lighter);
        border-top: 3px solid var(--first-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .loaded .loading-screen {
        opacity: 0;
        pointer-events: none;
    }
`;
document.head.appendChild(loadingStyle);
