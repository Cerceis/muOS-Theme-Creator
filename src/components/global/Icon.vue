<template>
	<i
        :class="i" 
        :style="{fontSize: `${size}px`}"
    ></i>
    <FontAwesomeIcon icon="faHouse" />
</template>
 
<script setup lang="ts">
// I have no idea whats going on with fontawesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps({
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
 