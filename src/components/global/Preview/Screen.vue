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
        <!----Text------->
        <div v-if="screen.textAssets.charging" class="basicCon text"
            v-html="screen.textAssets.charging"
            :style="{
                top: `${REAL_SIZE_REF.charging.yPos * sizeAmp}px`,
                fontSize: `${REAL_SIZE_REF.font.size * sizeAmp}px`,
                color: hexToRgba(themeFunc.getChild('111')?.value, themeFunc.getChild('112')?.value/255),
                justifyContent: 'center'
            }"
        />

        <div v-if="screen.textAssets.listFocused" class="basicCon"
            :style="{
                display: 'flex',
                top: `${REAL_SIZE_REF.headerFooter.h * sizeAmp}px`,
                fontSize: `${REAL_SIZE_REF.font.size * sizeAmp}px`,
                color: hexToRgba(themeFunc.getChild('91')?.value, themeFunc.getChild('92')?.value/255),
            }"
        >
            <!---Indicator------>
            <div :style="{
                height: `100%`,
                width: `${4 * sizeAmp}px`,
                position: 'absolute',
                left: '1px',
                backgroundColor: hexToRgba(themeFunc.getChild('89')?.value, themeFunc.getChild('90')?.value/255),
            }"></div>
            <span 
                v-html="screen.textAssets.listFocused" 
                class="text"
                :style="{
                    width: `${REAL_SIZE_REF.screen.w * sizeAmp}px`,
                    backgroundColor: hexToRgba(themeFunc.getChild('85')?.value, themeFunc.getChild('86')?.value/255),
                }"
            />
        </div>
        
        <div v-if="screen.textAssets.listOthers" class="basicCon text"
            v-html="screen.textAssets.listOthers"
            :style="{
                top: `${(REAL_SIZE_REF.headerFooter.h + REAL_SIZE_REF.font.size + REAL_SIZE_REF.font.size/2) * sizeAmp}px`,
                fontSize: `${REAL_SIZE_REF.font.size * sizeAmp}px`,
                color: hexToRgba(themeFunc.getChild('81')?.value, themeFunc.getChild('82')?.value/255),
            }"
        />
    
        <!----Header [150] Depreciated in v11 but still need the container--->
        
        <div class="basicCon"
            :style="{
                zIndex: 2,
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
            <div class="text">{{ screen.textAssets.title }}</div>
            <div v-if="screen.textAssets.iconStatusTray" 
                class="text d-flex gap-1"
                :style="{
                    position: 'absolute',
                    top: '55%',
                    left: '70%',
                    transform: `translate(-70%, -55%)`
                }"
            >
                <fi i="fa-brands fa-bluetooth-b" :size="REAL_SIZE_REF.icon.size * sizeAmp"></fi>
                <fi i="fa-solid fa-wifi" :size="REAL_SIZE_REF.icon.size * sizeAmp"></fi>
                <fi i="fa-solid fa-battery-three-quarters" :size="REAL_SIZE_REF.icon.size * sizeAmp"></fi>
            </div>
            <div v-if="screen.textAssets.timeDate" v-html="screen.textAssets.timeDate" 
                class="text"
                :style="{
                    position: 'absolute',
                    right: '5px',
                    top: `${(REAL_SIZE_REF.font.size/2) * sizeAmp}px`,
                }"
            >       
            </div>
        </div>


        <!----Footer [150] Depreciated in v11 but still need the container--->
        <div class="basicCon"
            :style="{
                zIndex: 2,
                bottom: 0,
                width: `${REAL_SIZE_REF.headerFooter.w * sizeAmp}px`,
                height: `${REAL_SIZE_REF.headerFooter.h * sizeAmp}px`,
                backgroundColor: hexToRgba(themeFunc.getChild('30')?.value),
                color: hexToRgba(themeFunc.getChild('31')?.value, themeFunc.getChild('32')?.value/255),
                fontSize: `${REAL_SIZE_REF.font.size * sizeAmp}px`,
                backgroundImage: images.header,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }"
        >
            <div v-if="screen.textAssets.footerControls"class="text" v-html="screen.textAssets.footerControls"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { type PropType, onMounted, type Ref, ref, computed } from "vue";
import { themeFunc } from '@/service/theme';
import { hexToRgba, REAL_SIZE_REF } from '@/service/shared';
import type { Screen } from '@/service/screen';
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
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');

*{
    font-family: "Noto Sans", sans-serif;
    letter-spacing: 1px
}

.previewCon{
    position: relative;
    background-color: pink;
    border-radius: 4px;
    display: grid;
    place-items: center;
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