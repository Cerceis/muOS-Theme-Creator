<template>
    <div
        class="rounded"
        :style="{
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: 'rgba(255,255,255,0.2)',
            backgroundImage: `url('${src}')`,
            backgroundSize: 'contain',
            backgroundPosition: 'center'
        }"
    ></div>
</template>
 
<script setup lang="ts">
defineProps({
    src: {
        type: String,
        default: ""
    },
    width:{
        type: Number,
        default: 64,
    },
    height:{
        type: Number,
        default: 64,
    }
})
</script>
