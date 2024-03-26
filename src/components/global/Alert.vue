<template>
    <div>
        <v-snackbar
            v-for="alert in alertList"
            v-model="alert.show"
            :timeout="alert.timeout"
            :color="alert.color"
        >
            {{ alert.text }}
            <template v-slot:actions>
                <v-btn
                    color="error"
                    @click="alert.show = false"
                    :size="40"
                    variant="elevated"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </div>

</template>
 
<script setup lang="ts">
import { alertList } from '@/service/alert';
 
</script>
 
<style scoped>
 
</style>