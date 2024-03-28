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
import { type ScreenContent } from '@/service/screen';
import { type PropType, computed } from 'vue';
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
        top: `${(props.content.row * 20) + yPadding}px`,
        left: `${props.content.col * 20 + xPadding}px`,
    };
    if(props.content.expand){
        if(props.content.expand.x)
            _style.width = "100%";
        if(props.content.expand.y)
            _style.height = "100%";
    }
    if(props.content.zIndex){
        _style.zIndex = props.content.zIndex;
    }
    return _style
})

</script>
 
<style scoped>
.screen-content-wrapper{
    position: absolute;
}
 
</style>