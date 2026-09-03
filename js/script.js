document.addEventListener('DOMContentLoaded', () => {

    // =====================
    // MENU MOBILE
    // =====================
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    nav.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // =====================
    // ACTIVE NAV LINK ON SCROLL
    // =====================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // =====================
    // SCROLL ANIMATIONS
    // =====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll(
        '.sobre__text, .sobre__card, .servico, .produto, .contato__form, .contato__info, .hero__inner'
    );

    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // =====================
    // FORMULÁRIO DE CONTATO
    // =====================
    const form = document.getElementById('contatoForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const servico = document.getElementById('servico').value;
        const mensagem = document.getElementById('mensagem').value.trim();

        if (!nome || !telefone || !mensagem) {
            showNotification('Preencha todos os campos obrigatórios.', 'error');
            return;
        }

        const servicos = {
            'web': 'Desenvolvimento Web',
            'ti': 'Gestão de T.I',
            'automacao': 'Automação de Processos',
            'desenvolvimento': 'Desenvolvimento de Sistemas Personalizados'
        };

        let texto = `Olá! sou o(a) *${nome}*.\n`;
        texto += `Telefone: ${telefone}\n`;
        if (servico) {
            texto += `Serviço de interesse: ${servicos[servico]}\n`;
        }
        texto += `\n${mensagem}`;

        const msgEncoded = encodeURIComponent(texto);
        const whatsappURL = `https://wa.me/5561998361296?text=${msgEncoded}`;

        const link = document.createElement('a');
        link.href = whatsappURL;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    function showNotification(message, type) {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        });

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // =====================
    // MÁSCARA TELEFONE
    // =====================
    const telefoneInput = document.getElementById('telefone');

    telefoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 11) {
            value = value.slice(0, 11);
        }

        if (value.length > 6) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        } else if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }

        e.target.value = value;
    });

});