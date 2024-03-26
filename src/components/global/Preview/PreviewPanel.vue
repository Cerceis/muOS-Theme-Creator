<template>
    <div class="d-flex gap-1 ">
        <div class="grid">
            <div class="text-center text-caption">Boot Screen</div>
            <div class="previewCon small rounded">
                
            </div>
            <div class="text-center text-caption">?? Screen</div>
            <div class="previewCon small rounded">
                ٩(ˊᗜˋ*)و
            </div>
        </div>
        <div>
            <div class="text-center text-caption">Home Screen</div>
            <div 
                :key="`preview-${viewKey}`"
                class="previewCon normal rounded"
                :style="{
                    backgroundColor: hexToRgba(themeFunc.getChild('2')?.value, themeFunc.getChild('3')?.value)
                }"
            >
                <span>Preview, but no preview yet! (☉д☉)</span>
            </div>
        </div>
        
    </div>
</template>
 
<script setup lang="ts">
import { type Ref, ref, watch } from "vue";
import { fileToBase64 } from '@/service/file';
import { selectedTheme, themeFunc } from '@/service/theme';
import { hexToRgba } from '@/service/shared';

const viewKey: Ref<number> = ref(1);
watch(
    () => selectedTheme.value,
    () => {
        viewKey.value ++;
        console.log(viewKey.value)
    },
    { deep: true }
)
 
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
.normal{
    width: 348px;  /*320 * 1.0875*/
    height: 261px; /*240 * 1.0875*/
}
.small{
    width: 160px;
    height: 120px;
}
</style>

