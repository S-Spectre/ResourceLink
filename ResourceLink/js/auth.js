// auth.js

document.addEventListener('DOMContentLoaded', () => {
    // Sign-up Form Handling
    const signUpForm = document.getElementById('sign-up-form');
    if (signUpForm) {
        signUpForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            // Save user data locally (simulation)
            const user = {
                name: name,
                email: email,
                password: password
            };
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', true);

            alert('Account created successfully! Redirecting to login...');
            window.location.href = 'login.html';
        });
    }

    // Login Form Handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            const user = JSON.parse(localStorage.getItem('user'));

            if (!user || user.email !== email || user.password !== password) {
                alert('Invalid email or password');
                return;
            }

            // Mark user as logged in
            localStorage.setItem('isLoggedIn', true);
            alert('Login successful! Redirecting to homepage...');
            window.location.href = 'index.html';
        });
    }

    // Access Control (for pages that require login)
    const restrictedPages = ['index.html', 'resources.html', 'forum.html'];
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn && restrictedPages.includes(window.location.pathname.split('/').pop())) {
        alert('You must be logged in to access this page.');
        window.location.href = 'login.html';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');

    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
        loginLink.style.display = 'none';
        logoutLink.style.display = 'block';
    } else {
        loginLink.style.display = 'block';
        logoutLink.style.display = 'none';
    }

    logoutLink.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        alert('Logged out successfully!');
        window.location.href = 'login.html';
    });
});
