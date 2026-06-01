<script setup>

</script>

<template>
    <!-- Navigation with Resume Button -->
    <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container">
            <a class="logo" href="#landing">Welcome</a>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="#landing">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="#projects">My Projects</a></li>
                    <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
                    <li class="nav-item"><a class="nav-link" href="#tools">Tools</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                    <!-- Resume Button in Navigation -->
                    <li class="nav-item">
                        <a href="#contact" id="resumeButton">
                            <i class="fas fa-file-pdf"></i> Request Resume
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>

</style>
