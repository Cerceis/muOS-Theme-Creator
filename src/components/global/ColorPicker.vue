<template>
    <v-color-picker 
        show-swatches 
        v-model="localValue"
        mode="hex"
    />
</template>
 
<script setup lang="ts">
import { ref, computed, watch } from "vue";

const props = defineProps({
    "modelValue":{
        type: String,
        required: true,
    },
})
const emit = defineEmits(["update:modelValue"]);

const localValue = ref("")

computed(() => {
    if(props.modelValue.charAt(0) === "#")
        localValue.value = props.modelValue;
    else 
        localValue.value = `#${props.modelValue}`
})

watch(
    () => localValue.value,
    () => {
        emit("update:modelValue", localValue.value.charAt(0) === "#" ? localValue.value.replace("#", ""): localValue.value)
    }
)
 
</script>
 
<style scoped>
 
</style>