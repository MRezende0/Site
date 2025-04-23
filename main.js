/**
 * 2P - Infraestrutura de pagamento para o seu negócio
 * JavaScript principal
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
});

/**
 * Configura o menu móvel
 */
function setupMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Altera a aparência do botão do menu
            const spans = menuToggle.querySelectorAll('span');
            if (menuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Fecha o menu ao clicar em um link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    menuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    
                    // Restaura a aparência do botão do menu
                    const spans = menuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }
}

/**
 * Configura as tabs na seção técnica
 */
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove a classe active de todos os botões
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Adiciona a classe active ao botão clicado
                this.classList.add('active');
                
                // Obtém o ID da tab a ser exibida
                const tabId = this.getAttribute('data-tab');
                
                // Esconde todas as tabs
                const tabPanes = document.querySelectorAll('.tab-pane');
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Exibe a tab selecionada
                const selectedTab = document.getElementById(tabId);
                if (selectedTab) {
                    selectedTab.classList.add('active');
                }
            });
        });
    }
}

/**
 * Configura animações ao scroll
 */
function setupScrollAnimations() {
    // Elementos que serão animados
    const elements = document.querySelectorAll('.benefit-card, .solution-card, .section-title, .hero-content, .dashboard-preview, .code-block');
    
    // Função para verificar se um elemento está visível na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Função para animar elementos visíveis
    function animateVisibleElements() {
        elements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Configura os elementos para animação
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Executa a animação no carregamento da página
    animateVisibleElements();
    
    // Executa a animação ao scroll
    window.addEventListener('scroll', animateVisibleElements);
}

/**
 * Configura o smooth scroll para links de navegação
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
                // Calcula a posição de destino considerando o header fixo
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Realiza o scroll suave
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Adiciona funcionalidade de contador para números na seção de estatísticas
 * (Pode ser usado em futuras atualizações)
 */
function setupCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // duração da animação em ms
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Inicia o contador quando o elemento estiver visível
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.disconnect();
            }
        });
        
        observer.observe(counter);
    });
}

/**
 * Simula dados dinâmicos para o dashboard na hero section
 */
function setupDashboardDemo() {
    const transactions = [
        { time: '10:15', amount: 'R$ 5.000,00', status: 'success' },
        { time: '09:42', amount: '€ 1.200,00', status: 'processing' },
        { time: '09:15', amount: '$ 3.500,00', status: 'success' },
        { time: '08:50', amount: '£ 2.300,00', status: 'success' },
        { time: '08:22', amount: 'R$ 1.800,00', status: 'processing' },
        { time: '07:45', amount: '$ 4.200,00', status: 'success' }
    ];
    
    const dashboardContent = document.querySelector('.dashboard-content');
    if (dashboardContent) {
        let currentIndex = 3;
        
        // Atualiza o dashboard a cada 3 segundos
        setInterval(() => {
            // Remove a última transação
            if (dashboardContent.children.length >= 3) {
                dashboardContent.removeChild(dashboardContent.lastChild);
            }
            
            // Adiciona uma nova transação no topo
            const newTransaction = document.createElement('div');
            newTransaction.className = 'transaction';
            newTransaction.innerHTML = `
                <div class="time">${transactions[currentIndex].time}</div>
                <div class="amount">${transactions[currentIndex].amount}</div>
                <div class="status ${transactions[currentIndex].status}">${
                    transactions[currentIndex].status === 'success' ? 'Sucesso' : 'Processando'
                }</div>
            `;
            
            // Adiciona a nova transação com efeito de fade in
            newTransaction.style.opacity = '0';
            dashboardContent.prepend(newTransaction);
            
            setTimeout(() => {
                newTransaction.style.transition = 'opacity 0.5s ease';
                newTransaction.style.opacity = '1';
            }, 10);
            
            // Atualiza o índice
            currentIndex = (currentIndex + 1) % transactions.length;
        }, 3000);
    }
}

// Inicializa a demonstração do dashboard se estiver na página inicial
if (document.querySelector('.dashboard-content')) {
    setupDashboardDemo();
}
