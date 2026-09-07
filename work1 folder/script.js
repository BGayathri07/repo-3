document.addEventListener('DOMContentLoaded', () => {

  const form         = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const toggleBtn     = document.getElementById('togglePassword');
  const eyeIcon        = toggleBtn.querySelector('.icon-eye');
  const eyeOffIcon     = toggleBtn.querySelector('.icon-eye-off');
  const loginBtn      = document.getElementById('loginBtn');
  const loginLabel    = loginBtn.querySelector('.btn-login__label');
  const errorMsg      = document.getElementById('errorMsg');
  const forgotLink    = document.getElementById('forgotPassword');
  const signUpLink    = document.getElementById('signUpLink');
  const card          = document.querySelector('.card');

  toggleBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    eyeIcon.hidden = isPassword;
    eyeOffIcon.hidden = !isPassword;
    toggleBtn.setAttribute('aria-pressed', String(isPassword));
    toggleBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
  });

  function showError(message) {
    errorMsg.textContent = message;
    card.classList.remove('shake');
    void card.offsetWidth;
    card.classList.add('shake');
  }

  function clearError() {
    errorMsg.textContent = '';
  }

  [usernameInput, passwordInput].forEach((input) => {
    input.addEventListener('input', clearError);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearError();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username) {
      showError('Please enter your email or username.');
      usernameInput.focus();
      return;
    }
    if (!password) {
      showError('Please enter your password.');
      passwordInput.focus();
      return;
    }
    if (password.length < 6) {
      showError('Password must be at least 6 characters.');
      passwordInput.focus();
      return;
    }

    loginBtn.disabled = true;
    loginLabel.textContent = 'Logging in…';

    setTimeout(() => {
      loginLabel.textContent = 'Login';
      loginBtn.disabled = false;
      alert(`Welcome back, ${username}!`);
      form.reset();
    }, 1100);
  });

  document.querySelectorAll('.social-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const provider = btn.dataset.provider;
      alert(`Continue with ${provider} — hook this up to your OAuth flow.`);
    });
  });

  forgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Hook this up to your "forgot password" flow.');
  });

  signUpLink.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Hook this up to your sign-up page.');
  });

});