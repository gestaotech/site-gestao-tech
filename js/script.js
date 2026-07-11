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

    // Fechar menu ao clicar em um link
    nav.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // =====================
    // HEADER SCROLL EFFECT
    // =====================
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.12)';
        } else {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        }
    });

    // =====================
    // SCROLL ANIMATIONS
    // =====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Adicionar animação a elementos
    const animateElements = document.querySelectorAll(
        '.sobre__text, .card, .servico, .contato__form, .contato__info, .hero__inner'
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
        const mensagem = document.getElementById('mensagem').value.trim();

        if (!nome || !telefone || !mensagem) {
            showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        // Simular envio
        const btn = form.querySelector('.btn');
        const originalText = btn.textContent;
        btn.textContent = 'Enviando...';
        btn.disabled = true;

        setTimeout(() => {
            showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            form.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1500);
    });

    function showNotification(message, type) {
        // Remover notificação existente
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;

        // Estilos inline para a notificação
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            padding: '16px 24px',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: '600',
            fontSize: '0.95rem',
            zIndex: '9999',
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
            transform: 'translateY(20px)',
            opacity: '0',
            transition: 'all 0.3s ease',
            maxWidth: '400px',
            background: type === 'success' ? '#0d7377' : '#e8822a'
        });

        document.body.appendChild(notification);

        // Animar entrada
        requestAnimationFrame(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        });

        // Remover após 4 segundos
        setTimeout(() => {
            notification.style.transform = 'translateY(20px)';
            notification.style.opacity = '0';
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
