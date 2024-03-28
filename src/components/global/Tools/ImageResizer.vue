<template>
    <div class="grid align-center pa-3">
        <div class="py-3 d-flex gap-1 justify-center">
            <div class="grid align-start justify-center">
                <v-radio-group 
                    label="Size"
                    v-model="inputCheck"
                    hide-details
                >
                    <v-radio
                        v-for="n in 3"
                        :key="n"
                        :label="`${
                            n == 1? 'Resize to width' : 
                            n == 2 ? 'Resize to height': 
                            n == 3 ? 'Free (Stretch)': 
                            null
                        }`"
                        :value="n"
                    ></v-radio>
                </v-radio-group> 
            </div>
            <v-divider vertical class="mx-3"/>
            <div>
                Convert to
                <div class="d-flex my-3 align-center gap-1">
                    <v-text-field
                        style="width:110px;"
                        density="compact"
                        variant="outlined"
                        :error-messages="errorMsg.width"
                        type="number"
                        label="Width(px)"
                        v-model="inputWidth"
                        :disabled="disabled.width"
                    >
                    </v-text-field>
                    <v-text-field
                        style="width:110px;"
                        density="compact"
                        variant="outlined"
                        :error-messages="errorMsg.height"
                        type="number"
                        label="Height(px)"
                        v-model="inputHeight"
                        :disabled="disabled.height"
                    >
                    </v-text-field>
                </div>
                <v-file-input
                    chips
                    variant="outlined"
                    density="compact"
                    label="Images (.png, .jpg, .jpeg, .bmp, .webp)"
                    :accept="['.png', '.jpg', '.jpeg', '.bmp', '.webp']"
                    multiple
                    @change="convert($event)"
                >
                    <template v-slot:selection="{fileNames}">
                        {{ fileNames.length }} files 
                    </template>
                </v-file-input>
            </div>
        </div>
        <div class="text-center text-caption">Only 15 result will be shown</div>
        <v-divider />
        <div v-if="convertResult.show" class="image-grid">
            <ImagePreview 
                v-for="i in convertResult.images.slice(0,15)"
                :src="i.base64"
                :width="128" :height="128"
            />
        </div>
        <div v-else class="skeleton-grid mb-3" style="justify-self: center;">
            <div>
                Great power comes great responsibility ( ⁎ᵕᴗᵕ⁎ )
                <div class="caption text-center">Don't break it lol</div>
            </div>
        </div>
        <div v-if="convertResult.images.length > 0" class="d-flex justify-end gap-1 mt-3">
            <v-btn color="error" size="36" @click="resetResult">
                <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn color="primary" 
                @click="addAllToAsset"
            >
                Save to asset
            </v-btn>
            <v-btn color="primary" 
                @click="downloadAll"
            >
                Download all
            </v-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type Ref, ref, watch } from "vue";
import { fileToBase64, base64ToFile } from "@/service/assets";
import { assetFunc } from "@/service/assets";
import ImagePreview from "@/components/global/Preview/ImagePreview.vue";
import { newAlert } from "@/service/alert";
import { promptDownloadZip } from "@/service/file";
import { Generate } from "cerceis-lib";

const inputWidth: Ref<number> = ref(640);
const inputHeight: Ref<number> = ref(480);
const inputCheck: Ref<number> = ref(3);
const errorMsg: Ref<{width: string, height: string}> = ref({
	width: "", height: "",
});
const disabled: Ref<{width: boolean, height: boolean}> = ref({
	width: false, height: false,
});
watch(
    () => inputCheck.value,
    () => {
        if(inputCheck.value === 1){
            disabled.value.width = false;
            disabled.value.height = true;
        }else if(inputCheck.value === 2){
            disabled.value.width = true;
            disabled.value.height = false;
        }else{
            disabled.value.width = false;
            disabled.value.height = false;
        }
                
    }
)

const convertResult: Ref<{
    show: boolean,
    images: {
        base64: string, name: string, type: string
    }[]
}> = ref({
    show: false,
    images: []
})

const resetResult = () => {
	convertResult.value = {
		show: false, images: []
	}
}

const addAllToAsset = () => {
    for(let i = 0; i < convertResult.value.images.length; i++){
        assetFunc.addBase64(
            convertResult.value.images[i].base64,
            convertResult.value.images[i].name,
            convertResult.value.images[i].type,
        )
    }
    resetResult()                    
    newAlert({
        text: "Successfully added to assets",
        color: "success",
    })
}
const downloadAll = () => {
    promptDownloadZip(
        convertResult.value.images.map(i => {
            return base64ToFile(
                i.base64.split(",")[1], 
                i.name,
                i.type
            )
        }),
        `images-${Generate.currentDateTime()}`
    )
    resetResult();
}

const convert = async(e: any) => {
	if(!e || !e.target || !e.target.files) return;
    if(e.target.files.length === 0) return;
	inputWidth.value = Number(inputWidth.value)
	inputHeight.value = Number(inputHeight.value)
	if(
		(inputHeight.value > 0) ||
		(inputWidth.value > 0)
	){
		errorMsg.value.width = ""
		errorMsg.value.height = ""
		for(let i = 0; i < e.target.files.length; i++){
			const image = e.target.files[i];
			let img = new Image()
			img.onload = ()=>{
				const imageRatio = Number(img.width)/Number(img.height)
				const imageWidth = disabled.value.width ? Number(inputHeight.value)*imageRatio : Number(inputWidth.value);
				const imageHeight = disabled.value.height ? Number(inputWidth.value)/imageRatio :Number(inputHeight.value);
				const canvas = document.createElement('canvas')
				canvas.width = imageWidth
				canvas.height = imageHeight
				const ctx = canvas.getContext('2d')
				ctx?.drawImage(img, 0, 0, Number(imageWidth.toFixed(0)), Number(imageHeight.toFixed(0)))
				const result = canvas.toDataURL(image.type)
				if(result){
                    convertResult.value.images.push({
                        base64: result,
                        name: image.name,
                        type: image.type
                    })
				}
			};
			img.src = await fileToBase64(image);
		}
        convertResult.value.show = true;
	}else{
		errorMsg.value.width = "Input value larger than 0"
		errorMsg.value.height = "Input value larger than 0"
	}
}
</script>

<style scoped>
.skeleton-grid{
    display: grid;
    width: 640px;
    height: 480px;
    background: rgba(55,55,55,1);
    place-items: center;
}
.image-grid{
    width: 100%;
    display: grid;
    gap: .25em;
    grid-template-columns: repeat( auto-fill, 128px );
    justify-content: center;
}

</style>