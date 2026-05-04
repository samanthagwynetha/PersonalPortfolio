// Initialize Lucide Icons
lucide.createIcons();

// Reveal Animations (Intersection Observer)
const reveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el, index) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 50) {
            // Apply staggered delay for elements in view
            if (!el.classList.contains('active')) {
                el.style.transitionDelay = `${(index % 4) * 0.1}s`;
                el.classList.add('active');
            }
        }
    });
};
window.addEventListener('scroll', reveal);
reveal(); // Initial call

// Active Nav Highlighting
const sections = document.querySelectorAll('.section-nav');
const navLinks = document.querySelectorAll('.nav-link');

const highlightNav = () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active-nav");
        if (current && link.getAttribute("href") === `#${current}`) {
            link.classList.add("active-nav");
        }
    });
};

window.addEventListener('scroll', highlightNav);
window.addEventListener('load', highlightNav);
highlightNav();

// Mobile Menu Logic
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
closeBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));
mobileLinks.forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Project Filtering Logic
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update Active State UI
        filterButtons.forEach(b => b.classList.remove('active-filter'));
        btn.classList.add('active-filter');

        const grid = document.getElementById('projects-grid');
        if (grid) {
            grid.style.minHeight = `${grid.offsetHeight}px`;
        }

        // 1. First, fade out all items
        projectItems.forEach(item => {
            item.classList.add('filter-hidden');
        });

        // 2. After fade out, update the layout
        setTimeout(() => {
            const filterValue = btn.getAttribute('data-filter');
            let visibleCount = 0;

            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                const matches = (filterValue === 'all' || category === filterValue);

                if (matches) {
                    item.style.display = 'block';
                    // Stagger the fade-in
                    setTimeout(() => {
                        item.classList.remove('filter-hidden');
                    }, visibleCount * 100);
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });

            // 3. Release height lock after the new items have started appearing
            setTimeout(() => {
                if (grid) grid.style.minHeight = '0';
            }, (visibleCount * 100) + 500);

        }, 400); // Wait for initial fade out
    });
});

// Re-initialize Lucide icons for any dynamic elements
lucide.createIcons();
