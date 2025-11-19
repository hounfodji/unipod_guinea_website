/*
 * Unipod Guinée - script.js
 * Auteur: Gemini AI for Epitech Open Days
 * Version: 1.0
 * Description: Script pour l'interactivité du site Unipod Guinée.
 */

// Encapsulation pour éviter de polluer l'espace de noms global
(function() {
    "use strict";

    /**
     * Attend que le DOM soit entièrement chargé avant d'exécuter les scripts.
     */
    document.addEventListener('DOMContentLoaded', function() {
        
        // Initialisation de tous les modules interactifs
        initMobileMenu();
        initHeaderScroll();
        initSmoothScrolling();
        initIntersectionObserver();
        initTabs();
        initProjectFilter();
        initFormValidation();
        updateCurrentYear();

    });

    /**
     * Gère l'ouverture et la fermeture du menu de navigation mobile.
     */
    function initMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        const navLinks = document.querySelectorAll('.nav-links a');

        if (!menuToggle || !mainNav) return;

        menuToggle.addEventListener('click', function() {
            const isOpen = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isOpen);
            this.classList.toggle('is-active');
            mainNav.classList.toggle('is-open');
            document.body.classList.toggle('no-scroll');
        });
        
        // Ferme le menu quand un lien est cliqué
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('is-open')) {
                    menuToggle.click();
                }
            });
        });
    }

    /**
     * Ajoute une classe 'scrolled' au header lors du défilement de la page.
     */
    function initHeaderScroll() {
        const header = document.getElementById('main-header');
        if (!header) return;

        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    /**
     * Gère le défilement fluide vers les ancres de la page.
     */
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Utilise IntersectionObserver pour les animations au défilement et le lazy loading.
     */
    function initIntersectionObserver() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        const statNumbers = document.querySelectorAll('.stat-number');
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Gère les animations générales
                    if (entry.target.classList.contains('animate-on-scroll')) {
                        entry.target.classList.add('is-visible');
                    }
                    
                    // Gère l'animation des compteurs
                    if (entry.target.classList.contains('stat-number')) {
                        animateCounter(entry.target);
                    }

                    // Gère le lazy loading (bien que le navigateur le fasse nativement)
                    if (entry.target.tagName === 'IMG' && entry.target.dataset.src) {
                        entry.target.src = entry.target.dataset.src;
                        entry.target.removeAttribute('data-src');
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => observer.observe(el));
        statNumbers.forEach(el => observer.observe(el));
        lazyImages.forEach(el => observer.observe(el));
    }

    /**
     * Anime un compteur de chiffres de 0 à sa valeur cible.
     * @param {HTMLElement} element - L'élément contenant le chiffre.
     */
    function animateCounter(element) {
        const target = +element.getAttribute('data-target');
        const duration = 2000; // 2 secondes
        const stepTime = Math.abs(Math.floor(duration / target));
        let current = 0;
        
        const timer = setInterval(() => {
            current += 1;
            element.textContent = current;
            if (current === target) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    /**
     * Gère le système d'onglets (tabs).
     */
    function initTabs() {
        const tabsContainer = document.querySelector('.tabs-container');
        if (!tabsContainer) return;

        const tabLinks = tabsContainer.querySelectorAll('.tab-link');
        const tabContents = tabsContainer.querySelectorAll('.tab-content');

        tabLinks.forEach(link => {
            link.addEventListener('click', () => {
                const targetId = link.dataset.tab;

                tabLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                tabContents.forEach(content => {
                    if (content.id === targetId) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
    }

    /**
     * Gère le filtrage de la galerie de projets.
     */
    function initProjectFilter() {
        const filterContainer = document.querySelector('.project-filters');
        if (!filterContainer) return;

        const filterButtons = filterContainer.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;

                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                projectCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                });
            });
        });
    }

    /**
     * Gère la validation du formulaire de candidature côté client.
     */
    function initFormValidation() {
        const form = document.getElementById('application-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            const fields = form.querySelectorAll('[required]');
            fields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Simuler un envoi réussi
                alert('Candidature envoyée avec succès !');
                form.reset();
            }
        });

        // Validation en temps réel
        const fields = form.querySelectorAll('[required]');
        fields.forEach(field => {
            field.addEventListener('input', () => validateField(field));
        });
    }

    /**
     * Valide un champ de formulaire individuel.
     * @param {HTMLInputElement|HTMLTextAreaElement} field - Le champ à valider.
     * @returns {boolean} - True si le champ est valide, sinon false.
     */
    function validateField(field) {
        const parentGroup = field.parentElement;
        const errorDiv = parentGroup.querySelector('.error-message');
        let errorMessage = '';

        if (field.value.trim() === '') {
            errorMessage = 'Ce champ est requis.';
        } else if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) {
            errorMessage = 'Veuillez entrer une adresse email valide.';
        }

        if (errorMessage) {
            parentGroup.classList.add('error');
            errorDiv.textContent = errorMessage;
            return false;
        } else {
            parentGroup.classList.remove('error');
            errorDiv.textContent = '';
            return true;
        }
    }

    /**
     * Met à jour l'année en cours dans le footer.
     */
    function updateCurrentYear() {
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }

})();
