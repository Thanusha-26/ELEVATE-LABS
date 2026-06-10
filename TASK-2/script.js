// ============================================
// PRODUCTIVITY DASHBOARD - TASK MANAGER
// ============================================

// Application State
const state = {
    tasks: [],
    taskId: 0,
    currentView: 'dashboard',
    filters: {
        status: '',
        priority: '',
        categories: ['work', 'personal', 'health', 'finance']
    },
    sortBy: 'date-desc',
    editingTaskId: null,
    draggedTaskId: null
};

// DOM Elements
const DOM = {
    // Sidebar
    sidebarLinks: document.querySelectorAll('.sidebar-link'),
    categoryCheckboxes: document.querySelectorAll('.category-checkbox input'),

    // Header
    pageTitle: document.getElementById('pageTitle'),
    pageSubtitle: document.getElementById('pageSubtitle'),
    addTaskBtn: document.getElementById('addTaskBtn'),

    // Stats
    totalTasksStat: document.getElementById('totalTasksStat'),
    activeTasksStat: document.getElementById('activeTasksStat'),
    completedTasksStat: document.getElementById('completedTasksStat'),
    completionRateStat: document.getElementById('completionRateStat'),

    // Progress
    progressFill: document.getElementById('progressFill'),
    progressPercent: document.getElementById('progressPercent'),

    // Tasks
    tasksContainer: document.getElementById('tasksContainer'),
    emptyState: document.getElementById('emptyState'),
    emptyStateBtn: document.getElementById('emptyStateBtn'),

    // Filters
    statusFilter: document.getElementById('statusFilter'),
    priorityFilter: document.getElementById('priorityFilter'),
    sortSelect: document.getElementById('sortSelect'),
    navSearch: document.getElementById('navSearch'),

    // Modal
    taskModal: document.getElementById('taskModal'),
    taskForm: document.getElementById('taskForm'),
    modalTitle: document.getElementById('modalTitle'),
    modalClose: document.getElementById('modalClose'),
    formCancel: document.getElementById('formCancel'),
    taskName: document.getElementById('taskName'),
    taskDescription: document.getElementById('taskDescription'),
    taskCategory: document.getElementById('taskCategory'),
    taskPriority: document.getElementById('taskPriority'),
    taskDueDate: document.getElementById('taskDueDate'),
    taskTags: document.getElementById('taskTags'),
    taskRecurring: document.getElementById('taskRecurring'),

    // Delete Modal
    deleteModal: document.getElementById('deleteModal'),
    deleteClose: document.getElementById('deleteClose'),
    deleteCancel: document.getElementById('deleteCancel'),
    confirmDelete: document.getElementById('confirmDelete'),

    // Theme
    themeToggle: document.getElementById('themeToggle'),

    // Toast
    toastContainer: document.getElementById('toastContainer')
};

// Category Colors
const categoryColors = {
    work: '#3b82f6',
    personal: '#8b5cf6',
    health: '#10b981',
    finance: '#f59e0b'
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    loadTasksFromStorage();
    setupEventListeners();
    applyTheme();
    render();
    console.log('📊 Productivity Dashboard Loaded ✓');
}

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
    // Sidebar Navigation
    DOM.sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const view = e.currentTarget.dataset.view;
            switchView(view);
        });
    });

    // Add Task
    DOM.addTaskBtn.addEventListener('click', openAddTaskModal);
    DOM.emptyStateBtn.addEventListener('click', openAddTaskModal);

    // Task Form
    DOM.taskForm.addEventListener('submit', handleTaskSubmit);
    DOM.modalClose.addEventListener('click', closeModal);
    DOM.formCancel.addEventListener('click', closeModal);
    DOM.taskModal.addEventListener('click', closeModalOnBackdrop);

    // Delete Modal
    DOM.deleteClose.addEventListener('click', closeDeleteModal);
    DOM.deleteCancel.addEventListener('click', closeDeleteModal);
    DOM.confirmDelete.addEventListener('click', confirmDeleteTask);
    DOM.deleteModal.addEventListener('click', closeDeleteModalOnBackdrop);

    // Filters
    DOM.statusFilter.addEventListener('change', (e) => {
        state.filters.status = e.target.value;
        render();
    });

    DOM.priorityFilter.addEventListener('change', (e) => {
        state.filters.priority = e.target.value;
        render();
    });

    DOM.sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        render();
    });

    DOM.navSearch.addEventListener('input', debounce(() => {
        render();
    }, 300));

    // Categories
    DOM.categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateCategories();
        });
    });

    // Theme
    DOM.themeToggle.addEventListener('click', toggleTheme);

    // Modal Backdrop
    DOM.taskModal.addEventListener('click', closeModalOnBackdrop);
    DOM.deleteModal.addEventListener('click', closeDeleteModalOnBackdrop);
}

// ============================================
// THEME MANAGEMENT
// ============================================
function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function applyTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    DOM.themeToggle.querySelector('.theme-icon').textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ============================================
// VIEW MANAGEMENT
// ============================================
function switchView(view) {
    state.currentView = view;

    // Update active nav item
    DOM.sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.view === view) {
            link.classList.add('active');
        }
    });

    // Update header
    const titles = {
        dashboard: { title: 'Dashboard', subtitle: 'Welcome back, let\'s be productive' },
        today: { title: 'Today', subtitle: 'Tasks due today' },
        upcoming: { title: 'Upcoming', subtitle: 'Your upcoming tasks' },
        completed: { title: 'Completed', subtitle: 'Well done!' }
    };

    const titleData = titles[view];
    DOM.pageTitle.textContent = titleData.title;
    DOM.pageSubtitle.textContent = titleData.subtitle;

    // Reset filters when switching views
    if (view !== 'dashboard') {
        state.filters.status = '';
        DOM.statusFilter.value = '';
    }

    render();
}

// ============================================
// TASK MODAL MANAGEMENT
// ============================================
function openAddTaskModal() {
    state.editingTaskId = null;
    DOM.modalTitle.textContent = 'Add New Task';
    DOM.taskForm.reset();
    DOM.taskModal.classList.add('show');
    DOM.taskName.focus();
}

function openEditTaskModal(taskId) {
    const task = state.tasks.find(t => t.id === taskId);
    if (!task) return;

    state.editingTaskId = taskId;
    DOM.modalTitle.textContent = 'Edit Task';

    DOM.taskName.value = task.name;
    DOM.taskDescription.value = task.description;
    DOM.taskCategory.value = task.category;
    DOM.taskPriority.value = task.priority;
    DOM.taskDueDate.value = task.dueDate;
    DOM.taskTags.value = task.tags.join(', ');
    DOM.taskRecurring.checked = task.recurring;

    DOM.taskModal.classList.add('show');
    DOM.taskName.focus();
}

function closeModal() {
    DOM.taskModal.classList.remove('show');
    state.editingTaskId = null;
}

function closeModalOnBackdrop(e) {
    if (e.target === DOM.taskModal) {
        closeModal();
    }
}

function handleTaskSubmit(e) {
    e.preventDefault();

    const taskData = {
        name: DOM.taskName.value.trim(),
        description: DOM.taskDescription.value.trim(),
        category: DOM.taskCategory.value,
        priority: DOM.taskPriority.value,
        dueDate: DOM.taskDueDate.value,
        tags: DOM.taskTags.value.split(',').map(t => t.trim()).filter(t => t),
        recurring: DOM.taskRecurring.checked
    };

    if (!taskData.name) {
        showToast('Task name is required', 'error');
        return;
    }

    if (state.editingTaskId) {
        updateTask(state.editingTaskId, taskData);
        showToast('Task updated successfully', 'success');
    } else {
        addTask(taskData);
        showToast('Task created successfully', 'success');
    }

    closeModal();
    saveTasksToStorage();
    render();
}

// ============================================
// TASK OPERATIONS
// ============================================
function addTask(taskData) {
    const task = {
        id: state.taskId++,
        ...taskData,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    state.tasks.push(task);
    return task;
}

function updateTask(taskId, taskData) {
    const task = state.tasks.find(t => t.id === taskId);
    if (task) {
        Object.assign(task, taskData, {
            updatedAt: new Date().toISOString()
        });
    }
}

function toggleTaskCompletion(taskId) {
    const task = state.tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        task.updatedAt = new Date().toISOString();
        saveTasksToStorage();
        render();
    }
}

// Delete Management
let deleteTargetId = null;

function openDeleteModal(taskId) {
    deleteTargetId = taskId;
    DOM.deleteModal.classList.add('show');
}

function closeDeleteModal() {
    DOM.deleteModal.classList.remove('show');
    deleteTargetId = null;
}

function closeDeleteModalOnBackdrop(e) {
    if (e.target === DOM.deleteModal) {
        closeDeleteModal();
    }
}

function confirmDeleteTask() {
    if (deleteTargetId !== null) {
        deleteTask(deleteTargetId);
        closeDeleteModal();
        showToast('Task deleted', 'success');
    }
}

function deleteTask(taskId) {
    state.tasks = state.tasks.filter(t => t.id !== taskId);
    saveTasksToStorage();
    render();
}

// ============================================
// FILTERING & SORTING
// ============================================
function getFilteredAndSortedTasks() {
    let filtered = state.tasks;

    // View filter
    switch (state.currentView) {
        case 'today':
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            filtered = filtered.filter(t => {
                if (!t.dueDate) return false;
                const taskDate = new Date(t.dueDate);
                taskDate.setHours(0, 0, 0, 0);
                return !t.completed && taskDate.getTime() === today.getTime();
            });
            break;
        case 'upcoming':
            const tomorrow = new Date();
            tomorrow.setHours(0, 0, 0, 0);
            filtered = filtered.filter(t => {
                if (!t.dueDate) return false;
                const taskDate = new Date(t.dueDate);
                taskDate.setHours(0, 0, 0, 0);
                return !t.completed && taskDate > tomorrow;
            });
            break;
        case 'completed':
            filtered = filtered.filter(t => t.completed);
            break;
    }

    // Status filter
    if (state.filters.status) {
        filtered = filtered.filter(t =>
            state.filters.status === 'pending' ? !t.completed : t.completed
        );
    }

    // Priority filter
    if (state.filters.priority) {
        filtered = filtered.filter(t => t.priority === state.filters.priority);
    }

    // Category filter
    filtered = filtered.filter(t => state.filters.categories.includes(t.category));

    // Search filter
    const searchTerm = DOM.navSearch.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(t =>
            t.name.toLowerCase().includes(searchTerm) ||
            t.description.toLowerCase().includes(searchTerm) ||
            t.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }

    // Sorting
    filtered.sort((a, b) => {
        switch (state.sortBy) {
            case 'date-asc':
                return new Date(a.createdAt) - new Date(b.createdAt);
            case 'date-desc':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'priority':
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
            case 'due-date':
                return (a.dueDate || '9999').localeCompare(b.dueDate || '9999');
            default:
                return 0;
        }
    });

    return filtered;
}

function updateCategories() {
    state.filters.categories = Array.from(DOM.categoryCheckboxes)
        .filter(input => input.checked)
        .map(input => input.value);
    render();
}

// ============================================
// STATISTICS
// ============================================
function updateStatistics() {
    const total = state.tasks.length;
    const completed = state.tasks.filter(t => t.completed).length;
    const active = total - completed;
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

    DOM.totalTasksStat.textContent = total;
    DOM.activeTasksStat.textContent = active;
    DOM.completedTasksStat.textContent = completed;
    DOM.completionRateStat.textContent = `${completionRate}%`;

    // Update progress bar
    DOM.progressFill.style.width = `${completionRate}%`;
    DOM.progressPercent.textContent = `${completionRate}%`;
}

// ============================================
// RENDERING
// ============================================
function render() {
    updateStatistics();
    renderTasks();
}

function renderTasks() {
    const tasks = getFilteredAndSortedTasks();
    DOM.tasksContainer.innerHTML = '';

    if (tasks.length === 0) {
        DOM.emptyState.classList.add('show');
        return;
    }

    DOM.emptyState.classList.remove('show');

    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        DOM.tasksContainer.appendChild(taskElement);
    });
}

function createTaskElement(task) {
    const li = document.createElement('div');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.id = `task-${task.id}`;
    li.draggable = true;

    const daysUntilDue = task.dueDate
        ? Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24))
        : null;

    const dueDateClass = daysUntilDue === null
        ? ''
        : daysUntilDue < 0
        ? 'overdue'
        : daysUntilDue === 0
        ? 'today'
        : 'upcoming';

    const tagsHTML = task.tags.length > 0
        ? task.tags.map(tag => `<span class="task-meta-item">#${escapeHtml(tag)}</span>`).join('')
        : '';

    li.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-task-id="${task.id}">

        <div class="task-content">
            <div class="task-name">${escapeHtml(task.name)}</div>
            ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
            <div class="task-meta">
                <span class="task-priority ${task.priority}">${getPriorityLabel(task.priority)}</span>
                <span class="task-category-badge ${task.category}">${capitalize(task.category)}</span>
                ${task.dueDate ? `<span class="task-meta-item">📅 ${formatDate(task.dueDate)}</span>` : ''}
                ${task.recurring ? `<span class="task-meta-item">🔄 Recurring</span>` : ''}
                ${tagsHTML}
            </div>
        </div>

        <div class="task-actions">
            <button class="task-action-btn edit" data-task-id="${task.id}" title="Edit">✏️</button>
            <button class="task-action-btn delete" data-task-id="${task.id}" title="Delete">🗑️</button>
        </div>
    `;

    // Event listeners
    li.querySelector('.task-checkbox').addEventListener('change', (e) => {
        toggleTaskCompletion(parseInt(e.target.dataset.taskId));
    });

    li.querySelector('.task-action-btn.edit').addEventListener('click', (e) => {
        openEditTaskModal(parseInt(e.target.dataset.taskId));
    });

    li.querySelector('.task-action-btn.delete').addEventListener('click', (e) => {
        openDeleteModal(parseInt(e.target.dataset.taskId));
    });

    // Drag and drop
    li.addEventListener('dragstart', handleDragStart);
    li.addEventListener('dragend', handleDragEnd);

    return li;
}

// ============================================
// DRAG AND DROP
// ============================================
function handleDragStart(e) {
    state.draggedTaskId = parseInt(e.currentTarget.id.replace('task-', ''));
    e.currentTarget.style.opacity = '0.5';
}

function handleDragEnd(e) {
    e.currentTarget.style.opacity = '1';
}

// ============================================
// STORAGE
// ============================================
function saveTasksToStorage() {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
    localStorage.setItem('taskId', state.taskId.toString());
}

function loadTasksFromStorage() {
    const savedTasks = localStorage.getItem('tasks');
    const savedTaskId = localStorage.getItem('taskId');

    if (savedTasks) {
        state.tasks = JSON.parse(savedTasks);
        state.taskId = parseInt(savedTaskId) || state.tasks.length;
    }
}

// ============================================
// NOTIFICATIONS
// ============================================
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast`;

    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️'
    };

    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <span class="toast-message">${escapeHtml(message)}</span>
    `;

    // Add type class after element is created
    setTimeout(() => {
        toast.classList.add(type);
    }, 0);

    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() === today.getTime()) return 'Today';
    if (date.getTime() === tomorrow.getTime()) return 'Tomorrow';

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    });
}

function getPriorityLabel(priority) {
    const labels = {
        high: '🔴 High',
        medium: '🟡 Medium',
        low: '🟢 Low'
    };
    return labels[priority] || 'Medium';
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// ============================================
// END OF APPLICATION
// ============================================
