// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Form Toggle Functionality
const toggleBtns = document.querySelectorAll('.toggle-btn');
const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');

toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const formType = btn.getAttribute('data-form');
        
        // Update active button
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show/hide forms
        if (formType === 'signin') {
            signinForm.classList.add('active');
            signupForm.classList.remove('active');
        } else {
            signupForm.classList.add('active');
            signinForm.classList.remove('active');
        }
    });
});

// Password validation
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const passwordRequirements = document.getElementById('password-requirements');
const errorMessage = document.getElementById('error-message');

// Password requirements elements
const lengthReq = document.getElementById('length');
const uppercaseReq = document.getElementById('uppercase');
const lowercaseReq = document.getElementById('lowercase');
const numberReq = document.getElementById('number');
const specialReq = document.getElementById('special');

passwordInput.addEventListener('focus', () => {
    passwordRequirements.style.display = 'block';
});

passwordInput.addEventListener('input', validatePassword);
confirmPasswordInput.addEventListener('input', validatePasswordMatch);

function validatePassword() {
    const password = passwordInput.value;
    
    // Length check
    if (password.length >= 8) {
        lengthReq.classList.add('valid');
    } else {
        lengthReq.classList.remove('valid');
    }
    
    // Uppercase check
    if (/[A-Z]/.test(password)) {
        uppercaseReq.classList.add('valid');
    } else {
        uppercaseReq.classList.remove('valid');
    }
    
    // Lowercase check
    if (/[a-z]/.test(password)) {
        lowercaseReq.classList.add('valid');
    } else {
        lowercaseReq.classList.remove('valid');
    }
    
    // Number check
    if (/\d/.test(password)) {
        numberReq.classList.add('valid');
    } else {
        numberReq.classList.remove('valid');
    }
    
    // Special character check
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        specialReq.classList.add('valid');
    } else {
        specialReq.classList.remove('valid');
    }
}

function validatePasswordMatch() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (confirmPassword && password !== confirmPassword) {
        showError('Passwords do not match');
    } else {
        hideError();
    }
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function hideError() {
    errorMessage.style.display = 'none';
}

// Form submissions
signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = signinForm.querySelector('input[type="email"]').value;
    const password = signinForm.querySelector('input[type="password"]').value;
    
    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.msg || 'Login failed');
        }

        // Store the token and user data
        localStorage.setItem('token', data.token);
        if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        
        // Show success message
        showSuccess('Login successful! Redirecting to dashboard...');
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
        
    } catch (error) {
        showError(error.message || 'Failed to sign in. Please try again.');
    }
});

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    // Get all form data
    const formData = new FormData(signupForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const mobile = formData.get('mobile_number');
    const gender = formData.get('gender');
    
    // Basic validation
    if (!name || !email || !mobile || !gender || !password) {
        showError('Please fill in all fields');
        return;
    }
    
    // Validate email format
    if (!validateEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    // Validate phone number
    if (!validatePhone(mobile)) {
        showError('Please enter a valid phone number');
        return;
    }
    
    // Validate password requirements
    const isValid = password.length >= 8 && 
                   /[A-Z]/.test(password) && 
                   /[a-z]/.test(password) && 
                   /\d/.test(password) && 
                   /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (!isValid) {
        showError('Please meet all password requirements');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
    hideError();
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                mobile_number: mobile,
                gender,
                password,
                confirm_password: confirmPassword
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.msg || 'Registration failed');
        }

        // Show success message
        showSuccess('Registration successful! Redirecting to login...');
        
        // Clear form
        signupForm.reset();
        
        // Switch to sign in form after 2 seconds
        setTimeout(() => {
            toggleBtns[0].click(); // Switch to sign in form
        }, 2000);
        
    } catch (error) {
        showError(error.message || 'Failed to register. Please try again.');
    }
});

// Success message function
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    // Insert success message at the top of the form
    const form = document.querySelector('.form-container');
    form.insertBefore(successDiv, form.firstChild);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Social media login handlers
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = icon.querySelector('i').classList[1].split('-')[1]; // Extract platform name
        console.log(`${platform} login clicked`);
        alert(`${platform.charAt(0).toUpperCase() + platform.slice(1)} login would be implemented here`);
    });
});

// Enhanced form validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Real-time validation for email and phone
signinForm.querySelector('input[type="email"]').addEventListener('blur', function() {
    if (this.value && !validateEmail(this.value)) {
        this.style.borderColor = '#dc3545';
    } else {
        this.style.borderColor = '';
    }
});

signupForm.querySelector('input[type="email"]').addEventListener('blur', function() {
    if (this.value && !validateEmail(this.value)) {
        this.style.borderColor = '#dc3545';
        showError('Please enter a valid email address');
    } else {
        this.style.borderColor = '';
        hideError();
    }
});

signupForm.querySelector('input[type="tel"]').addEventListener('blur', function() {
    if (this.value && !validatePhone(this.value)) {
        this.style.borderColor = '#dc3545';
        showError('Please enter a valid phone number');
    } else {
        this.style.borderColor = '';
        hideError();
    }
});