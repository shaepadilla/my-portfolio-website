<script setup>

  import { onMounted, onUnmounted } from 'vue';

  import Navbar from './components/Navbar.vue';
  import Hero from './components/Hero.vue';
  import Projects from './components/Projects.vue';
  import About from './components/About.vue';
  import Tools from './components/Tools.vue';
  import Contact from './components/Contact.vue';
  import FooterComponent from './components/FooterComponent.vue';

  // ===== Interactive behaviors ported from the original capstone main.js =====
  let handleScroll;
  let handleResume;

  onMounted(() => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Add a "scrolled" class to the navbar and highlight the active nav link
    handleScroll = () => {
      if (!navbar) return;

      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Scroll-spy: figure out which section is currently in view
      const navbarHeight = navbar.offsetHeight;
      let current = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.substring(1) === current) {
          link.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Resume button shows a confirmation (matches original behavior)
    const resumeBtn = document.getElementById('resumeButton');
    if (resumeBtn) {
      handleResume = (e) => {
        e.preventDefault();
        alert('Resume request sent!');
      };
      resumeBtn.addEventListener('click', handleResume);
    }
  });

  onUnmounted(() => {
    if (handleScroll) window.removeEventListener('scroll', handleScroll);
  });

</script>

<template>
  <Navbar />
  <Hero />
  <Projects />
  <About />
  <Tools />
  <Contact />
  <FooterComponent />
</template>

<style scoped>

</style>
