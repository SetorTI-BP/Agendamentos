document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    const body = document.body;
    const calendarContainer = document.querySelector('.calendar-container');
    const calendarEl = document.getElementById('calendar');

    // Verifica se há preferência salva
    if (localStorage.getItem('dark-mode') === 'true') {
        body.classList.add('dark-mode');
        calendarContainer.classList.add('dark-mode-calendar');
        calendarEl.classList.add('dark-mode-calendar-bg'); // Adiciona a classe para fundo escuro
        toggle.checked = true;
    }

    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            body.classList.add('dark-mode');
            calendarContainer.classList.add('dark-mode-calendar');
            calendarEl.classList.add('dark-mode-calendar-bg');
            localStorage.setItem('dark-mode', 'true');
        } else {
            body.classList.remove('dark-mode');
            calendarContainer.classList.remove('dark-mode-calendar');
            calendarEl.classList.remove('dark-mode-calendar-bg');
            localStorage.setItem('dark-mode', 'false');
        }
    });
});