# 📅 **Agenda de Atendimentos SMEC - Balneário Pinhal** 🏫

## 📜 **Descrição do Projeto**:

Este projeto tem como objetivo criar uma plataforma para **agendamento de atendimentos** com o **Secretário Municipal de Educação (SMEC)** de Balneário Pinhal. Com ela, os cidadãos podem agendar uma reunião, escolher o horário disponível e consultar os agendamentos realizados, facilitando o contato com a secretaria de educação de forma organizada e eficiente.

## 🛠️ **Tecnologias Usadas**:

- **Frontend**:
  - HTML5
  - CSS3 (Bootstrap)
  - JavaScript
  - Axios (para requisições HTTP)
  
- **Backend**:
  - Node.js
  - Express.js
  - JSON como base de dados local (com possibilidade de integrar com um banco de dados real)
  - Nodemailer (para envio de e-mails)

## 📌 **Funcionalidades**:

1. **Agendar Atendimento**:
   - Preenchimento de formulário com informações como nome, assunto, data e horário.
   - Horários disponíveis são atualizados em tempo real, levando em consideração os agendamentos já realizados.

2. **Visualizar Agendamentos**:
   - Página para consulta de todos os atendimentos agendados no mês, com filtros por mês e visualização dos detalhes.

3. **Edição de Agendamentos**:
   - Possibilidade de editar um agendamento existente, alterando informações como nome, assunto, data e horário.

4. **Exclusão de Agendamentos**:
   - Permite excluir agendamentos já realizados.

5. **Notificações por E-mail** 📧:
   - Envio de e-mail para o usuário confirmando o agendamento.
   - Notificação de alterações ou exclusões de agendamentos.

## 💻 **Como Rodar o Projeto**:

### 1. **Clonando o Repositório**:
   
   Para começar, clone o repositório para sua máquina:

   ```
   git clone https://github.com/seu-usuario/agenda-smec.git
   cd agenda-smec
   ```

### 2. **Instalando Dependências**:
Para instalar as dependências, use o npm ou yarn:


```
npm install
```
Ou, se preferir o Yarn:
   
```
yarn install
```

### 3. **Configurando o Backend**:

- Certifique-se de ter o Node.js instalado.

- Crie um arquivo .env para armazenar suas configurações, como o envio de e-mails com o Nodemailer (veja exemplo abaixo).

**Exemplo de configuração de e-mail (Nodemailer)**:

```
EMAIL_HOST=smtp.exemplo.com
EMAIL_PORT=587
EMAIL_USER=seu-email@exemplo.com
EMAIL_PASS=sua-senha
```

### 4. **Rodando o Servidor**:
Execute o comando para iniciar o servidor localmente:

```
npm start
O servidor estará disponível em http://localhost:3001.
```

### 5. **Acessando a Aplicação**:

Abra o navegador e acesse http://localhost:3001 para começar a utilizar o sistema de agendamentos.

## 🌐 **Futuras Funcionalidades**:

- 🌟 Autenticação: Implementação de login para usuários (secretário, equipe).
- 🗓️ Integração com Google Calendar: Para sincronizar os atendimentos diretamente com a agenda do Secretário.
- 📊 Relatórios: Funcionalidade para gerar relatórios mensais de atendimentos.
- 📧 Contato:
Se você tiver alguma dúvida ou sugestão, entre em contato:

Feito com ❤️ e Node! 🚀

Esse README cobre todos os comandos e funcionalidades que você explorou, com instruções de uso e explicações de cada etapa.

### Conecte-se comigo

[![Linkdln](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/douglas-rodrigues-larré-a59637231/)
[![Outlook](https://img.shields.io/badge/Microsoft_Outlook-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white)](dev.larre@outlook.com)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/dev_larre)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DevLarre)

Vamos codar! 🚀

## © Desenvolvido por Dev Larré, 2025
