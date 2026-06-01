// Bootstrap first so our custom styles can override it
import 'bootstrap/dist/css/bootstrap.css';
import './assets/main.css';

// Notyf styles for contact form notifications
import 'notyf/notyf.min.css';

// Bootstrap 5 JS bundle (includes Popper, no jQuery needed)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
