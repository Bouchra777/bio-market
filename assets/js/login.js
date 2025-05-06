const loginForm = document.querySelector('.login-form');
const signupForm = document.querySelector('.signup-form');

// Event listener for the "Login" button
document.querySelector('.login button').addEventListener('click', () => {
  signupForm.classList.remove('active');
  loginForm.classList.add('active');
});

// Event listener for the "Register" button
document.querySelector('.signup button').addEventListener('click', () => {
  loginForm.classList.remove('active');
  signupForm.classList.add('active');
});
