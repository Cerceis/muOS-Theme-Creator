<template>
    <BatteryPreview v-if="groupId === '9'" />
    <NetworkPreview v-if="groupId === '16'" />
    <BluetoothPreview v-if="groupId === '21'" />
</template>
 
<script setup lang="ts">
import BatteryPreview from './BatteryPreview.vue';
import NetworkPreview from './NetworkPreview.vue';
import BluetoothPreview from './BluetoothPreview.vue';

defineProps({
    groupId:{
        type: String,
        required: true,
    }
})
</script>
 
<style scoped>
 
</style>