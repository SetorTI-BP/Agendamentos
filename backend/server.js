require('dotenv').config(); // Carrega as variáveis de ambiente

// As variáveis do .env
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_SECURE = process.env.SMTP_SECURE === 'true'; // Converte o valor para booleano


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
        start: [parseInt(year), parseInt(month), parseInt(day), parseInt(hour), parseInt(minute)], // Corrigido o formato do mês
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

        console.log('Evento ICS gerado:', value);

        // Configuração do transporte de e-mail
        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: SMTP_SECURE, // Use true para 465, false para outras portas
            auth: {
                user: EMAIL_USER, // Usando variável de ambiente
                pass: EMAIL_PASS, // Usando variável de ambiente
            },
        });        

        // Verificar conexão SMTP antes de enviar
        transporter.verify((err, success) => {
            if (err) {
                console.error('Erro ao conectar ao SMTP:', err);
                return;
            }

            console.log('Servidor SMTP pronto para enviar e-mails!');

            // Configuração da mensagem de e-mail
            const mailOptions = {
                from: 'douglasrodrigues.larre@gmail.com',
                to: 'informaticasmecpinhal@gmail.com', //'bomtourofc@gmail.com', // E-mail para o qual deseja enviar
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
                    console.log('E-mail enviado com sucesso:', info.response);
                }
            });
        });
    });
};

// Rota de teste para enviar e-mail
app.get('/test-email', (req, res) => {
    const testSchedule = {
        name: 'João Silva',
        subject: 'Consulta Médica',
        date: '2025-01-21', // Data do evento (ano-mês-dia)
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