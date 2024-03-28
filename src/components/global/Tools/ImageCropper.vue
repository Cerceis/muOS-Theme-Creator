<template>
    <div class="pa-3">
        <v-file-input
            chips
            variant="outlined"
            density="compact"
            label="Images (.png, .jpg, .jpeg, .bmp, .webp)"
            :accept="['.png', '.jpg', '.jpeg', '.bmp', '.webp']"
            multiple
            @change="initNew($event)"
        >
            <template v-slot:selection="{fileNames}">
                {{ fileNames.length }} files 
            </template>
        </v-file-input>
        
        <div v-if="displayCropper" class="d-flex gap-1">
            <div>
                Still in development
                <div class="text-caption">
                    Remaining Image:{{ remainingImages.length }}
                </div>
                <div class="grid gap-1" style="min-width: 160px">
                    <v-btn
                        @click="confirmCrop"
                        color="primary"
                        width="100%"
                    >
                        Crop   
                    </v-btn>
                    <v-btn
                        @click="confirmCrop"
                        color="primary"
                        width="100%"
                        disabled
                    >
                        C & Download 
                    </v-btn>
                    <v-btn
                        @click="confirmCrop"
                        color="primary"
                        width="100%"
                        disabled
                    >
                        C & Save to asset 
                    </v-btn>
                </div>
                <v-divider />
                <div>Preview</div>
                <div class="caption py-1">
                    width: {{resultStats.width}}px, height:{{resultStats.height}}px
                </div>
                <div v-if="displayPreview">
                    <ImagePreview 
                        :src="resultPreviewBase64" 
                        :width="128" :height="128"
                    />
                </div>
            </div>
            <div class="grid justify-center">
                <cropper
                    ref="cropperComponent"
                    class="cropper cropperCus"
                    :src="rawImg"                
                    @change=changeCrop
                />
            </div>
            <div class="w-100">
                <div>History</div>
                <v-divider class="my-2" />
                <ImagePreview />
            </div>
        </div>
    </div>
    <hr>
</template>
 
<script setup lang="ts">
import { ref, type Ref, computed } from "vue";
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import { fileToBase64 } from "@/service/assets";
import ImagePreview from "@/components/global/Preview/ImagePreview.vue";

const remainingImages: Ref<string[]> = ref([]);
const rawImg: Ref<string> = ref('')
const displayCropper: Ref<boolean> = ref(false);


const initNew = async(e: any) => {
    if(!e || !e.target || !e.target.files) return;
    if(e.target.files.length === 0) return;
    const fileList: FileList = e.target.files
    rawImg.value = await fileToBase64(fileList[0]);
    if(fileList.length === 1){
        displayCropper.value = true;
        return;
    }
    for(let i = 1; i < fileList.length; i++)
        remainingImages.value.push(await fileToBase64(fileList[i]));
    displayCropper.value = true;
}
// Crop related
const resultStats = ref({width: 0, height: 0});
const resultPreviewBase64: any = ref("");
const displayPreview: Ref<boolean> = ref(false);

const changeCrop = (e: any) => {
    if(e && e.coordinates) resultStats.value = e.coordinates
    e.canvas.toBlob((blob: any) =>{        
        resultPreviewBase64.value = e.canvas.toDataURL();
        console.log(resultPreviewBase64.value)
        displayPreview.value = true;
    })
}

const confirmCrop = () => {
    if(remainingImages.value.length > 0){
        const nextImage = remainingImages.value.shift();
        if(nextImage) rawImg.value = nextImage;
        return;
    }
    rawImg.value = "";
    displayPreview.value = false;
    displayCropper.value = false;
}


</script>

<style scoped>
.cropperCus{
    width: 100%;
    width: 608px;
    height: 456px;
}
.previewContainer{
    background: var(--bg);
    border-radius: 50%;
    background-position: center;
    background-size: cover;
}
.deleteBtn{
    position: absolute;
    top: -5px;
    left: -5px;
    background: var(--bg);
    color: var(--text);
    border: 1px solid var(--primary);
    font-size: 70%;
    cursor: pointer;
}
.deleteBtn:active{
    filter: brightness(120%);
}
.avatarGrid{
    display: grid;
    gap: .5em;
    grid-template-columns: repeat( auto-fit, minmax(64px, 80px) );
}
.avatarGridItem{
    position: relative;
}
td{ 
	padding: 0 .5em;
}
.btn-mini{
    font-size: 70%;
    width: 15px;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
}
</style>