<template>
    <div
        :style="{
            transform: `translate(${
                -(REAL_SIZE_REF.screen.w * (1 - scale))/2
            }px,${
                -(REAL_SIZE_REF.screen.h * (1 - scale))/2
            }px)`
        }"
    >
        <div 
            class="previewCon"
            :style="{
                width: `${REAL_SIZE_REF.screen.w}px`,
                height: `${REAL_SIZE_REF.screen.h}px`,
                backgroundColor: hexToRgba(themeFunc.getChild('2')?.value, themeFunc.getChild('3')?.value/255),
                backgroundImage: images.wallpaper,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                transform: `scale(${scale})`
            }"
        >
            <ScreenContent v-for="child in screen.child" :key="child.id" :content="child" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { type PropType, onMounted, type Ref, ref, computed } from "vue";
import { themeFunc } from '@/service/theme';
import { hexToRgba } from '@/service/shared';
import { type Screen, REAL_SIZE_REF} from '@/service/screen';
import { fileToBase64 } from "@/service/assets";
import ScreenContent from "./ScreenContent/ScreenContent.vue";

const props = defineProps({
    screen: {
        type: Object as PropType<Screen>,
        required: true,
    },
    scale: {
        type: Number,
        default: 1
    }
})

/**
 * An image map for all the loaded asset.
 * [key]: url("base64 string")
 * key = "wallpaper" is reserved as default.
 * But not being used currently, other images are in their own respective components.
 */
const images: Ref<{
    [key: string]: string
}> = ref({});

onMounted(async() => {
	// Process wallpaper
	if(props.screen.wallpaper && props.screen.wallpaper.length > 0){
		for(let i = 0; i < props.screen.wallpaper.length; i++){
			const targetChildValue = themeFunc.getChild(props.screen.wallpaper[i])?.value[0];
			if(targetChildValue){
				images.value.wallpaper = `url("${await fileToBase64(targetChildValue)}")`;
				break;
			}
		}
	}
    /*
    // Process other image assets
    if(props.screen.imageAssets && props.screen.imageAssets.length > 0){
        for(let i = 0; i < props.screen.imageAssets.length; i++){
			const targetChildValue = themeFunc.getChild(props.screen.imageAssets[i].id)?.value[0];
			if(targetChildValue){
				images.value[props.screen.imageAssets[i].identifier] = `url("${await fileToBase64(targetChildValue)}")`;
				break;
			}
		}
    }
    */
})

</script>
 
<style scoped>
.previewCon{
    position: relative;
    border-radius: 4px;
    display: grid;
    color: black;
}
.basicCon{
    position: absolute;
    display: grid;
    align-items: center;
    width: 100%;
}
.text{
    padding: 0 5px;
}
</style>