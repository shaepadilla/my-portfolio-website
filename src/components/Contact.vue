<script setup>

    import { Notyf } from 'notyf';
    import { ref, onMounted, onBeforeUnmount } from 'vue';

    const notyf = new Notyf();

    // Reactive form fields
    const form = ref({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // Disables the submit button while the request is in flight.
    const isLoading = ref(false);

    // Web3Forms Access Key used to authenticate form submissions.
    // INTEGRATION: replace with your own access key from https://web3forms.com
    const WEB3FORMS_ACCESS_KEY = "7abb15c8-7adc-45cd-b4b7-dfe0020b32ec";

    // The submitForm() function handles the contact form submission.
    const submitForm = async () => {

        // Ensure the user completes the reCAPTCHA challenge before submitting.
        if (!recaptchaToken.value) {
            notyf.error('Please verify that you are not a robot');
            return;
        }

        // Basic validation before sending.
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email);
        if (!form.value.name.trim() || !validEmail || !form.value.message.trim()) {
            notyf.error('Please fill all required fields.');
            return;
        }

        // While the email is being sent, disable the button and show "Sending...".
        isLoading.value = true;

        try {
            // fetch() sends the form data to the Web3Forms API.
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                // Convert the form data into a JSON string and include the access key.
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    subject: form.value.subject || "New message from Portfolio Contact Form",
                    name: form.value.name,
                    email: form.value.email,
                    message: form.value.message
                })
            });

            // Convert the API response into a JS object.
            const result = await response.json();

            // Check if the form submission was successful.
            if (result.success) {
                console.log(result);
                notyf.success("Message Sent!");
                form.value = { name: '', email: '', subject: '', message: '' };
            } else {
                notyf.error("Failed to send message.");
            }
        } catch (error) {
            console.log(error);
            notyf.error("Failed to send message.");
        } finally {
            isLoading.value = false;
            // Reset the reCAPTCHA widget whether the request succeeds or fails.
            resetRecaptcha();
        }

    }

    /* reCAPTCHA Integration */

    // INTEGRATION: replace with your own site key from https://www.google.com/recaptcha
    const SITE_KEY = 'YOUR_RECAPTCHA_SITE_KEY';
    // The element where the reCAPTCHA checkbox will be rendered.
    const recaptchaContainer = ref(null);
    // The ID of the reCAPTCHA widget after it is created.
    const recaptchaWidgetId = ref(null);
    // Stores the token generated when the user completes reCAPTCHA.
    const recaptchaToken = ref('');

    // Runs when the user successfully completes the reCAPTCHA challenge.
    function onRecaptchaSuccess(token) {
        recaptchaToken.value = token;
    }

    // Runs when the reCAPTCHA verification expires (about 2 minutes).
    function onRecaptchaExpired() {
        recaptchaToken.value = '';
    }

    // Creates and displays the reCAPTCHA widget.
    function renderRecaptcha() {
        if (!window.grecaptcha) {
            console.error('reCAPTCHA not loaded');
            return;
        }

        recaptchaWidgetId.value = window.grecaptcha.render(recaptchaContainer.value, {
            sitekey: SITE_KEY,
            size: 'normal',
            callback: onRecaptchaSuccess,
            'expired-callback': onRecaptchaExpired,
        });
    }

    // Resets the reCAPTCHA widget.
    function resetRecaptcha() {
        if (recaptchaWidgetId.value !== null) {
            window.grecaptcha.reset(recaptchaWidgetId.value);
            recaptchaToken.value = '';
        }
    }

    onMounted(() => {
        // The reCAPTCHA library loads asynchronously from index.html, so wait
        // until it is available before rendering the widget.
        const interval = setInterval(() => {
            if (window.grecaptcha && window.grecaptcha.render) {
                renderRecaptcha();
                clearInterval(interval);
            }
        }, 100);

        // Clean up the interval before the component is removed.
        onBeforeUnmount(() => {
            clearInterval(interval);
        });
    });

</script>

<template>
    <!-- Contact Section with id "contact" -->
    <section id="contact" class="contact">
        <div class="container">
            <div class="contact-grid">
                <div class="contact-info">
                    <span class="section-subtitle">Get In Touch</span>
                    <h2 class="section-title">Let's work <span class="highlight">together</span></h2>
                    <p>I'm currently available for freelance work and full-time opportunities.</p>

                    <div class="contact-details">
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <div>
                                <h4>Email</h4>
                                <a href="mailto:shaepadilla5@gmail.com">shaepadilla5@gmail.com</a>
                            </div>
                        </div>

                        <div class="contact-item">
                            <i class="fas fa-phone-alt"></i>
                            <div>
                                <h4>Phone</h4>
                                <a href="tel:+639067740868">+63 906 774 0868</a>
                            </div>
                        </div>

                        <div class="contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <div>
                                <h4>Location</h4>
                                <span>Philippines (Open to remote)</span>
                            </div>
                        </div>
                    </div>

                    <div class="social-links">
                        <a href="https://github.com/shaepadilla">
                            <i class="fab fa-github"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/shae-padilla-28080401051998/">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>

                <!-- Contact Form -->
                <form class="contact-form" id="contactForm" @submit.prevent="submitForm">
                    <div class="form-group">
                        <label for="name" class="form-label">Your Name</label>
                        <input type="text" id="name" name="name" class="form-control" v-model="form.name" required>
                    </div>
                    <div class="form-group">
                        <label for="email" class="form-label">Email Address</label>
                        <input type="email" id="email" name="email" class="form-control" v-model="form.email" required>
                    </div>
                    <div class="form-group">
                        <label for="subject" class="form-label">Subject</label>
                        <input type="text" id="subject" name="subject" class="form-control" v-model="form.subject">
                    </div>
                    <div class="form-group">
                        <label for="message" class="form-label">Tell me about your project</label>
                        <textarea id="message" name="message" rows="6" class="form-control" v-model="form.message" required></textarea>
                    </div>
                    <!-- The reCAPTCHA checkbox is rendered into this element. -->
                    <div class="form-group">
                        <div ref="recaptchaContainer"></div>
                    </div>

                    <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading">
                        {{ isLoading ? "Sending..." : "Send Message" }} <i class="fas fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        </div>
    </section>
</template>

<style scoped>

</style>
