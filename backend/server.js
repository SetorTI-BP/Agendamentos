require('dotenv').config(); // Carrega as variáveis de ambiente

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const { createEvent } = require('ics');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const schedules = []; // Simulação de banco de dados

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true', // true para SSL, false para TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    requireTLS: true, // Garante que a conexão use STARTTLS
    tls: {
        rejectUnauthorized: false, // Permite conexões TLS autoassinadas
    },
    logger: true, // Habilita logs detalhados
});


// Função para enviar e-mail com lembrete
const sendEmailWithReminder = (schedule, action) => {
    const { name, subject, date, time } = schedule;

    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(':');

    const event = {
        start: [parseInt(year), parseInt(month), parseInt(day), parseInt(hour), parseInt(minute)],
        duration: { hours: 1 },
        title: `Atendimento: ${subject}`,
        description: `Atendimento com ${name}`,
        location: 'SMEC Balneário Pinhal',
    };

    createEvent(event, (error, value) => {
        if (error) {
            console.error('Erro ao criar o evento:', error);
            return;
        }

        const mailOptions = {
            from: 'douglasrodrigues.larre@gmail.com',
            to: 'informaticasmecpinhal@gmail.com',
            subject: `Atendimento ${action}: ${subject}`,
            text: `Um atendimento foi ${action}.\n\nDetalhes:\n- Nome: ${name}\n- Assunto: ${subject}\n- Data: ${date}\n- Horário: ${time}`,
            attachments: [{ filename: 'lembrete.ics', content: value }],
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.error('Erro ao enviar e-mail:', err);
            else console.log('E-mail enviado com sucesso:', info.response);
        });
    });
};

// Rota para obter agendamentos
app.get('/api/schedules', (req, res) => {
    res.json(schedules);
});

// Rota para obter agendamento específico
app.get('/api/schedules/:id', (req, res) => {
    const { id } = req.params;
    const schedule = schedules.find(s => s.id === id);
    if (!schedule) {
        return res.status(404).json({ message: 'Agendamento não encontrado' });
    }
    res.json(schedule);
});

// Rota para adicionar agendamento
app.post('/api/schedules', (req, res) => {
    const { name, subject, date, time } = req.body;

    if (!name || !subject || !date || !time) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const newSchedule = { id: uuidv4(), name, subject, date, time };
    schedules.push(newSchedule);

    sendEmailWithReminder(newSchedule, 'criado');
    res.status(201).json(newSchedule);
});

// Rota para editar agendamento
// Rota para editar agendamento
app.put('/api/schedules/:id', (req, res) => {
    const { id } = req.params;
    const { name, subject, date, time } = req.body;

    const index = schedules.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Agendamento não encontrado' });
    }

    const updatedSchedule = { 
        id, 
        name: name || schedules[index].name, 
        subject: subject || schedules[index].subject, 
        date: date || schedules[index].date, 
        time: time || schedules[index].time 
    };

    schedules[index] = updatedSchedule;

    sendEmailWithReminder(updatedSchedule, 'modificado');
    res.status(200).json({ message: 'Agendamento atualizado', updatedSchedule });
});


// Rota para excluir agendamento
app.delete('/api/schedules/:id', (req, res) => {
    const { id } = req.params;
    const index = schedules.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Agendamento não encontrado' });
    }

    const deletedSchedule = schedules.splice(index, 1)[0];
    sendEmailWithReminder(deletedSchedule, 'excluído');
    res.status(200).json({ message: 'Agendamento excluído com sucesso' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
