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
                pageTitle.textContent = this.textContent.trim();
            }
            
            console.log(`Navigation vers: ${this.textContent.trim()}`);
        });
    });
    
    // Ajout d'un bouton pour masquer/afficher la sidebar sur mobile
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (window.innerWidth <= 768) {
        const toggleButton = document.createElement('button');
        toggleButton.innerHTML = '&#9776;'; // Icône hamburger
        toggleButton.className = 'sidebar-toggle';
        document.body.prepend(toggleButton);
        
        toggleButton.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
        });
    }
}

// 2. Système de recherche et filtrage
function initSearchFilter() {
    const searchInput = document.getElementById('searchInput');
    const roleFilter = document.getElementById('roleFilter');
    
    function filterTable() {
        const searchTerm = searchInput.value.toLowerCase();
        const roleValue = roleFilter.value.toLowerCase();
        
        const rows = document.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            const clientName = row.querySelector('.client-name').textContent.toLowerCase();
            const email = row.cells[2].textContent.toLowerCase();
            const role = row.cells[3].textContent.toLowerCase();
            
            const nameMatch = clientName.includes(searchTerm) || email.includes(searchTerm);
            const roleMatch = roleValue === 'all' || role.includes(roleValue);
            
            row.style.display = (nameMatch && roleMatch) ? '' : 'none';
        });
        
        updatePaginationInfo();
    }
    
    searchInput.addEventListener('input', filterTable);
    roleFilter.addEventListener('change', filterTable);
    
    // Filter button functionality
    const filterBtn = document.querySelector('.filter-btn');
    filterBtn.addEventListener('click', function() {
        // Advanced filtering could be implemented here
        // For now, just clear filters
        searchInput.value = '';
        roleFilter.value = 'all';
        filterTable();
        
        showNotification('Filters reset');
    });
}

// 3. Tri des colonnes du tableau
function initTableSorting() {
    const tableHeaders = document.querySelectorAll('thead th');
    
    tableHeaders.forEach((header, index) => {
        if (header.querySelector('.sort-indicator')) {
            header.addEventListener('click', function() {
                const sortIndicator = this.querySelector('.sort-indicator');
                const isAscending = sortIndicator.textContent === '↑';
                
                // Reset all sort indicators
                document.querySelectorAll('.sort-indicator').forEach(ind => {
                    ind.textContent = '↕';
                });
                
                // Set current sort indicator
                sortIndicator.textContent = isAscending ? '↓' : '↑';
                
                // Sort the table
                sortTable(index, !isAscending);
            });
        }
    });
    
    function sortTable(columnIndex, ascending) {
        const tbody = document.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        rows.sort((a, b) => {
            let aValue = a.cells[columnIndex].textContent.trim();
            let bValue = b.cells[columnIndex].textContent.trim();
            
            // Handle numeric sorting
            if (!isNaN(aValue) && !isNaN(bValue)) {
                return ascending ? aValue - bValue : bValue - aValue;
            }
            
            // String sorting
            return ascending 
                ? aValue.localeCompare(bValue) 
                : bValue.localeCompare(aValue);
        });
        
        // Re-append rows in new order
        rows.forEach(row => tbody.appendChild(row));
        
        showNotification('Table sorted');
    }
}

// 4. Pagination fonctionnelle
function initPagination() {
    const rowsPerPage = 7;
    let currentPage = 1;
    
    const tbody = document.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const totalPages = Math.ceil(rows.length / rowsPerPage);
    
    const prevBtn = document.querySelector('.pagination-btn:first-child');
    const nextBtn = document.querySelector('.pagination-btn:last-child');
    const pageNumbers = document.querySelector('.page-numbers');
    
    function updatePagination() {
        // Update page numbers display
        const startIndex = (currentPage - 1) * rowsPerPage + 1;
        const endIndex = Math.min(currentPage * rowsPerPage, rows.length);
        pageNumbers.textContent = `${startIndex} - ${endIndex}`;
        
        // Update pagination controls
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
        
        // Show/hide rows based on current page
        rows.forEach((row, index) => {
            const rowNum = index + 1;
            const showOnPage = rowNum > (currentPage - 1) * rowsPerPage && 
                               rowNum <= currentPage * rowsPerPage;
            
            if (showOnPage && !row.classList.contains('hidden')) {
                row.style.display = '';
            } else if (!showOnPage && !row.classList.contains('hidden')) {
                row.style.display = 'none';
            }
        });
        
        // Update pagination info
        updatePaginationInfo();
    }
    
    // Event listeners for pagination buttons
    prevBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
        }
    });
    
    // Initialize pagination
    updatePagination();
    
    // Expose function to update pagination info
    window.updatePaginationInfo = function() {
        const visibleRows = Array.from(tbody.querySelectorAll('tr')).filter(row => 
            row.style.display !== 'none'
        );
        
        const paginationInfo = document.querySelector('.pagination-info');
        paginationInfo.innerHTML = `Showing <strong>${visibleRows.length}</strong> of <strong>${rows.length}</strong>`;
    };
}

// 5. Actions pour les boutons d'édition
function initEditButtons() {
    const editButtons = document.querySelectorAll('.edit-btn');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const clientId = row.cells[0].textContent;
            const clientName = row.querySelector('.client-name').textContent;
            const clientEmail = row.cells[2].textContent;
            const clientRole = row.cells[3].textContent.trim().toLowerCase().includes('agriculteur') ? 'agriculteur' : 'customer';
            const clientState = row.cells[4].textContent;
            
            openEditModal(clientId, clientName, clientEmail, clientRole, clientState, row);
        });
    });
    
    function openEditModal(id, name, email, role, state, row) {
        // Create modal if it doesn't exist
        let modal = document.querySelector('.modal');
        
        if (!modal) {
            modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>Edit User</h2>
                    <form id="editForm">
                        <div class="form-group">
                            <label for="idInput">ID</label>
                            <input type="text" id="idInput" disabled>
                        </div>
                        <div class="form-group">
                            <label for="nameInput">Name</label>
                            <input type="text" id="nameInput" required>
                        </div>
                        <div class="form-group">
                            <label for="emailInput">Email</label>
                            <input type="email" id="emailInput" required>
                        </div>
                        <div class="form-group">
                            <label for="roleInput">Role</label>
                            <select id="roleInput">
                                <option value="customer">Customer</option>
                                <option value="agriculteur">Agriculteur</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="stateInput">State</label>
                            <select id="stateInput">
                                <option value="national">National</option>
                                <option value="international">International</option>
                            </select>
                        </div>
                        <button type="submit" class="save-btn">Save Changes</button>
                    </form>
                </div>
            `;
            document.body.appendChild(modal);
            
            // Close modal event
            modal.querySelector('.close-modal').addEventListener('click', function() {
                modal.style.display = 'none';
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
            
            // Form submit event
            const form = modal.querySelector('#editForm');
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const idInput = document.getElementById('idInput');
                const nameInput = document.getElementById('nameInput');
                const emailInput = document.getElementById('emailInput');
                const roleInput = document.getElementById('roleInput');
                const stateInput = document.getElementById('stateInput');
                
                const currentRow = document.querySelector(`tbody tr:nth-child(${idInput.value})`);
                
                if (currentRow) {
                    // Update row data
                    currentRow.cells[1].textContent = nameInput.value;
                    currentRow.cells[2].textContent = emailInput.value;
                    
                    const roleBadge = currentRow.cells[3].querySelector('.role-badge');
                    roleBadge.textContent = roleInput.value.charAt(0).toUpperCase() + roleInput.value.slice(1);
                    
                    if (roleInput.value === 'agriculteur') {
                        roleBadge.classList.add('agriculteur');
                    } else {
                        roleBadge.classList.remove('agriculteur');
                    }
                    
                    currentRow.cells[4].textContent = stateInput.value;
                    
                    // Highlight updated row
                    currentRow.classList.add('updated');
                    setTimeout(() => {
                        currentRow.classList.remove('updated');
                    }, 2000);
                    
                    // Show notification
                    showNotification('User updated successfully');
                }
                
                modal.style.display = 'none';
            });
        }
        
        // Fill form with user data
        document.getElementById('idInput').value = id;
        document.getElementById('nameInput').value = name;
        document.getElementById('emailInput').value = email;
        document.getElementById('roleInput').value = role;
        document.getElementById('stateInput').value = state;
        
        // Display modal
        modal.style.display = 'flex';
    }
}

// 6. Dark mode toggle
function initDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    // Check for saved preference
    const darkModeSaved = localStorage.getItem('darkMode') === 'true';
    
    if (darkModeSaved) {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙';
        
        showNotification(isDarkMode ? 'Dark mode enabled' : 'Light mode enabled');
    });
}

// 7. Animations pour les cartes statistiques
function initStatCardAnimations() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Animation could be handled by CSS transitions
            // Additional effects could be added here
        });
    });
}

// 8. Simulation de mises à jour en temps réel
function initLiveUpdates() {
    // Simulate live updates every 30 seconds
    setInterval(() => {
        // Randomly update stat cards
        const statValues = document.querySelectorAll('.stat-value');
        const randomIndex = Math.floor(Math.random() * statValues.length);
        const randomValue = parseInt(statValues[randomIndex].textContent.replace(/,/g, ''));
        
        // Random increase or decrease
        const change = Math.floor(Math.random() * 10) - 3;
        const newValue = randomValue + change;
        
        // Update with animation
        statValues[randomIndex].textContent = newValue.toLocaleString();
        
        // Flash effect
        statValues[randomIndex].style.color = change >= 0 ? '#22a39f' : '#f46036';
        setTimeout(() => {
            statValues[randomIndex].style.color = '';
        }, 1000);
        
        // Notify about major changes
        if (Math.abs(change) > 5) {
            const statTitle = statValues[randomIndex].previousElementSibling.textContent;
            showNotification(`${statTitle} updated: ${change > 0 ? '+' : ''}${change}`);
        }
    }, 30000);
}

// Utility function to show notifications
function showNotification(message) {
    let notification = document.querySelector('.notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}