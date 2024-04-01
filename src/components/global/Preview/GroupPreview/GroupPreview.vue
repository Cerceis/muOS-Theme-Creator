<template>
    <BatteryPreview v-if="groupId === '9'" />
    <NetworkPreview v-if="groupId === '16'" />
    <BluetoothPreview v-if="groupId === '21'" />
</template>
 
<script setup lang="ts">
import BatteryPreview from './BatteryPreview.vue';
import NetworkPreview from './NetworkPreview.vue';
import BluetoothPreview from './BluetoothPreview.vue';

/**
 * To contributors
 * "How to add groupPreviews"
 * 1. Create a Vue component([ComponentName]Preview.vue) in this directory ex) BluetoothPreview.
 * 1.1 Or just copy paste and rename one of them.
 * 2. Import that component into this component just like above.
 * 3. Include the component into template just like above.
 * 4. Set v-if="groupId === [into the group id you wish to display at]" See: service/theme.ts for id info.
 * 5. Develop your component
 * 6. Done.
 */

defineProps({
    groupId:{
        type: String,
        required: true,
    }
})
</script>
 
<style scoped>
 
</style>