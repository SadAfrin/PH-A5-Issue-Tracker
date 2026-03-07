// login form ke select kora
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function (e) {
    // Form submit hole jeno page reload na hoy
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin123') {
        window.location.href = 'main.html';
    } else {
        alert('Invalid Username or Password! Please use the demo credentials.');
    }
});