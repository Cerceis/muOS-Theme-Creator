<template>
    <div 
        class="previewCon normal rounded"
        :style="{
			width: `${REAL_SIZE_REF.screen.w * sizeAmp}px`,
			height: `${REAL_SIZE_REF.screen.h * sizeAmp}px`,
			backgroundColor: hexToRgba(themeFunc.getChild('2')?.value, themeFunc.getChild('3')?.value/255),
			backgroundImage: images.wallpaper,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundSize: 'cover'
		}"
    >
    
        <!----Header [150] Depreciated in v11 but still need the container--->
        <div class="system-bar header"
            :style="{
                position: 'absolute',
                display: 'grid',
                alignItems: 'center',
                top: 0,
                width: `${REAL_SIZE_REF.headerFooter.w * sizeAmp}px`,
                height: `${REAL_SIZE_REF.headerFooter.h * sizeAmp}px`,
                backgroundColor: hexToRgba(themeFunc.getChild('34')?.value),
                color: hexToRgba(themeFunc.getChild('35')?.value, themeFunc.getChild('36')?.value/255),
                fontSize: `${REAL_SIZE_REF.font.size * sizeAmp}px`,
                backgroundImage: images.header,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }"
        >
            {{ screen.textAssets.title }}
        </div>

        <!----Footer [150] Depreciated in v11 but still need the container--->
        <div class="system-bar footer"
            :style="{
                position: 'absolute',
                display: 'grid',
                alignItems: 'center',
                bottom: 0,
                width: `${REAL_SIZE_REF.headerFooter.w * sizeAmp}px`,
                height: `${REAL_SIZE_REF.headerFooter.h * sizeAmp}px`,
                backgroundColor: hexToRgba(themeFunc.getChild('30')?.value),
                color: hexToRgba(themeFunc.getChild('31')?.value, themeFunc.getChild('32')?.value/255),
                backgroundImage: images.header,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }"
        >

        </div>
    </div>
</template>
<script setup lang="ts">
import { type PropType, onMounted, type Ref, ref, computed } from "vue";
import { themeFunc } from '@/service/theme';
import { hexToRgba, REAL_SIZE_REF } from '@/service/shared';
import type { Screen, ScreenImageAssetType, ScreenTextAssetType } from '@/service/screen';
import { fileToBase64 } from "@/service/assets";

type ScreenSize = "small" | "normal";
const props = defineProps({
    screen: {
        type: Object as PropType<Screen>,
        required: true,
    },
    size: {
        type: String as PropType<ScreenSize>,
        default: "normal"
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

// A map for imageAseet, for list of keys, see service/screen.ts -> ScreenImageAssetType
const images: Ref<any> = ref({});

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
})

const sizeAmp = computed(()=> props.size === "normal" ? 0.54375 : 0.25)

</script>
 
<style scoped>
.previewCon{
    position: relative;
    background-color: pink;
    border-radius: 4px;
    display: grid;
    place-items: center;
    color: black;
}

</style>