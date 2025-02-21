document.addEventListener('DOMContentLoaded', async () => {
    const calendarEl = document.getElementById('calendar');
    const monthYearLabel = document.getElementById('monthYearLabel');

    // Função para buscar os agendamentos da API
    const fetchSchedules = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/schedules');
            return response.data.map(schedule => ({
                title: schedule.subject,
                start: `${schedule.date}T${schedule.time}`,
                id: schedule.id
            }));
        } catch (error) {
            console.error('Erro ao buscar os agendamentos:', error);
            return [];
        }
    };

    // Função para colocar o calendário em tela cheia
    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            calendarEl.requestFullscreen().catch(err => {
                alert(`Erro ao tentar entrar em tela cheia: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    // Inicializar o calendário
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'pt-br',
        events: await fetchSchedules(),
        editable: true,
        headerToolbar: {
            left: 'prev,next today fullscreen', // Adiciona o botão fullscreen
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        buttonText: {
            today: 'Hoje',
            month: 'Mês',
            week: 'Semana',
            day: 'Dia'
        },
        datesSet: (info) => {
            const dataAtual = new Date(info.view.currentStart);
            const mesAtual = dataAtual.toLocaleString('pt-BR', { month: 'long' });
            const anoAtual = dataAtual.getFullYear();
            monthYearLabel.textContent = `${mesAtual} ${anoAtual}`;
        },
        eventClick: async (info) => {
            const confirmDelete = confirm(`Deseja excluir o agendamento "${info.event.title}"?`);
            if (confirmDelete) {
                try {
                    await axios.delete(`http://localhost:3000/api/schedules/${info.event.id}`);
                    alert('Agendamento excluído com sucesso!');
                    info.event.remove();
                } catch (error) {
                    alert('Erro ao excluir o agendamento.');
                }
            }
        },
        dayCellClassNames: function(info) {
            const date = info.date;
            const currentMonth = new Date().getMonth();
            const cellMonth = date.getMonth();

            if (cellMonth !== currentMonth) {
                return 'highlight';
            }
            return '';
        }
    });

    calendar.render();

    // Adiciona o evento de clique para o botão fullscreen
    const fullscreenButton = document.querySelector('.fc-fullscreen-button');
    if (fullscreenButton) {
        fullscreenButton.addEventListener('click', toggleFullScreen);
    }
});
