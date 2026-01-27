// Antralio Landing Page Scripts

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');

    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});

async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const submitButton = form.querySelector('.submit-button');
    const originalButtonText = submitButton.textContent;

    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';

    try {
        const formData = new FormData(form);

        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            showSuccessMessage(form);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        alert('There was an error submitting the form. Please try again.');
    }
}

function showSuccessMessage(form) {
    const formContainer = form.parentElement;
    const formNote = formContainer.querySelector('.form-note');

    // Hide the form and note
    form.style.display = 'none';
    if (formNote) {
        formNote.style.display = 'none';
    }

    // Create and show success message
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML = `
        <h3>You're on the list!</h3>
        <p>We'll be in touch soon with early access details.</p>
    `;

    formContainer.appendChild(successDiv);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
