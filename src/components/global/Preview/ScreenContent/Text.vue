<template>
    <div 
        class="noto"
        :style="computedStyle"
        v-html="content.text"
    >
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
        margin: `${REAL_SIZE_REF.font.padding}px`
    };
    const _cs = props.content.style;
    if(_cs.font)
        _style.color = hexToRgba(themeFunc.getChild(_cs.font[0])?.value);
    if(_cs.fontAlpha)
        _style.opacity = themeFunc.getChild(_cs.fontAlpha[0])?.value/255;
    if(_cs.background){
        _style.backgroundColor = hexToRgba(
            themeFunc.getChild(_cs.background[0])?.value,
            _cs.backgroundAlpha ? themeFunc.getChild(_cs.backgroundAlpha[0])?.value/255 : 1
        );
    }
    if(_cs.textAlign){
        _style.textAlign = _cs.textAlign;
    }
    return _style
})

</script>
 
<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');
.noto{
    font-family: "Noto Sans", sans-serif;
    letter-spacing: 2px
}
</style> 