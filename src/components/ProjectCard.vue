<script setup>

    // defineProps() lets this component receive data from its parent (Projects.vue).
    // Each "project" object comes from the local projects.json file.
    defineProps({
        project: Object
    })

</script>

<template>
    <div class="work-card" :data-category="project.category">
        <div class="work-image">
            <!-- Bind the image source and alt text dynamically from the project data -->
            <img :src="project.image" :alt="project.alt" loading="lazy">
            <div class="work-overlay">
                <span class="btn-play disabled">
                    <i :class="project.overlayIcon"></i> {{ project.overlayText }}
                </span>
            </div>
        </div>
        <div class="work-content">
            <div class="work-tech">
                <span><i :class="project.techIcon"></i> {{ project.techLabel }}</span>
            </div>
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
        </div>
    </div>
</template>

<style scoped>

</style>
