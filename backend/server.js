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

// Função para enviar e-mail com lembrete
const sendEmailWithReminder = (schedule, action) => {
    const { name, subject, date, time } = schedule;

    // Formatar data e hora corretamente
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(':');

    const event = {
        start: [parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute)], // [ano, mês, dia, hora, minuto]
        duration: { hours: 1 },
        title: `Atendimento: ${subject}`,
        description: `Atendimento com ${name}`,
        location: 'SMEC Balneário Pinhal',
    };

    // Criar evento ICS
    createEvent(event, (error, value) => {
        if (error) {
            console.error('Erro ao criar o evento:', error);
            return;
        }

        console.log('Evento ICS gerado:', value);  // Verifique a saída no console

        // Configuração do transporte de e-mail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'douglasrodrigues.larre@gmail.com', // Substitua com seu e-mail
                pass: 'zedy gpzm cijk iivo', // Substitua com sua senha de app
            },
        });

        // Configuração da mensagem de e-mail
        const mailOptions = {
            from: 'douglasrodrigues.larre@gmail.com',
            to: 'bomtourofc@gmail.com', // E-mail para o qual deseja enviar
            subject: `Atendimento ${action}: ${subject}`,
            text: `Um atendimento foi ${action}.\n\nDetalhes:\n- Nome: ${name}\n- Assunto: ${subject}\n- Data: ${date}\n- Horário: ${time}`,
            attachments: [
                {
                    filename: 'lembrete.ics',
                    content: value, // O conteúdo ICS gerado
                },
            ],
        };

        // Enviar o e-mail
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Erro ao enviar e-mail:', err);
            } else {
                console.log('E-mail enviado:', info.response);
            }
        });
    });
};

// Rota de teste para enviar e-mail
app.get('/test-email', (req, res) => {
    const testSchedule = {
        name: 'João Silva',
        subject: 'Consulta Médica',
        date: '2025-01-21',  // Data do evento (ano-mês-dia)
        time: '15:00', // Horário do evento (hora:minuto)
    };

    // Envia o e-mail com a função de lembrete
    sendEmailWithReminder(testSchedule, 'criado');

    res.send('E-mail de teste enviado.');
});

// Rota para obter agendamentos
app.get('/api/schedules', (req, res) => {
    res.json(schedules);
});

// Rota para adicionar agendamento
app.post('/api/schedules', (req, res) => {
    const { name, subject, date, time } = req.body;

    // Validação simples para garantir que todos os campos foram enviados
    if (!name || !subject || !date || !time) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    // Criação do novo agendamento
    const newSchedule = { id: uuidv4(), name, subject, date, time };
    schedules.push(newSchedule);

    // Envia e-mail com lembrete
    sendEmailWithReminder(newSchedule, 'criado');

    res.status(201).json(newSchedule);
});

// Rota para editar agendamento
app.put('/api/schedules/:id', (req, res) => {
    const { id } = req.params;
    const { name, subject, date, time } = req.body;

    const index = schedules.findIndex(s => s.id === id);
    if (index !== -1) {
        schedules[index] = { id, name, subject, date, time };

        // Envia e-mail com lembrete para agendamento modificado
        sendEmailWithReminder(schedules[index], 'modificado');
        res.status(200).json(schedules[index]);
    } else {
        res.status(404).json({ message: 'Agendamento não encontrado' });
    }
});

// Rota para excluir agendamento
app.delete('/api/schedules/:id', (req, res) => {
    const { id } = req.params;
    const index = schedules.findIndex(s => s.id === id);
    if (index !== -1) {
        const deletedSchedule = schedules.splice(index, 1)[0];

        // Envia e-mail com lembrete para agendamento excluído
        sendEmailWithReminder(deletedSchedule, 'excluído');
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Agendamento não encontrado' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

/* 
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const { createEvent } = require('ics');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const schedules = []; // Simulação de banco de dados

// Configuração global do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Função para enviar e-mail com lembrete
const sendEmailWithReminder = (schedule, action) => {
    const { name, subject, date, time } = schedule;

    // Formatar data e hora corretamente
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(':');

    const event = {
        start: [parseInt(year), parseInt(month), parseInt(day), parseInt(hour), parseInt(minute)],
        duration: { hours: 1 },
        title: Atendimento: ${subject},
        description: Atendimento com ${name},
        location: 'SMEC Balneário Pinhal',
    };

    createEvent(event, (error, value) => {
        if (error) {
            console.error('Erro ao criar o evento ICS:', error);
            return;
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'bomtourofc@gmail.com',
            subject: Atendimento ${action}: ${subject},
            text: Um atendimento foi ${action}.\n\nDetalhes:\n- Nome: ${name}\n- Assunto: ${subject}\n- Data: ${date}\n- Horário: ${time},
            attachments: [
                {
                    filename: 'lembrete.ics',
                    content: value,
                },
            ],
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Erro ao enviar e-mail:', err.message);
            } else {
                console.log(E-mail enviado para ${mailOptions.to} com ID: ${info.messageId});
            }
        });
    });
};

// Rota de teste para enviar e-mail
app.get('/test-email', (req, res) => {
    const testSchedule = {
        name: 'João Silva',
        subject: 'Consulta Médica',
        date: '2025-01-21',
        time: '15:00',
    };

    sendEmailWithReminder(testSchedule, 'criado');
    res.send('E-mail de teste enviado.');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(Servidor rodando em http://localhost:${PORT});
});
 /*
