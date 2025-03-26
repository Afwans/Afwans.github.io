// Toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// Scroll sections with debounce
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let header = document.querySelector('header');
let footer = document.querySelector('footer');

let scrollHandler = () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // Active navbar links
            navLinks.forEach(link => link.classList.remove('active'));
            let activeLink = document.querySelector(`header nav a[href*='${id}']`);
            if (activeLink) activeLink.classList.add('active');

            // One-time animation trigger
            if (!sec.classList.contains('animated')) {
                sec.classList.add('show-animate', 'animated'); // Add 'animated' to prevent re-trigger
            }
        }
    });

    // Sticky navbar
    header.classList.toggle('sticky', top > 100);

    // Remove toggle icon and navbar when clicking navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // Footer animation check (One-Time)
    let isFooterVisible = window.innerHeight + top >= document.documentElement.scrollHeight;
    if (isFooterVisible && !footer.classList.contains('animated')) {
        footer.classList.add('show-animate', 'animated');
    }
};

// Debounce function to optimize scrolling performance
let debounce = (func, delay) => {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(func, delay);
    };
};

window.addEventListener('scroll', debounce(scrollHandler, 100));
