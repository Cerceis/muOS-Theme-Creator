<template>
    <div 
        class="screen-content-wrapper"
        :style="computedStyle"
    >
        <Text v-if="content.type === 'text'" :content="content" />
        <Box v-if="content.type === 'box'" :content="content" />
        <Icon v-if="content.type === 'icon'" :content="content" />
    </div>
</template>
 
<script setup lang="ts">
import { REAL_SIZE_REF } from '@/service/screen';
import { type ScreenContent } from '@/service/screenData';
import { type PropType, computed } from 'vue';
import { themeFunc } from '@/service/theme';
import { Is } from "cerceis-lib";
import Text from "./Text.vue";
import Box from "./Box.vue";
import Icon from "./Icon.vue";

const props = defineProps({
    content: {
        type: Object as PropType<ScreenContent>,
        required: true,
    }
})

const computedStyle = computed(() => {
    const yPadding = props.content.row * 10;
    const xPadding = props.content.col * 10;
    const _style: any = {
        top: props.content.row * 20 + yPadding,
        left: props.content.col * 20 + xPadding,
    };
    /**
     *  The offset Y is from bottom to top instead of top to bottom.
     *  The input is automatically inversed.
     */
    if(props.content.offset){
        if(props.content.offset.y){
            if(Is.string(props.content.offset.y))
                _style.top += REAL_SIZE_REF.screen.h - (Number(themeFunc.getChild(props.content.offset.y as string)?.value as string) ?? 0)/2 - 40;
            if(Is.number(props.content.offset.y))
                _style.top += REAL_SIZE_REF.screen.h - (props.content.offset.y as number)/2 - 40;
        }
    }
    if(props.content.expand){
        if(props.content.expand.x)
            _style.width = "100%";
        if(props.content.expand.y)
            _style.height = "100%";
    }
    if(props.content.zIndex){
        _style.zIndex = props.content.zIndex;
    }
    _style.top = `${_style.top}px`;
    _style.left = `${_style.left}px`;
    return _style
})

</script>
 
<style scoped>
.screen-content-wrapper{
    position: absolute;
}
 
</style>