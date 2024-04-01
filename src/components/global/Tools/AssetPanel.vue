<template>
    <div class="asset-grid">
        <ToolTip v-for="a in assets" location="top" :text="`${a.filename}.${a.type.split('/')[1]}`">
            <div 
                v-if="a.type.includes('audio/')"
                class="asset-item-default rounded"
            >   
                <v-icon size="x-large">mdi-music</v-icon>
            </div>
            <div 
                v-else-if="a.type.includes('application/')"
                class="asset-item-default rounded"
            >   
                <v-icon size="x-large">mdi-format-font</v-icon>
            </div>
            <ImagePreview 
                v-else
                class="asset-item rounded"
                @click="selectedImage = a; showImage = true"
                :src="a.base64"
            />
        </ToolTip>
        <v-dialog v-model="showImage" max-width="800px">
            <v-sheet v-if="selectedImage">
                <div class="d-flex justify-center">
                    <ImagePreview 
                        :src="selectedImage?.base64"
                        :width="640" :height="480"
                    />
                </div>
                <v-divider />
                <div class="d-flex gap-1 pa-3 justify-end align-center">
                    <div>{{ `${selectedImage?.filename}.${selectedImage?.type.split('/')[1]}` }}</div>
                    <v-btn
                        @click="assetFunc.delete(selectedImage)"
                        color="error"
                        size="36"
                    >
                       <v-icon>mdi-delete</v-icon>
                    </v-btn>
					<v-btn
                        @click="promptDownload(
							assetFunc.getByID(selectedImage.id).asFile(),
							`${selectedImage?.filename}.${selectedImage?.type.split('/')[1]}`
						)"
                        color="primary"
                        size="36"
                    >
                       <v-icon>mdi-download</v-icon>
                    </v-btn>
                    <v-btn
                       @click="showImage = false"
                       color="error"
                       size="36"
                    >
                    <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>
            </v-sheet>
        </v-dialog>
    </div>
</template>
 
<script setup lang="ts">
import { type Ref, ref } from "vue";
import { assets, type Asset } from "@/service/assets";
import ToolTip from "@/components/buttons/ToolTip.vue";
import { assetFunc } from "@/service/assets";
import { promptDownload } from "@/service/file";
import ImagePreview from "@/components/global/Preview/ImagePreview.vue";

const showImage: Ref<boolean> = ref(false);
const selectedImage: Ref<Asset | null> = ref(null);
 
</script>
 
<style scoped>
.asset-grid{
    display: grid;
    gap: .25em;
    grid-template-columns: repeat( auto-fill, 68px );
    justify-content: center;
}
.asset-item-default{
    display: grid;
    place-items: center;
    width: 64px;
    height: 64px;
    background-color: rgba(255,255,255,0.2);
}
</style>