<template>
	<i
        :class="i" 
        :style="{
            fontSize: `${size}px`,
            color,
        }"
    ></i>
</template>
 
<script setup lang="ts">
defineProps({
    i: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: "rgba(255,255,255,1)"
    },
    size: {
        type: Number,
        default: 24
    }
})


</script>
 