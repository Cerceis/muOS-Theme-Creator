<template>
    <v-sheet class="d-flex justify-space-between pa-3 align-center">
        <div class="font-weight-bold text-h5">
            muOS Theme Creator
        </div>
        <div class="d-flex gap-1 align-center">
            <v-btn
               @click=""
               color="primary"
            >
               Load Theme
            </v-btn>
            v{{ VERSION }}
        </div>
    </v-sheet>
</template>
 
<script setup lang="ts">
import { VERSION } from "@/service/shared";
 
</script>
 
<style scoped>
 
</style>