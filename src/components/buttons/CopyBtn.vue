<template>
    <v-btn 
        @click="initCopy"
        color="primary"
        :size="props.size"
        variant="elevated" 
    >
        <v-icon>mdi-content-copy</v-icon>
        <div v-if="!iconOnly">COPY</div>
    </v-btn>
</template>
 
<script setup lang="ts">
import { newAlert } from "@/service/alert";

const props = defineProps({
    text: {
        type: String,
        default: ""
    },
    size: {
        type: String,
        default: "default"
    },
    iconOnly: {
        type: Boolean,
        default: false
    }
})

const initCopy = () => {
    navigator.clipboard.writeText(props.text);
    newAlert({text: "Text copied!"})
}

</script>
 
<style scoped>
 
</style>