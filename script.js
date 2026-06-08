document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. STICKY HEADER SCROLL EFFECT
    // ==========================================
    const header = document.getElementById('main-header');
    
    const checkScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run once at load in case page is refreshed while scrolled down

    // ==========================================
    // 2. MOBILE DRAWER NAVIGATION
    // ==========================================
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const closeDrawerBtn = document.getElementById('close-drawer');
    const drawerLinks = document.querySelectorAll('.drawer-link');
    const body = document.body;

    const openDrawer = () => {
        mobileDrawer.classList.add('active');
        body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeDrawer = () => {
        mobileDrawer.classList.remove('active');
        body.style.overflow = ''; // Restore scrolling
    };

    mobileToggle.addEventListener('click', openDrawer);
    closeDrawerBtn.addEventListener('click', closeDrawer);

    // Close drawer when clicking a link
    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // Close drawer when clicking outside content (on the overlay area if clicked)
    document.addEventListener('click', (e) => {
        if (mobileDrawer.classList.contains('active') && 
            !mobileDrawer.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            closeDrawer();
        }
    });

    // ==========================================
    // 3. FAQ ACCORDION INTERACTION
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other FAQ items first for accordion behavior
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherAnswer.setAttribute('hidden', '');
                }
            });

            // Toggle active state for current item
            if (isActive) {
                item.classList.remove('active');
                questionBtn.setAttribute('aria-expanded', 'false');
                answer.setAttribute('hidden', '');
            } else {
                item.classList.add('active');
                questionBtn.setAttribute('aria-expanded', 'true');
                answer.removeAttribute('hidden');
            }
        });
    });

    // ==========================================
    // 4. SMOOTH SCROLL FOR IN-PAGE LINKS
    // ==========================================
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Get header height to offset scrolling (sticky header offset)
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
