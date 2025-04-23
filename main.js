/**
 * 2P - Infraestrutura de pagamento para o seu negócio
 * JavaScript principal com animações e efeitos modernos
 */

document.addEventListener('DOMContentLoaded', function() {
    // Menu móvel
    setupMobileMenu();
    
    // Tabs na seção técnica
    setupTabs();
    
    // Animações ao scroll
    setupScrollAnimations();
    
    // Smooth scroll para links de navegação
    setupSmoothScroll();
    
    // Animação de blockchain
    setupBlockchainAnimation();
    
    // Contador para números na seção de estatísticas
    setupCounters();
    
    // Efeito de digitação para código
    setupTypingEffect();
    
    // Efeito de partículas para o fundo
    setupParticleEffect();
    
    // Inicializa a demonstração do dashboard
    if (document.querySelector('.dashboard-content')) {
        setupDashboardDemo();
    }
    
    // Adiciona classe 'loaded' ao body quando a página terminar de carregar
    document.body.classList.add('loaded');
});

/**
 * Configura o menu móvel com animações suaves
 */
function setupMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const header = document.querySelector('.header');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Altera a aparência do botão do menu com animação suave
            const spans = menuToggle.querySelectorAll('span');
            if (menuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
                
                // Adiciona efeito de blur ao fundo quando o menu está aberto
                setTimeout(() => {
                    document.querySelector('.hero').style.filter = 'blur(5px)';
                }, 300);
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                
                // Remove o efeito de blur
                document.querySelector('.hero').style.filter = 'none';
            }
        });
        
        // Fecha o menu ao clicar em um link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    menuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    
                    // Restaura a aparência do botão do menu
                    const spans = menuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                    
                    // Remove o efeito de blur
                    document.querySelector('.hero').style.filter = 'none';
                }
            });
        });
    }
    
    // Efeito de mudança de cor do header ao scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Configura as tabs na seção técnica com transições suaves
 */
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    if (tabButtons.length > 0) {
        // Configura o conteúdo das tabs adicionais
        setupTabContent();
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove a classe active de todos os botões
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Adiciona a classe active ao botão clicado
                this.classList.add('active');
                
                // Obtém o ID da tab a ser exibida
                const tabId = this.getAttribute('data-tab');
                
                // Esconde todas as tabs com fade out
                const tabPanes = document.querySelectorAll('.tab-pane');
                tabPanes.forEach(pane => {
                    pane.classList.remove('active');
                    pane.style.opacity = '0';
                    pane.style.transform = 'translateY(10px)';
                });
                
                // Exibe a tab selecionada com fade in
                const selectedTab = document.getElementById(tabId);
                if (selectedTab) {
                    selectedTab.classList.add('active');
                    setTimeout(() => {
                        selectedTab.style.opacity = '1';
                        selectedTab.style.transform = 'translateY(0)';
                    }, 50);
                }
            });
        });
    }
}

/**
 * Configura o conteúdo das tabs adicionais
 */
function setupTabContent() {
    // Conteúdo para as tabs adicionais
    const tabContents = {
        bank: `
<pre><code>
import { TwoP } from '2p';
const twop = new TwoP('&lt;api_key&gt;');

(async function() {
    // Criar conta bancária virtual
    const account = await twop.accounts.create('&lt;instance_id&gt;', {
        currency: "BRL",
        customer_id: "cus_123456",
        type: "checking"
    });
    
    console.log(\`Conta criada: ${account.id}\`);
})()
</code></pre>`,
        payments: `
<pre><code>
import { TwoP } from '2p';
const twop = new TwoP('&lt;api_key&gt;');

(async function() {
    // Processar pagamento internacional
    const payment = await twop.payments.create('&lt;instance_id&gt;', {
        source: {
            type: "wallet",
            id: "wal_123456",
            currency: "BRL"
        },
        destination: {
            type: "bank_account",
            id: "ba_789012",
            currency: "USD"
        },
        amount: 1000.00,
        exchange_rate: 5.12,
        description: "Pagamento internacional"
    });
})()
</code></pre>`,
        wallets: `
<pre><code>
import { TwoP } from '2p';
const twop = new TwoP('&lt;api_key&gt;');

(async function() {
    // Criar carteira digital
    const wallet = await twop.wallets.create('&lt;instance_id&gt;', {
        customer_id: "cus_123456",
        currency: "BTC",
        name: "Bitcoin Wallet"
    });
    
    // Adicionar fundos à carteira
    await twop.wallets.fund(wallet.id, {
        amount: 0.05,
        source: "exchange"
    });
})()
</code></pre>`
    };
    
    // Cria as tabs que não existem no HTML original
    const tabContent = document.querySelector('.tab-content');
    if (tabContent) {
        for (const [id, content] of Object.entries(tabContents)) {
            if (!document.getElementById(id)) {
                const tabPane = document.createElement('div');
                tabPane.className = 'tab-pane';
                tabPane.id = id;
                tabPane.innerHTML = content;
                tabPane.style.opacity = '0';
                tabPane.style.transform = 'translateY(10px)';
                tabPane.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                tabContent.appendChild(tabPane);
            }
        }
    }
}

/**
 * Configura animações ao scroll com efeitos avançados
 */
function setupScrollAnimations() {
    // Seleciona elementos para animação ou adiciona classes de animação
    const setupAnimationClasses = () => {
        // Elementos que receberão animações
        const sections = [
            { selector: '.benefit-card', animation: 'fade-in-up', stagger: true },
            { selector: '.solution-card', animation: 'fade-in-up', stagger: true },
            { selector: '.platform-card', animation: 'fade-in-up', stagger: true },
            { selector: '.hero-content', animation: 'fade-in-left' },
            { selector: '.hero-image', animation: 'fade-in-right' },
            { selector: '.code-block', animation: 'fade-in' },
            { selector: '.section-title', animation: 'fade-in' },
            { selector: '.footer-column', animation: 'fade-in-up', stagger: true },
            { selector: '.powering-stats', animation: 'fade-in-up' }
        ];
        
        // Adiciona classes de animação aos elementos
        sections.forEach(section => {
            const elements = document.querySelectorAll(section.selector);
            elements.forEach((element, index) => {
                element.classList.add(section.animation);
                
                // Se for para escalonar as animações (stagger)
                if (section.stagger) {
                    element.setAttribute('data-delay', 100 * index);
                }
                
                // Adiciona atributo para threshold personalizado se necessário
                if (section.threshold) {
                    element.setAttribute('data-threshold', section.threshold);
                }
            });
        });
    };
    
    // Configura as animações
    setupAnimationClasses();
    
    // Seleciona todos os elementos com classes de animação
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
    
    // Função para verificar se um elemento está visível na viewport com threshold personalizado
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const threshold = parseFloat(el.getAttribute('data-threshold')) || 0.8;
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * threshold &&
            rect.bottom >= 0
        );
    }
    
    // Função para animar elementos visíveis com efeito suave
    function animateVisibleElements() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                // Adiciona um atraso baseado no atributo data-delay, se existir
                const delay = parseInt(element.getAttribute('data-delay')) || 0;
                
                setTimeout(() => {
                    // Adiciona a classe animated para iniciar a animação
                    element.classList.add('animated');
                    
                    // Após a animação completa, remove as classes para melhorar performance
                    const animationDuration = 1000; // 1 segundo de duração da animação
                    setTimeout(() => {
                        element.classList.remove('fade-in', 'fade-in-up', 'fade-in-left', 'fade-in-right');
                        element.style.opacity = '1';
                        element.style.transform = 'none';
                    }, animationDuration + delay);
                }, delay);
            }
        });
    }
    
    // Usa Intersection Observer para melhor performance
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const delay = parseInt(element.getAttribute('data-delay')) || 0;
                    
                    setTimeout(() => {
                        element.classList.add('animated');
                        
                        // Após a animação completa, remove as classes para melhorar performance
                        const animationDuration = 1000;
                        setTimeout(() => {
                            element.classList.remove('fade-in', 'fade-in-up', 'fade-in-left', 'fade-in-right');
                            element.style.opacity = '1';
                            element.style.transform = 'none';
                        }, animationDuration + delay);
                    }, delay);
                    
                    // Parar de observar após animar
                    observer.unobserve(element);
                }
            });
        }, observerOptions);
        
        // Observa cada elemento
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback para navegadores que não suportam Intersection Observer
        window.addEventListener('load', animateVisibleElements);
        window.addEventListener('scroll', animateVisibleElements);
        animateVisibleElements();
    }
}

/**
 * Configura o smooth scroll para links de navegação com efeito avançado
 */
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Calcula a posição do elemento alvo
            const headerOffset = 80; // Altura do header fixo
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            // Adiciona efeito de highlight temporário ao destino
            const highlightElement = () => {
                targetElement.classList.add('scroll-highlight');
                setTimeout(() => {
                    targetElement.classList.remove('scroll-highlight');
                }, 1500);
            };
            
            // Animação suave com efeito de easing
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Adiciona o highlight após a animação de scroll
            setTimeout(highlightElement, 600);
        });
    });
}

/**
 * Adiciona funcionalidade de contador para números na seção de estatísticas com formatação
 */
function setupCounters() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length === 0) return;
    
    // Função para formatar números (adiciona separadores de milhar)
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2500; // Duração da animação em ms
        const step = target / duration * 10; // Incremento a cada 10ms
        let current = 0;
        
        // Cria elemento para o valor
        const valueElement = document.createElement('span');
        valueElement.className = 'counter-value';
        counter.innerHTML = '';
        
        // Adiciona prefixo se existir
        if (prefix) {
            const prefixElement = document.createElement('span');
            prefixElement.className = 'counter-prefix';
            prefixElement.textContent = prefix;
            counter.appendChild(prefixElement);
        }
        
        // Adiciona o valor
        counter.appendChild(valueElement);
        
        // Adiciona sufixo se existir
        if (suffix) {
            const suffixElement = document.createElement('span');
            suffixElement.className = 'counter-suffix';
            suffixElement.textContent = suffix;
            counter.appendChild(suffixElement);
        }
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                valueElement.textContent = formatNumber(Math.floor(current));
                requestAnimationFrame(() => {
                    setTimeout(updateCounter, 10);
                });
            } else {
                valueElement.textContent = formatNumber(target);
                
                // Adiciona efeito de destaque quando o contador termina
                counter.classList.add('counter-complete');
                setTimeout(() => {
                    counter.classList.remove('counter-complete');
                }, 300);
            }
        };
        
        // Inicia o contador quando o elemento estiver visível
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(() => {
                    updateCounter();
                }, 300); // Pequeno atraso para melhor efeito visual
                observer.disconnect();
            }
        }, { threshold: 0.2 });
        
        observer.observe(counter);
    });
}

/**
 * Configura efeito de digitação para blocos de código com cursor piscante
 */
function setupTypingEffect() {
    const codeBlock = document.querySelector('.code-block code');
    if (!codeBlock) return;
    
    const codeText = codeBlock.textContent;
    codeBlock.textContent = '';
    
    // Adiciona cursor piscante
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    cursor.style.opacity = '1';
    cursor.style.fontWeight = '100';
    cursor.style.animation = 'blink 1s infinite';
    codeBlock.appendChild(cursor);
    
    // Adiciona estilo para animação do cursor
    if (!document.querySelector('#cursor-style')) {
        const style = document.createElement('style');
        style.id = 'cursor-style';
        style.textContent = `
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Função para simular digitação com velocidade variável
    function typeCode(index) {
        if (index < codeText.length) {
            // Remove o cursor antes de adicionar o caractere
            codeBlock.removeChild(cursor);
            
            // Adiciona o próximo caractere
            codeBlock.textContent += codeText.charAt(index);
            
            // Recoloca o cursor
            codeBlock.appendChild(cursor);
            
            // Velocidade variável para parecer mais natural
            const speed = Math.random() * 10 + 10; // Entre 10ms e 20ms
            
            // Pausa mais longa após certos caracteres
            const char = codeText.charAt(index);
            const extraDelay = (char === '\n' || char === ';' || char === '{' || char === '}') ? 200 : 0;
            
            setTimeout(() => typeCode(index + 1), speed + extraDelay);
        }
    }
    
    // Inicia a digitação quando o bloco de código estiver visível
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            setTimeout(() => {
                typeCode(0);
            }, 500);
            observer.disconnect();
        }
    }, { threshold: 0.3 });
    
    observer.observe(codeBlock);
}

/**
 * Configura efeito de partículas para o fundo
 */
function setupParticleEffect() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Cria o canvas para as partículas
    const canvas = document.createElement('canvas');
    canvas.className = 'particles-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.3';
    
    heroSection.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Ajusta o tamanho do canvas
    function resizeCanvas() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Configuração das partículas
    const particlesArray = [];
    const particleCount = 30;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = getRandomColor();
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Rebate nas bordas
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Cores das partículas baseadas na paleta do site
    function getRandomColor() {
        const colors = [
            'rgba(30, 94, 250, 0.7)',   // blue-primary
            'rgba(10, 51, 127, 0.7)',    // blue-secondary
            'rgba(108, 99, 255, 0.7)',   // accent-purple
            'rgba(0, 212, 255, 0.7)'     // accent-teal
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Inicializa as partículas
    function init() {
        for (let i = 0; i < particleCount; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    // Conecta partículas próximas com linhas
    function connect() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.strokeStyle = 'rgba(30, 94, 250, ' + (0.2 - distance/750) + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Anima as partículas
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        
        connect();
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
}
