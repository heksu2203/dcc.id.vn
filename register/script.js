// Password toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);
            const icon = this.querySelector('i');
            
            if (targetInput.type === 'password') {
                targetInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                targetInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
});

// Form validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('terms');
    
    // Email/Phone validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,11}$/;
        return emailRegex.test(email) || phoneRegex.test(email);
    }
    
    // Password validation
    function validatePassword(password) {
        return password.length >= 6;
    }
    
    // Show error message
    function showError(input, message) {
        const inputGroup = input.closest('.input-group');
        inputGroup.classList.add('error');
        inputGroup.classList.remove('success');
        
        // Remove existing error message
        const existingError = inputGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        inputGroup.appendChild(errorDiv);
    }
    
    // Show success
    function showSuccess(input) {
        const inputGroup = input.closest('.input-group');
        inputGroup.classList.add('success');
        inputGroup.classList.remove('error');
        
        // Remove error message
        const existingError = inputGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }
    
    // Clear validation
    function clearValidation(input) {
        const inputGroup = input.closest('.input-group');
        inputGroup.classList.remove('error', 'success');
        
        const existingError = inputGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }
    
    // Real-time validation
    emailInput.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            clearValidation(this);
        } else if (!validateEmail(this.value.trim())) {
            showError(this, 'Vui lòng nhập email hoặc số điện thoại hợp lệ');
        } else {
            showSuccess(this);
        }
    });
    
    passwordInput.addEventListener('blur', function() {
        if (this.value === '') {
            clearValidation(this);
        } else if (!validatePassword(this.value)) {
            showError(this, 'Mật khẩu phải có ít nhất 6 ký tự');
        } else {
            showSuccess(this);
        }
    });
    
    confirmPasswordInput.addEventListener('blur', function() {
        if (this.value === '') {
            clearValidation(this);
        } else if (this.value !== passwordInput.value) {
            showError(this, 'Mật khẩu xác nhận không khớp');
        } else {
            showSuccess(this);
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate email
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Vui lòng nhập email hoặc số điện thoại');
            isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Vui lòng nhập email hoặc số điện thoại hợp lệ');
            isValid = false;
        } else {
            showSuccess(emailInput);
        }
        
        // Validate password
        if (!passwordInput.value) {
            showError(passwordInput, 'Vui lòng nhập mật khẩu');
            isValid = false;
        } else if (!validatePassword(passwordInput.value)) {
            showError(passwordInput, 'Mật khẩu phải có ít nhất 6 ký tự');
            isValid = false;
        } else {
            showSuccess(passwordInput);
        }
        
        // Validate confirm password
        if (!confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'Vui lòng xác nhận mật khẩu');
            isValid = false;
        } else if (confirmPasswordInput.value !== passwordInput.value) {
            showError(confirmPasswordInput, 'Mật khẩu xác nhận không khớp');
            isValid = false;
        } else {
            showSuccess(confirmPasswordInput);
        }
        
        // Validate terms
        if (!termsCheckbox.checked) {
            showMessage('Vui lòng đồng ý với điều khoản sử dụng', 'error');
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Đang xử lý...';
            submitBtn.disabled = true;
            form.classList.add('loading');
            
            // Simulate API call
            setTimeout(() => {
                showMessage('Đăng ký thành công! Chào mừng bạn đến với Tempi.', 'success');
                
                // Reset form
                form.reset();
                document.querySelectorAll('.input-group').forEach(group => {
                    group.classList.remove('error', 'success');
                });
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                form.classList.remove('loading');
            }, 2000);
        }
    });
    
    // Show message function
    function showMessage(text, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = text;
        
        // Insert at the top of the form
        form.insertBefore(messageDiv, form.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
});

// Google sign-in button
document.addEventListener('DOMContentLoaded', function() {
    const googleBtn = document.querySelector('.google-btn');
    
    googleBtn.addEventListener('click', function() {
        // Simulate Google sign-in
        this.style.opacity = '0.7';
        this.style.pointerEvents = 'none';
        
        setTimeout(() => {
            alert('Chức năng đăng nhập Google sẽ được triển khai trong phiên bản thực tế!');
            this.style.opacity = '1';
            this.style.pointerEvents = 'auto';
        }, 1000);
    });
});

// Smooth animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe form elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.input-group, .google-btn, .submit-btn');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
});

// Add ripple effect to buttons
function addRippleEffect(button) {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .google-btn, .submit-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Apply ripple effect to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.google-btn, .submit-btn');
    buttons.forEach(addRippleEffect);
});

// Auto-resize illustration based on window size
window.addEventListener('resize', function() {
    const illustration = document.querySelector('.bg-image');
    if (illustration && window.innerWidth <= 768) {
        illustration.style.maxHeight = '200px';
    } else if (illustration) {
        illustration.style.maxHeight = 'none';
    }
});

// Initial call
window.dispatchEvent(new Event('resize'));

