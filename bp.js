// Se necessário, para controle manual
const carousel = new bootstrap.Carousel('#imageCarousel', {
    interval: 3000, // Troca de imagem a cada 3 segundos
    ride: 'carousel' // Ativa o carrossel automaticamente
});

//Evento de aparecer o campo de busca
document.getElementById('searchIcon').addEventListener('click', function() {
    // Adiciona ou remove a classe 'open' para mostrar/ocultar o campo de busca
    const searchContainer = document.querySelector('.search-container');
    searchContainer.classList.toggle('open');
});



//Campo de busca da pagina inicial
// Abrir o campo de busca ao clicar no ícone de lupa
document.getElementById('searchIcon').addEventListener('click', function() {
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput.value.trim().toLowerCase();

    // Ativar a expansão do campo de busca
    searchContainer.classList.toggle('active');

    // Quando o campo de busca está ativo, ele começa a expandir
    if (searchContainer.classList.contains('active')) {
        searchInput.focus();
    } else {
        // Resetar a busca caso o campo seja fechado
        searchInput.value = '';
    }

    // Verificar a busca ao clicar no ícone
    if (searchQuery) {
        searchSite(searchQuery);
    }
});

// Executar busca ao pressionar a tecla Enter
document.getElementById('searchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const searchQuery = this.value.trim().toLowerCase();
        if (searchQuery) {
            searchSite(searchQuery);
        }
    }
});

// Função para realizar a busca no site
function searchSite(query) {
    const resultsContainer = document.getElementById('resultsContainer');
    const searchResultsSection = document.getElementById('searchResults');
    
    // Limpar resultados anteriores
    resultsContainer.innerHTML = '';
    
    // Procurar todos os elementos no site que contêm texto
    const allTextContent = document.body.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a');
    
    let resultsFound = false;
    
    allTextContent.forEach(element => {
        const textContent = element.textContent || element.innerText;
        
        // Verificar se o texto contém o termo de busca
        if (textContent.toLowerCase().includes(query)) {
            resultsFound = true;
            
            // Criar um resultado para exibir
            const resultItem = document.createElement('div');
            resultItem.classList.add('search-result');
            resultItem.innerHTML = `
                <a href="#">${textContent}</a>
            `;
            
            // Adicionar o resultado ao container
            resultsContainer.appendChild(resultItem);
        }
    });

    if (resultsFound) {
        // Mostrar a seção de resultados
        searchResultsSection.style.display = 'block';
    } else {
        // Exibir mensagem de nenhuma correspondência
        resultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
    }
}





// Definição dos serviços para cada categoria
const servicesData = {
    citizen: [
        { 
            icon: "fas fa-headset", 
            title: "Fale conosco", 
            url: "https://balneariopinhal.rs.gov.br/contato" // Link específico para "Fale Conosco"
        },
        { 
            icon: "fas fa-newspaper", 
            title: "Diário Oficial", 
            url: "https://balneariopinhal.rs.gov.br/diario-oficial" // Link específico para "Diário Oficial"
        },
        { 
            icon: "fas fa-home", 
            title: "IPTU", 
            url: "https://balneariopinhal.rs.gov.br/iptu" // Link específico para "IPTU"
        },
        {
            icon: "fas fa-money-check",
            title: "Emissão de guia IPTU 2025", 
            url: "http://45.181.135.34:22800/PortalContribuinteJavaEnvironment/com.tche.portalcontribuinte.whome" // Link específico para "Escola de Negócios"
        },
        { 
            icon: "fas fa-file-invoice-dollar", 
            title: "Emissão de guias de imposto", 
            url: "https://balneariopinhal.rs.gov.br/guias-de-imposto" // Link específico para "Emissão de guias de imposto"
        },
        { 
            icon: "fas fa-file-invoice", 
            title: "Portal do Contribuinte", 
            url: "https://balneariopinhal.rs.gov.br/conta-de-agua" // Link específico para "Conta de Água"
        },
        { 
            icon: "fas fa-info", 
            title: "Acesso a informação", 
            url: "https://balneariopinhal.rs.gov.br/compra-compartilhada" // Link específico para "Compra Compartilhada"
        },
        {
            icon: "fas fa-file-signature",
            title: "Concursos e editais", 
            url: "https://balneariopinhal.rs.gov.br/concurso" // Link específico para "Licenciamento"
        },
        {
            icon: "fas fa-gavel",
            title: "Licitações", 
            url: "https://balneariopinhal.rs.gov.br/licitacao/id/107/?pregao-eletronico.html" // Link específico para "Licenciamento"
        },
        {
            icon: "fas fa-recycle", 
            title: "Pontos de coleta", 
            url: "https://balneariopinhal.rs.gov.br/licitacao/visualizar/id/1140/?coleta-e-transporte-de-lixo.html" // Link específico para "Escola de Negócios"
        }, 
        {
            icon: "fas fa-trash", 
            title: "Transbordo Municipal", 
            url: "https://balneariopinhal.rs.gov.br/noticia/visualizar/idDep/116/id/2040/?renovacao-no-transbordo-municipal.html" // Link específico para "Lei da Liberdade Econômica"
        }, 
        { 
            icon: "fas fa-capsules", 
            title: "Medicamentos e insumos", 
            url: "https://balneariopinhal.rs.gov.br/licitacao/visualizar/id/1170/?medicamentos-farmacia-basica.html" // Link específico para "Calendário de eventos"
        }
    ],
    business: [
        { 
            icon: "fas fa-store", 
            title: "Abra sua empresa", 
            url: "https://balneariopinhal.rs.gov.br/abrir-empresa" // Link específico para "Abra sua empresa"
        },
        { 
            icon: "fas fa-building", 
            title: "Portal de Licenciamento", 
            url: "https://balneariopinhal.rs.gov.br/portal-licenciamento" // Link específico para "Portal de Licenciamento"
        },
        { 
            icon: "fas fa-piggy-bank", 
            title: "Mais Crédito", 
            url: "https://balneariopinhal.rs.gov.br/mais-credito" // Link específico para "Mais Crédito"
        },
        { 
            icon: "fas fa-search", 
            title: "Vigilância Sanitária", 
            url: "https://balneariopinhal.rs.gov.br/vigilancia-sanitaria" // Link específico para "Vigilância Sanitária"
        },
        { 
            icon: "fas fa-gavel", 
            title: "Alvarás", 
            url: "https://balneariopinhal.rs.gov.br/alvaras" // Link específico para "Alvarás"
        },
        { 
            icon: "fas fa-book", 
            title: "Lei da Liberdade Econômica", 
            url: "https://balneariopinhal.rs.gov.br/lei-da-liberdade" // Link específico para "Lei da Liberdade Econômica"
        }
    ],
    server: [
        { 
            icon: "fas fa-clipboard", 
            title: "SEI", 
            url: "https://balneariopinhal.rs.gov.br/sei" // Link específico para "SEI"
        },
        { 
            icon: "fas fa-lightbulb", 
            title: "SME", 
            url: "https://balneariopinhal.rs.gov.br/sme" // Link específico para "SME"
        },
        { 
            icon: "fas fa-book-open", 
            title: "Manual do servidor", 
            url: "https://balneariopinhal.rs.gov.br/manual-do-servidor" // Link específico para "Manual do servidor"
        },
        { 
            icon: "fas fa-clock", 
            title: "RH 24 Horas", 
            url: "https://balneariopinhal.rs.gov.br/rh-24-horas" // Link específico para "RH 24 Horas"
        }
    ],
    secretary: [
        {
            icon: "fas fa-gavel", 
            title: "Procuradoria Geral do Município", 
            url: "https://balneariopinhal.rs.gov.br/rh-24-horas" // Link específico para "RH 24 Horas"
        },
        {
            icon: "fas fa-users-cog", 
            title: "Secretaria Municipal de Administração", 
            url: "https://balneariopinhal.rs.gov.br/rh-24-horas" // Link específico para "RH 24 Horas"
        },
        {
            icon: "fas fa-briefcase", 
            title: "Secretaria Municipal de Desenvolvimento Social", 
            url: "https://balneariopinhal.rs.gov.br/rh-24-horas" // Link específico para "RH 24 Horas"
        },
        {
            icon: "fas fa-sun", 
            title: "Secretaria Municipal de Turismo", 
            url: "https://balneariopinhal.rs.gov.br/rh-24-horas" // Link específico para "RH 24 Horas"
        },
        {
            icon: "fas fa-book-open", 
            title: "Secretaria Municipal de Educação e Cultura", 
            url: "https://balneariopinhal.rs.gov.br/rh-24-horas" // Link específico para "RH 24 Horas"
        },
        {
            icon: "fas fa-futbol", 
            title: "Secretaria Municipal de Esporte e Juventude", 
            url: "https://balneariopinhal.rs.gov.br/rh-24-horas" // Link específico para "RH 24 Horas"
        },
        {
            icon: "fas fa-wallet", 
            title: "Secretaria Municipal de Finanças", 
            url: "https://balneariopinhal.rs.gov.br/rh-24-horas" // Link específico para "RH 24 Horas"
        },
        {
            icon: "fas fa-leaf", 
            title: "Secretaria Municipal de Meio Ambiente", 
            url: "https://balneariopinhal.rs.gov.br/rh-24-horas" // Link específico para "RH 24 Horas"
        },
        {
            icon: "fas fa-hard-hat", 
            title: "Secretaria Municipal de Obras e Infraestrutura", 
            url: "https://balneariopinhal.rs.gov.br/rh-24-horas" // Link específico para "RH 24 Horas"
        },
        {
            icon: "fas fa-chalkboard-teacher", 
            title: "Secretaria Municipal de Planejamento", 
            url: "https://balneariopinhal.rs.gov.br/rh-24-horas" // Link específico para "RH 24 Horas"
        },
        {
            icon: "fas fa-heart", 
            title: "Secretaria Municipal de Saúde", 
            url: "https://balneariopinhal.rs.gov.br/rh-24-horas" // Link específico para "RH 24 Horas"
        },
        {
            icon: "fas fa-truck-moving", 
            title: "Secretaria Municipal de Serviços Urbanos", 
            url: "https://balneariopinhal.rs.gov.br/rh-24-horas" // Link específico para "RH 24 Horas"
        },
    ],
    gabinet: [
        {
            icon: "fas fa-building", 
            title: "Gabinete do Prefeito", 
            url: "https://balneariopinhal.rs.gov.br/gabinete-do-prefeito//?gabinete-do-prefeito.html" // Link para a página de cidadão
        }
    ]
};

// Função para carregar os serviços
function loadServices(category) {
    const container = document.getElementById("serviceContainer");
    container.innerHTML = ""; // Limpa os serviços anteriores

    const services = servicesData[category];
    services.forEach(service => {
        const serviceCard = document.createElement("div");
        serviceCard.classList.add("col-md-4");
        serviceCard.classList.add("service-card");
        serviceCard.innerHTML = `
            <a href="${service.url}">
                <i class="${service.icon}"></i>
                <h3>${service.title}</h3>
            </a>
        `;

        // Aplica o estilo diretamente no link para remover o outline
        const link = serviceCard.querySelector("a");
        link.style.outline = "none"; // Remove a linha azul (outline) do link

        container.appendChild(serviceCard);
    });
}

// Função para alterar entre as categorias
document.getElementById("citizenTab").addEventListener("click", () => loadServices("citizen"));
document.getElementById("businessTab").addEventListener("click", () => loadServices("business"));
document.getElementById("serverTab").addEventListener("click", () => loadServices("server"));
document.getElementById("secretaryTab").addEventListener("click", () => loadServices("secretary"));
document.getElementById("gabinetTab").addEventListener("click", () => loadServices("gabinet"));

// Carregar categoria Cidadão inicialmente
loadServices("citizen");



// Função para criar os botões na seção de notícias
function createNewsButtons() {
    // Definindo os botões com os textos e links
    const buttonsData = [
        { text: "Banco de Imagens", link: "#", class: "btn btn-info" },
        { text: "Ver Todas", link: "#", class: "btn btn-primary" }
    ];

    // Encontrar o container onde os botões serão inseridos
    const newsSection = document.querySelector(".news");

    // Criar um container para os botões
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("d-flex", "justify-content-center", "mt-4");

    // Iterar sobre os botões e adicioná-los ao container
    buttonsData.forEach(button => {
        const btn = document.createElement("a");
        btn.textContent = button.text;
        btn.href = button.link;
        btn.classList.add(button.class, "mx-2"); // Adiciona as classes do botão
        buttonsContainer.appendChild(btn);
    });

    // Adiciona o container de botões à seção de notícias
    newsSection.appendChild(buttonsContainer);
}

// Chama a função para criar os botões
createNewsButtons();



document.addEventListener("DOMContentLoaded", () => {
    console.log("Página carregada com sucesso!");
});