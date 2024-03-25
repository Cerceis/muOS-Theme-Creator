<template>
    <v-tooltip :location="location">
        <template v-slot:activator="{ props }">
            <div v-bind="props">
                <slot ></slot>
            </div>
        </template>
        <div v-if="text" v-html="text"></div>
        <slot v-else name="text"></slot>
    </v-tooltip>
</template>
 
<script setup lang="ts">
import { type PropType } from 'vue';

defineProps({
    text: {
        type: String,
        default: ""
    },
    location: {
        type: String as PropType<"top" | "left" | "right" | "bottom">,
        default: "bottom"
    }
})
 
</script>