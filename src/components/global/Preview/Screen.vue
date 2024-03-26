<template>
    <div 
        class="previewCon normal rounded"
        :style="{
            width: `${props.width}px`,
            height: `${props.height}px`,
            backgroundColor: hexToRgba(themeFunc.getChild('2')?.value, themeFunc.getChild('3')?.value),
            backgroundImage: `url('${fileToBase64(themeFunc.getChild(screen.wallpaper[0])?.value[0])}')`,
        }"
    >
    </div>
</template>
<script setup lang="ts">
import { type PropType } from "vue";
import { themeFunc } from '@/service/theme';
import { hexToRgba } from '@/service/shared';
import { type Screen } from '@/service/screen';
import { fileToBase64 } from "@/service/file";

const props = defineProps({
    screen: {
        type: Object as PropType<Screen>,
            required: true,
    },
    width: {
        type: Number,
        default: 348
    },
    height: {
        type: Number,
        default: 261
    },
})
 
</script>
 
<style scoped>
.previewCon{
    width: 320px;
    height: 240px;
    background-color: pink;
    border: 1px solid rgba(255, 255, 255, 0.4);
    display: grid;
    place-items: center;
    color: black;
}
</style>