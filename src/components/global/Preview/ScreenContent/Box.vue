<template>
    <div 
        class="noto"
        :style="computedStyle"
    >
        <span style="opacity: 0; overflow: hidden;">dummy text</span>
    </div>
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

const computedStyle = computed(() => {
    const _style: any = {
        fontSize: `${REAL_SIZE_REF.font.size}px`,
        margin: `${REAL_SIZE_REF.font.padding}px 0`,
    };
    const _cs = props.content.style;
    if(_cs.background){
        _style.backgroundColor = hexToRgba(
            themeFunc.getChild(_cs.background[0])?.value,
            _cs.backgroundAlpha ? themeFunc.getChild(_cs.backgroundAlpha[0])?.value/255 : 1
        );
    }
    if(!props.content.expand || !props.content.expand.x)
        _style.width = `${props.content.size.w}px`;
    if(!props.content.expand || !props.content.expand.y)
        _style.height = `${props.content.size.h}px`;
    return _style
})

</script>
 