<script setup>

    // Import the project list from the local JSON file
    import projects from '../data/projects.json';
    // Import the child component used to display each project
    import ProjectCard from './ProjectCard.vue';

</script>

<template>
    <!-- My Projects Section with id "projects" -->
    <section id="projects" class="work">
        <div class="container">
            <div class="section-header">
                <span class="section-subtitle">Portfolio</span>
                <h2 class="section-title">My <span class="highlight">Projects</span></h2>
                <p class="section-description">Current and upcoming projects</p>
            </div>

            <div class="work-grid">
                <!-- Loop through each project from projects.json and render a ProjectCard -->
                <!-- :key uniquely identifies each card; :project passes data to the child -->
                <ProjectCard
                    v-for="project in projects"
                    :key="project.id"
                    :project="project"
                />
            </div>
        </div>
    </section>
</template>

<style scoped>

</style>
