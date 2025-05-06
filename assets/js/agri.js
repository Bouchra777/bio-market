// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // 1. Gestion des menus de la sidebar
    initSidebar();
    
    // 2. Filtrage et recherche des clients
    initSearchFilter();
    
    // 3. Tri des colonnes du tableau
    initTableSorting();
    
    // 4. Pagination fonctionnelle
    initPagination();
    
    // 5. Actions pour les boutons d'édition
    initEditButtons();
    
    // 6. Création d'un mode sombre et d'un toggle
    initDarkMode();
    
    // 7. Ajout d'animations sur les cartes statistiques
    initStatCardAnimations();
    
    // 8. Mise à jour en temps réel des données (simulation)
    initLiveUpdates();
});

      document.addEventListener("DOMContentLoaded", function () {
        // Add hamburger menu button to the header
        const header = document.querySelector("header");
        const navMenu = document.querySelector(".nav-menu");

        // Create the menu toggle button
        const menuToggle = document.createElement("button");
        menuToggle.className = "menu-toggle";
        menuToggle.innerHTML = "☰";
        header.appendChild(menuToggle);

        // Toggle menu when hamburger is clicked
        menuToggle.addEventListener("click", function () {
          navMenu.classList.toggle("active");
        });

        // Close menu when clicking elsewhere
        document.addEventListener("click", function (event) {
          if (!header.contains(event.target)) {
            navMenu.classList.remove("active");
          }
        });

        // Responsive handling for window resize
        window.addEventListener("resize", function () {
          if (window.innerWidth > 768) {
            navMenu.classList.remove("active");
          }
        });
      });
// 1. Fonctions pour la sidebar
function initSidebar() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Retirer la classe active de tous les items
            menuItems.forEach(mi => mi.classList.remove('active'));
            
            // Ajouter la classe active à l'item cliqué
            this.classList.add('active');
            
            // Mise à jour du titre de la page pour correspondre à l'élément de menu
            const pageTitle = document.querySelector('.page-title');
            if (pageTitle) {
                pageTitle.textContent = this.textContent;
            }
            
            // Si nous étions sur une vraie application multi-pages, 
            // nous redirigerions ou chargerions du contenu ici
            console.log(`Navigation vers: ${this.textContent}`);
        });
    });
    
    // Ajout d'un bouton pour masquer/afficher la sidebar sur mobile
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    const toggleButton = document.createElement('button');
    toggleButton.innerHTML = '&#9776;'; // Icône hamburger
    toggleButton.className = 'sidebar-toggle';
    document.body.prepend(toggleButton);
    
    toggleButton.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
    });
}

// 2. Système de recherche et filtrage
function initSearchFilter() {
    // Création de l'élément de recherche
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    
    searchContainer.innerHTML = `
        <input type="text" id="searchInput" placeholder="Rechercher un client...">
        <select id="statusFilter">
            <option value="all">Tous les états</option>
            <option value="payé">Payé</option>
            <option value="en cours">En cours</option>
        </select>
    `;
    
    // Insérer avant le tableau
    const tableContainer = document.querySelector('.table-container');
    tableContainer.parentNode.insertBefore(searchContainer, tableContainer);
    
    // Logique de recherche
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    
    function filterTable() {
        const searchTerm = searchInput.value.toLowerCase();
        const statusValue = statusFilter.value;
        
        const rows = document.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            const clientName = row.querySelector('.client-name').textContent.toLowerCase();
            const status = row.cells[5].textContent.toLowerCase();
            
            const nameMatch = clientName.includes(searchTerm);
            const statusMatch = statusValue === 'all' || status === statusValue;
            
            row.style.display = (nameMatch && statusMatch) ? '' : 'none';
        });
        
        updatePaginationInfo();
    }
    
    searchInput.addEventListener('input', filterTable);
    statusFilter.addEventListener('change', filterTable);
}

// 3. Tri des colonnes du tableau
function initTableSorting() {
    const headers = document.querySelectorAll('thead th');
    
    headers.forEach((header, index) => {
        // Ignorer la dernière colonne (boutons d'édition)
        if (index < headers.length - 1) {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => sortTable(index));
            
            // Ajouter un indicateur de tri
            const sortIndicator = document.createElement('span');
            sortIndicator.className = 'sort-indicator';
            sortIndicator.textContent = ' ↕';
            header.appendChild(sortIndicator);
        }
    });
}

function sortTable(columnIndex) {
    const table = document.querySelector('table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // État de tri actuel
    const header = document.querySelectorAll('thead th')[columnIndex];
    const currentOrder = header.getAttribute('data-order') || 'asc';
    const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
    
    // Mettre à jour l'indicateur de tri
    document.querySelectorAll('thead th').forEach(th => {
        th.setAttribute('data-order', '');
        const indicator = th.querySelector('.sort-indicator');
        if (indicator) indicator.textContent = ' ↕';
    });
    
    header.setAttribute('data-order', newOrder);
    const indicator = header.querySelector('.sort-indicator');
    indicator.textContent = newOrder === 'asc' ? ' ↑' : ' ↓';
    
    // Trier les lignes
    rows.sort((a, b) => {
        let aValue = a.cells[columnIndex].textContent;
        let bValue = b.cells[columnIndex].textContent;
        
        // Tri numérique si c'est un nombre
        if (!isNaN(aValue) && !isNaN(bValue)) {
            aValue = parseFloat(aValue);
            bValue = parseFloat(bValue);
        }
        
        if (aValue < bValue) return newOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return newOrder === 'asc' ? 1 : -1;
        return 0;
    });
    
    // Réorganiser les lignes
    rows.forEach(row => tbody.appendChild(row));
}

// 4. Système de pagination fonctionnel
function initPagination() {
    const rowsPerPage = 5; // Nombre de lignes par page
    let currentPage = 1;
    
    const prevButton = document.querySelector('.pagination-btn:first-of-type');
    const nextButton = document.querySelector('.pagination-btn:last-of-type');
    
    function showPage(page) {
        const rows = document.querySelectorAll('tbody tr');
        const visibleRows = Array.from(rows).filter(row => row.style.display !== 'none');
        const startIndex = (page - 1) * rowsPerPage;
        
        visibleRows.forEach((row, index) => {
            row.classList.toggle('hidden', index < startIndex || index >= startIndex + rowsPerPage);
        });
        
        // Mettre à jour l'indicateur de page
        const pageNumbers = document.querySelector('.page-numbers');
        const startRow = startIndex + 1;
        const endRow = Math.min(startIndex + rowsPerPage, visibleRows.length);
        pageNumbers.textContent = `${startRow} - ${endRow}`;
        
        // Mettre à jour l'info de pagination
        updatePaginationInfo();
        
        // Activer/désactiver les boutons selon la position
        prevButton.disabled = page === 1;
        nextButton.disabled = endRow >= visibleRows.length;
    }
    
    function updatePaginationInfo() {
        const visibleRows = Array.from(document.querySelectorAll('tbody tr'))
            .filter(row => row.style.display !== 'none');
        const paginationInfo = document.querySelector('.pagination-info');
        
        if (paginationInfo) {
            const totalDisplayed = visibleRows.length;
            const totalRows = document.querySelectorAll('tbody tr').length;
            paginationInfo.innerHTML = `Showing <strong>${totalDisplayed}</strong> of <strong>${totalRows}</strong>`;
        }
    }
    
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });
    
    nextButton.addEventListener('click', () => {
        const rows = Array.from(document.querySelectorAll('tbody tr'))
            .filter(row => row.style.display !== 'none');
        const maxPage = Math.ceil(rows.length / rowsPerPage);
        
        if (currentPage < maxPage) {
            currentPage++;
            showPage(currentPage);
        }
    });
    
    // Initialiser la pagination
    showPage(currentPage);
}

// 5. Fonctionnalité des boutons d'édition
function initEditButtons() {
    const editButtons = document.querySelectorAll('.edit-btn');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const clientId = row.cells[0].textContent;
            const clientName = row.cells[1].textContent;
            
            // Création d'un modal pour éditer
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>Modifier le client</h2>
                    <form id="editClientForm">
                        <div class="form-group">
                            <label for="editName">Nom</label>
                            <input type="text" id="editName" value="${clientName}" required>
                        </div>
                        <div class="form-group">
                            <label for="editStatus">État</label>
                            <select id="editStatus">
                                <option value="payé" ${row.cells[5].textContent === 'payé' ? 'selected' : ''}>Payé</option>
                                <option value="en cours" ${row.cells[5].textContent === 'en cours' ? 'selected' : ''}>En cours</option>
                            </select>
                        </div>
                        <button type="submit" class="save-btn">Enregistrer</button>
                    </form>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Événements du modal
            modal.querySelector('.close-modal').addEventListener('click', () => {
                document.body.removeChild(modal);
            });
            
            modal.querySelector('#editClientForm').addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Mise à jour des données dans le tableau
                row.cells[1].textContent = document.getElementById('editName').value;
                row.cells[5].textContent = document.getElementById('editStatus').value;
                
                // Feedback visuel
                row.classList.add('updated');
                setTimeout(() => row.classList.remove('updated'), 2000);
                
                // Fermer le modal
                document.body.removeChild(modal);
            });
        });
    });
}

// 6. Mode sombre
function initDarkMode() {
    // Créer le bouton de toggle
    const toggleButton = document.createElement('button');
    toggleButton.className = 'dark-mode-toggle';
    toggleButton.innerHTML = '🌙';
    
    // Ajouter à l'interface utilisateur, près des infos utilisateur
    const userInfo = document.querySelector('.user-info');
    userInfo.appendChild(toggleButton);
    
    // Vérifier la préférence enregistrée
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        toggleButton.innerHTML = '☀️';
    }
    
    // Gestion du toggle
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark.toString());
        toggleButton.innerHTML = isDark ? '☀️' : '🌙';
    });
}

// 7. Animations pour les cartes statistiques
function initStatCardAnimations() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        // Animation au survol
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        });
        
        // Animation de comptage pour les valeurs
        const statValue = card.querySelector('.stat-value');
        const finalValue = parseInt(statValue.textContent);
        
        statValue.textContent = '0';
        
        let currentValue = 0;
        const increment = Math.max(1, Math.floor(finalValue / 50));
        const interval = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(interval);
            }
            statValue.textContent = currentValue.toLocaleString();
        }, 30);
    });
}

// 8. Simuler des mises à jour en temps réel
function initLiveUpdates() {
    // Simuler des notifications toutes les 30 secondes
    setInterval(() => {
        const statCards = document.querySelectorAll('.stat-card');
        const randomCard = statCards[Math.floor(Math.random() * statCards.length)];
        const statValue = randomCard.querySelector('.stat-value');
        const todayNumber = randomCard.querySelector('.today-number');
        
        // Incrémenter la valeur
        const currentValue = parseInt(statValue.textContent.replace(/,/g, ''));
        statValue.textContent = (currentValue + 1).toLocaleString();
        
        // Incrémenter la valeur du jour
        const todayValue = parseInt(todayNumber.textContent);
        todayNumber.textContent = todayValue + 1;
        
        // Effet visuel
        randomCard.classList.add('pulse-animation');
        setTimeout(() => randomCard.classList.remove('pulse-animation'), 1000);
        
        // Notification
        showNotification('Nouvelle activité détectée!');
    }, 30000);
}

// Fonction utilitaire pour afficher des notifications
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}