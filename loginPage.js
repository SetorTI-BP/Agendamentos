function showRegisterForm() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
}

async function login() {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8081/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, password })
        });

        if (response.ok) {
            const data = await response.json();
            alert(`Login bem-sucedido!`);
            // Salva o token no localStorage
            localStorage.setItem('authToken', data.token);
            window.location.href = 'HeritageBP.html'; // Redireciona para a página de dashboard
        } else {
            alert('Login falhou. Verifique suas credenciais.');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao conectar ao servidor.');
    }
}

async function fetchProtectedData() {
    const token = localStorage.getItem('authToken');

    try {
        const response = await fetch('http://localhost:8081/protected-endpoint', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Dados protegidos:', data);
        } else {
            console.error('Erro ao acessar o recurso protegido.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}


async function register() {
    const login = document.getElementById('new-login').value;
    const password = document.getElementById('new-password').value;
    const role = 'ADMIN'; // Papel fixo para o exemplo

    try {
        const response = await fetch('http://localhost:8081/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, password, role })
        });

        if (response.ok) {
            alert('Cadastro bem-sucedido! Você pode fazer login agora.');
            showLoginForm();
        } else {
            alert('Falha no cadastro. Verifique os dados fornecidos.');
        }
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Erro ao conectar ao servidor.');
    }
}