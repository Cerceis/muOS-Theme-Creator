<template>
    <v-app>
        <v-main>
            <Nav />
            <div class="bodyCon">
                <router-view></router-view>
            </div>
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

.bodyCon{
    height: calc(100vh - 60px - 12px);
    overflow-y: scroll
}

.colorPreview{
    width: 39px;
    height: 39px;
    border-radius: 4px;
    border: 1px solid rgba(255,255,255,0.4);
}
 
</style>