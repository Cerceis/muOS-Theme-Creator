<template>
    <v-app>
        <v-main>
            <Nav />
            <router-view></router-view>
        </v-main>
    </v-app>
</template>
 
<script setup lang="ts">
import Nav from "@/components/global/Nav.vue";
 
</script>
 
<style>

html, body {
    margin: 0;
    padding: 0;
    overflow-y: auto !important;
}

* {
    font-family: 'Zen Maru Gothic', sans-serif
}
 
</style>