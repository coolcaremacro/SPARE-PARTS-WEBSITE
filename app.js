document.addEventListener('DOMContentLoaded', () => {
    // Sticky Navbar
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle (Placeholder)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if(mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            alert('Mobile menu clicked! In a full deployment, this would open a sidebar overlay.'); 
        });
    }

    // Contact Form Logic
    const contactForm = document.querySelector('.contact-form');
    
    // Email Simulation Prevent Default
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('This would send an email. For an exact replica, you would connect this form to an email service in production. Try the WhatsApp button!');
        });
    }

    // Dynamic Product Vehicle Accordions
    const vehicles = [
        "SUZUKI ALTO800", "SUZUKI ALTO LXI", "SUZUKI K10", "SUZUKI CELERIO",
        "SUZUKI ASTAR", "SUZUKI SWIFT", "SUZUKI BALENO", "TATA NANO", 
        "HYUNDAI EON", "KWID"
    ];

    document.querySelectorAll('.product-info').forEach(info => {
        const titleElement = info.querySelector('h3');
        if(!titleElement) return;
        
        const title = titleElement.innerText; // e.g. "A/C Compressors"
        let singular = title.replace(/s$/, '').replace(/ies$/, 'y');
        if(title === "Pulley Sets") singular = "Pulley Set";
        if(title === "Evaporator Coils") singular = "Evaporator Coil";
        
        // Create Toggle Button
        const toggleBtn = document.createElement('button');
        toggleBtn.type = "button";
        toggleBtn.className = "btn btn-primary toggle-btn";
        toggleBtn.style.cssText = "margin-top: 16px; width: 100%; font-size: 0.9rem; justify-content: center;";
        toggleBtn.innerHTML = `View All ${title} <i class="ph-bold ph-caret-down" style="margin-left: 8px;"></i>`;
        
        // Create Tags Container
        const tagsDiv = document.createElement('div');
        tagsDiv.className = "vehicle-tags";
        tagsDiv.style.display = "none";
        
        // Add specific vehicle buttons
        vehicles.forEach(v => {
            const a = document.createElement('a');
            a.href = "#contact";
            a.className = "vehicle-btn";
            a.innerText = v;
            
            a.addEventListener('click', (e) => {
                if (contactForm) {
                    const textarea = contactForm.querySelector('textarea');
                    textarea.value = `I am interested in ordering a ${singular} for: ${v}\n\nPlease provide pricing and availability.`;
                    const selectMenu = contactForm.querySelector('select');
                    if(selectMenu) selectMenu.value = 'Retail Purchase';
                }
            });
            tagsDiv.appendChild(a);
        });

        // Toggle Logic
        toggleBtn.addEventListener('click', () => {
            if (tagsDiv.style.display === 'none') {
                tagsDiv.style.display = 'flex';
                toggleBtn.innerHTML = `Hide ${title} <i class="ph-bold ph-caret-up" style="margin-left: 8px;"></i>`;
            } else {
                tagsDiv.style.display = 'none';
                toggleBtn.innerHTML = `View All ${title} <i class="ph-bold ph-caret-down" style="margin-left: 8px;"></i>`;
            }
        });

        info.appendChild(toggleBtn);
        info.appendChild(tagsDiv);
    });

    // WhatsApp Message Integration
    const waBtn = document.getElementById('wa-btn');
    if (waBtn && contactForm) {
        waBtn.addEventListener('click', () => {
            const type = contactForm.querySelector('select').value;
            const name = contactForm.querySelectorAll('input')[0].value || 'Customer';
            const email = contactForm.querySelectorAll('input')[1].value || 'Not provided';
            const message = contactForm.querySelector('textarea').value || 'I am interested in placing an order.';
            
            let rawMsg = `Hello Macro Cool Care!\n\n*Inquiry Type:* ${type}\n*Name:* ${name}\n*Email:* ${email}\n\n*Message:*\n${message}`;
            
            // Format for WhatsApp URL Protocol
            let waUrl = `https://wa.me/94761146161?text=${encodeURIComponent(rawMsg)}`;
            
            // Open WhatsApp
            window.open(waUrl, '_blank');
        });
    }
});
