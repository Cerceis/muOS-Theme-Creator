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

/**
 *  border-radius: a b c d 
 *  a = Top left
 *  b = Top right
 *  c = Bottom right
 *  d = Bottom left
 */
const generateBorderString = (
    val: number, 
    topLeft: boolean = false, topRight: boolean = false, 
    bottomLeft: boolean = false, bottomRight: boolean = false
) => {
    if(topLeft && topRight && bottomLeft && bottomRight) return `${val}px`;
    const borderArr = [0,0,0,0];
    if(topLeft) borderArr[0] = Number(val);
    if(topRight) borderArr[1] = Number(val);
    if(bottomRight) borderArr[2] = Number(val);
    if(bottomLeft) borderArr[3] = Number(val);
    return `${borderArr.join("px ")}px`
}

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
    if(_cs.borderTopLeft){
		_style.borderRadius = generateBorderString(themeFunc.getChild(_cs.borderTopLeft[0])?.value, true, false, false, false); 
	}
    if(_cs.borderTopRight){
		_style.borderRadius = generateBorderString(themeFunc.getChild(_cs.borderTopRight[0])?.value, false, true, false, false); 
	}
    if(_cs.borderBottomLeft){
		_style.borderRadius = generateBorderString(themeFunc.getChild(_cs.borderBottomLeft[0])?.value, false, false, true, false); 
	}
    if(_cs.borderBottomRight){
		_style.borderRadius = generateBorderString(themeFunc.getChild(_cs.borderBottomRight[0])?.value, false, false, false, true); 
	}
    if(_cs.borderTop){
		_style.borderRadius = generateBorderString(themeFunc.getChild(_cs.borderTop[0])?.value, true, true); 
	}
    if(_cs.borderBottom){
		_style.borderRadius = generateBorderString(themeFunc.getChild(_cs.borderBottom[0])?.value, false, false, true, true); 
	}
    if(_cs.borderLeft){
		_style.borderRadius = generateBorderString(themeFunc.getChild(_cs.borderLeft[0])?.value, true, false, true, false); 
	}
    if(_cs.borderRight){
		_style.borderRadius = generateBorderString(themeFunc.getChild(_cs.borderRight[0])?.value, false, true, false, true); 
	}
	if(_cs.borderRadius){
		_style.borderRadius = generateBorderString(themeFunc.getChild(_cs.borderRadius[0])?.value, true, true, true, true);
	}
    if(!props.content.expand || !props.content.expand.x)
        _style.width = `${props.content.size.w}px`;
    if(!props.content.expand || !props.content.expand.y)
        _style.height = `${props.content.size.h}px`;
    return _style
})

</script>
 