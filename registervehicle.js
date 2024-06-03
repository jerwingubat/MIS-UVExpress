const toggleSidebarButton = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');
const content = document.querySelector('.content');
let isSidebarOpen = false;

toggleSidebarButton.addEventListener('click', function () {
    if (isSidebarOpen) {
        sidebar.classList.remove('active');
        content.classList.remove('active');
        toggleSidebarButton.style.backgroundImage = 'url("menubtn.png")';
    } else {
        sidebar.classList.add('active');
        content.classList.add('active');
        toggleSidebarButton.style.backgroundImage = 'url("exitmenubtn.png")';
    }
    isSidebarOpen = !isSidebarOpen;
});
