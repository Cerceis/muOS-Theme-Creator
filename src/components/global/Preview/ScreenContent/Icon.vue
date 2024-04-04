<template>
    <fi 
        :style="{
            margin: `${REAL_SIZE_REF.font.padding.y}px ${REAL_SIZE_REF.font.padding.x}px`
        }"
        :i="content.icon" 
        :size="REAL_SIZE_REF.icon.size"
        :color="computedIconColorStyle"
    ></fi>
</template>
 
<script setup lang="ts">
import { REAL_SIZE_REF } from '@/service/screen';
import { type ScreenContent } from '@/service/screenData';
import { hexToRgba } from '@/service/shared';
import { themeFunc } from '@/service/theme';
import { type PropType, computed } from 'vue';

const props = defineProps({
    content: {
        type: Object as PropType<ScreenContent>,
        required: true,
    }
})

const computedIconColorStyle = computed(() => {
    const _cs = props.content.style;
    let colorString = "rgba(255,255,255,1)";
    if(_cs.font){
        colorString = hexToRgba(
            themeFunc.getChild(_cs.font[0])?.value as string,
            _cs.fontAlpha ? Number(themeFunc.getChild(_cs.fontAlpha[0])?.value as string)/255 : 255
        )
    }
    return colorString
})
</script>