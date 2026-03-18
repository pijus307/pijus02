/* COMPLETE PEFORMANCE & UX ENGINE */
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById("progress-bar");
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    // 1. SCROLL PROGRESS & NAVBAR BACKGROUND
    window.addEventListener('scroll', () => {
        // Update Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = scrolled + "%";

        // Update Navbar on Scroll
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // 2. MOBILE MENU TOGGLE
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('ph-list')) {
                icon.classList.replace('ph-list', 'ph-x');
            } else {
                icon.classList.replace('ph-x', 'ph-list');
            }
        });
    }

    // 3. SMART 3D MODEL LOADING (Preventing Lag)
    const splineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const container = entry.target;
            const url = container.getAttribute('data-spline');
            
            if (entry.isIntersecting) {
                // If in view, load the model
                if (!container.querySelector('iframe')) {
                    const iframe = document.createElement('iframe');
                    iframe.src = url;
                    iframe.frameBorder = "0";
                    iframe.title = "3D Asset";
                    iframe.style.width = "100%";
                    iframe.style.height = "100%";
                    container.innerHTML = ''; 
                    container.appendChild(iframe);
                }
            } else {
                // If out of view, remove it to save memory/lag
                container.innerHTML = '<div class="spline-loading"></div>';
            }
        });
    }, { root: null, margin: '600px', threshold: 0 });

    document.querySelectorAll('.spline-container').forEach(el => splineObserver.observe(el));
});
