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
    // Elementos que serão animados com diferentes efeitos
    const fadeUpElements = document.querySelectorAll('.benefit-card, .solution-card, .section-title');
    const fadeInElements = document.querySelectorAll('.hero-content, .section-subtitle');
    const scaleElements = document.querySelectorAll('.dashboard-preview, .code-block');
    const staggeredElements = document.querySelectorAll('.benefits-grid > *, .solutions-grid > *');
    
    // Função para verificar se um elemento está visível na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
        );
    }
    
    // Função para animar elementos visíveis
    function animateVisibleElements() {
        // Fade Up Animation
        fadeUpElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
        
        // Fade In Animation
        fadeInElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.opacity = '1';
            }
        });
        
        // Scale Animation
        scaleElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
            }
        });
        
        // Staggered Animation
        staggeredElements.forEach((element, index) => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                setTimeout(() => {
                    element.classList.add('animated');
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 100); // Atraso escalonado para cada elemento
            }
        });
    }
    
    // Configura os elementos para animação
    fadeUpElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    fadeInElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 1s ease';
    });
    
    scaleElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.95)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    staggeredElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Executa a animação no carregamento da página
    setTimeout(animateVisibleElements, 300);
    
    // Executa a animação ao scroll
    window.addEventListener('scroll', animateVisibleElements);
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
            if (targetElement) {
                // Adiciona efeito de highlight temporário na seção de destino
                const highlightEffect = document.createElement('div');
                highlightEffect.className = 'section-highlight';
                highlightEffect.style.position = 'absolute';
                highlightEffect.style.top = '0';
                highlightEffect.style.left = '0';
                highlightEffect.style.right = '0';
                highlightEffect.style.bottom = '0';
                highlightEffect.style.backgroundColor = 'rgba(30, 94, 250, 0.1)';
                highlightEffect.style.borderRadius = '12px';
                highlightEffect.style.zIndex = '-1';
                highlightEffect.style.opacity = '0';
                highlightEffect.style.transition = 'opacity 1s ease';
                
                // Adiciona posição relativa à seção se não tiver
                if (window.getComputedStyle(targetElement).position === 'static') {
                    targetElement.style.position = 'relative';
                }
                
                targetElement.appendChild(highlightEffect);
                
                // Calcula a posição de destino considerando o header fixo
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Realiza o scroll suave
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Mostra e esconde o efeito de highlight
                setTimeout(() => {
                    highlightEffect.style.opacity = '1';
                    
                    setTimeout(() => {
                        highlightEffect.style.opacity = '0';
                        
                        // Remove o elemento após a animação
                        setTimeout(() => {
                            targetElement.removeChild(highlightEffect);
                        }, 1000);
                    }, 1000);
                }, 500);
            }
        });
    });
}

/**
 * Adiciona funcionalidade de contador para números na seção de estatísticas
 */
function setupCounters() {
    // Adiciona contadores à seção de estatísticas se não existirem
    const poweringSection = document.querySelector('.powering');
    if (poweringSection && !document.querySelector('.stats-container')) {
        const statsContainer = document.createElement('div');
        statsContainer.className = 'stats-container';
        statsContainer.innerHTML = `
            <div class="stat-item">
                <div class="stat-value"><span class="counter" data-target="80">0</span>%</div>
                <div class="stat-label">Redução de custo</div>
            </div>
            <div class="stat-item">
                <div class="stat-value"><span class="counter" data-target="24">0</span>/7</div>
                <div class="stat-label">Disponibilidade</div>
            </div>
            <div class="stat-item">
                <div class="stat-value"><span class="counter" data-target="60">0</span>s</div>
                <div class="stat-label">Tempo de transação</div>
            </div>
            <div class="stat-item">
                <div class="stat-value"><span class="counter" data-target="150">0</span>+</div>
                <div class="stat-label">Países atendidos</div>
            </div>
        `;
        
        // Adiciona estilos inline para os contadores
        const style = document.createElement('style');
        style.textContent = `
            .stats-container {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                margin: 3rem 0;
                gap: 2rem;
            }
            .stat-item {
                text-align: center;
                flex: 1 1 200px;
                max-width: 250px;
            }
            .stat-value {
                font-size: 3rem;
                font-weight: 700;
                color: var(--blue-primary);
                margin-bottom: 0.5rem;
                font-family: 'Montserrat', sans-serif;
            }
            .stat-label {
                font-size: 1.2rem;
                color: var(--gray-dark);
            }
        `;
        document.head.appendChild(style);
        
        // Insere os contadores antes do gráfico de economia de tempo
        const timeSavingGraphic = poweringSection.querySelector('.time-saving-graphic');
        if (timeSavingGraphic) {
            timeSavingGraphic.parentNode.insertBefore(statsContainer, timeSavingGraphic);
        } else {
            poweringSection.querySelector('.container').appendChild(statsContainer);
        }
    }
    
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2500; // duração da animação em ms
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
                
                // Adiciona efeito de destaque quando o contador termina
                counter.style.textShadow = '0 0 15px rgba(30, 94, 250, 0.5)';
                setTimeout(() => {
                    counter.style.textShadow = 'none';
                }, 500);
            }
        };
        
        // Inicia o contador quando o elemento estiver visível
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

/**
 * Simula dados dinâmicos para o dashboard na hero section com animações avançadas
 */
function setupDashboardDemo() {
    const transactions = [
        { time: '10:15', amount: 'R$ 5.000,00', status: 'success', type: 'Pagamento', currency: 'BRL' },
        { time: '09:42', amount: '€ 1.200,00', status: 'processing', type: 'Remessa', currency: 'EUR' },
        { time: '09:15', amount: '$ 3.500,00', status: 'success', type: 'Exportação', currency: 'USD' },
        { time: '08:50', amount: '£ 2.300,00', status: 'success', type: 'Importação', currency: 'GBP' },
        { time: '08:22', amount: 'R$ 1.800,00', status: 'processing', type: 'Pagamento', currency: 'BRL' },
        { time: '07:45', amount: '$ 4.200,00', status: 'success', type: 'Remessa', currency: 'USD' },
        { time: '07:30', amount: '₿ 0.05', status: 'success', type: 'Cripto', currency: 'BTC' },
        { time: '07:15', amount: 'ETH 1.2', status: 'processing', type: 'Cripto', currency: 'ETH' }
    ];
    
    const dashboardContent = document.querySelector('.dashboard-content');
    if (dashboardContent) {
        // Atualiza o layout do dashboard para mostrar mais informações
        dashboardContent.innerHTML = '';
        
        // Adiciona as primeiras transações
        for (let i = 0; i < 3; i++) {
            const transaction = transactions[i];
            const transactionEl = createTransactionElement(transaction);
            dashboardContent.appendChild(transactionEl);
            setTimeout(() => {
                transactionEl.style.opacity = '1';
                transactionEl.style.transform = 'translateX(0)';
            }, i * 200);
        }
        
        let currentIndex = 3;
        
        // Atualiza o dashboard a cada 3 segundos com animações aprimoradas
        setInterval(() => {
            // Remove a última transação com animação
            if (dashboardContent.children.length >= 3) {
                const lastChild = dashboardContent.lastChild;
                lastChild.style.opacity = '0';
                lastChild.style.transform = 'translateX(20px)';
                
                setTimeout(() => {
                    dashboardContent.removeChild(lastChild);
                }, 300);
            }
            
            // Adiciona uma nova transação no topo com animação
            setTimeout(() => {
                const newTransaction = createTransactionElement(transactions[currentIndex]);
                dashboardContent.prepend(newTransaction);
                
                // Animação de entrada
                setTimeout(() => {
                    newTransaction.style.opacity = '1';
                    newTransaction.style.transform = 'translateX(0)';
                }, 50);
                
                // Atualiza o índice
                currentIndex = (currentIndex + 1) % transactions.length;
            }, 350);
        }, 3000);
    }
    
    // Função para criar elemento de transação com design aprimorado
    function createTransactionElement(transaction) {
        const transactionEl = document.createElement('div');
        transactionEl.className = 'transaction';
        transactionEl.style.opacity = '0';
        transactionEl.style.transform = 'translateX(-20px)';
        transactionEl.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Adiciona ícone baseado no tipo de transação
        let icon = '';
        switch(transaction.type) {
            case 'Pagamento':
                icon = '<i class="fas fa-money-bill-wave"></i>';
                break;
            case 'Remessa':
                icon = '<i class="fas fa-exchange-alt"></i>';
                break;
            case 'Exportação':
                icon = '<i class="fas fa-file-export"></i>';
                break;
            case 'Importação':
                icon = '<i class="fas fa-file-import"></i>';
                break;
            case 'Cripto':
                icon = '<i class="fas fa-coins"></i>';
                break;
            default:
                icon = '<i class="fas fa-money-check"></i>';
        }
        
        // Layout aprimorado com mais informações
        transactionEl.innerHTML = `
            <div class="transaction-icon">${icon}</div>
            <div class="transaction-details">
                <div class="transaction-type">${transaction.type}</div>
                <div class="transaction-time">${transaction.time}</div>
            </div>
            <div class="transaction-amount">${transaction.amount}</div>
            <div class="status ${transaction.status}">${
                transaction.status === 'success' ? 'Sucesso' : 'Processando'
            }</div>
        `;
        
        // Adiciona estilos inline para o novo layout
        transactionEl.style.display = 'grid';
        transactionEl.style.gridTemplateColumns = 'auto 1fr auto auto';
        transactionEl.style.gap = '10px';
        transactionEl.style.alignItems = 'center';
        
        // Estilo para o ícone
        const iconEl = transactionEl.querySelector('.transaction-icon');
        if (iconEl) {
            iconEl.style.color = 'var(--blue-primary)';
            iconEl.style.fontSize = '1.2rem';
            iconEl.style.width = '30px';
            iconEl.style.height = '30px';
            iconEl.style.display = 'flex';
            iconEl.style.alignItems = 'center';
            iconEl.style.justifyContent = 'center';
            iconEl.style.backgroundColor = 'var(--blue-light)';
            iconEl.style.borderRadius = '50%';
        }
        
        return transactionEl;
    }
}

/**
 * Configura a animação de blockchain para o fundo
 */
function setupBlockchainAnimation() {
    const sections = document.querySelectorAll('.hero, .cta');
    
    sections.forEach(section => {
        // Cria o container para a animação
        const blockchainAnimation = document.createElement('div');
        blockchainAnimation.className = 'blockchain-animation';
        section.appendChild(blockchainAnimation);
        
        // Cria nós e linhas da blockchain
        const nodeCount = 8;
        const nodes = [];
        
        for (let i = 0; i < nodeCount; i++) {
            // Cria um nó
            const node = document.createElement('div');
            node.className = 'blockchain-node';
            
            // Posiciona aleatoriamente
            const top = Math.random() * 80 + 10; // 10-90%
            const left = Math.random() * 80 + 10; // 10-90%
            
            node.style.top = `${top}%`;
            node.style.left = `${left}%`;
            node.style.animationDelay = `${i * 0.5}s`;
            
            blockchainAnimation.appendChild(node);
            nodes.push({ element: node, top, left });
        }
        
        // Cria linhas conectando os nós
        for (let i = 0; i < nodes.length - 1; i++) {
            const line = document.createElement('div');
            line.className = 'blockchain-line';
            
            // Calcula a posição e ângulo da linha
            const node1 = nodes[i];
            const node2 = nodes[i + 1];
            
            // Calcula o comprimento e ângulo
            const dx = (node2.left - node1.left) * section.offsetWidth / 100;
            const dy = (node2.top - node1.top) * section.offsetHeight / 100;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            
            // Posiciona a linha
            line.style.width = `${length}px`;
            line.style.top = `${node1.top}%`;
            line.style.left = `${node1.left}%`;
            line.style.transform = `rotate(${angle}deg)`;
            line.style.animationDelay = `${i * 0.3}s`;
            
            blockchainAnimation.appendChild(line);
        }
    });
}

/**
 * Configura efeito de digitação para blocos de código
 */
function setupTypingEffect() {
    const codeBlocks = document.querySelectorAll('.code-block code');
    
    codeBlocks.forEach(codeBlock => {
        const originalContent = codeBlock.innerHTML;
        const contentLength = originalContent.length;
        
        // Limpa o conteúdo inicial
        codeBlock.innerHTML = '';
        
        // Função para simular digitação
        function typeCode(index) {
            if (index <= contentLength) {
                codeBlock.innerHTML = originalContent.substring(0, index);
                setTimeout(() => typeCode(index + 3), 10); // Digita 3 caracteres por vez para ser mais rápido
            }
        }
        
        // Inicia o efeito de digitação quando o bloco estiver visível
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setTimeout(() => {
                    typeCode(0);
                }, 500);
                observer.disconnect();
            }
        }, { threshold: 0.3 });
        
        observer.observe(codeBlock);
    });
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
