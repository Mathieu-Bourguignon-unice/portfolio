document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM chargé");
    //test
    // Initialisation d'EmailJS
    emailjs.init("7WXjYPOOprRE52vBT");

    // Initialisation de Typed.js
    const typed = new Typed('#typed-text', {
        strings: [
            "Étudiant en R&T",
            "Passionné de Cybersécurité",
            "Développeur Web",
            "Curieux",
            "Créatif"
        ],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        startDelay: 1500,
        loop: true,
        showCursor: false
    });

    // Animation des éléments
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 500);
    });

    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        
        // Vérification du CAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            formStatus.textContent = "Veuillez vérifier que vous n'êtes pas un robot.";
            formStatus.className = "form-status error";
            return;
        }
        
        try {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            
            const formData = {
                name: contactForm.name.value,
                email: contactForm.email.value,
                message: contactForm.message.value,
                'g-recaptcha-response': recaptchaResponse
            };

            await emailjs.send(
                "service_lizfir9",
                "template_dg4t8hj",
                formData
            );

            formStatus.textContent = "Message envoyé avec succès !";
            formStatus.className = "form-status success";
            contactForm.reset();
            grecaptcha.reset(); // Réinitialiser le CAPTCHA
            
        } catch (error) {
            formStatus.textContent = "Une erreur s'est produite. Veuillez réessayer.";
            formStatus.className = "form-status error";
            console.error('Erreur:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            
            setTimeout(() => {
                formStatus.className = "form-status";
                formStatus.textContent = "";
            }, 5000);
        }
    });

    // Gestion du thème
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Fonction pour basculer le thème
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.style.transition = 'all 0.5s ease-in-out';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 500);
    }
    
    // Initialisation du thème
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemTheme = prefersDarkScheme.matches ? 'dark' : 'light';
        const theme = savedTheme || systemTheme;
        
        document.documentElement.setAttribute('data-theme', theme);
    }
    
    // Écouteurs d'événements
    themeToggle.addEventListener('click', toggleTheme);
    prefersDarkScheme.addListener((e) => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
    
    // Initialisation
    initTheme();

    // Animation d'apparition des éléments
    const elements = document.querySelectorAll('.fade-in, .section-title, .skill-card, .profile-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });

    // Animation séquentielle des éléments de la section hero
    const heroElements = document.querySelectorAll('.hero-content .fade-in');
    heroElements.forEach((element, index) => {
        element.style.transitionDelay = `${index * 0.4}s`;
    });

    // Animation du texte dans la section hero
    const animateTexts = document.querySelectorAll('.animate-text');
    animateTexts.forEach((text, index) => {
        text.style.animationDelay = `${index * 0.3}s`;
    });

    // Animation des cartes de compétences au scroll
    const skillCards = document.querySelectorAll('.skill-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        cardObserver.observe(card);
    });

    // Smooth scroll pour les liens de navigation
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

    // Animation de la navbar au scroll
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.transform = 'translateY(0)';
            navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
            navbar.style.transition = 'transform 0.3s ease-in-out';
        } else {
            navbar.style.transform = 'translateY(0)';
            navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            navbar.style.transition = 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
        }
        
        lastScroll = currentScroll;
    });

    // Création du réseau neuronal
    const neuralNetwork = document.querySelector('.neural-network');
    const points = [];
    const lines = [];
    const numPoints = 30;

    // Création des points
    for (let i = 0; i < numPoints; i++) {
        const point = document.createElement('div');
        point.className = 'neural-point';
        point.style.left = `${Math.random() * 100}%`;
        point.style.top = `${Math.random() * 100}%`;
        neuralNetwork.appendChild(point);
        points.push(point);
    }

    // Animation des points et création des lignes
    function animateNeuralNetwork() {
        points.forEach(point => {
            const currentX = parseFloat(point.style.left);
            const currentY = parseFloat(point.style.top);
            const newX = currentX + (Math.random() - 0.5) * 0.2;
            const newY = currentY + (Math.random() - 0.5) * 0.2;
            
            point.style.left = `${Math.max(0, Math.min(100, newX))}%`;
            point.style.top = `${Math.max(0, Math.min(100, newY))}%`;
            point.style.transition = 'all 0.5s ease-in-out';
        });

        lines.forEach(line => line.remove());
        lines.length = 0;

        points.forEach((point1, i) => {
            points.forEach((point2, j) => {
                if (i < j) {
                    const rect1 = point1.getBoundingClientRect();
                    const rect2 = point2.getBoundingClientRect();
                    
                    const x1 = rect1.left + rect1.width / 2;
                    const y1 = rect1.top + rect1.height / 2;
                    const x2 = rect2.left + rect2.width / 2;
                    const y2 = rect2.top + rect2.height / 2;
                    
                    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                    
                    if (distance < 250) {
                        const line = document.createElement('div');
                        line.className = 'neural-line';
                        line.style.left = `${x1}px`;
                        line.style.top = `${y1}px`;
                        line.style.width = `${distance}px`;
                        line.style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`;
                        line.style.opacity = `${0.2 - distance / 1250}`;
                        line.style.transition = 'all 0.3s ease-in-out';
                        neuralNetwork.appendChild(line);
                        lines.push(line);
                    }
                }
            });
        });

        requestAnimationFrame(animateNeuralNetwork);
    }

    animateNeuralNetwork();

    // Création des cubes 3D
    class SkillCube {
        constructor(container) {
            this.container = container;
            this.cubeElement = container.querySelector('.skill-cube');
            this.skill = container.dataset.skill;
            
            this.init();
            this.animate();
        }

        init() {
            // Création de la scène
            this.scene = new THREE.Scene();
            
            // Création de la caméra
            this.camera = new THREE.PerspectiveCamera(
                75,
                this.cubeElement.clientWidth / this.cubeElement.clientHeight,
                0.1,
                1000
            );
            this.camera.position.z = 5;

            // Création du renderer
            this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            this.renderer.setSize(this.cubeElement.clientWidth, this.cubeElement.clientHeight);
            this.cubeElement.appendChild(this.renderer.domElement);

            // Création du cube
            const geometry = new THREE.BoxGeometry(2, 2, 2);
            const material = new THREE.MeshPhongMaterial({
                color: 0x3498db,
                transparent: true,
                opacity: 0.8,
                shininess: 100
            });
            this.cube = new THREE.Mesh(geometry, material);
            this.scene.add(this.cube);

            // Ajout de la lumière
            const light = new THREE.DirectionalLight(0xffffff, 1);
            light.position.set(1, 1, 1);
            this.scene.add(light);

            const ambientLight = new THREE.AmbientLight(0x404040);
            this.scene.add(ambientLight);

            // Gestion des événements de la souris
            this.mouseX = 0;
            this.mouseY = 0;
            this.targetRotationX = 0;
            this.targetRotationY = 0;

            this.container.addEventListener('mousemove', (e) => {
                const rect = this.container.getBoundingClientRect();
                this.mouseX = (e.clientX - rect.left) / rect.width - 0.5;
                this.mouseY = (e.clientY - rect.top) / rect.height - 0.5;
            });

            this.container.addEventListener('mouseleave', () => {
                this.mouseX = 0;
                this.mouseY = 0;
            });
        }

        animate() {
            requestAnimationFrame(() => this.animate());

            // Animation de rotation
            this.targetRotationX = this.mouseY * 0.5;
            this.targetRotationY = this.mouseX * 0.5;

            this.cube.rotation.x += (this.targetRotationX - this.cube.rotation.x) * 0.1;
            this.cube.rotation.y += (this.targetRotationY - this.cube.rotation.y) * 0.1;

            // Animation de pulsation
            const time = Date.now() * 0.001;
            this.cube.scale.x = 1 + Math.sin(time) * 0.05;
            this.cube.scale.y = 1 + Math.sin(time) * 0.05;
            this.cube.scale.z = 1 + Math.sin(time) * 0.05;

            this.renderer.render(this.scene, this.camera);
        }
    }

    // Initialisation des cubes
    const skillContainers = document.querySelectorAll('.skill-container');
    skillContainers.forEach(container => {
        new SkillCube(container);
    });

    // Animation améliorée des sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const content = entry.target.querySelector('.about-content, .skills-grid, .contact-content');
                if (content) {
                    content.classList.add('visible');
                }
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Animation améliorée du formulaire
    contactForm.addEventListener('focusin', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            e.target.parentElement.classList.add('focused');
        }
    });

    contactForm.addEventListener('focusout', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            e.target.parentElement.classList.remove('focused');
        }
    });

    // Animation de présentation
    const presentationWords = [
        "Étudiant en R&T",
        "Passionné de Cybersécurité",
        "Développeur Web",
        "Curieux",
        "Créatif"
    ];

    const typingText = document.querySelector('.typing-text');
    const typingContainer = document.querySelector('.typing-container');
    
    if (!typingText || !typingContainer) {
        console.error("Éléments d'animation non trouvés");
        return;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWordText = presentationWords[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWordText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentWordText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWordText.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % presentationWords.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Démarrer l'animation après un court délai
    setTimeout(() => {
        typingContainer.style.opacity = '1';
        type();
    }, 1500);
}); 